import unittest

from article_process.article_classification.article_classification_tool import ArticleClassificationTool

class ArticleClassificationToolUnitTest(unittest.TestCase):
    def test_process_article_whether_bert_base_cased_tokenize(self):
        # python  -m unittest article_classification_tool_unit_test.ArticleClassificationToolUnitTest.test_process_article_whether_bert_base_cased_tokenize
        article_tool = ArticleClassificationTool()
        article_tool.process_article_whether_bert_base_cased_tokenize()
    
    def test_prepare_dataset(self):
        # python  -m unittest article_classification_tool_unit_test.ArticleClassificationToolUnitTest.test_prepare_dataset
        article_tool = ArticleClassificationTool()
        
    
    def test_prepare_url_to_clean_text(self):
        # python  -m unittest article_classification_tool_unit_test.ArticleClassificationToolUnitTest.test_prepare_url_to_clean_text
        article_tool = ArticleClassificationTool()
        article_tool.prepare_url_to_clean_text()      
        