from bs4 import BeautifulSoup
import hashlib
from tqdm import tqdm
from transformers import BertTokenizer

from common_util.aws_s3_tool import AWSS3Tool
from db.recommend_pg_db_tool import RecommendPGDBTool
from embedding.embedding_enum import EmbeddingEnum,EmbeddingStatus
from common_util.common_tool import CommonTool


class ArticleClassificationTool:
    def __init__(self) -> None:
        self.__recommend_pg_tool = RecommendPGDBTool()
        self.__bert_tokenizer = BertTokenizer.from_pretrained('bert-base-cased')
        self.__whether_bert_tokenize_field_name = "whether_bert_base_cased_tokenize"
        self.__common_tool = CommonTool()
        self.__logger = CommonTool().get_logger()
        self.__bucket_name =  "gpu-model-data"
        self.__url_to_clean_text_s3_key = 'url_to_clean_text'
        self.__s3_tool = AWSS3Tool()
    
    def process_article_whether_bert_base_cased_tokenize(self):
        while True:
            unprocess_bert_entry_list = self.__recommend_pg_tool.select_entry_without_embedding(1000,'whether_bert_base_cased_tokenize')  
            if len(unprocess_bert_entry_list) < 1:
                break
            for current_entry in unprocess_bert_entry_list:
                try:
                    full_content = current_entry['full_content']
                    entry_id = current_entry["id"]
                    soup = BeautifulSoup(current_entry['full_content'], 'html.parser')
                    clean_text = soup.get_text()
                    bert_input = self.__bert_tokenizer(clean_text,padding='max_length', max_length = 512, 
                            truncation=True, return_tensors="pt")
                    self.__recommend_pg_tool.update_entry_embedding_common_eval_version(current_entry['id'],EmbeddingStatus.PROCESSED,self.__whether_bert_tokenize_field_name)
                    self.__logger.debug(f'current entry id {entry_id}')
                except Exception as ex:
                    self.__logger.error(f"process article error {ex}")
                    self.__recommend_pg_tool.update_entry_embedding_common_eval_version(current_entry['id'],EmbeddingStatus.PROCESSFAIL,self.__whether_bert_tokenize_field_name)
        
    
    def prepare_url_to_clean_text(self):
        can_bert_tokenize_article_list = self.__recommend_pg_tool.select_all_bert_tokenize_valid_entry(self.__whether_bert_tokenize_field_name)
        # can_bert_tokenize_article_list = can_bert_tokenize_article_list[:100]
        url_set = set()   
        for current_entry in can_bert_tokenize_article_list:
            current_url = current_entry["url"]
            url_set.add(current_url)
        list_url_hash = list(url_set)
        list_url_hash.sort()
        concat_url_string = ':'.join(list_url_hash)
        url_sort_hash = self.__common_tool.calculate_md5_for_bytes(concat_url_string.encode("utf-8"))
        self.__logger.debug(f"url_sort_hash {url_sort_hash}")
        exist = True
        try:
            meta_data = self.__s3_tool.get_object_header(self.__bucket_name,self.__url_to_clean_text_s3_key)["Metadata"]
        except Exception as ex:
            exist = False
        if exist and "concat_url_hash" in meta_data and meta_data["concat_url_hash"] == url_sort_hash:
            self.__logger.debug("url_clean_text does not change")
            return
        
        exist_url_to_clean_text = None
        if exist:
            get_dict_result = self.__s3_tool.get_object_dict(self.__bucket_name,self.__url_to_clean_text_s3_key)
            if get_dict_result["success"]:
                self.__logger.debug('get exist url clean text success')
                exist_url_to_clean_text = get_dict_result["dict"]
                
        if exist_url_to_clean_text is None:
            self.__logger.debug("exist_url_to_clean_text is None")
            exist_url_to_clean_text = dict()
        
        exist_urls = set(list(exist_url_to_clean_text.keys()))
        not_exist_url = url_set - exist_urls 
        self.__logger.debug(f'not_exist_url length {len(not_exist_url)}')
        
        new_url_to_clean_text = dict()
        for current_entry in tqdm(can_bert_tokenize_article_list):
            current_url = current_entry["url"]

            if current_url in not_exist_url:
                current_full_content = current_entry["full_content"]
                soup = BeautifulSoup(current_full_content, 'html.parser')
                clean_text = soup.get_text()
                new_url_to_clean_text[current_url] = clean_text
            else:
                new_url_to_clean_text[current_url] = exist_url_to_clean_text[current_url]
            
        meta_data_dict = dict()
        meta_data_dict['concat_url_hash'] = url_sort_hash
        self.__logger.debug(f'new_url_to_clean_text length {len(new_url_to_clean_text)}')
        self.__s3_tool.put_oject_dict(self.__bucket_name,self.__url_to_clean_text_s3_key,meta_data_dict,new_url_to_clean_text)     