from peewee import *
from playhouse.shortcuts import model_to_dict
from datetime import datetime

from common_util.common_tool import CommonTool
from db.recommend_pg_db import RECOMMEND_PG_DB, EntryEmbeddingModel,EntryModel,FeedsModel,IconsModel,CategoriesModel
from embedding.embedding_enum import EmbeddingEnum,EmbeddingStatus
from embedding.embedding_enum_dict import ENTRIES_EMBEDDING_COLUMN_NAME_TO_PEEWEE_ATTRIBUTE


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

    def select_entry_without_embedding(self,limit_number,pg_column_name):

        if isinstance(limit_number,int) is False:
            raise ValueError("limit number is not int")
        if limit_number < 1:
            raise ValueError("limit number is small than 1")
        ENTRIES_EMBEDDING_COLUMN_NAME_TO_PEEWEE_ATTRIBUTE.get_peewee_attribute_to_column_name(pg_column_name)

        CURRENT_MDEOL_FIELD = ENTRIES_EMBEDDING_COLUMN_NAME_TO_PEEWEE_ATTRIBUTE.get_peewee_attribute_to_column_name(pg_column_name)
       
        result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((CURRENT_MDEOL_FIELD.is_null(True) | (CURRENT_MDEOL_FIELD == int(EmbeddingStatus.UNPROCESSED)) ) &  EntryModel.full_content.is_null(False)).limit(limit_number).execute())

        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list
        
    def select_entry_without_embedding_with_created_time(self,limit_number,pg_column_name,start_time,end_time):
        if isinstance(start_time,datetime) is False:
            raise ValueError("start_time is not datetime")
        
        if isinstance(end_time, datetime)  is False:
            raise ValueError("end_time is not datetime")   
        
        if start_time > end_time:
            raise ValueError("start_time bigger than end time")  
        
        
        if isinstance(limit_number,int) is False:
            raise ValueError("limit number is not int")
        if limit_number < 1:
            raise ValueError("limit number is small than 1")
        
        ENTRIES_EMBEDDING_COLUMN_NAME_TO_PEEWEE_ATTRIBUTE.get_peewee_attribute_to_column_name(pg_column_name)


        CURRENT_MDEOL_FIELD = ENTRIES_EMBEDDING_COLUMN_NAME_TO_PEEWEE_ATTRIBUTE.get_peewee_attribute_to_column_name(pg_column_name)

        result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,EntryEmbeddingModel.article_clean).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((CURRENT_MDEOL_FIELD.is_null(True) | (CURRENT_MDEOL_FIELD == int(EmbeddingStatus.UNPROCESSED))) & EntryModel.full_content.is_null(False) & EntryModel.created_at.between(start_time,end_time)).limit(limit_number).execute())

        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list
    
    
    def select_all_bert_tokenize_valid_entry(self,pg_column_name):
        CURRENT_MDEOL_FIELD = ENTRIES_EMBEDDING_COLUMN_NAME_TO_PEEWEE_ATTRIBUTE.get_peewee_attribute_to_column_name(pg_column_name)


        result_list = list(EntryModel.select(EntryModel.url,EntryModel.full_content).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((CURRENT_MDEOL_FIELD.is_null(False) & (CURRENT_MDEOL_FIELD == int(EmbeddingStatus.PROCESSED)) ) &  EntryModel.full_content.is_null(False) ).execute())
        result_dict_list = self.convert_peewee_model_to_dict(result_list)
        return result_dict_list
        
        
    def select_entry_according_embedding_exist_latest(self,pg_column_name,limit_number):

        if isinstance(limit_number,int) is False:
            raise ValueError("limit number is not int")
        if limit_number < 1:
            raise ValueError("limit number is small than 1")
        CURRENT_MDEOL_FIELD = ENTRIES_EMBEDDING_COLUMN_NAME_TO_PEEWEE_ATTRIBUTE.get_peewee_attribute_to_column_name(pg_column_name)


        result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url,
                                             EntryEmbeddingModel.article_clean,EntryModel.created_at,
                                             EntryModel.content,EntryModel.author,EntryModel.title,
                                             EntryModel.feed_id,EntryModel.published_at,EntryModel.hash).join(EntryEmbeddingModel,JOIN.LEFT_OUTER,on=(EntryModel.id==EntryEmbeddingModel.entry_id)).where((CURRENT_MDEOL_FIELD.is_null(False) & (CURRENT_MDEOL_FIELD == int(EmbeddingStatus.PROCESSED)) ) &  EntryModel.full_content.is_null(False) ).order_by(EntryModel.created_at.desc()).limit(limit_number).execute())
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
        
        result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url).where(EntryModel.created_at.between(start_time,end_time)).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list   
    
    def select_entry_embedding_according_entry_id(self,entry_id):
        if isinstance(entry_id,int) is False:
            raise ValueError('entry_id is not str')
        
        result_list = list(EntryEmbeddingModel.select(EntryEmbeddingModel.entry_id).where(EntryEmbeddingModel.entry_id == entry_id).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list
    
    def select_entry_according_id(self,id):
        if isinstance(id,int) is False:
            raise ValueError('entry_id is not str')
        
        result_list = list(EntryModel.select(EntryModel.id,EntryModel.full_content,EntryModel.url).where(EntryModel.id == id).execute())
        result_dict_list = list()
        for current_model in result_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list       
    
    def update_entry_embedding_common_eval_version(self,entry_id,status,pg_column_Name):

            
        if isinstance(status,EmbeddingStatus) is False:
            raise ValueError("status is not EmbeddingStatus")
        if isinstance(entry_id,int) is False:
            raise ValueError("entry_id is not int")
        CURRENT_MDEOL_FIELD = ENTRIES_EMBEDDING_COLUMN_NAME_TO_PEEWEE_ATTRIBUTE.get_peewee_attribute_to_column_name(pg_column_Name)

        current_entry_list = self.select_entry_embedding_according_entry_id(entry_id)
        if len(current_entry_list) > 0:
            eval(f"EntryEmbeddingModel.update({pg_column_Name}=int(status)).where(EntryEmbeddingModel.entry_id==entry_id).execute()")
        else:
            eval(f"EntryEmbeddingModel.insert(entry_id=entry_id, {pg_column_Name}=int(status)).execute()")
            
    
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
            
    def convert_peewee_model_to_dict(self,peewee_model_list):
        import peewee
        if isinstance(peewee_model_list,list) is False:
            raise ValueError('peewee_model_list is not list')
        for current_model in peewee_model_list:
            if isinstance(current_model,peewee.Model) is False:
                raise ValueError('current_model is not peewee model')
            
        result_dict_list = list()
        for current_model in peewee_model_list:
            result_dict_list.append(model_to_dict(current_model))
        return result_dict_list   
    
    def select_icon_according_id(self,icon_id):
        if isinstance(icon_id,int) is False:
            raise ValueError(f'icon_id {icon_id} is not int')
        icon_list = list(IconsModel.select().where(IconsModel.id==icon_id).execute())
        if len(icon_list) < 1:
            return list()
        else:
            return self.convert_peewee_model_to_dict(icon_list)
        
    
    def select_feed_with_icons_categories(self):
        feed_model_list = list(FeedsModel.select().execute())
        feee_model_dict_list = self.convert_peewee_model_to_dict(feed_model_list)
        
        
        category_model_list = list(CategoriesModel.select().execute())
        category_model_dict_list = self.convert_peewee_model_to_dict(category_model_list)
        category_id_to_category = dict()
        for current_category_model in category_model_dict_list:
            category_id_to_category[current_category_model['id']] = current_category_model
        
        icons_model_list = list(IconsModel.select().execute())
        icons_model_dict_list = self.convert_peewee_model_to_dict(icons_model_list)
        icon_id_to_icons = dict()
        for current_icon_model in icons_model_dict_list:
            icon_id_to_icons[current_icon_model['id']] = current_icon_model
        
        for current_feed_model in feee_model_dict_list:
            current_feed_id = current_feed_model['id']
            category_id = current_feed_model['category_id']
            icon_id = current_feed_model['icon_id']

           
            if category_id in category_id_to_category:
                current_feed_model['category_title'] = category_id_to_category[category_id]['title']
            else:
                self.__logger.debug(f'current_feed_id {current_feed_id} category_id {category_id} not exist')
            
            if icon_id == 0:
                del current_feed_model['icon_id']
                continue
            
            if icon_id in icon_id_to_icons:
                current_feed_model['icon_type'] = icon_id_to_icons[icon_id]['mime_type']
                current_feed_model['icon_content'] = bytes(icon_id_to_icons[icon_id]['content'])
            else:
                self.__logger.debug(f'current_feed_id {current_feed_id} icon_id {icon_id} not exist')
                
                
        
        return feee_model_dict_list
    
    def select_category_labels(self):
        category_model_list = list(CategoriesModel.select().execute())
        category_model_dict_list = self.convert_peewee_model_to_dict(category_model_list)
        first_category_to_id = dict()
        second_category_to_id = dict()
        id_to_first_category = dict()
        id_to_second_category = dict()
        second_id_to_first_id = dict()
        for current_category_model in category_model_dict_list:
            if current_category_model["parent_id"] == 0: 
                first_category_to_id[current_category_model["title"]] = current_category_model["id"]
                id_to_first_category[current_category_model["id"]] = current_category_model["title"]
            else:
                second_category_to_id[current_category_model["title"]] = current_category_model["id"]
                id_to_second_category[current_category_model["id"]] = current_category_model["title"]
                second_id_to_first_id[current_category_model["id"]] = current_category_model["parent_id"]
        return first_category_to_id,id_to_first_category,second_category_to_id,id_to_second_category,second_id_to_first_id   