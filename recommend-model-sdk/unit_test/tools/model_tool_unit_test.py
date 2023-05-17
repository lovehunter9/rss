import os
import unittest


from recommend_model_sdk.tools.model_tool import ModelTool
from recommend_model_sdk.tools.common_tool import CommonTool

class ModelToolUnitTest(unittest.TestCase):
    def test_get_all_available_model(self):
        #  python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_get_all_available_model
        current_model_tool = ModelTool("")
    
    def test_get_valid_model_and_version(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_get_valid_model_and_version
        current_model_tool = ModelTool("/home/ubuntu/download_s3")
        result = current_model_tool.get_valid_model_and_version()
        print(result)
    
    def test_download(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download
        
        model_name = "word2vec_google"
        model_version = "v1"
        download_dir = "/home/ubuntu/download_s3"
        current_model_tool = ModelTool(download_dir)
        current_model_tool.download(model_name,model_version,download_dir)
    
    def test_infer(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_infer
        print('11111111111111')
        download_dir = "/home/ubuntu/download_s3"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v1"
        id_to_document = dict()
        id_to_document["1"] = "what a beautiful book"
        id_to_document["2"] = "garbage is resources"
        print(current_model_tool.infer(model_name,model_version,id_to_document))
        
    
    def test_download_latest_article_embedding_package(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download_latest_article_embedding_package
        download_dir = "/home/ubuntu/download_s3"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v2"
        latest_number = 1000
        latest_package_key = f'{model_name}_{model_version}_latest_package_{latest_number}'
        
        
        url_to_articles,url_to_embeddings = current_model_tool.download_latest_article_embedding_package(model_name,model_version,latest_number)
        # print(article_embedding_list)
        for current_url,current_articles in url_to_articles.items():
            print(current_articles.keys()) # content,author may not exist, becase there is no value
        for current_url,current_embeddings in url_to_embeddings.items():
            print(current_embeddings.keys())
        from datetime import datetime
        first_datetime = datetime(year=2023,month=3,day=1) # publish_time
        second_datetime = datetime(year=2023,month=1,day=1 )
        url_to_articles,url_to_embeddings = current_model_tool.download_latest_article_embedding_package(model_name,model_version,10000,first_datetime)
        print(len(url_to_articles))
        url_to_articles,url_to_embeddings = current_model_tool.download_latest_article_embedding_package(model_name,model_version,10000,second_datetime)
        print(len(url_to_articles))
        for current_url,current_articles in url_to_articles.items():
            print(current_articles.keys())
            break
        
    
    def test_init_model(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_init_model
        download_dir = "/home/ubuntu/download_s3"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v1"
        print(current_model_tool.init_model(model_name,model_version))
    
    
    def test_download_latest_all_feed(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download_latest_all_feed
        download_dir = "/home/ubuntu/download_s3"
        current_model_tool = ModelTool(download_dir)
        
        feed_id_to_feed = current_model_tool.download_latest_all_feed()
        common_tool = CommonTool()
        root_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        temp_dir = os.path.join(root_dir,"temp")
        print(temp_dir)
        temp_path = os.path.join(temp_dir,'icon_test.png')
        # with open(temp_path,'wb') as f:
        #    f.write(feed_id_to_feed[2]['icon_content'])
        for current_id,current_feed in feed_id_to_feed.items():
            print(current_feed.keys())