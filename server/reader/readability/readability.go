// Copyright 2017 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package readability // import "miniflux.app/reader/readability"

import (
	"bytes"
	"fmt"
	"io"
	"math"
	"os"
	"regexp"
	"strings"

	"miniflux.app/logger"

	"github.com/PuerkitoBio/goquery"
	"golang.org/x/net/html"
)

const (
	defaultTagsToScore = "section,h2,h3,h4,h5,h6,p,pre,div"
)

var (
	divToPElementsRegexp = regexp.MustCompile(`(?i)<(a|blockquote|dl|div|img|ol|p|pre|table|ul)`)
	sentenceRegexp       = regexp.MustCompile(`\.( |$)`)

	blacklistCandidatesRegexp  = regexp.MustCompile(`(?i)popupbody|g-plus|header|subscribe|navigation|comments`)
	okMaybeItsACandidateRegexp = regexp.MustCompile(`(?i)and|article|body|column|main|shadow`)
	unlikelyCandidatesRegexp   = regexp.MustCompile(`(?i)banner|breadcrumbs|combx|comment|cover-wrap|disqus|extra|foot|legends|menu|modal|related|remark|replies|rss|shoutbox|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote|publication|title-text|footer`)

	negativeRegexp = regexp.MustCompile(`(?i)hidden|^hid$|hid$|hid|^hid |banner|combx|comment|com-|contact|foot|footer|footnote|masthead|media|meta|modal|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget|byline|author|dateline|writtenby|p-author`)
	positiveRegexp = regexp.MustCompile(`(?i)article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story`)
)

type candidate struct {
	selection *goquery.Selection
	score     float32
}

func (c *candidate) Node() *html.Node {
	return c.selection.Get(0)
}

func (c *candidate) String() string {
	id, _ := c.selection.Attr("id")
	class, _ := c.selection.Attr("class")

	if id != "" && class != "" {
		return fmt.Sprintf("%s#%s.%s => %f", c.Node().DataAtom, id, class, c.score)
	} else if id != "" {
		return fmt.Sprintf("%s#%s => %f", c.Node().DataAtom, id, c.score)
	} else if class != "" {
		return fmt.Sprintf("%s.%s => %f", c.Node().DataAtom, class, c.score)
	}

	return fmt.Sprintf("%s => %f", c.Node().DataAtom, c.score)
}

type candidateList map[*html.Node]*candidate

func (c candidateList) String() string {
	var output []string
	for _, candidate := range c {
		output = append(output, candidate.String())
	}

	return strings.Join(output, ", ")
}

func writeFile(str string) {
	file, err := os.OpenFile("debug.html2", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	content := []byte(str)
	_, err = file.Write(content)
	if err != nil {
		panic(err)
	}

	fmt.Println("Content appended to file successfully.")
}

// ExtractContent returns relevant content.
func ExtractContent(page io.Reader, title string) (string, error) {
	document, err := goquery.NewDocumentFromReader(page)
	if err != nil {
		return "", err
	}

	text := document.Text()
	//writeFile(text)
	document.Find("script,style").Each(func(i int, s *goquery.Selection) {
		removeNodes(s)
	})

	transformMisusedDivsIntoParagraphs(document)
	removeUnlikelyCandidates(document)
	text = document.Text()
	print(text)

	output := getArticleByDivClass(document)

	if output == "" {
		candidates := getCandidates(document)
		logger.Debug("[Readability] Candidates: %v", candidates)

		topCandidate := getTopCandidate(document, candidates)
		logger.Debug("[Readability] TopCandidate: %v", topCandidate)

		topCandidate = checkDivCandidate(topCandidate, candidates)
		output = getArticle(topCandidate, candidates)
		output = checkHeaderInfo(output, title)
	}

	return output, nil
}

func getArticleByDivClass(document *goquery.Document) string {
	content := ""
	document.Find("div.entry-content,div.content-entry,div.entry-body,div.article-detail,div.entry,div.entry__content").Each(func(i int, s *goquery.Selection) {
		text := s.Text()
		len := usefulContentLen(text)
		if len > 300 {
			content, _ = goquery.OuterHtml(s)
		}
	})

	return content
}

// Now that we have the top candidate, look through its siblings for content that might also be related.
// Things like preambles, content split by ads that we removed, etc.
func getArticle(topCandidate *candidate, candidates candidateList) string {
	output := bytes.NewBufferString("<div>")
	siblingScoreThreshold := float32(math.Max(10, float64(topCandidate.score*.4))) //init score*.2

	topCandidate.selection.Siblings().Union(topCandidate.selection).Each(func(i int, s *goquery.Selection) {
		append := false
		node := s.Get(0)
		content := s.Text()
		print(content)
		if node == topCandidate.Node() {
			append = true
		} else if c, ok := candidates[node]; ok && c.score >= siblingScoreThreshold {
			append = false
		}

		/*if s.Is("p") {
			linkDensity := getLinkDensity(s)
			content := s.Text()
			contentLength := len(content)

			if contentLength >= 80 && linkDensity < .25 {
				append = true
			} else if contentLength < 80 && linkDensity == 0 && sentenceRegexp.MatchString(content) {
				append = true
			}
		}*/

		if append {
			tag := "div"
			if s.Is("p") {
				tag = node.Data
			}

			html, _ := s.Html()
			fmt.Fprintf(output, "<%s>%s</%s>", tag, html, tag)
		}
	})

	output.Write([]byte("</div>"))
	return output.String()
}

func removeUnlikelyCandidates(document *goquery.Document) {

	document.Find("*").Not("html,body").Each(func(i int, s *goquery.Selection) {
		class, _ := s.Attr("class")
		id, _ := s.Attr("id")
		str := class + id

		text := s.Text()
		len := len(text)
		if len > 1000 {
			print(len)
		}
		if blacklistCandidatesRegexp.MatchString(str) || (unlikelyCandidatesRegexp.MatchString(str) && !okMaybeItsACandidateRegexp.MatchString(str)) {
			removeNodes(s)
		}
	})

	document.Find("a").Each(func(i int, s *goquery.Selection) {
		href, _ := s.Attr("href")
		if href == "/" || href == "#" {
			removeNodes(s)
		}
	})

	document.Find("img[data-lazy-src],form").Each(func(i int, s *goquery.Selection) {
		removeNodes(s)
	})
}

type removeCandidate struct {
	selection *goquery.Selection
	index     int
}
type removeCandidateList []*removeCandidate

func checkDivCandidate(topCandidate *candidate, candidates candidateList) *candidate {
	//isMainTextStart := false
	searchLoop := 1
	lastDivCandidate := topCandidate
	selCandidate := topCandidate.selection
	topcontent := selCandidate.Text()
	print(topcontent)
	for {
		if len(selCandidate.Children().Nodes) == 1 {
			if searchLoop < 8 {
				selCandidate = selCandidate.Children()
				searchLoop++
				continue
			} else {
				break
			}
		}

		var divCandidate *candidate
		removeCandidates := make(removeCandidateList, 0)
		contentLens := make([]int, 0)

		index := 0
		totalContentLen := 0
		divCandidateContentLen := 0
		selCandidate.Children().Each(func(i int, s *goquery.Selection) {
			content := s.Text()
			print(content)
			usefulL := usefulContentLen(content)
			totalContentLen += usefulL
			contentLens = append(contentLens, usefulL)

			node := s.Get(0)
			d1 := node.Data
			if d1 == "div" || d1 == "section" || d1 == "main" || d1 == "article" {
				c, ok := candidates[node]
				if ok {
					if divCandidate == nil || c.score >= divCandidate.score {
						divCandidate = c
						divCandidateContentLen = usefulL

					}
				}
				cand := &removeCandidate{selection: s, index: index}
				removeCandidates = append(removeCandidates, cand)
			}
			index++
		})
		//if divCandidate != nil && divCandidate.score > lastDivCandidate.score*.35 {
		if divCandidate != nil && float32(divCandidateContentLen) > float32(totalContentLen)*.45 {
			lastDivCandidate = divCandidate
			selCandidate = divCandidate.selection
			text := lastDivCandidate.selection.Text()
			print(text)
		} else {
			if index > 0 {
				threshold := totalContentLen / index
				totalValid := index
				for i := len(removeCandidates) - 1; i >= 0; i-- {
					cand := removeCandidates[i]
					isRemoveDiv := true
					interval := len(removeCandidates) - i
					if cand.index == len(contentLens)-interval {
						totalValid--
					} else {
						for j := cand.index + 1; j < totalValid; j++ {
							if float32(contentLens[j]) >= float32(threshold)*.4 {
								isRemoveDiv = false
								break
							}
						}
					}
					if isRemoveDiv {
						removeNodes(cand.selection)
						text := lastDivCandidate.selection.Text()
						print(text)
					} else {
						break
					}
				}
			}
			break
		}
		searchLoop++
	}
	text := lastDivCandidate.selection.Text()
	print(text)
	return lastDivCandidate
	/*if len(selCandidate.Children().Nodes) > 1 {
		var divCandidate *candidate
		selCandidate.Children().Each(func(i int, s *goquery.Selection) {
			node := s.Get(0)
			//d1 := s.Nodes[0].Data
			d1 := node.Data
			if d1 == "div" {
				c, ok := candidates[node]
				if ok && (divCandidate == nil || c.score >= divCandidate.score) {
					divCandidate = c

				}
			}
		})
		if divCandidate != nil {
			return divCandidate
		}
	}*/
	/*selCandidate.Children().Each(func(i int, s *goquery.Selection) {
		content := s.Text()
		t1 := s.Nodes[0].Type
		d1 := s.Nodes[0].Data
		l1 := len(s.Nodes)
		print(t1, d1, l1)
		linkDensity := getLinkDensity(s)
		content = strings.Replace(content, " ", "", -1)
		content = strings.Replace(content, "\n", "", -1)
		content = strings.Replace(content, "\t", "", -1)
		contentLength := len(content)
		if !isMainTextStart {
			if contentLength >= 120 && linkDensity < .25 {
				isMainTextStart = true
			} else if contentLength < 80 && linkDensity == 0 && sentenceRegexp.MatchString(content) {
				isMainTextStart = true
			} else {
				removeNodes(s)
			}
		} else {
			if !(linkDensity < .10) {
				removeNodes(s)
			}
		}

	})*/
}

func usefulContentLen(text string) int {
	content := strings.Replace(text, " ", "", -1)
	content = strings.Replace(content, "\n", "", -1)
	content = strings.Replace(content, "\t", "", -1)
	return len(content)
}

func checkHeaderInfo(output, title string) string {
	var outReader = strings.NewReader(output)
	doc, _ := goquery.NewDocumentFromReader(outReader)
	searchLoop := 0
	doc.Find("*").Not("html,body,div,article").Each(func(i int, s *goquery.Selection) {
		if searchLoop < 6 {
			node := s.Get(0)
			d1 := node.Data
			print(d1)
			text := s.Text()
			usedLen := usefulContentLen(text)
			class, _ := s.Attr("class")
			print(class)
			if usedLen < 40 {
				removeNodes(s)
			}
			if strings.Contains(class, "title") || strings.Contains(class, "header") {
				removeNodes(s)
			}
			if (strings.Contains(title, strings.TrimSpace(text)) || strings.Contains(text, title)) && usedLen < 100 {
				removeNodes(s)
			}
		}

		searchLoop++

	})
	html, _ := doc.Selection.Html()
	return html
}
func getTopCandidate(document *goquery.Document, candidates candidateList) *candidate {
	var best *candidate

	for _, c := range candidates {
		if best == nil {
			best = c
		} else if best.score < c.score {
			best = c
		}
	}

	if best == nil {
		best = &candidate{document.Find("body"), 0}
	}

	return best
}

// Loop through all paragraphs, and assign a score to them based on how content-y they look.
// Then add their score to their parent node.
// A score is determined by things like number of commas, class names, etc.
// Maybe eventually link density.
func getCandidates(document *goquery.Document) candidateList {
	candidates := make(candidateList)

	document.Find(defaultTagsToScore).Each(func(i int, s *goquery.Selection) {
		text := s.Text()

		// If this paragraph is less than 25 characters, don't even count it.
		if len(text) < 25 {
			return
		}
		if len(text) > 1000 {
			print("1000")
		}

		parent := s.Parent()
		parentNode := parent.Get(0)

		grandParent := parent.Parent()
		var grandParentNode *html.Node
		if grandParent.Length() > 0 {
			grandParentNode = grandParent.Get(0)
		}

		if _, found := candidates[parentNode]; !found {
			candidates[parentNode] = scoreNode(parent)
		}

		if grandParentNode != nil {
			if _, found := candidates[grandParentNode]; !found {
				candidates[grandParentNode] = scoreNode(grandParent)
			}
		}

		// Add a point for the paragraph itself as a base.
		contentScore := float32(1.0)

		// Add points for any commas within this paragraph.
		contentScore += float32(strings.Count(text, ",") + 1)

		// For every 100 characters in this paragraph, add another point. Up to 3 points.
		contentScore += float32(math.Min(float64(int(len(text)/100.0)), 3))

		candidates[parentNode].score += contentScore
		if grandParentNode != nil {
			candidates[grandParentNode].score += contentScore / 2.0
		}
	})

	// Scale the final candidates score based on link density. Good content
	// should have a relatively small link density (5% or less) and be mostly
	// unaffected by this operation
	for _, candidate := range candidates {
		candidate.score = candidate.score * (1 - getLinkDensity(candidate.selection))
	}

	return candidates
}

func scoreNode(s *goquery.Selection) *candidate {
	c := &candidate{selection: s, score: 0}

	switch s.Get(0).DataAtom.String() {
	case "div":
		c.score += 5
	case "pre", "td", "blockquote", "img":
		c.score += 3
	case "address", "ol", "ul", "dl", "dd", "dt", "li", "form":
		c.score -= 3
	case "h1", "h2", "h3", "h4", "h5", "h6", "th":
		c.score -= 5
	}

	c.score += getClassWeight(s)
	return c
}

// Get the density of links as a percentage of the content
// This is the amount of text that is inside a link divided by the total text in the node.
func getLinkDensity(s *goquery.Selection) float32 {
	linkText := s.Find("a").Text()
	text := s.Text()
	linkLength := len(linkText)
	textLength := len(text)

	if textLength == 0 {
		return 0
	}

	if linkLength > 100 {
		linkLength = 100
	}
	return float32(linkLength) / float32(textLength)
}

// Get an elements class/id weight. Uses regular expressions to tell if this
// element looks good or bad.
func getClassWeight(s *goquery.Selection) float32 {
	weight := 0
	class, _ := s.Attr("class")
	id, _ := s.Attr("id")

	if class != "" {
		if negativeRegexp.MatchString(class) {
			weight -= 25
		}

		if positiveRegexp.MatchString(class) {
			weight += 25
		}
	}

	if id != "" {
		if negativeRegexp.MatchString(id) {
			weight -= 25
		}

		if positiveRegexp.MatchString(id) {
			weight += 25
		}
	}

	return float32(weight)
}

func transformMisusedDivsIntoParagraphs(document *goquery.Document) {
	document.Find("div").Each(func(i int, s *goquery.Selection) {
		html, _ := s.Html()
		if !divToPElementsRegexp.MatchString(html) {
			node := s.Get(0)
			node.Data = "p"
		}
	})
}

func removeNodes(s *goquery.Selection) {
	s.Each(func(i int, s *goquery.Selection) {
		parent := s.Parent()
		if parent.Length() > 0 {
			parent.Get(0).RemoveChild(s.Get(0))
		}
	})
}
