from db.recommend_pg_db import RecommendResultModel,RecommendReadStatModel,RecommendEntriesModel,RecommendEntriesEmbedingModel
from common_util.common_tool import CommonTool
from playhouse.shortcuts import model_to_dict

class ClientCTRPrepareService:
    def __init__(self) -> None:
        self.__common_tool = CommonTool()
        self.__logger = self.__common_tool.get_logger()
    
    def select_positive_entry_id_set_and_negative_id_set(self):
        recommend_result_list = list(RecommendResultModel.select().where((RecommendResultModel.impression_at.is_null(False))).execute())
        all_cloud_id_set = set()
        for current_model in recommend_result_list:
            all_cloud_id_set.add(current_model.cloud_id)
        self.__logger.debug(f'all_cloud_is_set {len(all_cloud_id_set)}')
        recommend_entries_list = list(RecommendEntriesModel.select(RecommendEntriesModel.id,RecommendEntriesModel.cloud_id).where(RecommendEntriesModel.cloud_id << list(all_cloud_id_set)).execute())
        
        recommend_entry_id_to_cloud_id = dict()
        cloud_id_to_recommend_entry_id = dict()
        exist_cloud_id_set  = set(list(cloud_id_to_recommend_entry_id.keys()))
        exist_entry_id_set = set(list(recommend_entry_id_to_cloud_id.keys()))
        self.__logger.debug(f'exist_cloud_set {len(exist_cloud_id_set)}')
        for current_model in recommend_entries_list:
            recommend_entry_id_to_cloud_id[current_model.id] = current_model.cloud_id
            cloud_id_to_recommend_entry_id[current_model.cloud_id] = current_model.id
        
        recommend_read_stat_model_list = list(RecommendReadStatModel.select(RecommendReadStatModel.entry_id).where(RecommendReadStatModel.entry_id << list(exist_entry_id_set)).execute())
        positive_cloud_id_set = set()
        for current_recommend_read_stat in recommend_read_stat_model_list:
            positive_cloud_id_set.add(recommend_entry_id_to_cloud_id[current_recommend_read_stat.entry_id])
        negative_cloud_id_set = exist_cloud_id_set - positive_cloud_id_set
        return negative_cloud_id_set,positive_cloud_id_set
        
    def method_according_entry_id_and_label_to_get_embedding(self,cloud_id_and_label_tuple_list):
        if isinstance(cloud_id_and_label_tuple_list,list) is False:
            raise ValueError("cloud_id_and_label_tuple_list is not list")
        for current_cloud_id,current_label in cloud_id_and_label_tuple_list:
            if isinstance(current_cloud_id,int) is False:
                raise ValueError("current_cloud_id is not int")
            if isinstance(current_label,int) is False:
                raise ValueError("current_label is not int")
        RecommendEntriesEmbedingModel.select(RecommendEntriesEmbedingModel.embedding).where()