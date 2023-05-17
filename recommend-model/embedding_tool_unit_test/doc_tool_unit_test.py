import unittest

from embedding.doc_tool import DocTool

class DocToolUnitTest(unittest.TestCase):
    def test_calculate_word2vec_embedding_for_all_article(self):
        # python  -m unittest doc_tool_unit_test.DocToolUnitTest.test_calculate_word2vec_embedding_for_all_article
        doc_tool = DocTool()
        tfidf_path = "/home/ubuntu/shootout/tfidf.model"
        tfidf_dictionary_path = "/home/ubuntu/shootout/dictionary"
        word2vec_embedding_path = "/home/ubuntu/GoogleNews-vectors-negative300.bin"
        doc_tool.calculate_word2vec_embedding_For_all_article(tfidf_path,tfidf_dictionary_path,word2vec_embedding_path)
    
    def test_calculate_embedding_for_all_article(self):
        # python  -m unittest doc_tool_unit_test.DocToolUnitTest.test_calculate_embedding_for_all_article
        doc_tool = DocTool()
        doc_tool.calculate_embedding_for_all_article("word2vec_google","v2","/home/ubuntu/download_s3")