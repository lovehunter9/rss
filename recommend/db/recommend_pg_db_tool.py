from peewee import *
from playhouse.shortcuts import model_to_dict
from datetime import datetime

from common_util.common_tool import CommonTool
from db.recommend_pg_db import *


class RecommendPGDBTool:

    def __init__(self) -> None:
        self.__common_tool = CommonTool()
        self.__logger = CommonTool().get_logger()

    def select_users_model(self):
        return UsersModel.get(UsersModel.id == 1)

    def select_entries_embedding_model(self, entry_id, model_name, model_version):
        return EntriesEmbedingModel.select().where((EntriesEmbedingModel.entry_id == entry_id)
                                                   & (EntriesEmbedingModel.model_name == model_name)
                                                   & (EntriesEmbedingModel.model_version == model_version)).get()

    def batch_insert_entries_embedding_model(self, model_list):
        q = EntriesEmbedingModel.insert_many(model_list)
        q.execute()

    def select_recommend_entries_embedding_model(self, entry_id, model_name, model_version):
        return RecommendEntriesEmbedingModel.select().where((RecommendEntriesEmbedingModel.entry_id == entry_id)
                                                            & (RecommendEntriesEmbedingModel.model_name == model_name)
                                                            & (RecommendEntriesEmbedingModel.model_version == model_version)).get()

    def select_recommend_model(self):
        return RecommendModel.select().order_by(RecommendModel.id.desc()).limit(1).execute()

    def insert_recommend_model(self, batch, num):
        RecommendModel.insert(batch=batch, num=num).execute()

    def empty_recommend_feed_model(self):
        RecommendFeedModel.delete().execute()

    def batch_insert_recommend_feed_model(self, model_list):
        q = RecommendFeedModel.insert_many(model_list)
        q.execute()

    def batch_insert_recommend_result(self, model_list):
        q = RecommendResultModel.insert_many(model_list)
        q.execute()

    def batch_insert_recommend_entries(self, model_list):
        q = RecommendEntriesModel.insert_many(model_list)
        q.execute()

    def batch_insert_recommend_entries_embedding(self, model_list):
        q = RecommendEntriesEmbedingModel.insert_many(model_list)
        q.execute()

    def select_read_entries(self, resultLimit):
        result_list = list(
            EntriesModel.select(EntriesModel.id, EntriesModel.published_at, EntriesModel.url,
                                EntriesModel.full_content).where(EntriesModel.status == 'read').order_by(EntriesModel.published_at.desc()).limit(resultLimit).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list

    def check_model_and_version(self, model, version):
        result_list = list(RecommendModelAndVersion.select().where((RecommendModelAndVersion.model_name == model) & (RecommendModelAndVersion.model_version == version)).execute())

        if len(result_list) == 0:
            RecommendModelAndVersion.insert(model_name=model, model_version=version).execute()
