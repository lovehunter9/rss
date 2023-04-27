from db.recommend_mongo_db import RECOMMEND_MONGO_DB
class RecommendMongoArticleCollection:
    def __init__(self) -> None:
        self.__db = RECOMMEND_MONGO_DB
        self.__collection_name = 'articles'
        self.__valid_embedding_field_name = set(['word2vec_google_v1'])
    
    def select_document_according_url(self,url):
        if isinstance(url,str) is False:
            raise ValueError("url is not str")
        result_list = list(self.__db[self.__collection_name].find({
            'url':url
        }))
        return result_list
    
    def select_document_according_url_with_clean_text(self,url):
        if isinstance(url,str) is False:
            raise ValueError("url is not str")
        result_list = list(self.__db[self.__collection_name].find({
            'url':url
        },{"clean_text":1}))
        return result_list
    
    def select_embedding_according_url_list(self,url_list,embedding_field_name):
        if isinstance(url_list,list) is False:
            raise ValueError(f'url_list is not list')
        for current_url in url_list:
            if isinstance(current_url,str) is False:
                raise ValueError("current_url is not string")
        result_list = list(self.__db[self.__collection_name].find({
            'url':{'$in':url_list}
        },{"entry_id":1,embedding_field_name:1,"url":1}))
        return result_list
    
    def insert_clean_document(self,current_doc):
        if isinstance(current_doc,dict) is False:
            raise ValueError('current_doc is not dict')
        
        if "url" not in current_doc:
            raise ValueError("url is not exist in current_doc")
        
        exist_document = self.select_document_according_url(current_doc["url"])
        
        if len(exist_document) < 1:
            self.__db[self.__collection_name].insert_one(current_doc)
            
    def update_document_embedding(self,entry_id,embedding_list,embedding_field_name):
        if isinstance(entry_id,int) is False:
            raise ValueError("entry_id is not int")
        if isinstance(embedding_list,list) is False:
            raise ValueError('embedding_list is not list')
        if embedding_field_name not in self.__valid_embedding_field_name:
            raise ValueError(f"embedding_field_name {embedding_field_name} is not valid")
        for current_value in embedding_list:
            if isinstance(current_value,float) is False:
                raise ValueError("embedding have no valid value")
        self.__db[self.__collection_name].update_one({'entry_id': entry_id},
									{'$set': {embedding_field_name: embedding_list}},upsert=True)
            
            
    def create_ascending_index(self,field_name):
        self.__db[self.__collection_name].create_index([(field_name,1)])