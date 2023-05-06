import unittest
from recommend_model_sdk.tools.model_tool import ModelTool

from handler.recommend_handler import *
from db.recommend_pg_db_tool import *
from newspaper import fulltext


class ModelToolUnitTest(unittest.TestCase):

    def test_get_all_available_model(self):
        #  python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_get_all_available_model
        current_model_tool = ModelTool("/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")

    def test_get_valid_model_and_version(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_get_valid_model_and_version
        current_model_tool = ModelTool("/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")
        result = current_model_tool.get_valid_model_and_version()
        for model, versionList in result.items():
            print(model)
            for x in versionList:
                print(x)

        #print(result)

    def test_download(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download

        model_name = "word2vec_google"
        model_version = "v1"
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        current_model_tool.download(model_name, model_version, download_dir)

    def test_infer(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_infer
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v1"
        id_to_document = dict()
        id_to_document["1"] = "what a beautiful book"
        #id_to_document["2"] = "garbage is resources"
        print(current_model_tool.infer(model_name, model_version, id_to_document))

    def test_download_latest_article_embedding_package(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download_latest_article_embedding_package
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v1"
        latest_number = 1000
        latest_package_key = f'{model_name}_{model_version}_latest_package_{latest_number}'

        url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(model_name, model_version, latest_number)
        # print(article_embedding_list)
        for current_url, current_articles in url_to_articles.items():
            print(current_articles.keys())  # content,author may not exist, becase there is no value
        for current_url, current_embeddings in url_to_embeddings.items():
            print(current_embeddings.keys())
        from datetime import datetime
        first_datetime = datetime(year=2023, month=3, day=1)  # publish_time
        second_datetime = datetime(year=2023, month=1, day=1)
        url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(model_name, model_version, 10000, first_datetime)
        print(len(url_to_articles))
        url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(model_name, model_version, 10000, second_datetime)
        print(len(url_to_articles))
        for current_url, current_articles in url_to_articles.items():
            print(current_articles.keys())
            break

    def test_init_model(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_init_model
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v1"
        current_model_tool.init_model(model_name, model_version)

    def test_download_latest_all_feed(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download_latest_all_feed
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)

        feed_id_to_feed = current_model_tool.download_latest_all_feed()

        for current_id, current_feed in feed_id_to_feed.items():
            print(current_feed.keys())

    def test_handler(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_handler
        #RecommendHandler.downloadFeed()
        RecommendHandler.down_latest_article_embedding_package()

    def test_newspaper(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_newspaper
        tool = RecommendPGDBTool()
        current_model_tool = ModelTool("/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")
        entries = tool.select_read_entries(1)
        user = tool.select_users_model()

        id_to_document = dict()
        id_to_document[2] = "what a beautiful book"

        for current_entry in entries:

            #print(current_entry['id'])
            #print(user.model_name)
            #print(user.model_version)
            #print(current_entry['full_content'])
            current_embedding = tool.select_entries_embedding_model(current_entry["id"], user.model_name, user.model_version)
            if len(current_embedding) == 0:
                print('none............')
                id_to_document["5"] = fulltext(current_entry['full_content'])
                #print(id_to_document["1"])

        print(current_model_tool.infer(user.model_name, user.model_version, id_to_document))
