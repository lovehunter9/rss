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
        RECOMMEND_PG_DB.connect(reuse_if_open=True)
        return UsersModel.get(UsersModel.id == 1)

    def select_entries_embedding_model(self, entry_id, model_name, model_version):
        return EntriesEmbedingModel.select().where((EntriesEmbedingModel.entry_id == entry_id)
                                                   & (EntriesEmbedingModel.model_name == model_name)
                                                   & (EntriesEmbedingModel.model_version == model_version)).execute()

    def batch_insert_entries_embedding_model(self, model_list):
        q = EntriesEmbedingModel.insert_many(model_list)
        q.execute()

    def select_recommend_model(self):
        return RecommendModel.select().order_by(RecommendModel.id.desc()).limit(1).execute()

    def insert_recommend_model(self, batch, language, model_name, model_version):
        RecommendModel.insert(batch=batch, language=language, model_name=model_name, model_version=model_version).execute()

    def empty_recommend_feed_model(self):
        RecommendFeedModel.delete().execute()

    def batch_insert_recommend_feed_model(self, model_list):
        q = RecommendFeedModel.insert_many(model_list)
        q.execute()

    def batch_insert_recommend_result(self, model_list):
        q = RecommendResultModel.insert_many(model_list)
        q.execute()

    def select_exist_recommend_entries(self, url_list):
        result_list = list(RecommendEntriesModel.select(RecommendEntriesModel.url).where(RecommendEntriesModel.url << url_list))
        result_dict_list = dict()
        for current in result_list:
            result_dict_list[current.url] = current.url
        return result_dict_list

    def batch_insert_recommend_entries(self, model_list):
        q = RecommendEntriesModel.insert_many(model_list)
        q.execute()

    def select_recommend_entries(self):
        result_list = list(RecommendEntriesModel.select().limit(1000).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list

    def select_exist_recommend_entries_embedding(self, url_list, model, version):
        result_list = list(
            RecommendEntriesEmbedingModel.select(RecommendEntriesEmbedingModel.url).where((RecommendEntriesEmbedingModel.url << url_list)
                                                                                          & (RecommendEntriesEmbedingModel.model_name == model)
                                                                                          & (RecommendEntriesEmbedingModel.model_version == version)))
        result_dict_list = dict()
        for current in result_list:
            result_dict_list[current.url] = current.url
        return result_dict_list

    def batch_insert_recommend_entries_embedding(self, model_list):
        q = RecommendEntriesEmbedingModel.insert_many(model_list)
        q.execute()

    def select_read_entries(self, resultLimit, language):
        result_list = list(
            EntriesModel.select(EntriesModel.id, EntriesModel.published_at, EntriesModel.url,
                                EntriesModel.full_content).where((~EntriesModel.last_read_at.is_null()) & (EntriesModel.language == language)).order_by(
                                    EntriesModel.last_read_at.desc()).limit(resultLimit).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list

    def select_read_entries_check_language(self, resultLimit):
        result_list = list(
            EntriesModel.select(EntriesModel.id, EntriesModel.language,
                                EntriesModel.full_content).where(~EntriesModel.last_read_at.is_null()).order_by(EntriesModel.last_read_at.desc()).limit(resultLimit).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list

    def update_read_entries_language(self, language, entry_id):
        EntriesModel.update(language=language).where(id == entry_id).execute()

    def select_tobe_recommended_entries(self, model, version, resultLimit, language):
        result_list = list(
            RecommendEntriesModel.select(RecommendEntriesModel.url, RecommendEntriesModel.published_at, RecommendEntriesEmbedingModel.embedding,
                                         RecommendEntriesModel.feed_id).join(RecommendEntriesEmbedingModel,
                                                                             on=(RecommendEntriesModel.url == RecommendEntriesEmbedingModel.url),
                                                                             attr='relation').where((RecommendEntriesEmbedingModel.model_name == model)
                                                                                                    & (RecommendEntriesEmbedingModel.model_version == version)
                                                                                                    & (RecommendEntriesModel.language == language)).order_by(
                                                                                                        RecommendEntriesModel.id.desc()).limit(resultLimit).execute())

        result_dict_list = list()
        for current_model in result_list:
            entries = {
                'url': current_model.url,
                'published_at': current_model.published_at,
                'embedding': current_model.relation.embedding,
                'feed_id': current_model.feed_id,
            }
            result_dict_list.append(entries)
        return result_dict_list

    def check_model_and_version(self, model, version):
        result_list = list(RecommendModelAndVersion.select().where((RecommendModelAndVersion.model_name == model) & (RecommendModelAndVersion.model_version == version)).execute())

        if len(result_list) == 0:
            RecommendModelAndVersion.insert(model_name=model, model_version=version).execute()

    def select_recommend_blacklist(self):
        result_list = list(RecommendBlacklist.select(RecommendBlacklist.feed_id, RecommendBlacklist.feed_url).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list

    def batch_insert_keyword_list(self, model_list):
        q = RecommendKeywordlist.insert_many(model_list)
        q.execute()

    def clear_recommend_result(self, batch):
        RecommendResultModel.delete().where(RecommendResultModel.batch == batch).execute()

    def clear_recommend_entries(self, clearTime):
        #sql = "delete from  recommend_entries_embedding where url in (select url from recommend_entries where published_at<?)"
        #params = (clearTime)
        #RecommendEntriesEmbedingModel.execute_sql(sql, params)

        RecommendEntriesModel.delete().where(RecommendEntriesModel.published_at < clearTime).execute()

    def recommend_read_stat_list(self, batch):
        result_list = RecommendReadStatModel.select(RecommendReadStatModel.entry_id, RecommendEntriesModel.cloud_id,
                                                    RecommendEntriesModel.language).join(RecommendEntriesModel,
                                                                                         on=(RecommendEntriesModel.id == RecommendReadStatModel.entry_id),
                                                                                         attr='relation').where((RecommendReadStatModel.batch == batch)
                                                                                                                & (RecommendReadStatModel.vector_data_check == 1)).execute()
        result_dict_list = list()
        for current_model in result_list:
            stat = {
                'cloud_id': current_model.relation.cloud_id,
                'language': current_model.relation.language,
            }
            result_dict_list.append(stat)
        return result_dict_list

    def update_read_stat(self):
        RecommendReadStatModel.update(vector_data_check=2).where(RecommendReadStatModel.vector_data_check == 1).execute()

    def insert_package_info_single(self, package_id, published_at_earliest, published_at_latest, generate_package_at, entry_number, model_name, model_version, main_language):

        RecommendPackageInfoModel.insert(package_id=package_id,
                                         model_name=model_name,
                                         model_version=model_version,
                                         published_at_earliest=published_at_earliest,
                                         published_at_latest=published_at_latest,
                                         generate_package_at=generate_package_at,
                                         entry_number=entry_number,
                                         main_language=main_language).execute()

    def select_package_info_last(self, model_name, model_version, language):
        return RecommendPackageInfoModel.select().where((RecommendPackageInfoModel.model_name == model_name)
                                                        & (RecommendPackageInfoModel.model_version == model_version)
                                                        & (RecommendPackageInfoModel.main_language == language)).order_by(
                                                            RecommendPackageInfoModel.generate_package_at.desc()).limit(1).execute()

    def select_package_info(self, model_name, model_version, language):
        result_list = list(RecommendPackageInfoModel.select().where((RecommendPackageInfoModel.main_language == language) & (RecommendPackageInfoModel.model_name == model_name)
                                                                    & (RecommendPackageInfoModel.model_version == model_version)).order_by(
                                                                        RecommendPackageInfoModel.generate_package_at.desc()).limit(100).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list
