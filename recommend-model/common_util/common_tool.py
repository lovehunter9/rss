import gzip
import json
import os
import pandas  as pd
import peewee
import hashlib
import shutil

class CommonTool:
    def __init__(self) -> None:
        self.__language_set = set(['english'])

    def read_excel(self,path):
        if isinstance(path,str) is False:
            raise ValueError('path is not str')
        df = pd.read_excel(path)
        return json.loads(df.to_json(orient='records'))
    
    def write_json(self,content,path):
        if isinstance(content,dict) is False:
            raise ValueError("content is not dict")
        if isinstance(path, str) is False:
            raise ValueError("path is not str")
        with open(path, "w") as outfile:
            json.dump(content, outfile)
    
    def read_json(self,path):
        if isinstance(path,str) is False:
            raise ValueError("path is not str")
        if os.path.exists(path) is False:
            raise ValueError('current_path {current_path} is not exist'.format(current_path = path))
        with open(path, 'r', encoding="utf-8") as f:
            data = json.load(f)
        return data
    
    def get_project_directory(self):
        project_root = os.path.dirname(os.path.dirname(__file__))
        return project_root
    
    def get_offset_from_utc_hours(self,time_zone):
        import datetime
        current_time = datetime.datetime.now(time_zone)
        offset_hours = current_time.utcoffset().total_seconds()/60/60
        return offset_hours
    
    def get_logger(self):
        import logging
        logger = logging.getLogger(__name__)
        FORMAT = "[%(filename)s:%(lineno)s - %(funcName)20s() ] %(message)s"
        logging.basicConfig(format=FORMAT)
        logger.setLevel(logging.DEBUG)
        return logger
    
    def get_model_select_raw_sql(self,query_sql):
        if isinstance(query_sql,peewee.ModelSelect) is False:
            raise ValueError("sql is not peewee.ModelSelect")
        raw_sql,params = query_sql.sql()
        raw_sql = raw_sql.replace("?","{}").format(*params)
        return raw_sql,params
    
    def read_stop_word_set(self,lang):
        if lang not in self.__language_set:
            raise ValueError("lang is not exist")
        stop_word_path = os.path.join(os.path.join(self.get_project_directory(),'resources'),f"stopword_{lang}.txt")
        with open(stop_word_path,'r') as f:
            lines = f.readlines()
            clean_set = set()
            for current_line in lines:
                clean_set.add(current_line.replace('\n','').replace('\r',''))
        return clean_set
    
    
    def compress_file_gzip_in_same_directory(self,source_path):
        # https://gist.github.com/NHellFire/e5c0d69b238bf5f004dd469fd4a643f7 with progress
        if isinstance(source_path,str) is False:
            raise ValueError(f"{source_path} is not str")
        if os.path.exists(source_path) is False:
            raise ValueError(f'path {source_path} is not exist')
        source_dir_name = os.path.dirname(source_path)
        source_file_name = os.path.basename(source_path)
        dst_file_name = source_file_name+".gz"
        dst_path = os.path.join(source_dir_name,dst_file_name)
        self.get_logger().debug(f'source_path {source_path} dst_path {dst_path}')
        with open(source_path, 'rb') as f_in:
            with gzip.open(dst_path, 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out,length=2**20)
    
    def calculate_md5_for_file(self,path):
        if isinstance(path,str) is False:
            raise ValueError("path is not str")
        if os.path.exists(path) is False:
            raise ValueError(f'path {path} is not exist')
        with open(path, 'rb') as f:
            digest = hashlib.md5(f.read()).hexdigest()
        return digest
    
    def calculate_md5_for_bytes(self,data):
        if isinstance(data, (bytes, bytearray)) is False:
            raise ValueError("data is not md5") 
        return hashlib.md5(data).hexdigest()
    
    def calculate_md5_for_big_file(self,path,blocksize=2**20):
        if isinstance(path,str) is False:
            raise ValueError("path is not str")
        if os.path.exists(path) is False:
            raise ValueError(f'path {path} is not exist')
        m = hashlib.md5()
        with open( path , "rb" ) as f:
            while True:
                buf = f.read(blocksize)
                if not buf:
                    break
                m.update( buf )
        return m.hexdigest()

    def uncompress_file_gzip(self,input_path,output_path):
        if isinstance(input_path,str) is False:
            raise ValueError(f'input_path is not str')
        if os.path.exists(input_path) is False:
            raise ValueError(f'input_path {input_path} is not exist')
        if input_path[len(input_path)-3:] != ".gz":
            raise ValueError(f'not valid gz')
        with gzip.open(input_path, 'rb') as f_in:
            with open(output_path, 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out,length=2**20)
    