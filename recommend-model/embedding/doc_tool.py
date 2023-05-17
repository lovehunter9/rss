from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor,as_completed,ProcessPoolExecutor
from newspaper import Article
import nltk
from tqdm import tqdm
import os


from common_util.common_tool import CommonTool
from db.recommend_mongo_article_collection import RecommendMongoArticleCollection
from db.recommend_pg_db_tool import RecommendPGDBTool
from embedding.embedding_enum import EmbeddingEnum,EmbeddingStatus
from embedding.model_tool import ModelTool
from embedding.word2vec_embedding import Word2VecEmbedding

from db.recommend_pg_db import RECOMMEND_PG_DB


class DocTool:
    def __init__(self) -> None:
        self.__logger = CommonTool().get_logger()
    
    def single_calculate_word2vec_embedding(self,current_entry,word2vec_tool):
        if isinstance(word2vec_tool,Word2VecEmbedding) is False :
            raise ValueError("word2vec_tool is not Word2VecEmbedding ")
        tool = RecommendPGDBTool()
        article_collection = RecommendMongoArticleCollection()
        entry_id = current_entry['id']
        self.__logger.info(entry_id)
        RECOMMEND_PG_DB.close_idle()
        RECOMMEND_PG_DB.close_stale()
        try:
            if "article_clean" not in current_entry or current_entry['article_clean'] != int(EmbeddingStatus.PROCESSED):
                current_clean_doc = dict()
                # print(htool.handle(current_entry['full_content']))
                url = current_entry['url']
                article = Article(url)
                try:
                    article.download()    
                except Exception as ex:
                    self.__logger.error(f'download {url} error {str(ex)}')
                    article.download(current_entry['full_content'])
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
            current_embedding_result = word2vec_tool.calculate_embedding(clean_text) #
            if current_embedding_result["success"]:
                current_vec = current_embedding_result['vec'].tolist()
                article_collection.update_document_embedding(current_entry['id'],current_vec,'word2vec_google_v1')  #
                tool.update_entry_embedding_word2vec_google_embedding(current_entry["id"],EmbeddingStatus.PROCESSED) #
            else:
                tool.update_entry_embedding_word2vec_google_embedding(current_entry["id"],EmbeddingStatus.PROCESSFAIL) #
        except Exception as ex:
            self.__logger.error(f'{entry_id} {str(ex)}')
            tool.update_entry_embedding_word2vec_google_embedding(current_entry["id"],EmbeddingStatus.PROCESSFAIL)#
    
    def calculate_word2vec_embedding_For_all_article(self,tfidf_path,tfidf_dictionary_path,word2vec_embedding_path):
        tool = RecommendPGDBTool()
        nltk.download('punkt')

        '''
        tfidf_path = "/home/ubuntu/shootout/tfidf.model"
        tfidf_dictionary_path = "/home/ubuntu/shootout/dictionary"
        word2vec_embedding_path = "/home/ubuntu/GoogleNews-vectors-negative300.bin"
        '''
        word2vec_tool = Word2VecEmbedding(tfidf_path,tfidf_dictionary_path,word2vec_embedding_path)
        while True:
            entries = tool.select_entry_without_embedding(1000,EmbeddingEnum.WORD2VEC_GOOGLE)
            if len(entries) < 1:
                break
                
            tasks = []       
            with ThreadPoolExecutor(max_workers=4) as executor, tqdm(desc=f'calculate entries ',total=len(entries)) as bar:
                for current_entry in entries:
                    task = executor.submit(self.single_calculate_word2vec_embedding,  current_entry, word2vec_tool)
                    task.add_done_callback(lambda fut: bar.update(1))
                    tasks.append(task)
                for fut in as_completed(tasks):
                    x = fut.result()
                    if x is not None:
                        print(x)
            RECOMMEND_PG_DB.close()
            
            
            
            
            
            
            
            
    def single_calculate_embedding(self,model_tool,model_name,model_version,current_entry):
        if isinstance(model_tool,ModelTool) is False:
            raise ValueError("model_tool is not ModelTool")
        tool = RecommendPGDBTool()
        article_collection = RecommendMongoArticleCollection()
        entry_id = current_entry['id']
        self.__logger.info(entry_id)
        RECOMMEND_PG_DB.close_idle()
        RECOMMEND_PG_DB.close_stale()
        model_managemnt_dict = model_tool.get_model_management_dict()
        mongo_field = model_managemnt_dict[model_name][model_version]['mongodb_embedding_field']
        pg_field = model_managemnt_dict[model_name][model_version]['pg_embedding_mark_field']
        

        try:
            soup = BeautifulSoup(current_entry['full_content'], 'html.parser')
            clean_text = soup.get_text()
            # self.__logger.debug(f'clean text {clean_text}')
            if "article_clean" not in current_entry or current_entry['article_clean'] != int(EmbeddingStatus.PROCESSED):
                current_clean_doc = dict()
                # print(htool.handle(current_entry['full_content']))
                url = current_entry['url']

                current_clean_doc['clean_text'] = clean_text
                current_clean_doc['url'] = current_entry['url']
                current_clean_doc['entry_id'] = current_entry['id']
                article_collection.insert_clean_document(current_clean_doc)
                tool.update_entry_embedding_article_clean(current_entry['id'],EmbeddingStatus.PROCESSED)
            else:
                result_list = article_collection.select_document_according_url_with_clean_text(current_entry['url'])
                clean_text = result_list[0]['clean_text']
            temp_id_to_document = dict()
            temp_id_to_document["1"]=clean_text
            temp_id_to_embedding_result = model_tool.infer(model_name,model_version,temp_id_to_document) #
            current_embedding_result = temp_id_to_embedding_result["1"]
        
            if current_embedding_result["success"]:
                current_vec = current_embedding_result['vec'].tolist()
                
                article_collection.update_document_embedding(current_entry['id'],current_vec,mongo_field)  #
                tool.update_entry_embedding_common_eval_version(current_entry["id"],EmbeddingStatus.PROCESSED,pg_field) #
            else:
                fail_reason = current_embedding_result['fail_reason']
                self.__logger.error(f'entry id {entry_id} fail_reason: {fail_reason}')
                tool.update_entry_embedding_common_eval_version(current_entry["id"],EmbeddingStatus.PROCESSFAIL,pg_field) #
        except Exception as ex:
            raise ex
            self.__logger.error(f'entry id: {entry_id} ex: {str(ex)}')
            tool.update_entry_embedding_common_eval_version(current_entry["id"],EmbeddingStatus.PROCESSFAIL,pg_field)#
        
    
    def calculate_embedding_for_all_article(self,model_name,model_version,model_root_dir):
        tool = RecommendPGDBTool()
        model_tool = ModelTool(model_root_dir)
        model_tool.init_model(model_name,model_version)
        model_managemnt_dict = model_tool.get_model_management_dict()
        pg_field = model_managemnt_dict[model_name][model_version]['pg_embedding_mark_field']
        while True:
            entries = tool.select_entry_without_embedding(100,pg_field) 
            self.__logger.debug(f'model_name {model_name} model_version {model_version} not processed embedding {len(entries)}')
            if len(entries) < 1:
                break
                
            tasks = []       
            with ThreadPoolExecutor(max_workers=1) as executor, tqdm(desc=f'calculate entries ',total=len(entries)) as bar:
                for current_entry in entries:
                    task = executor.submit(self.single_calculate_embedding,  model_tool,model_name,model_version,current_entry)
                    task.add_done_callback(lambda fut: bar.update(1))
                    tasks.append(task)
                for fut in as_completed(tasks):
                    x = fut.result()
                    if x is not None:
                        print(x)
            RECOMMEND_PG_DB.close()