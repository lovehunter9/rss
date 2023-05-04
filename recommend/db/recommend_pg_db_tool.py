from peewee import *
from playhouse.shortcuts import model_to_dict
from datetime import datetime

from common_util.common_tool import CommonTool
from db.recommend_pg_db import RECOMMEND_PG_DB, RecommendPGBaseModel, EntriesModel, RecommendModel, RecommendEntriesModel, RecommendFeedModel, RecommendResultModel


class RecommendPGDBTool:

    def __init__(self) -> None:
        self.__common_tool = CommonTool()
        self.__logger = CommonTool().get_logger()

    def select_recommend_model(self):
        return RecommendModel.select().order_by(id.desc()).limit(1).first()

    def insert_recommend_model(self, batch, num):
        RecommendModel.insert(batch=batch, num=num).execute()

    def empty_recommend_feed_model(self):
        RecommendFeedModel.delete().execute()

    def batch_insert_recommend_feed_model(self, model_list):
        q = RecommendFeedModel.insert_many(model_list)
        q.execute()

    def batch_insert_recommend_result(self, model_list):
        RecommendResultModel.bulk_create(model_list, batch_size=200)

    def batch_insert_recommend_entries(self, model_list):
        RecommendEntriesModel.bulk_create(model_list, batch_size=200)

    def select_entries(self):
        result_list = list(
            EntriesModel.select(EntriesModel.id,
                                EntriesModel.embedding).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list

    def update_entry_enbedding(self, entry_id, embedding):
        EntriesModel.update(embedding=embedding).where(
            EntriesModel.entry_id == entry_id).execute()
