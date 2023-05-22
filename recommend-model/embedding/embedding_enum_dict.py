from embedding.embedding_enum import EmbeddingEnum
from db.recommend_pg_db import EntryEmbeddingModel

'''
class EmbeddingEnumToPGFieldDict:
    def __init__(self) -> None:
        self.__name_to_enum = dict()
        self.__enum_to_name = dict()
        self.__name_to_enum['word2vec_google_embedding'] = EmbeddingEnum.WORD2VEC_GOOGLE
        self.__enum_to_name[EmbeddingEnum.WORD2VEC_GOOGLE] = 'word2vec_google_embedding'
        self.__name_to_enum['bert_embedding'] = EmbeddingEnum.BERT
        self.__enum_to_name[EmbeddingEnum.BERT] = 'bert_embedding'
        self.__name_to_enum['doc2vec_embedding'] = EmbeddingEnum.DOC2VEC
        self.__enum_to_name[EmbeddingEnum.DOC2VEC] = 'doc2vec_embedding'
   
    def get_enum_according_name(self,variable_name):
        if isinstance(variable_name,str) is False:
            raise ValueError('variable_name is not str')
        if variable_name not in self.__name_to_enum:
            raise ValueError(f'variable_name {variable_name} is not exist')
        return self.__name_to_enum[variable_name]
    
    def get_name_according_enum(self,enum_name):

        if isinstance(enum_name,EmbeddingEnum) is False:
            raise ValueError('enum_name is not GoogleCampaginExperimentEnum')
        if enum_name not in self.__enum_to_name:
            raise ValueError('enum_name is not in dict')
        return self.__enum_to_name[enum_name] 

EMBEDDING_ENUM_TO_PG_FIELD_DICT = EmbeddingEnumToPGFieldDict()


class EmbeddingEnumToEntryEmbeddingModelDict:
    def __init__(self) -> None:
        self.__embedding_enum_to_pg_field = dict()
        self.__pg_field_to_embedding_enum = dict()
        self.__embedding_enum_to_pg_field[EmbeddingEnum.WORD2VEC_GOOGLE] = EntryEmbeddingModel.word2vec_google_embedding
        self.__pg_field_to_embedding_enum[EntryEmbeddingModel.word2vec_google_embedding] = EmbeddingEnum.WORD2VEC_GOOGLE
        self.__pg_field_to_embedding_enum[EntryEmbeddingModel.bert_embedding] = EmbeddingEnum.BERT
        self.__embedding_enum_to_pg_field[EmbeddingEnum.BERT] = EntryEmbeddingModel.bert_embedding
        self.__pg_field_to_embedding_enum[EntryEmbeddingModel.doc2vec_embedding] = EmbeddingEnum.DOC2VEC
        self.__embedding_enum_to_pg_field[EmbeddingEnum.DOC2VEC] = EntryEmbeddingModel.doc2vec_embedding
   
    def get_enum_acording_pg_field(self,pg_field):

        if pg_field not in self.__pg_field_to_embedding_enum:
            raise ValueError(f'pg_field {pg_field} is not exist')
        return self.__pg_field_to_embedding_enum[pg_field]
    
    def get_pg_field_according_embedding_enum(self,enum_name):

        if isinstance(enum_name,EmbeddingEnum) is False:
            raise ValueError('enum_name is not GoogleCampaginExperimentEnum')
        if enum_name not in self.__embedding_enum_to_pg_field:
            raise ValueError('enum_name is not in dict')
        return self.__embedding_enum_to_pg_field[enum_name] 
    

EMBEDDING_ENUM_TO_ENTRY_EMBEDDING_MODEL_DICT = EmbeddingEnumToEntryEmbeddingModelDict()
'''

class EntriesEmbeddingColumnNameToPeeweeAttributeDict:
    def __init__(self) -> None:
        self.__column_name_to_peewee_attribute = dict()
        self.__peewee_attribute_to_column_name = dict()
        self.__column_name_to_peewee_attribute['word2vec_google_v1'] = EntryEmbeddingModel.word2vec_google_v1
        self.__peewee_attribute_to_column_name[EntryEmbeddingModel.word2vec_google_v1] = 'word2vec_google_v1'
        self.__column_name_to_peewee_attribute['bert_v1'] = EntryEmbeddingModel.bert_v1
        self.__peewee_attribute_to_column_name[EntryEmbeddingModel.bert_v1] = 'bert_v1'
        self.__column_name_to_peewee_attribute['doc2vec_v1'] = EntryEmbeddingModel.doc2vec_v1
        self.__peewee_attribute_to_column_name[EntryEmbeddingModel.doc2vec_v1] = 'doc2vec_v1'
        self.__peewee_attribute_to_column_name[EntryEmbeddingModel.word2vec_google_v2] = 'word2vec_google_v2'
        self.__column_name_to_peewee_attribute['word2vec_google_v2'] = EntryEmbeddingModel.word2vec_google_v2
        self.__column_name_to_peewee_attribute['whether_bert_base_cased_tokenize'] = EntryEmbeddingModel.whether_bert_base_cased_tokenize
        self.__peewee_attribute_to_column_name[EntryEmbeddingModel.whether_bert_base_cased_tokenize] = 'whether_bert_base_cased_tokenize'
    
    def get_peewee_attribute_to_column_name(self,column_name):
        if isinstance(column_name,str) is False:
            raise ValueError("column name is not str")
        if column_name not in self.__column_name_to_peewee_attribute:
            raise ValueError(f"column name {column_name} have no corresponding peewee attribute")
        return self.__column_name_to_peewee_attribute[column_name]
    
    def get_column_name_according_peewee_attribute(self,peewee_attribute):
        if peewee_attribute not in self.__peewee_attribute_to_column_name:
            raise ValueError(f'peewee attribute have no corresponding column name')
        return self.__peewee_attribute_to_column_name[peewee_attribute]


ENTRIES_EMBEDDING_COLUMN_NAME_TO_PEEWEE_ATTRIBUTE = EntriesEmbeddingColumnNameToPeeweeAttributeDict()