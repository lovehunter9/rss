from datetime import datetime, timedelta
import numpy as np
import random
import os
from handler.data import *
from recommend_model_sdk.tools.model_tool import ModelTool
from recommend_model_sdk.tools.common_tool import CommonTool
from recommend_model_sdk.recommend.recommend_tool import RecommendTool

from db.recommend_pg_db_tool import *


class RecommendHandler:
    def __init__(self) -> None:
        self.current_logger = CommonTool().get_logger()
        self.commont_tool = CommonTool()

    def recommend(self):
        tool = RecommendPGDBTool()
        start_time = datetime.now()
        user = tool.select_users_model()
        self.current_logger.debug(f'model_name {user.model_name} model_version {user.model_version}')
        user.model_name = "bert"
        user.model_version = "v1"
        
        self.current_logger.debug(f'select_users_model time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        data_handler = DataHandler()
        data_handler.down_valid_model_and_version()
        
        
        start_time = datetime.now()
        data_handler = DataHandler()
        data_handler.init_model(user)
        self.current_logger.debug(f'init_model time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
    
        
        baseModel = tool.select_recommend_model()
        if len(baseModel) == 0:
            batch = 1
        else:
            batch = baseModel[0].batch + 1
        tool.insert_recommend_model(batch)
        
        start_time = datetime.now()
        data_handler.download_feed()
        self.current_logger.debug(f'download_feed time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        
        start_time = datetime.now()
        data_handler.down_latest_article_embedding_package(user)
        self.current_logger.debug(f'down_latest_article_embedding_package time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        
        start_time = datetime.now()
        query_url_to_embedding_dict = data_handler.get_readed_entries(user)
        self.current_logger.debug(f'down_latest_article_embedding_package time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        
        start_time = datetime.now()
        base_url_to_embedding_dict = data_handler.get_tobe_recommended_entries(user)
        self.current_logger.debug(f'get_tobe_recommended_entries time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        
        recommend_tool = RecommendTool(base_url_to_embedding_dict,user.model_name,user.model_version)
        start_time = datetime.now()
        result = recommend_tool.recommend(query_url_to_embedding_dict, 100)
        self.current_logger.debug(f'recommend time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
        saveResultList = []
        rank = 1
        for detail in result:
            result = {'batch': batch, 'url': detail[0], 'score': detail[1], 'rank': rank}
            saveResultList.append(result)
            rank = rank + 1

        tool.batch_insert_recommend_result(saveResultList)