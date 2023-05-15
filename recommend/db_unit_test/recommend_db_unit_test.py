import unittest
from db.recommend_pg_db import RECOMMEND_PG_DB, EntriesModel,RecommendEntriesModel


class RecommendDBUnitTest(unittest.TestCase):

    def test_connect(self):
        # python  -m unittest recommend_db_unit_test.RecommendDBUnitTest.test_connect
        print(type(RecommendEntriesModel.embedding))
