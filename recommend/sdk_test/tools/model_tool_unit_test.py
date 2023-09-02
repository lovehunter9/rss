import unittest
from recommend_model_sdk.tools.model_tool import ModelTool

from handler.data import *
from handler.recommend_handler import *
from db.recommend_pg_db_tool import *
# from newspaper import *
import requests
# from lxml import etree
from bs4 import BeautifulSoup


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
        model_version = "v2"
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
        #for current_url, current_embeddings in url_to_embeddings.items():
        #    print(current_embeddings.keys())
        #from datetime import datetime
        #first_datetime = datetime(year=2023, month=3, day=1)  # publish_time
        #second_datetime = datetime(year=2023, month=1, day=1)
        #url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(model_name, model_version, 10000, first_datetime)
        #print(len(url_to_articles))
        #url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(model_name, model_version, 10000, second_datetime)
        #print(len(url_to_articles))
        #for current_url, current_articles in url_to_articles.items():
        #    print(current_articles.keys())
        #    break

    def test_init_model(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_init_model
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v2"
        current_model_tool.init_model(model_name, model_version)

    def test_download_latest_all_feed(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download_latest_all_feed
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)

        feed_id_to_feed = current_model_tool.download_latest_all_feed()
        total = 0
        total2 = 0
        for current_id, current_feed in feed_id_to_feed.items():
            total = total + 1
        print(total)

    def test_db_handler(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_db_handler
        tool = RecommendPGDBTool()
        l = ['a', 'b']
        result = tool.select_exist_recommend_entries(l)
        if 'a' not in result:
            print('a')
        if 'c' not in result:
            print('c')

    def test_handler(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_handler
        #RecommendHandler.downloadFeed()
        #DataHandler.down_latest_article_embedding_package()
        RecommendHandler().recommend()

    def test_newspaper(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_newspaper
        tool = RecommendPGDBTool()
        current_model_tool = ModelTool("/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")
        entries = tool.select_read_entries(100, 'en')
        user = tool.select_users_model()

        id_to_document = dict()
        id_to_document[2] = "what a beautiful book"

        for current_entry in entries:

            #print(current_entry['id'])
            #print(user.model_name)
            #print(user.model_version)
            print(current_entry['id'])
            #print(fulltext(current_entry['full_content'], language='en'))
            #response = etree.HTML(current_entry['full_content'])
            #print(response.xpath('string(.)'))
            soup = BeautifulSoup(current_entry['full_content'], 'html.parser')
            print(soup.get_text())
            #current_embedding = tool.select_entries_embedding_model(current_entry["id"], user.model_name, user.model_version)
            #if len(current_embedding) == 0:
            #print('none............')
            #id_to_document["5"] = fulltext(current_entry['full_content'])
            #print(id_to_document["1"])

        #print(current_model_tool.infer(user.model_name, user.model_version, id_to_document))

    def download_html(self):
        #python  -m unittest model_tool_unit_test.ModelToolUnitTest.download_html
        url = "https://themerkle.com/solana-sol-and-dogecoin-doge-face-off-with-tms-network-tmsn-in-the-2023-race-for-700-returns/"
        article = Article(url)
        article.download()
        filename = 'b.html'
        with open(filename, 'w') as file_object:
            file_object.write(article.html)

        #html = requests.get(url).text
    def package_share(self):
        #python  -m unittest model_tool_unit_test.ModelToolUnitTest.package_share

        response = requests.get('http://127.0.0.1:8081/api/share/s3packages')
        print(response.text)

        packageData = json.loads(response.text)
        for data in packageData:
            print(data['model_version'])

    def test_download_increment_package(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download_increment_package
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        url_to_article_dict, url_to_embedding_dict = current_model_tool.download_increment_package("bert", "v1",
                                                                                                   "article_embeddding_package_bert_v1_97b08d6ac2ab51c7cca581eaf352d1b5")
        print(len(url_to_article_dict))
        print(len(url_to_embedding_dict))

    def test_download_keyword_sortinfo_package(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_download_keyword_sortinfo_package
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        keyword_sortinfo_list = current_model_tool.download_keyword_sortinfo_package('en')
        #for current in keyword_sortinfo_list:
        #    print(current["keyword"])
        #    print(len(current["urls"]))
        print(keyword_sortinfo_list)

    def test_infer_text_language_type(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_infer_text_language_type
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        language_type = current_model_tool.infer_text_language_type("what happen")
        print(language_type)

    def test_rank(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_rank

        handler = RecommendHandler()
        handler.recommend()
