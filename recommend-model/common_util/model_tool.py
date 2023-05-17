import os

from common_util.common_tool import CommonTool

class ModelTool:
    def __init__(self) -> None:
        self.__common_tool = CommonTool()
        self.__model_related_files_suffix_set = set(["gz","direct"])
    
    def validate_model_key_field(self,current_model_detail):
        '''
        v1":{
            "mongodb_embedding_field":"word2vec_google_v1",
            "pg_embedding_mark_field":"word2vec_google_embedding",
            "s3_bucket":"gpu-model-data",
            "model_related_files":["GoogleNews-vectors-negative300.bin","tfidf.model","dictionary"]
        }
        '''
        if isinstance(current_model_detail,dict) is False:
            raise ValueError('mongodb_embedding_field is not dict')
        if "mongodb_embedding_field" not in current_model_detail:
            raise ValueError("mongodb_embedding_field is not exist")
        mongodb_embedding_field = current_model_detail["mongodb_embedding_field"]
        if isinstance(mongodb_embedding_field,str) is False:
            raise ValueError("mongodb_embedding_field is not exist")
        
        if "pg_embedding_mark_field" not in current_model_detail:
            raise ValueError("pg_embedding_mark_field is not exist")
        pg_embedding_mark_field = current_model_detail["pg_embedding_mark_field"]
        if isinstance(pg_embedding_mark_field,str) is False:
            raise ValueError("pg_embedding_mark_field is not str")
        
        if "s3_bucket" not in current_model_detail:
            raise ValueError("s3_bucket not in")
        s3_bucket = current_model_detail["s3_bucket"]
        if isinstance(s3_bucket,str) is False:
            raise ValueError("s3_bucket is not str")
        
        if "model_related_files" not in  current_model_detail:
            raise ValueError("model_related_files is not exist")
        model_related_files = current_model_detail["model_related_files"]
        if isinstance(model_related_files,list) is False:
            raise ValueError("model_related_files not exist")
        for current_file in model_related_files:
            if isinstance(current_file,str) is False:
                raise ValueError("current_file is not exist")
            
        if "model_related_files_suffix" not in current_model_detail:
            raise ValueError("model_related_files_suffix not in current_model_detail")
        model_related_files_suffix = current_model_detail["model_related_files_suffix"]
        if isinstance(model_related_files_suffix,dict) is False:
            raise ValueError("model_related_files_suffix is not dict")
        for current_file_name in model_related_files:
            if current_file_name not in model_related_files_suffix:
                raise ValueError(f'current_file_name {current_file_name} have no suffix')
            
            current_file_name_suffix = model_related_files_suffix[current_file_name]
            if current_file_name_suffix not in self.__model_related_files_suffix_set:
                raise ValueError(f"current_file_name_suffix {current_file_name_suffix} is not valid")
        
        if "model_related_files_public" not in current_model_detail:
            raise ValueError("model_related_files_public is not exist")
        model_related_files_public = current_model_detail["model_related_files_public"]
        for current_file_name in model_related_files:
            if current_file_name not in model_related_files_public:
                raise ValueError(f"current_file_name {current_file_name} not in model_related_files_public")
            current_file_name_public = model_related_files_public[current_file_name]
            if isinstance(current_file_name_public,bool) is False:
                raise ValueError(F"current_file_name {current_file_name} current_file_name_public is  not bool")
        
        
        
        
    def validate_model_management_file(self,path):
        if isinstance(path,str) is False:
            raise ValueError(f"path {path} is not str")
        if os.path.exists(path) is False:
            raise ValueError("path is not exist")
        model_management_dict = self.__common_tool.read_json(path)
        model_name_set = model_management_dict.keys()
        
        
        mongodb_embedding_field_set =  set()
        pg_embedding_mark_field_set = set()
        for current_model_name in model_name_set:
            if len(model_management_dict[current_model_name]) < 1:
                raise ValueError(f'current_model {current_model_name} have not valid model')
            for version_name,current_model_detail in model_management_dict[current_model_name].items():
                self.validate_model_key_field(current_model_detail)
                mongodb_embedding_field = current_model_detail["mongodb_embedding_field"]
                pg_embedding_mark_field = current_model_detail["pg_embedding_mark_field"]
                if mongodb_embedding_field in mongodb_embedding_field_set:
                    raise ValueError(f"mongodb_embedding_field {mongodb_embedding_field} exist more than two model version")
                else:
                    mongodb_embedding_field_set.add(mongodb_embedding_field)
                if pg_embedding_mark_field in pg_embedding_mark_field_set:
                    raise ValueError(f"pg_embedding_mark_field {pg_embedding_mark_field} exist more than  model version")
                else:
                    pg_embedding_mark_field_set.add(pg_embedding_mark_field)
        return model_management_dict