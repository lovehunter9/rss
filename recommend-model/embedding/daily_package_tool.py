import os
from google.protobuf.json_format import Parse, ParseDict,MessageToDict
import zlib

# from common_util.model_tool import ModelTool

from common_util.common_tool import CommonTool
from common_util.aws_s3_tool import AWSS3Tool

from db.recommend_pg_db_tool import RecommendPGDBTool
from db.recommend_mongo_article_collection import RecommendMongoArticleCollection
from embedding.model_tool import ModelTool
import proto_class.embedding_pb2 

class DailyPackageTool:
    def __init__(self,model_root_dir) -> None:
        self.__model_tool = ModelTool(model_root_dir)
        self.__common_tool = CommonTool()
        management_path = os.path.join(os.path.join(os.path.join(self.__common_tool.get_project_directory(),"resources"),"model_management"),"model_management.json")
        self.__model_dict = self.__model_tool.validate_model_management_file(management_path)
        self.__recommend_pg_db_tool = RecommendPGDBTool()
        self.__recommend_mongo_article_collection = RecommendMongoArticleCollection()
        self.__s3_tool = AWSS3Tool()
        self.__logger = self.__common_tool.get_logger()
        self.__latest_support_package_number = set([1000,5000,10000])
    
    def get_latest_support_package_number(self):
        return self.__latest_support_package_number
    
    
    def generate_feed_package_and_upload_to_s3(self):
        feed_package = self.generate_feed_package()
        feed_key = 'all_feeds'
        compress_feed_package = zlib.compress(feed_package.SerializeToString())
        content_type = "application/octet-stream"
        current_bucket_name = 'gpu-model-data'
        self.__s3_tool.put_object_with_md5(compress_feed_package,current_bucket_name,feed_key,content_type)
        
        
        
    
    def generate_protobuf_package_and_upload_to_s3(self,model_name,model_version,limit_number):
        article_package,embedding_package,latest_package = self.generate_protobuf_package(model_name,model_version,limit_number)
        
        # self.__s3_tool.upload_file()
        article_package_key = f'{model_name}_{model_version}_article_package_{limit_number}'
        embedding_package_key = f'{model_name}_{model_version}_embedding_package_{limit_number}'
        latest_package_key = f'{model_name}_{model_version}_latest_package_{limit_number}'
        current_model_detail = self.__model_dict[model_name][model_version]
        current_bucket_name = current_model_detail['s3_bucket']
        
        
        compress_article_package = zlib.compress(article_package.SerializeToString())
        compress_embedding_package = zlib.compress(embedding_package.SerializeToString())
        compress_latest_package = zlib.compress(latest_package.SerializeToString())
        
        
        content_type = "application/octet-stream"
        self.__s3_tool.put_object_with_md5(compress_article_package,current_bucket_name,article_package_key,content_type)
        self.__s3_tool.put_object_with_md5(compress_embedding_package,current_bucket_name,embedding_package_key,content_type)
        self.__s3_tool.put_object_with_md5(compress_latest_package,current_bucket_name,latest_package_key,content_type)
    
    
    def valid_model_name_and_version(self,model_name,model_version):
        if isinstance(model_name,str) is False:
            raise ValueError("model name need to be str")
        if isinstance(model_version,str) is False:
            raise ValueError("model_version need to be str")
        
        if model_name not in self.__model_dict:
            return False
        
        if model_version not in self.__model_dict[model_name]:
            return False
        
        return self.__model_dict[model_name][model_version]
    
    def download_latest_article_embedding_package(self,model_name,model_version,latest_number):
        self.valid_model_name_and_version(model_name,model_version)
        if isinstance(latest_number,int) is False:
            raise ValueError("latest_number is not int")
        if latest_number not in self.__latest_support_package_number:
            raise ValueError("latest_number is not support")
        latest_package_key = f'{model_name}_{model_version}_latest_package_{latest_number}'
        current_model_detail = self.__model_dict[model_name][model_version]
        current_bucket_name = current_model_detail['s3_bucket']
        result = self.__s3_tool.get_object_byte(current_bucket_name,latest_package_key)
        if result["success"] is False:
            raise ValueError(f"download embedding package fail result {result}")
        return result["bytes"]
        
    def generate_feed_package(self):
        import base64
        feed_list = self.__recommend_pg_db_tool.select_feed_with_icons_categories()
        for current_feed in feed_list:
                if 'icon_content' in current_feed:
                    current_feed['icon_content'] = base64.b64encode(current_feed['icon_content'])
                ParseDict(current_feed,proto_class.embedding_pb2.Feed())

        temp_feed_package_dict = dict()
        temp_feed_package_dict["feeds"] = feed_list
        feed_package = ParseDict(temp_feed_package_dict,proto_class.embedding_pb2.FeedPackage())
        return feed_package
        
    
    def generate_protobuf_package(self,model_name,model_version,limit_number):
        if isinstance(model_name,str) is False:
            raise ValueError(f"model_name {model_name} is not str ")
        if model_name not in self.__model_dict:
            raise ValueError(f"model_name {model_name} is not valid model")
        
        if isinstance(model_version,str) is False:
            raise ValueError(f"model_version {model_version} is not str")
    
        if model_version not in self.__model_dict[model_name]:
            raise ValueError(f'model_version {model_version} not in model {model_name}')
        
        if isinstance(limit_number,int) is False:
            raise ValueError(f"limit_number is not int")
        if limit_number < 1:
            raise ValueError(f"limit_number {limit_number} is small than 1")
        
        current_model_detail = self.__model_dict[model_name][model_version]
        # self.__recommend_pg_db_tool.select_entry_according_embedding_exist_latest()
        self.__logger.debug(f'current_model_detail {current_model_detail}')
        mongo_field = self.__model_dict[model_name][model_version]['mongodb_embedding_field']
        pg_field = self.__model_dict[model_name][model_version]['pg_embedding_mark_field']

        latest_entrys = self.__recommend_pg_db_tool.select_entry_according_embedding_exist_latest(pg_field,limit_number)
        if len(latest_entrys) < 1:
            self.__logger.debug(f'the latest model {model_name} entry is 0')
        url_to_entry_dict = dict()
        for current_entry in latest_entrys:
                      
            url_to_entry_dict[current_entry['url']] = current_entry
        url_list = list(url_to_entry_dict.keys())
        self.__logger.debug(f'length url_list {len(url_list)}')
        mongodb_embedding_field = current_model_detail['mongodb_embedding_field']
        latest_embedding_list = self.__recommend_mongo_article_collection.select_embedding_according_url_list(url_list,mongodb_embedding_field)
        self.__logger.debug(f'latest_embedding_list {len(latest_embedding_list)}')
        article_list = list()
        embedding_list = list()
        for current_embedding_instance in latest_embedding_list:
            '''
                message Article {
                    string url=1;
                    string full_text=2;
                    uint64 created_at=3;
                }
            '''
            current_url = current_embedding_instance["url"]
            if current_url not in url_to_entry_dict:
                continue
            current_entry = url_to_entry_dict[current_url]
            temp_article_dict = dict()
            temp_article_dict['url'] = current_url
            temp_article_dict['full_text'] = current_entry["full_content"]
            temp_article_dict["created_at"] = int(round(current_entry['created_at'].timestamp() * 1000)) # milliseconds
            temp_article_dict["published_at"] = int(round(current_entry['published_at'].timestamp() * 1000))
            temp_article_dict["title"] = current_entry["title"]
            temp_article_dict["author"] = current_entry["author"]
            temp_article_dict["content"] = current_entry["content"]
            temp_article_dict['hash'] = current_entry['hash']
            temp_article_dict["feed_id"] = current_entry["feed_id"]
            
            
            # article_list.append(ParseDict(temp_article_dict,proto_class.embedding_pb2.Article()))
            article_list.append(temp_article_dict)
            
            
            '''
            message Embedding {
                string url = 1;
                string model_name=2;
                string model_version = 3;
                repeated float embeddings=4;
            }
            '''
            temp_embedding_dict = dict()
            temp_embedding_dict['url'] = current_url
            temp_embedding_dict['model_name'] = model_name
            temp_embedding_dict['model_version'] = model_version
            temp_embedding_dict['embeddings'] = current_embedding_instance[mongodb_embedding_field]
            embedding_list.append(temp_embedding_dict)

        
        '''
        message ArticlePackage {
            repeated Article articles=1;
        }
        '''
        temp_article_package_dict = dict()
        temp_article_package_dict["articles"] = article_list
        article_package = ParseDict(temp_article_package_dict,proto_class.embedding_pb2.ArticlePackage())
        
        
        '''
        message EmbeddingPakcage {
            repeated Embedding embeddings=1;
        }
        '''
        temp_embedding_package_dict = dict()
        temp_embedding_package_dict['embeddings'] =   embedding_list 
        embedding_package  = ParseDict(temp_embedding_package_dict, proto_class.embedding_pb2.EmbeddingPakcage())

        '''    
        message LatestPackage {
            repeated Article articles=1;
            repeated Embedding embeddings=2;
        }
        '''
        temp_latest_package_dict = dict()
        temp_latest_package_dict['articles'] = article_list
        temp_latest_package_dict['embeddings'] = embedding_list
        latest_package = ParseDict(temp_latest_package_dict,proto_class.embedding_pb2.LatestPackage())
        # self.__common_tool.write_json(temp_latest_package_dict,"/home/ubuntu/original.json")
        # with open("/home/ubuntu/byte",'wb') as f:
        #    f.write(latest_package.SerializeToString())
        # 155851388 proto 219510742 json  compress_proto 41022089  total entry 9931
        # original_proto_byte =  latest_package.SerializeToString()
        # compress_proto_byte = zlib.compress(original_proto_byte)
        return article_package,embedding_package,latest_package
        