from datetime import datetime, timedelta
import numpy as np
import random
import os
import json
import requests
import time
from handler.data import *
from recommend_model_sdk.tools.model_tool import ModelTool
from recommend_model_sdk.tools.common_tool import CommonTool
from recommend_model_sdk.recommend.recommend_tool import RecommendTool

from db.recommend_pg_db_tool import *


class RecommendHandler:

    def __init__(self) -> None:
        self.current_logger = CommonTool().get_logger()
        self.commont_tool = CommonTool()

    def downLastPackage(self, user, baseModel):
        start_time = datetime.now()
        data_handler = DataHandler()
        apiUrl = os.environ.get('package_share_api', 'http://52.22.173.234:8080/api/share/s3packages')
        apiUrl = apiUrl + '?model_name=' + user.model_name + '&model_version=' + user.model_version
        if len(baseModel) > 0:
            lasttime = int(time.mktime(baseModel[0].fetch_at.timetuple()))
            apiUrl = apiUrl + '&lasttime=' + str(lasttime)
        self.current_logger.info(f'downLastPackage url {apiUrl}')
        htmlResponse = requests.get(apiUrl)
        self.current_logger.debug(f'downLastPackage result {htmlResponse.text}')
        packageData = json.loads(htmlResponse.text)
        for data in packageData:
            data_handler.download_increment_package(data['model_name'], data['model_version'], data['package_id'])
        self.current_logger.debug(f'down_latest_article_embedding_package time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

    def recommend(self):
        tool = RecommendPGDBTool()
        start_time = datetime.now()
        user = tool.select_users_model()
        user.model_name = os.environ.get('model_name', 'bert')
        user.model_version = os.environ.get('model_version', 'v2')
        self.current_logger.debug(f'model_name {user.model_name} model_version {user.model_version}')
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
        tool.insert_recommend_model(batch, user.recommend_language)

        start_time = datetime.now()
        data_handler.download_feed()
        self.current_logger.debug(f'download_feed time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

        self.downLastPackage(user, baseModel)
        #start_time = datetime.now()
        #data_handler.down_latest_article_embedding_package(user)
        #self.current_logger.debug(f'down_latest_article_embedding_package time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

        data_handler.check_readed_entries_language()
        self.current_logger.debug('check_readed_entries_language finish ...')

        lst = user.recommend_language.split(",")
        recommend_result_number = os.environ.get('recommend_result_number', 1000)
        result_number_each = recommend_result_number // len(lst)
        resultListIndex = 0
        recommendResultList = []
        for language in lst:
            self.current_logger.debug(f'recommend language: {language},result number:{result_number_each}')

            start_time = datetime.now()
            query_url_to_embedding_dict = data_handler.get_readed_entries(user, language)
            self.current_logger.debug(f'c time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
            self.current_logger.debug(f'query_url_to_embedding_dict length {len(query_url_to_embedding_dict)}')

            start_time = datetime.now()
            base_url_to_embedding_dict = data_handler.get_tobe_recommended_entries(user, language)
            self.current_logger.debug(
                f'get_tobe_recommended_entries length: {len(base_url_to_embedding_dict)}, time: {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

            recommend_tool = RecommendTool(base_url_to_embedding_dict, user.model_name, user.model_version)
            start_time = datetime.now()
            result = recommend_tool.recommend(query_url_to_embedding_dict, result_number_each)
            self.current_logger.debug(f'recommend time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

            rank = 1
            recommendResultList.append([])
            for detail in result:
                result = {'batch': batch, 'url': detail[0], 'score': detail[1], 'rank': rank, 'language': language}
                recommendResultList[resultListIndex].append(result)
                rank = rank + 1
            self.current_logger.debug(f'saveResultList language：{language} len:{len(recommendResultList[resultListIndex])}')

            data_handler.download_keyword_sortinfo_package(batch, language)
            self.current_logger.debug(f'download_keyword_sortinfo_package finish')
            resultListIndex = resultListIndex + 1

        saveResultList = []
        if len(lst) == 1:
            saveResultList = recommendResultList[0]
        if len(lst) == 2:
            i0, i1 = 0, 0
            while i0 < len(recommendResultList[0]) and i1 < len(recommendResultList[1]):
                saveResultList.append(recommendResultList[0][i0])
                if i0 + 1 < len(recommendResultList[0]):
                    saveResultList.append(recommendResultList[0][i0 + 1])
                saveResultList.append(recommendResultList[1][i1])
                if i1 + 1 < len(recommendResultList[1]):
                    saveResultList.append(recommendResultList[1][i1 + 1])
                i0 += 2
                i1 += 2
            saveResultList += recommendResultList[0][i0:]
            saveResultList += recommendResultList[1][i1:]

        tool.batch_insert_recommend_result(saveResultList)
        self.current_logger.debug(f'saveResultList {len(saveResultList)}')
