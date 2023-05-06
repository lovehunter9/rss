import os
from datetime import datetime
from newspaper import fulltext
from recommend_model_sdk.tools.model_tool import ModelTool
from db.recommend_pg_db_tool import *

path = os.environ.get('model_path', "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")

#path = os.environ.get(model_path, "/model")
read_entries_num = os.environ.get('read_entries_num', 50)
down_latest_number = os.environ.get('down_latest_number', 1000)


class RecommendHandler:

    def infer(docList):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_infer
        current_model_tool = ModelTool(path)
        model_name = "word2vec_google"
        model_version = "v1"
        print(current_model_tool.infer(model_name, model_version, docList))

    def init_model():
        current_model_tool = ModelTool(path)
        model_name = "word2vec_google"
        model_version = "v1"
        current_model_tool.init_model(model_name, model_version)

    def download_model():
        latest_package_key = f'{model_name}_{model_version}_latest_package_{latest_number}'
        # print(article_embedding_list)
        article_list = article_embedding_dict["articles"]
        embedding_list = article_embedding_dict["embeddings"]
        print(article_list[0].keys())
        print(article_list[0]["url"])
        print(embedding_list[0].keys())

    def get_readed_entries():
        tool = RecommendPGDBTool()
        current_model_tool = ModelTool(path)
        entries = tool.select_read_entries(read_entries_num)
        user = tool.select_users_model()

        result_list = []
        id_to_document = dict()
        embedding_cal_list = []
        for current_entry in entries:
            entry = {'id': current_entry['id'], 'published_at': current_entry['published_at']}
            current_embedding = tool.select_entries_embedding_model(current_entry["id"], user.model_name, user.model_version)
            if current_embedding is None:
                id_to_document[str(current_entry["id"])] = fulltext(current_entry['full_content'])
                embedding_cal_list.append(entry)
            else:
                entry['embedding'] = current_embedding.embedding
                result_list.append(entry)
        if len(embedding_cal_list) > 0:
            saveEmbeddingList = []
            inferList = current_model_tool.infer(user.model_name, user.model_version, id_to_document)
            for to_call in embedding_cal_list:
                if inferList[str(to_call["id"])]["success"]:
                    current_vec = inferList[str(to_call["id"])]['vec'].tolist()
                    to_call['embedding'] = current_vec
                    result_list.append(to_call)
                    toSaveEmbedding = {'entry_id': to_call['id'], 'model_name': user.model_name, 'model_version': user.model_version, 'embedding': to_call['embedding']}
                    saveEmbeddingList.append(toSaveEmbedding)
            tool.batch_insert_entries_embedding_model(saveEmbeddingList)
        return result_list

    def down_latest_article_embedding_package():
        tool = RecommendPGDBTool()
        user = tool.select_users_model()
        current_model_tool = ModelTool(path)

        baseModel = tool.select_recommend_model()
        if len(baseModel) == 0:
            batch = 1
            url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(user.model_name, user.model_version, down_latest_number)
        else:
            print(baseModel[0].fetch_at)
            batch = baseModel[0].batch + 1
            url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(user.model_name, user.model_version, down_latest_number,
                                                                                                              baseModel[0].fetch_at)
        num = 0
        if len(url_to_articles) > 0:
            num = len(url_to_articles)
            article_list = []
            embedding_list = []
            for current_url, current_articles in url_to_embeddings.items():
                embedding = {
                    'url': current_url,
                    'model_name': current_articles['model_name'],
                    'model_version': current_articles['model_version'],
                    'embedding': current_articles['embeddings']
                }
                embedding_list.append(embedding)

            for current_url, current_articles in url_to_articles.items():
                article = {
                    'url': current_url,
                    'feed_id': current_articles['feed_id'],
                    'created_at': datetime.fromtimestamp(current_articles['created_at'] / 1000.0),
                    'published_at': datetime.fromtimestamp(current_articles['published_at'] / 1000.0),
                    'hash': current_articles['hash'],
                    #'author': current_articles['author'],
                    #'content': current_articles['content'],
                    'full_content': current_articles['full_text'],
                    'title': current_articles['title']
                }
                if 'author' in current_articles:
                    article['author'] = current_articles['author']
                if 'content' in current_articles:
                    article['content'] = current_articles['content']
                article_list.append(article)
            tool.batch_insert_recommend_entries(article_list)
            tool.batch_insert_recommend_entries_embedding(embedding_list)

        tool.insert_recommend_model(batch, num)

    def down_valid_model_and_version():
        tool = RecommendPGDBTool()
        current_model_tool = ModelTool(path)
        result = current_model_tool.get_valid_model_and_version()
        for model, versionList in result.items():
            for v in versionList:
                tool.check_model_and_version(model, v)

    def download_feed():
        tool = RecommendPGDBTool()
        tool.empty_recommend_feed_model()
        feedList = []

        current_model_tool = ModelTool(path)
        feed_id_to_feed = current_model_tool.download_latest_all_feed()

        for current_id, current_feed in feed_id_to_feed.items():
            feed = {
                'id': current_feed['id'],
                'title': current_feed['title'],
                'feed_url': current_feed['feed_url'],
                'site_url': current_feed['site_url'],
                'category_id': current_feed['category_id'],
                'category_title': current_feed['category_title']
            }
            if 'icon_type' in current_feed:
                feed['icon_type'] = current_feed['icon_type']
            if 'icon_content' in current_feed:
                feed['icon_content'] = current_feed['icon_content']
            feedList.append(feed)
            if len(feedList) > 200:
                tool.batch_insert_recommend_feed_model(feedList)
                feedList = []
        if len(feedList) > 0:
            tool.batch_insert_recommend_feed_model(feedList)
