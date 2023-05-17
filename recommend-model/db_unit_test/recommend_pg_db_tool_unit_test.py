import html2text
from newspaper import Article
import nltk
import os
import unittest

from common_util.common_tool import CommonTool
from datetime import datetime
from db.recommend_mongo_article_collection import RecommendMongoArticleCollection
from db.recommend_pg_db_tool import RecommendPGDBTool
from embedding.embedding_enum import EmbeddingEnum,EmbeddingStatus
from embedding.word2vec_embedding import Word2VecEmbedding


class RecommendPGDBToolUnitTest(unittest.TestCase):
    def test_create_entries_embedding_table(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_create_entries_embedding_table
        tool = RecommendPGDBTool()
        tool.create_entries_embedding_table()
    
    def test_drop_entries_embedding_table(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_drop_entries_embedding_table
        tool = RecommendPGDBTool()
        tool.drop_entries_embedding_table()
        
    def test_select_clean_entry_withou_embedding(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_select_clean_entry_withou_embedding
        tool = RecommendPGDBTool()
        entries = tool.select_entry_without_embedding(10,EmbeddingEnum.WORD2VEC_GOOGLE)
        for current_entry in entries:
            print(current_entry["id"])
            
    def test_select_entry_without_embedding_with_created_time(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_select_entry_without_embedding_with_created_time
        tool = RecommendPGDBTool()
        # test_select_entry_without_embedding_with_created_time
        start_time = datetime(2023,3,30,13,33,0)
        end_time = datetime(2023,3,30,14,33,50)
        entries_list = tool.select_entry_without_embedding_with_created_time(10,EmbeddingEnum.WORD2VEC_GOOGLE,start_time,end_time)
        print(len(entries_list))
        
    def test_select_entry_according_time_range(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_select_entry_according_time_range
        tool = RecommendPGDBTool()
        # test_select_entry_without_embedding_with_created_time
        start_time = datetime(2023,3,30,13,33,0)
        end_time = datetime(2023,3,30,13,40,50)
        entries_list = tool.select_entry_according_time_range(start_time,end_time)
        print(len(entries_list))
        
    
    def test_calcualte_embedding(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_calcualte_embedding
        tool = RecommendPGDBTool()
        htool = html2text.HTML2Text()   
        htool.ignore_images = True
        htool.ignore_links = True
        nltk.download('punkt')
        article_collection = RecommendMongoArticleCollection()
        tfidf_path = "/home/ubuntu/shootout/tfidf.model"
        tfidf_dictionary_path = "/home/ubuntu/shootout/dictionary"
        word2vec_embedding_path = "/home/ubuntu/GoogleNews-vectors-negative300.bin"
        word2vec_tool = Word2VecEmbedding(tfidf_path,tfidf_dictionary_path,word2vec_embedding_path)
        current_logger = CommonTool().get_logger()
        total_count = 0
        while True:
            entries = tool.select_entry_without_embedding(1000,EmbeddingEnum.WORD2VEC_GOOGLE)
            if len(entries) < 1:
                break
            for current_entry in entries:
                entry_id = current_entry['id']
                current_logger.info(entry_id)

                try:
                    if "article_clean" not in current_entry or current_entry['article_clean'] != int(EmbeddingStatus.PROCESSED):
                        current_clean_doc = dict()
                        # print(htool.handle(current_entry['full_content']))
                        url = current_entry['url']
                        article = Article(url)
                        article.download()    
                        article.parse()
                        article.nlp()
                        current_clean_doc['clean_text'] = article.text
                        current_clean_doc['summary'] = article.summary
                        current_clean_doc['keywords'] = article.keywords
                        current_clean_doc['images'] = list(article.images)
                        current_clean_doc['url'] = current_entry['url']
                        current_clean_doc['entry_id'] = current_entry['id']
                        article_collection.insert_clean_document(current_clean_doc)
                        tool.update_entry_embedding_article_clean(current_entry['id'],EmbeddingStatus.PROCESSED)
                        clean_text = article.text
                    else:
                        result_list = article_collection.select_document_according_url_with_clean_text(current_entry['url'])
                        clean_text = result_list[0]['clean_text']
                    current_embedding_result = word2vec_tool.calculate_embedding(clean_text)
                    if current_embedding_result["success"]:
                        current_vec = current_embedding_result['vec'].tolist()
                        article_collection.update_document_embedding(current_entry['id'],current_vec,'word2vec_google_v1')
                        tool.update_entry_embedding_word2vec_google_embedding(current_entry["id"],EmbeddingStatus.PROCESSED)
                    else:
                        tool.update_entry_embedding_word2vec_google_embedding(current_entry["id"],EmbeddingStatus.PROCESSFAIL)
                except Exception as ex:
                    current_logger.error(f'{entry_id} {str(ex)}')
                    tool.update_entry_embedding_word2vec_google_embedding(current_entry["id"],EmbeddingStatus.PROCESSFAIL)
                
    def test_article_with_out_download(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_article_with_out_download
        tool = RecommendPGDBTool()
        current_entry_list  = tool.select_entry_according_id(10451)
        current_entry = current_entry_list[0] 
        article = Article(current_entry["url"])
        article.download(input_html=current_entry['full_content'])  
        content = '<p>If you have recently stepped into the business world, there are high chances that you have yet to realize the importance of a business checking account. We know how rewarding it is to start a business of your own. Of course, it’s a challenge, but it’s highly rewarding too.</p>'
        print(content)  
        article.parse()
        article.nlp()
        current_clean_doc = dict()
        current_clean_doc['clean_text'] = article.text
        current_clean_doc['summary'] = article.summary
        current_clean_doc['keywords'] = article.keywords
        current_clean_doc['images'] = list(article.images)
        from bs4 import BeautifulSoup

        soup = BeautifulSoup(current_entry['full_content'], 'html.parser')
        print(soup.get_text())
        '''
        article2 = Article(current_entry['url'])
        article2.download()    
        article2.parse()
        article2.nlp()
        current_clean_doc2 = dict()
        current_clean_doc2['clean_text'] = article.text
        current_clean_doc2['summary'] = article.summary
        current_clean_doc2['keywords'] = article.keywords
        current_clean_doc2['images'] = list(article.images)
        print(article2.text)  
        print(article.text == article2.text)
        '''
        
            
    def test_select_entry_according_embedding_exist_latest(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_select_entry_according_embedding_exist_latest
        pastool = RecommendPGDBTool()
        result_list = pastool.select_entry_according_embedding_exist_latest(EmbeddingEnum.WORD2VEC_GOOGLE,1000)
        for current_result in result_list:
            # print(current_result['url'])
            # print(current_result['id'])
            print(current_result['created_at'])    
            print(current_result.keys())   
            break   
    
    def test_select_feed_with_icons_categories(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_select_feed_with_icons_categories
        recommend_tool = RecommendPGDBTool()
        feed_list = recommend_tool.select_feed_with_icons_categories()
        # for current_feed in feed_list:
        #    print(current_feed)
        for current_feed in feed_list:
            print(current_feed.keys())
            print(type(current_feed['icon_content']))
            break
    
    def test_select_icon_and_write(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_select_icon_and_write
        recommend_tool = RecommendPGDBTool()
        common_tool = CommonTool()
        icon_list = recommend_tool.select_icon_according_id(2)
        current_icon =   icon_list[0]
        print(current_icon)
        icon_test_path = os.path.join(os.path.join(common_tool.get_project_directory(),'temp'),'icon_test.png')
        with open(icon_test_path,'wb') as f:
            f.write(bytes(current_icon['content']))
    
    def test_update_entry_embedding_common_eval_version(self):
        # python  -m unittest recommend_pg_db_tool_unit_test.RecommendPGDBToolUnitTest.test_update_entry_embedding_common_eval_version
        recommend_tool = RecommendPGDBTool()
        recommend_tool.update_entry_embedding_common_eval_version(4,EmbeddingStatus.UNPROCESSED,EmbeddingEnum.BERT)
    
