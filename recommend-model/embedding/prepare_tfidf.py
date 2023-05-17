import argparse
import logging
import os
import sys
import multiprocessing
import bz2

import gensim
from gensim.scripts import make_wiki
from six import string_types

from common_util.common_tool import CommonTool

logger = CommonTool().get_logger()

PROCESSES = max(1, multiprocessing.cpu_count() - 1)  # parallelize parsing using this many processes

MIN_WORDS = 50  # ignore articles with fewer tokens (redirects, stubs etc)

NUM_TOPICS = 500  # number of latent factors for LSA

# python prepare_tfidf.py --infile ~/enwiki-latest-pages-articles.xml.bz2 --outdir ~/shootout
# 5376169 document wiki dataset
# stop word https://pythonspot.com/nltk-stop-words/
def process_article(text_tuple):
    if isinstance(text_tuple,tuple) is False:
        raise ValueError("text_tuple is not tuple")
    if len(text_tuple) != 3:
        raise ValueError('tuple length is not equal 3')
    text = text_tuple[1]
    title = text_tuple[0]
    page_id = text_tuple[2]
    """Parse a wikipedia article, returning its content as `(title, list of tokens)`, all unicode."""
    text = gensim.corpora.wikicorpus.filter_wiki(text)  # remove markup, get plain text
    return gensim.utils.to_unicode(title).replace('\t', ' '), gensim.utils.simple_preprocess(text)


def convert_wiki(infile, processes=multiprocessing.cpu_count()):
    """
    Yield articles from a bz2 Wikipedia dump `infile` as (title, tokens) 2-tuples.
    Only articles of sufficient length are returned (short articles & redirects
    etc are ignored).
    Uses multiple processes to speed up the parsing in parallel.
    """
    logger.info("extracting articles from %s using %i processes" % (infile, processes))
    articles, articles_all = 0, 0
    positions, positions_all = 0, 0

    pool = multiprocessing.Pool(processes)
    # process the corpus in smaller chunks of docs, because multiprocessing.Pool
    # is dumb and would try to load the entire dump into RAM...
    texts = gensim.corpora.wikicorpus._extract_pages(bz2.BZ2File(infile))  # generator
    ignore_namespaces = 'Wikipedia Category File Portal Template MediaWiki User Help Book Draft'.split()
    for group in gensim.utils.chunkize(texts, chunksize=10 * processes):

        for title, tokens in pool.imap(process_article, group):
            if articles_all % 100000 == 0:
                logger.info("PROGRESS: at article #%i: '%s'; accepted %i articles with %i total tokens" %
                    (articles_all, title, articles, positions))
            articles_all += 1
            positions_all += len(tokens)

            # article redirects and short stubs are pruned here
            if len(tokens) < MIN_WORDS or any(title.startswith(ignore + ':') for ignore in ignore_namespaces):
                continue

            # all good: use this article
            articles += 1
            positions += len(tokens)
            yield title, tokens
    pool.terminate()

    logger.info("finished iterating over Wikipedia corpus of %i documents with %i positions"
        " (total %i articles, %i positions before pruning articles shorter than %i words)" %
        (articles, positions, articles_all, positions_all, MIN_WORDS))


def getstream(input):
    """
    If input is a filename (string), return `open(input)`.
    If input is a file-like object, reset it to the beginning with `input.seek(0)`.
    """
    assert input is not None
    if isinstance(input, string_types):
        # input was a filename: open as text file
        result = open(input)
    else:
        # input was a file-like object (BZ2, Gzip etc.); reset the stream to its beginning
        result = input
        result.seek(0)
    return result


class ShootoutCorpus(gensim.corpora.TextCorpus):
    def get_texts(self):
        length = 0
        lines = getstream(self.input)  # open file/reset stream to its start
        for lineno, line in enumerate(lines):
            length += 1
            yield line.split('\t')[1].split()  # return tokens (ignore the title before the tab)
        self.length = length


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument("--infile",help=" wiki dataset path, like ~/nwiki-latest-pages-articles.xml.bz2",required=True)
    parser.add_argument("--outdir",help=" output directory", required=True)
    args = parser.parse_args()
    
    infile = args.infile
    outdir = args.outdir
    
    if os.path.exists(infile) is False:
        raise ValueError(f"infile {infile} is not exist")
    
    if os.path.exists(outdir) is False:
        raise ValueError(f'outdir {outdir} is not exist')
    
    if os.path.isdir(outdir) is False:
        raise ValueError(f'outdir {outdir} is not directory')
    
    outfile = lambda fname: os.path.join(outdir, fname)

    # extract plain text from the XML dump
    preprocessed_file = outfile('title_tokens.txt.gz')
    total_count = 0

    if not os.path.exists(preprocessed_file):
        id2title = []
        with gensim.utils.open(preprocessed_file, 'wb') as fout:
            for docno, (title, tokens) in enumerate(convert_wiki(infile, PROCESSES)):
                id2title.append(title)
                try:
                    line = "%s\t%s\n" % (title, ' '.join(tokens))
                    fout.write(gensim.utils.to_utf8(line)) # make sure we're storing proper utf8
                    total_count = total_count + 1
                    if total_count % 100 == 0:
                        logger.debug(f"process {total_count}")
                    # if total_count == 1000:
                    #    break
                except Exception as ex:
                    total_count = total_count - 1               
                    logger.info("invalid line at title %s" % title)
        gensim.utils.pickle(id2title, outfile('id2title'))
    
    logger.debug("compelete file process")
    # build/load a mapping between tokens (strings) and tokens ids (integers)
    dict_file = outfile('dictionary')
    if os.path.exists(dict_file):
        corpus = ShootoutCorpus()
        corpus.input = gensim.utils.open(preprocessed_file)
        corpus.dictionary = gensim.corpora.Dictionary.load(dict_file)
    else:
        corpus = ShootoutCorpus(gensim.utils.open(preprocessed_file))
        corpus.dictionary.filter_extremes(no_below=20, no_above=0.1, keep_n=50000)  # remove too rare/too common words
        corpus.dictionary.save(dict_file)
        corpus.dictionary.save_as_text(dict_file + '.txt')
        
    logger.debug("compelete corpus")
    # build/load TF-IDF model
    tfidf_file = outfile('tfidf.model')
    if os.path.exists(tfidf_file):
        tfidf = gensim.models.TfidfModel.load(tfidf_file)
    else:
        logger.debug("train new tfidf")
        tfidf = gensim.models.TfidfModel(corpus)
        tfidf.save(tfidf_file)
    logger.info("finished running")
    logger.info(f"total count article {total_count}")