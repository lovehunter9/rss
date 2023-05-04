import unittest

from common_util.common_tool import CommonTool
from datetime import datetime
from db.recommend_pg_db_tool import RecommendPGDBTool


class RecommendPGDBToolUnitTest(unittest.TestCase):

    def test_create_entries_embedding_table(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_create_entries_embedding_table
        tool = RecommendPGDBTool()
        tool.insert_recommend_model(1, 1)
