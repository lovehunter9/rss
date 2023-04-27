import unittest
from recommend_model_sdk.tools.model_tool import ModelTool

class ModelToolUnitTest(unittest.TestCase):
    def test_get_all_available_model(self):
        #  python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_get_all_available_model
        current_model_tool = ModelTool("/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")
    
    def test_get_valid_model_and_version(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_get_valid_model_and_version
        current_model_tool = ModelTool("/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")
        result = current_model_tool.get_valid_model_and_version()
        print(result)
    
    def test_download(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download
        
        model_name = "word2vec_google"
        model_version = "v1"
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        current_model_tool.download(model_name,model_version,download_dir)
    
    def test_infer(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_infer
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v1"
        id_to_document = dict()
        id_to_document["1"] = "what a beautiful book"
        #id_to_document["2"] = "garbage is resources"
        print(current_model_tool.infer(model_name,model_version,id_to_document))
    
    def test_download_latest_article_embedding_package(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download_latest_article_embedding_package
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v1"
        latest_number = 1000
        latest_package_key = f'{model_name}_{model_version}_latest_package_{latest_number}'
        
        article_embedding_dict = current_model_tool.download_latest_article_embedding_package(model_name,model_version,latest_number)
        # print(article_embedding_list)
        article_list = article_embedding_dict["articles"]
        embedding_list = article_embedding_dict["embeddings"]
        print(article_list[0].keys())
        print(article_list[0]["url"])
        print(embedding_list[0].keys())
        
    
    def test_init_model(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_init_model
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v1"
        current_model_tool.init_model(model_name,model_version)