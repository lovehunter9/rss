from embedding.embedding_tool import EmbeddingTool

import unittest

class EmbeddingToolUnitTest(unittest.TestCase):
    def test_read_tfidf_model(self):
        # python  -m unittest embedding_tool_unit_test.EmbeddingToolUnitTest.test_read_tfidf_model
        current_embedding_tool = EmbeddingTool()
        current_model = current_embedding_tool.read_tfidf_model('/home/ubuntu/shootout/tfidf.model')
        print(type(current_model))
        # gensim.models.tfidfmodel.TfidfModel
    
    def test_read_gensim_dictionary(self):
        # python  -m unittest embedding_tool_unit_test.EmbeddingToolUnitTest.test_read_gensim_dictionary
        current_embedding_tool = EmbeddingTool()
        current_dic = current_embedding_tool.read_gensim_dictionary('/home/ubuntu/shootout/dictionary')
        print(type(current_dic))
        # gensim.corpora.dictionary.Dictionary
        
    def test_read_gensim_word2vec_embedding(self):
        # python  -m unittest embedding_tool_unit_test.EmbeddingToolUnitTest.test_read_gensim_word2vec_embedding
        current_embedding_tool = EmbeddingTool()
        word2vec_embedding_model = current_embedding_tool.read_gensim_word2vec_embedding('/home/ubuntu/GoogleNews-vectors-negative300.bin')
        print(type(word2vec_embedding_model.key_to_index))
        print(len(word2vec_embedding_model.key_to_index))
        print(type(word2vec_embedding_model))
        # gensim.models.keyedvectors.KeyedVectors
    