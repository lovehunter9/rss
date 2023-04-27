from peewee import *
from playhouse.shortcuts import model_to_dict
from datetime import datetime

from common_util.common_tool import CommonTool
from db.recommend_pg_db import RECOMMEND_PG_DB, EntryEmbeddingModel,EntryModel
from embedding.embedding_enum import EmbeddingEnum,EmbeddingStatus
from embedding.embedding_enum_dict import EMBEDDING_ENUM_TO_ENTRY_EMBEDDING_MODEL_DICT, EMBEDDING_ENUM_TO_PG_FIELD_DICT


class RecommendPGDBTool:
    def __init__(self) -> None:
        self.__common_tool = CommonTool()
        self.__logger = CommonTool().get_logger()
    
    def create_entries_embedding_table(self):
        RECOMMEND_PG_DB.connect()
        RECOMMEND_PG_DB.create_tables([EntryEmbeddingModel])
    
    def drop_entries_embedding_table(self):
        RECOMMEND_PG_DB.connect()
        RECOMMEND_PG_DB.drop_tables([EntryEmbeddingModel])

    def select_entry_without_embedding(self,limit_number,embedding_enum):
        if isinstance(embedding_enum,EmbeddingEnum) is False:
            raise ValueError('embedding_enum is not enum')
        if isinstance(limit_number,int) is False:
            raise ValueError("limit number is not int")
        if limit_number < 1:
            raise ValueError("limit number is small than 1")
        """
        if embedding_enum == EmbeddingEnum.WORD2VEC_GOOGLE:
            '''
            query_sql = EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.word2vec_google_embedding.is_null(True) | (EntryEmbeddingModel.word2vec_google_embedding == int(EmbeddingStatus.UNPROCESSED)) ) &  EntryModel.full_content.is_null(False)).limit(limit_number)
            raw_sql,params = self.__common_tool.get_model_select_raw_sql(query_sql)
            self.__logger.debug(f"raw_sql: {raw_sql}  parmas: {params}")
            '''
            result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.word2vec_google_embedding.is_null(True) | (EntryEmbeddingModel.word2vec_google_embedding == int(EmbeddingStatus.UNPROCESSED)) ) &  EntryModel.full_content.is_null(False)).limit(limit_number).execute())
        elif embedding_enum == EmbeddingEnum.BERT:
            result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.bert_embedding.is_null(True) | (EntryEmbeddingModel.bert_embedding == int(EmbeddingStatus.UNPROCESSED))) & EntryModel.full_content.is_null(False)).limit(limit_number).execute())
        elif embedding_enum == EmbeddingEnum.DOC2VEC:
            result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.doc2vec_embedding.is_null(True) | (EntryEmbeddingModel.doc2vec_embedding == int(EmbeddingStatus.UNPROCESSED))) & EntryModel.full_content.is_null(False)).limit(limit_number).execute())
        else:
            raise ValueError("not support embedding")
        """
        CURRENT_MDEOL_FIELD = EMBEDDING_ENUM_TO_ENTRY_EMBEDDING_MODEL_DICT.get_pg_field_according_embedding_enum(embedding_enum)
        self.__logger.debug(f'embedding_enum {embedding_enum} {EMBEDDING_ENUM_TO_PG_FIELD_DICT.get_name_according_enum(embedding_enum)}')
        result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((CURRENT_MDEOL_FIELD.is_null(True) | (CURRENT_MDEOL_FIELD == int(EmbeddingStatus.UNPROCESSED)) ) &  EntryModel.full_content.is_null(False)).limit(limit_number).execute())

        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list
        
    def select_entry_without_embedding_with_created_time(self,limit_number,embedding_enum,start_time,end_time):
        if isinstance(start_time,datetime) is False:
            raise ValueError("start_time is not datetime")
        
        if isinstance(end_time, datetime)  is False:
            raise ValueError("end_time is not datetime")   
        
        if start_time > end_time:
            raise ValueError("start_time bigger than end time")  
        
        if isinstance(embedding_enum,EmbeddingEnum) is False:
            raise ValueError('embedding_enum is not enum')
        if isinstance(limit_number,int) is False:
            raise ValueError("limit number is not int")
        if limit_number < 1:
            raise ValueError("limit number is small than 1")
        
        """
        if embedding_enum == EmbeddingEnum.WORD2VEC_GOOGLE:
            '''
            query_sql = EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.word2vec_google_embedding.is_null(True) | (EntryEmbeddingModel.word2vec_google_embedding == int(EmbeddingStatus.UNPROCESSED)) ) &  EntryModel.full_content.is_null(False)).limit(limit_number)
            raw_sql,params = self.__common_tool.get_model_select_raw_sql(query_sql)
            self.__logger.debug(f"raw_sql: {raw_sql}  parmas: {params}")
            '''
            result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.word2vec_google_embedding.is_null(True) | (EntryEmbeddingModel.word2vec_google_embedding == int(EmbeddingStatus.UNPROCESSED)) ) &  EntryModel.full_content.is_null(False) & EntryModel.created_at.between(start_time,end_time)).limit(limit_number).execute())
        elif embedding_enum == EmbeddingEnum.BERT:
            result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.bert_embedding.is_null(True) | (EntryEmbeddingModel.bert_embedding == int(EmbeddingStatus.UNPROCESSED))) & EntryModel.full_content.is_null(False) & EntryModel.created_at.between(start_time,end_time)).limit(limit_number).execute())
        elif embedding_enum == EmbeddingEnum.DOC2VEC:
            result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.doc2vec_embedding.is_null(True) | (EntryEmbeddingModel.doc2vec_embedding == int(EmbeddingStatus.UNPROCESSED))) & EntryModel.full_content.is_null(False) & EntryModel.created_at.between(start_time,end_time)).limit(limit_number).execute())
        else:
            raise ValueError("not support embedding")
        """
        CURRENT_MDEOL_FIELD = EMBEDDING_ENUM_TO_ENTRY_EMBEDDING_MODEL_DICT.get_pg_field_according_embedding_enum(embedding_enum)
        self.__logger.debug(f'embedding_enum {embedding_enum} {EMBEDDING_ENUM_TO_PG_FIELD_DICT.get_name_according_enum(embedding_enum)}')
        result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((CURRENT_MDEOL_FIELD.is_null(True) | (CURRENT_MDEOL_FIELD == int(EmbeddingStatus.UNPROCESSED))) & EntryModel.full_content.is_null(False) & EntryModel.created_at.between(start_time,end_time)).limit(limit_number).execute())

        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list
    
    def select_entry_according_embedding_exist_latest(self,embedding_enum,limit_number):
        if isinstance(embedding_enum,EmbeddingEnum) is False:
            raise ValueError('embedding_enum is not enum')
        if isinstance(limit_number,int) is False:
            raise ValueError("limit number is not int")
        if limit_number < 1:
            raise ValueError("limit number is small than 1")
        """
        if embedding_enum == EmbeddingEnum.WORD2VEC_GOOGLE:
            '''
            query_sql = EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.word2vec_google_embedding.is_null(True) | (EntryEmbeddingModel.word2vec_google_embedding == int(EmbeddingStatus.UNPROCESSED)) ) &  EntryModel.full_content.is_null(False)).limit(limit_number)
            raw_sql,params = self.__common_tool.get_model_select_raw_sql(query_sql)
            self.__logger.debug(f"raw_sql: {raw_sql}  parmas: {params}")
            '''
            result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean,EntryModel.created_at).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.word2vec_google_embedding.is_null(False) & (EntryEmbeddingModel.word2vec_google_embedding == int(EmbeddingStatus.PROCESSED)) ) &  EntryModel.full_content.is_null(False) ).order_by(EntryModel.created_at.desc()).limit(limit_number).execute())
        elif embedding_enum == EmbeddingEnum.BERT:
            result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean,EntryModel.created_at).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.bert_embedding.is_null(False) & (EntryEmbeddingModel.bert_embedding == int(EmbeddingStatus.PROCESSED))) & EntryModel.full_content.is_null(False) ).order_by(EntryModel.created_at.desc()).limit(limit_number).execute())
        elif embedding_enum == EmbeddingEnum.DOC2VEC:
            result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean,EntryModel.created_at).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((EntryEmbeddingModel.doc2vec_embedding.is_null(False) & (EntryEmbeddingModel.doc2vec_embedding == int(EmbeddingStatus.PROCESSED))) & EntryModel.full_content.is_null(False) ).order_by(EntryModel.created_at.desc()).limit(limit_number).execute())
        else:
            raise ValueError("not support embedding")
        """
        CURRENT_MDEOL_FIELD = EMBEDDING_ENUM_TO_ENTRY_EMBEDDING_MODEL_DICT.get_pg_field_according_embedding_enum(embedding_enum)
        self.__logger.debug(f'embedding_enum {embedding_enum} {EMBEDDING_ENUM_TO_PG_FIELD_DICT.get_name_according_enum(embedding_enum)}')
        result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean,EntryModel.created_at).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((CURRENT_MDEOL_FIELD.is_null(False) & (CURRENT_MDEOL_FIELD == int(EmbeddingStatus.PROCESSED)) ) &  EntryModel.full_content.is_null(False) ).order_by(EntryModel.created_at.desc()).limit(limit_number).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list
        
    
    def select_entry_according_time_range(self,start_time,end_time):
        if isinstance(start_time,datetime) is False:
            raise ValueError("start_time is not datetime")
        
        if isinstance(end_time, datetime)  is False:
            raise ValueError("end_time is not datetime")   
        
        if start_time > end_time:
            raise ValueError("start_time bigger than end time")  
        RECOMMEND_PG_DB.close_stale()
        result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url).where(EntryModel.created_at.between(start_time,end_time)).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list   
    
    def select_entry_embedding_according_entry_id(self,entry_id):
        if isinstance(entry_id,int) is False:
            raise ValueError('entry_id is not str')
        RECOMMEND_PG_DB.close_stale()
        result_list = list(EntryEmbeddingModel.select(EntryEmbeddingModel.entry_id).where(EntryEmbeddingModel.entry_id == entry_id).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list
    
    def select_entry_according_id(self,id):
        if isinstance(id,int) is False:
            raise ValueError('entry_id is not str')
        RECOMMEND_PG_DB.close_stale()
        result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url).where(EntryModel.id == id).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list       
        
    
    def update_entry_embedding_common(self,entry_id, status, embedding_enum):
        if isinstance(embedding_enum,EmbeddingEnum) is False:
            raise ValueError('embedding_enum is not enum')
            
        if isinstance(status,EmbeddingStatus) is False:
            raise ValueError("status is not EmbeddingStatus")
        if isinstance(entry_id,int) is False:
            raise ValueError("entry_id is not int")
        
        current_entry_list = self.select_entry_embedding_according_entry_id(entry_id)
        if embedding_enum == EmbeddingEnum.ARTICLE_CLEAN:
            if len(current_entry_list) > 0:
                EntryEmbeddingModel.update(article_clean=int(status)).where(EntryEmbeddingModel.entry_id==entry_id).execute()
            else:
                EntryEmbeddingModel.insert(entry_id=entry_id, article_clean=int(status)).execute()
        elif embedding_enum == EmbeddingEnum.WORD2VEC_GOOGLE:
            if len(current_entry_list) > 0:
                EntryEmbeddingModel.update(word2vec_google_embedding=int(status)).where(EntryEmbeddingModel.entry_id==entry_id).execute()
            else:
                EntryEmbeddingModel.insert(entry_id=entry_id, word2vec_google_embedding=int(status)).execute()
        elif embedding_enum == EmbeddingEnum.BERT:
            if len(current_entry_list) > 0:
                EntryEmbeddingModel.update(bert_embedding=int(status)).where(EntryEmbeddingModel.entry_id==entry_id).execute()
            else:
                EntryEmbeddingModel.insert(entry_id=entry_id, bert_embedding=int(status)).execute()
        elif embedding_enum == EmbeddingEnum.DOC2VEC:
            if len(current_entry_list) > 0:
                EntryEmbeddingModel.update(doc2vec_embedding=int(status)).where(EntryEmbeddingModel.entry_id==entry_id).execute()
            else:
                EntryEmbeddingModel.insert(entry_id=entry_id, doc2vec_embedding=int(status)).execute()
        else:
            raise ValueError("not support embedding enum")
    
    def update_entry_embedding_article_clean(self,entry_id,status):
        if isinstance(status,EmbeddingStatus) is False:
            raise ValueError("status is not EmbeddingStatus")
        if isinstance(entry_id,int) is False:
            raise ValueError("entry_id is not int")
        current_entry_list = self.select_entry_embedding_according_entry_id(entry_id)
        if len(current_entry_list) > 0:
            EntryEmbeddingModel.update(article_clean=int(status)).where(EntryEmbeddingModel.entry_id==entry_id).execute()
        else:
            EntryEmbeddingModel.insert(entry_id=entry_id, article_clean=int(status)).execute()
    
    def update_entry_embedding_word2vec_google_embedding(self,entry_id,status):
        if isinstance(status,EmbeddingStatus) is False:
            raise ValueError("status is not EmbeddingStatus")
        if isinstance(entry_id,int) is False:
            raise ValueError("entry_id is not int")
        current_entry_list = self.select_entry_embedding_according_entry_id(entry_id)
        if len(current_entry_list) > 0:
            EntryEmbeddingModel.update(word2vec_google_embedding=int(status)).where(EntryEmbeddingModel.entry_id==entry_id).execute()
        else:
            EntryEmbeddingModel.insert(entry_id=entry_id, word2vec_google_embedding=int(status)).execute()
    
        