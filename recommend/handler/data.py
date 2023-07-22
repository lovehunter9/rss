import os
import numpy as np
from datetime import datetime
from bs4 import BeautifulSoup
from recommend_model_sdk.tools.common_tool import CommonTool
from recommend_model_sdk.tools.model_tool import ModelTool
from db.recommend_pg_db_tool import *

#path = os.environ.get('model_path', "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")

path = os.environ.get('model_path', "/model")
read_entries_num = int(os.environ.get('read_entries_num', 50))
down_latest_number = int(os.environ.get('down_latest_number', 10000))


class DataHandler:

    def __init__(self) -> None:
        self.current_logger = CommonTool().get_logger()
        self.commont_tool = CommonTool()

    def infer(self, docList):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_infer
        current_model_tool = ModelTool(path)
        model_name = "word2vec_google"
        model_version = "v1"
        print(current_model_tool.infer(model_name, model_version, docList))

    def init_model(self, user):
        current_model_tool = ModelTool(path)
        current_model_tool.init_model(user.model_name, user.model_version)

    def get_readed_entries(self, user):
        tool = RecommendPGDBTool()
        current_model_tool = ModelTool(path)
        entries = tool.select_read_entries(read_entries_num)

        result_list = dict()
        id_to_document = dict()
        embedding_cal_list = []
        for current_entry in entries:
            entry = {'id': current_entry['id'], 'published_at': current_entry['published_at']}
            current_embedding = tool.select_entries_embedding_model(current_entry["id"], user.model_name, user.model_version)

            if len(current_embedding) == 0:
                print(current_entry['full_content'])
                soup = BeautifulSoup(current_entry['full_content'], 'html.parser')
                id_to_document[str(current_entry["id"])] = soup.get_text()
                embedding_cal_list.append(entry)
            else:
                entry['embedding'] = np.array(current_embedding[0].embedding, dtype=np.float32)
                result_list[current_entry['url']] = {"embedding": entry['embedding'], "last_reviewed": current_entry['published_at'].replace(tzinfo=None)}
        if len(embedding_cal_list) > 0:
            saveEmbeddingList = []
            inferList = current_model_tool.infer(user.model_name, user.model_version, id_to_document)
            for to_call in embedding_cal_list:
                if inferList[str(to_call["id"])]["success"]:
                    current_vec = inferList[str(to_call["id"])]['vec'].tolist()
                    to_call['embedding'] = current_vec
                    result_list[current_entry['url']] = {"embedding": np.array(current_vec, dtype=np.float32), "last_reviewed": to_call["published_at"].replace(tzinfo=None)}
                    toSaveEmbedding = {'entry_id': to_call['id'], 'model_name': user.model_name, 'model_version': user.model_version, 'embedding': to_call['embedding']}
                    saveEmbeddingList.append(toSaveEmbedding)
            tool.batch_insert_entries_embedding_model(saveEmbeddingList)
        return result_list

    def down_latest_article_embedding_package(self, user):
        tool = RecommendPGDBTool()
        current_model_tool = ModelTool(path)

        url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(user.model_name, user.model_version, down_latest_number)
        self.current_logger.debug(f'down_latest_article_embedding_package downnuber:{down_latest_number}, num:{len(url_to_articles)}')
        if len(url_to_articles) > 0:
            article_list = []
            embedding_list = []
            url_list = []
            for current_url, current_articles in url_to_articles.items():
                url_list.append(current_url)
            entries_exist_list = tool.select_exist_recommend_entries(url_list)
            entries_embedding_exist_list = tool.select_exist_recommend_entries_embedding(url_list, user.model_name, user.model_version)

            for current_url, current_articles in url_to_embeddings.items():
                if current_url not in entries_embedding_exist_list:
                    embedding = {
                        'url': current_url,
                        'model_name': current_articles['model_name'],
                        'model_version': current_articles['model_version'],
                        'embedding': current_articles['embeddings']
                    }
                    embedding_list.append(embedding)

            for current_url, current_articles in url_to_articles.items():
                if current_url not in entries_exist_list:
                    article = {
                        'url': current_url,
                        'feed_id': current_articles['feed_id'],
                        'created_at': datetime.fromtimestamp(current_articles['created_at'] / 1000.0),
                        'published_at': datetime.fromtimestamp(current_articles['published_at'] / 1000.0),
                        'hash': current_articles['hash'],
                        'author': current_articles['author'],
                        'content': current_articles['content'],
                        'full_content': current_articles['full_text'],
                        'title': current_articles['title'],
                        'image_url': ''
                    }
                    if 'image_url' in current_articles and bool(current_articles['image_url']):
                        article['image_url'] = current_articles['image_url']
                    article_list.append(article)
            if len(article_list) > 0:
                tool.batch_insert_recommend_entries(article_list)
            if len(embedding_list) > 0:
                tool.batch_insert_recommend_entries_embedding(embedding_list)

    def download_increment_package(self, model_name, model_version, package_id):
        tool = RecommendPGDBTool()
        current_model_tool = ModelTool(path)
        #current_model_tool.download_increment_package("bert","v1","article_embeddding_package_bert_v1_97b08d6ac2ab51c7cca581eaf352d1b5")
        url_to_articles, url_to_embeddings = current_model_tool.download_increment_package(model_name, model_version, package_id)
        self.current_logger.debug(f'download_increment_package downnuber, num:{len(url_to_articles)}')
        if len(url_to_articles) > 0:
            article_list = []
            embedding_list = []
            url_list = []
            for current_url, current_articles in url_to_articles.items():
                url_list.append(current_url)
            entries_exist_list = tool.select_exist_recommend_entries(url_list)
            entries_embedding_exist_list = tool.select_exist_recommend_entries_embedding(url_list, model_name, model_version)

            for current_url, current_articles in url_to_embeddings.items():
                if current_url not in entries_embedding_exist_list:
                    embedding = {
                        'url': current_url,
                        'model_name': current_articles['model_name'],
                        'model_version': current_articles['model_version'],
                        'embedding': current_articles['embeddings']
                    }
                    embedding_list.append(embedding)

            for current_url, current_articles in url_to_articles.items():
                if current_url not in entries_exist_list:
                    article = {
                        'url': current_url,
                        'feed_id': current_articles['feed_id'],
                        'created_at': datetime.fromtimestamp(current_articles['created_at'] / 1000.0),
                        'published_at': datetime.fromtimestamp(current_articles['published_at'] / 1000.0),
                        'hash': current_articles['hash'],
                        'author': current_articles['author'],
                        'content': current_articles['content'],
                        'full_content': current_articles['full_text'],
                        'title': current_articles['title'],
                        'image_url': ''
                    }
                    if 'image_url' in current_articles and bool(current_articles['image_url']):
                        article['image_url'] = current_articles['image_url']
                    article_list.append(article)
            if len(article_list) > 0:
                tool.batch_insert_recommend_entries(article_list)
            if len(embedding_list) > 0:
                tool.batch_insert_recommend_entries_embedding(embedding_list)

    def get_tobe_recommended_entries(self, user):
        tool = RecommendPGDBTool()
        entries = tool.select_tobe_recommended_entries(user.model_name, user.model_version, down_latest_number)
        result_list = dict()
        for current_entry in entries:
            result_list[current_entry['url']] = {
                "embedding": np.array(current_entry['embedding'], dtype=np.float32),
                "created_at": current_entry['published_at'].replace(tzinfo=None)
            }
        return result_list

    def down_valid_model_and_version(self):
        tool = RecommendPGDBTool()
        current_model_tool = ModelTool(path)
        result = current_model_tool.get_valid_model_and_version()
        for model, versionList in result.items():
            for v in versionList:
                tool.check_model_and_version(model, v)

    def download_feed(self):
        tool = RecommendPGDBTool()
        tool.empty_recommend_feed_model()
        feedList = []

        current_model_tool = ModelTool(path)
        feed_id_to_feed = current_model_tool.download_latest_all_feed()
        self.current_logger.debug(f'download feed id to feed compelete')
        for current_id, current_feed in feed_id_to_feed.items():
            feed = {
                'id': current_feed['id'],
                'title': current_feed['title'],
                'feed_url': current_feed['feed_url'],
                'site_url': current_feed['site_url'],
                'category_id': current_feed['category_id'],
                'category_title': current_feed['category_title'],
                'feed_description': ''
            }
            if 'icon_type' in current_feed:
                feed['icon_type'] = current_feed['icon_type']
            if 'icon_content' in current_feed:
                feed['icon_content'] = current_feed['icon_content']
            if 'description' in current_feed and bool(current_feed['description']):
                feed['feed_description'] = current_feed['description']
            feedList.append(feed)
            if len(feedList) > 200:
                self.current_logger.debug(f'start insert feed to db')
                tool.batch_insert_recommend_feed_model(feedList)
                feedList = []
        if len(feedList) > 0:
            tool.batch_insert_recommend_feed_model(feedList)
        self.current_logger.debug(f'insert downloaded feed to db')
