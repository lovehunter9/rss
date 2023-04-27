import unittest
from db.recommend_pg_db import RECOMMEND_PG_DB, EntryEmbeddingModel
from db.recommend_mongo_db import RECOMMEND_MONGO_DB


class RecommendDBUnitTest(unittest.TestCase):

    def test_connect(self):
        # python  -m unittest recommend_db_unit_test.RecommendDBUnitTest.test_connect
        print(type(EntryEmbeddingModel.word2vec_google_embedding))
