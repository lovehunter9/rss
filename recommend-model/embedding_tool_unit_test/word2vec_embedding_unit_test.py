import unittest
from embedding.word2vec_embedding import Word2VecEmbedding
from nltk.corpus import stopwords
import nltk
from rake_nltk import Rake
from stop_words import get_stop_words,safe_get_stop_words



class Word2VecEmbeddingUnitTest(unittest.TestCase):
    def test_calculate_embedding(self):
        # python  -m unittest word2vec_embedding_unit_test.Word2VecEmbeddingUnitTest.test_calculate_embedding
        tfidf_path = "/home/ubuntu/shootout/tfidf.model"
        tfidf_dictionary_path = "/home/ubuntu/shootout/dictionary"
        word2vec_embedding_path = "/home/ubuntu/GoogleNews-vectors-negative300.bin"
        word2vec_tool = Word2VecEmbedding(tfidf_path,tfidf_dictionary_path,word2vec_embedding_path)
        current_embedding_result = word2vec_tool.calculate_embedding("what a beautiful book apple meantime")
        print(current_embedding_result['vec'])
    
    def test_stop_words(self):
        # python  -m unittest word2vec_embedding_unit_test.Word2VecEmbeddingUnitTest.test_stop_words
        nltk.download('stopwords')
        stops = set(stopwords.words('english'))
        print(stops)
        print(len(stops))
        
        stop_words = get_stop_words('english',cache=False)
        print(stop_words)
    
    def test_rake(self):
        # python  -m unittest word2vec_embedding_unit_test.Word2VecEmbeddingUnitTest.test_rake
        text = """spaCy is an open-source software library for advanced natural language processing,
        written in the programming languages Python and Cython. The library is published under the MIT license
        and its main developers are Matthew Honnibal and Ines Montani, the founders of the software company Explosion."""
        rake_tool = Rake()
        rake_tool.extract_keywords_from_text(text)
        list_phrases = rake_tool.get_ranked_phrases_with_scores()
        print(list_phrases)
        tfidf_path = "/home/ubuntu/shootout/tfidf.model"
        tfidf_dictionary_path = "/home/ubuntu/shootout/dictionary"
        word2vec_embedding_path = "/home/ubuntu/GoogleNews-vectors-negative300.bin"
        word2vec_tool = Word2VecEmbedding(tfidf_path,tfidf_dictionary_path,word2vec_embedding_path)
        word2vec_tool.calculate_embedding(text)
    
    def test_calculate_embedding_rake_nltk_keyword(self):
        # python  -m unittest word2vec_embedding_unit_test.Word2VecEmbeddingUnitTest.test_calculate_embedding_rake_nltk_keyword
        text = """spaCy is an open-source software library for advanced natural language processing,
        written in the programming languages Python and Cython. The library is published under the MIT license
        and its main developers are Matthew Honnibal and Ines Montani, the founders of the software company Explosion."""
        tfidf_path = "/home/ubuntu/shootout/tfidf.model"
        tfidf_dictionary_path = "/home/ubuntu/shootout/dictionary"
        word2vec_embedding_path = "/home/ubuntu/GoogleNews-vectors-negative300.bin"
        word2vec_tool = Word2VecEmbedding(tfidf_path,tfidf_dictionary_path,word2vec_embedding_path)
        word2vec_tool.calculate_embedding_rake_nltk_keyword(text)
    

        
