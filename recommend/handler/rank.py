from datetime import datetime, timedelta
import numpy as np
import random
import os
from handler.data import *
from recommend_model_sdk.tools.model_tool import ModelTool
from recommend_model_sdk.rank.rank_tool import RankTool

path = os.environ.get('model_path', "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")
#path = os.environ.get(model_path, "/model")


class RankHandler:

    def rank():
        #DataHandler.download_feed()
        #DataHandler.down_latest_article_embedding_package()
        #base_url_to_embedding_dict = DataHandler.get_readed_entries()
        #print(base_url_to_embedding_dict.keys())

        query_url_to_embedding_dict = DataHandler.get_tobe_recommended_entries()

        #rank_tool = RankTool(base_url_to_embedding_dict)
        #result = rank_tool.rank(query_url_to_embedding_dict, 100)
        #print(result)