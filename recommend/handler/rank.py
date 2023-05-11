from datetime import datetime, timedelta
import numpy as np
import random
import os
from handler.data import *
from recommend_model_sdk.tools.model_tool import ModelTool
from recommend_model_sdk.rank.rank_tool import RankTool
from db.recommend_pg_db_tool import *

path = os.environ.get('model_path', "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")
#path = os.environ.get(model_path, "/model")


class RankHandler:

    def rank():
        tool = RecommendPGDBTool()
        baseModel = tool.select_recommend_model()
        if len(baseModel) == 0:
            batch = 1
        else:
            batch = baseModel[0].batch + 1
        tool.insert_recommend_model(batch)

        DataHandler.download_feed()
        DataHandler.down_latest_article_embedding_package()

        query_url_to_embedding_dict = DataHandler.get_readed_entries()

        base_url_to_embedding_dict = DataHandler.get_tobe_recommended_entries()

        rank_tool = RankTool(base_url_to_embedding_dict)
        result = rank_tool.rank(query_url_to_embedding_dict, 100)
        saveResultList = []
        rank = 1
        for detail in result:
            result = {'batch': batch, 'url': detail[0], 'score': detail[1], 'rank': rank}
            saveResultList.append(result)
            rank = rank + 1

        tool.batch_insert_recommend_result(saveResultList)