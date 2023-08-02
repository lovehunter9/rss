import unittest

from common_util.common_tool import CommonTool
from datetime import datetime
from db.recommend_pg_db_tool import RecommendPGDBTool
from handler.data import *


class RecommendPGDBToolUnitTest(unittest.TestCase):

    def test_create_entries_embedding_table(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_create_entries_embedding_table
        tool = RecommendPGDBTool()
        tool.insert_recommend_model(1, 1)

    def test_select_tobe_recommended_entries(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_select_tobe_recommended_entries
        tool = RecommendPGDBTool()
        entries = tool.select_tobe_recommended_entries("bert", "v2", 3, 'en')

    def test_get_tobe_recommended_entries(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_get_tobe_recommended_entries
        data_handler = DataHandler()
        tool = RecommendPGDBTool()
        user = tool.select_users_model()
        user.model_name = os.environ.get('model_name', 'bert')
        user.model_version = os.environ.get('model_version', 'v2')
        list = data_handler.get_tobe_recommended_entries(user, 'en')
        print(list.keys())
