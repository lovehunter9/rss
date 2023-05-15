from datetime import datetime, timedelta
import numpy as np
import random
import unittest
from recommend_model_sdk.tools.model_tool import ModelTool
from recommend_model_sdk.rank.rank_tool import RankTool


class RankToolUnitTest(unittest.TestCase):

    def test_get_article_embedding(self):
        # python  -m unittest rank_tool_unit_test.RankToolUnitTest.test_get_article_embedding
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v1"
        latest_number = 1000
        url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(model_name, model_version, 10000)
        base_id_to_embedding = dict()
        embedding_array_list = list()
        set_shape = set()
        for current_url, current_embeddings in url_to_embeddings.items():
            embedding_array = np.array(current_embeddings['embeddings'], dtype=np.float32)
            set_shape.add(embedding_array.shape)

            base_id_to_embedding[current_url] = embedding_array
            embedding_array_list.append(embedding_array)

        result = np.stack(embedding_array_list, axis=0)
        rank_tool = RankTool(base_id_to_embedding)

    def test_rank(self):
        # python  -m unittest rank_tool_unit_test.RankToolUnitTest.test_rank
        download_dir = "/Users/simon/Desktop/workspace/pp/apps/rss/recommend/model"
        current_model_tool = ModelTool(download_dir)
        model_name = "word2vec_google"
        model_version = "v1"
        latest_number = 10000
        url_to_articles, url_to_embeddings = current_model_tool.download_latest_article_embedding_package(model_name, model_version, 10000)
        base_id_to_embedding = dict()
        embedding_array_list = list()
        set_shape = set()
        samples_tuple = list()
        for current_url, current_embeddings in url_to_embeddings.items():
            embedding_array = np.array(current_embeddings['embeddings'], dtype=np.float32)
            set_shape.add(embedding_array.shape)
            base_id_to_embedding[current_url] = embedding_array
            embedding_array_list.append(embedding_array)
            samples_tuple.append((current_url, embedding_array))

        query_sample_tuple = samples_tuple[:1000]
        base_sample_tuple = samples_tuple[1000:]

        base_url_to_embedding_dict = dict()
        for current_tuple in base_sample_tuple:
            base_url_to_embedding_dict[current_tuple[0]] = current_tuple[1]

        query_url_to_embedding_dict = dict()
        for current_tuple in query_sample_tuple:
            query_url_to_embedding_dict[current_tuple[0]] = {"embedding": current_tuple[1], "last_reviewed": datetime.now() - timedelta(hours=4)}
        rank_tool = RankTool(base_url_to_embedding_dict)
        result = rank_tool.rank(query_url_to_embedding_dict, 100)
        print(result)

    def test_numpy(self):
        # python  -m unittest rank_tool_unit_test.RankToolUnitTest.test_numpy
        import numpy as np
        d = 64  # dimension
        nb = 100000  # database size
        nq = 10000  # nb of queries
        np.random.seed(1234)  # make reproducible
        xb = np.random.random((nb, d)).astype('float32')
        print(type(xb))

    def test_cosine(self):
        # python  -m unittest rank_tool_unit_test.RankToolUnitTest.test_cosine
        import faiss
        dataSetI = [.1, .2, .3]
        dataSetII = [.4, .5, .6]
        #dataSetII = [.1, .2, .3]

        x = np.array([dataSetI, [.7, .8, .9]]).astype(np.float32)
        q = np.array([dataSetII, [.10, .11, .12]]).astype(np.float32)
        index = faiss.index_factory(3, "Flat", faiss.METRIC_INNER_PRODUCT)
        index.ntotal
        print(x)
        faiss.normalize_L2(x)
        print(x)
        index.add(x)
        faiss.normalize_L2(q)
        distance, index = index.search(q, 2)
        print('Distance by FAISS:{} index'.format(distance))
        print(index)

        #To Tally the results check the cosine similarity of the following example

        from scipy import spatial

        result = 1 - spatial.distance.cosine(dataSetI, dataSetII)
        print('Distance by FAISS:{}'.format(result))