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
from recommend_model_sdk.tools.weaviate_tool import WeaviateTool
from recommend_model_sdk.recommend.common_enum import VectorStoreEnum, RecommendSupportLanguageEnum

from db.recommend_pg_db_tool import *

model_name = os.environ.get('model_name', 'bert')
model_version = os.environ.get('model_version', 'v2')
model_path = os.environ.get('model_path', "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")
api_url = os.environ.get('package_share_api', 'http://52.22.173.234:8080/api/share/s3packages')
weaviate_port = os.environ.get('weaviate_port', 9000)
recommend_result_number = os.environ.get('recommend_result_number', 1000)
vector_database = os.environ.get('vector_database', 'weaviate')


class RecommendHandler:

    def __init__(self) -> None:
        self.current_logger = CommonTool().get_logger()
        self.commont_tool = CommonTool()

    def get_weaviate_client(self):
        self.current_logger.info(f' get_weaviate_client')
        weaviate_tool = WeaviateTool(
            model_path,
            False,
            private_ip="127.0.0.1",
            private_port=weaviate_port,
        )
        #weaviate_tool.init_class(model_name, model_version)
        return weaviate_tool

    def downLastPackage(self, user, baseModel, weaviate_client, disabledFeedList):
        start_time = datetime.now()
        data_handler = DataHandler()
        apiUrl = api_url + '?model_name=' + user.model_name + '&model_version=' + user.model_version
        if len(baseModel) > 0:
            lasttime = int(time.mktime(baseModel[0].fetch_at.timetuple()))
            apiUrl = apiUrl + '&lasttime=' + str(lasttime)
        self.current_logger.info(f'downLastPackage url {apiUrl}')
        htmlResponse = requests.get(apiUrl)
        self.current_logger.debug(f'downLastPackage result {htmlResponse.text}')
        packageData = json.loads(htmlResponse.text)
        for data in packageData:
            data_handler.download_increment_package(data['model_name'], data['model_version'], model_path, data['package_id'])
            if vector_database == 'weaviate':
                weaviate_client.insert_package_data(data, data['model_name'], data['model_version'], black_feed_set=set(disabledFeedList))

        self.current_logger.debug(f'down_latest_article_embedding_package time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

    def getWeaviateSupportLanauage(self, language):
        supportLanauage = RecommendSupportLanguageEnum.CHINESE
        if language == 'en':
            supportLanauage = RecommendSupportLanguageEnum.ENGLISH
        return supportLanauage

    def recommend(self):
        tool = RecommendPGDBTool()

        user = tool.select_users_model()
        user.model_name = model_name
        user.model_version = model_version

        baseModel = tool.select_recommend_model()
        if vector_database == 'weaviate':
            weaviate_client = self.get_weaviate_client()
        self.current_logger.debug(f'get weaviate_client client , start recommend')
        start_time = datetime.now()
        lastRecommendLanguage = 'en'

        data_handler = DataHandler()
        data_handler.down_valid_model_and_version(model_path)
        self.current_logger.debug(f'model_name {user.model_name} model_version {user.model_version}')
        self.current_logger.debug(f'select_users_model time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

        data_handler.init_model(model_path, user)
        self.current_logger.debug(f'init_model time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

        disabledFeedList = data_handler.download_feed(model_path)
        self.current_logger.debug(f'downfeed disabled feed num:{len(disabledFeedList)}')
        self.current_logger.debug(f'download_feed time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

        if len(baseModel) == 0:
            batch = 1
        else:
            tool.clear_recommend_result(baseModel[0].batch)
            lastRecommendLanguage = baseModel[0].language
            batch = baseModel[0].batch + 1

            if vector_database == 'weaviate':
                statlist = tool.recommend_read_stat_list(baseModel[0].batch)
                for stats in statlist:
                    weaviate_client.delete_batch_data(baseModel[0].model_name, baseModel[0].model_version, stats['language'], cloud_id_list=[stats['cloud_id']])
                tool.update_read_stat()
                if baseModel[0].model_name != model_name or baseModel[0].model_version != model_version or user.recommend_language != lastRecommendLanguage:
                    self.current_logger.debug(f'weaviate delete_all_data')
                    weaviate_client.delete_all_data()
                else:
                    if len(disabledFeedList) > 0:
                        weaviate_client.delete_batch_data(model_name, model_version, RecommendSupportLanguageEnum.ENGLISH, feed_id_list=disabledFeedList)
                        weaviate_client.delete_batch_data(model_name, model_version, RecommendSupportLanguageEnum.CHINESE, feed_id_list=disabledFeedList)

        tool.insert_recommend_model(batch, user.recommend_language, model_name, model_version)
        tool.clear_recommend_entries(start_time + timedelta(days=-7))

        start_time = datetime.now()
        self.downLastPackage(user, baseModel, weaviate_client, disabledFeedList)
        #start_time = datetime.now()
        #data_handler.down_latest_article_embedding_package(user)
        self.current_logger.debug(f'down_latest_article_embedding_package time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

        data_handler.check_readed_entries_language(model_path)
        self.current_logger.debug('check_readed_entries_language finish ...')

        lst = user.recommend_language.split(",")

        result_number_each = recommend_result_number // len(lst)
        resultListIndex = 0
        recommendResultList = []
        for language in lst:
            self.current_logger.debug(f'recommend language: {language},result number:{result_number_each}')

            start_time = datetime.now()
            query_url_to_embedding_dict = data_handler.get_readed_entries(model_path, user, language)
            self.current_logger.debug(f'c time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')
            self.current_logger.debug(f'query_url_to_embedding_dict length {len(query_url_to_embedding_dict)}')

            start_time = datetime.now()
            result = []
            if vector_database == 'weaviate':
                supportLanauage = self.getWeaviateSupportLanauage(language)
                recommend_tool = RecommendTool({}, user.model_name, user.model_version, VectorStoreEnum.WEAVIATE)
                result = recommend_tool.recommend(query_url_to_embedding_dict, result_number_each, major_language=supportLanauage)
            else:
                base_url_to_embedding_dict = data_handler.get_tobe_recommended_entries(model_path, user, language)
                recommend_tool = RecommendTool(base_url_to_embedding_dict, user.model_name, user.model_version)
                result = recommend_tool.recommend(query_url_to_embedding_dict, result_number_each)

            self.current_logger.debug(f'recommend time {self.commont_tool.compute_diff_time(start_time,datetime.now())}')

            rank = 1
            recommendResultList.append([])
            for detail in result:
                result = {'batch': batch, 'cloud_id': detail[0], 'score': detail[1], 'rank': rank, 'language': language}
                recommendResultList[resultListIndex].append(result)
                rank = rank + 1
            self.current_logger.debug(f'saveResultList language：{language} len:{len(recommendResultList[resultListIndex])}')

            data_handler.download_keyword_sortinfo_package(model_path, batch, language)
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
