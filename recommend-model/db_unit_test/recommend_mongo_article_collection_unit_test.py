import unittest

from db.recommend_mongo_article_collection import RecommendMongoArticleCollection
class RecommendMongoArticleCollectionUnitTest(unittest.TestCase):
    def test_select_document_according_url_with_clean_text(self):
        # python  -m unittest recommend_mongo_article_collection_unit_test.RecommendMongoArticleCollectionUnitTest.test_select_document_according_url_with_clean_text
        tool = RecommendMongoArticleCollection()
        result = tool.select_document_according_url_with_clean_text("https://xkcd.com/2753/")
        print(result)
    
    def test_create_index(self):
        # python  -m unittest recommend_mongo_article_collection_unit_test.RecommendMongoArticleCollectionUnitTest.test_create_index
        tool = RecommendMongoArticleCollection()
        tool.create_ascending_index('entry_id')
        tool.create_ascending_index('url')

        