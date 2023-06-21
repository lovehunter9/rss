from datetime import datetime, timedelta
import numpy as np
import random
import os
from handler.data import *
from recommend_model_sdk.tools.model_tool import ModelTool
from recommend_model_sdk.rank.rank_tool import RankTool
from recommend_model_sdk.tools.common_tool import CommonTool

from db.recommend_pg_db_tool import *


class RankHandler:
    def __init__(self) -> None:
        self.current_logger = CommonTool().get_logger()
        self.commont_tool = CommonTool()

    def rank(self):
        tool = RecommendPGDBTool()
        start_time = datetime.now()
        user = tool.select_users_model()
        self.current_logger.debug(f'select_users_model time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        
        DataHandler.down_valid_model_and_version()
        
        start_time = datetime.now()
        DataHandler.init_model(user)
        self.current_logger.debug(f'init_model time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        
        baseModel = tool.select_recommend_model()
        if len(baseModel) == 0:
            batch = 1
        else:
            batch = baseModel[0].batch + 1
        tool.insert_recommend_model(batch)
        
        start_time = datetime.now()
        DataHandler.download_feed()
        self.current_logger.debug(f'download_feed time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        
        start_time = datetime.now()
        DataHandler.down_latest_article_embedding_package(user)
        self.current_logger.debug(f'down_latest_article_embedding_package time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        
        start_time = datetime.now()
        query_url_to_embedding_dict = DataHandler.get_readed_entries(user)
        self.current_logger.debug(f'down_latest_article_embedding_package time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        
        start_time = datetime.now()
        base_url_to_embedding_dict = DataHandler.get_tobe_recommended_entries(user)
        self.current_logger.debug(f'get_tobe_recommended_entries time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        
        rank_tool = RankTool(base_url_to_embedding_dict)
        start_time = datetime.now()
        result = rank_tool.rank(query_url_to_embedding_dict, 100)
        self.current_logger.debug(f'rank time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        saveResultList = []
        rank = 1
        for detail in result:
            result = {'batch': batch, 'url': detail[0], 'score': detail[1], 'rank': rank}
            saveResultList.append(result)
            rank = rank + 1

        tool.batch_insert_recommend_result(saveResultList)