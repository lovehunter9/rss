import os

from recommend_model_sdk.tools.model_tool import ModelTool
from db.recommend_pg_db_tool import *

path = os.environ.get(
    'model_path', "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model")

#path = os.environ.get(model_path, "/model")


class RecommendHandler:

    def infer(docList):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_infer
        current_model_tool = ModelTool(path)
        model_name = "word2vec_google"
        model_version = "v1"
        print(current_model_tool.infer(model_name, model_version, docList))

    def initModel():
        current_model_tool = ModelTool(path)
        model_name = "word2vec_google"
        model_version = "v1"
        current_model_tool.init_model(model_name, model_version)

    def download():

        latest_package_key = f'{model_name}_{model_version}_latest_package_{latest_number}'

        # print(article_embedding_list)
        article_list = article_embedding_dict["articles"]
        embedding_list = article_embedding_dict["embeddings"]
        print(article_list[0].keys())
        print(article_list[0]["url"])
        print(embedding_list[0].keys())

    def recommendGenerate():
        model_name = "word2vec_google"
        model_version = "v1"
        latest_number = 1000
        tool = RecommendPGDBTool()
        current_model_tool = ModelTool(path)

        baseModel = tool.select_recommend_model()
        if baseModel is None:
            batch = 1
            url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(
                model_name, model_version, latest_number)
        else:
            batch = baseModel.batch + 1
            url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(
                model_name, model_version, latest_number, baseModel.fetch_at)

        num = 0
        if print(len(url_to_articles)) > 0:
            num = len(url_to_articles)
            article_list = dict()
            for current_url, current_articles in url_to_articles.items():
                #url = current_articles['url']
                article_list[current_url]['url'] = url
                article_list[current_url]['model_name'] = current_articles[
                    'model_name']
                article_list[current_url]['model_version'] = current_articles[
                    'model_version']
                article_list[current_url]['embeddings'] = current_articles[
                    'embeddings']

            for current_url, current_articles in url_to_articles.items():
                article_list[current_url]['feed_id'] = current_articles[
                    'feed_id']
                article_list[current_url]['created_at'] = current_articles[
                    'created_at']
                article_list[current_url]['published_at'] = current_articles[
                    'published_at']
                article_list[current_url]['hash'] = current_articles['hash']
                article_list[current_url]['author'] = current_articles[
                    'author']
                article_list[current_url]['content'] = current_articles[
                    'content']
                article_list[current_url]['full_content'] = current_articles[
                    'full_content']

        newBaseModel = {'batch': batch, 'num': num}
        tool.insert_recommend_model(newBaseModel)
        tool.batch_insert_recommend_entries(article_list.items())

    def downloadFeed():
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
