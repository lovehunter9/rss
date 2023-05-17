from enum import IntEnum

class EmbeddingEnum(IntEnum):
    ARTICLE_CLEAN = 0
    WORD2VEC_GOOGLE = 1
    BERT = 2
    DOC2VEC = 3
    # when new field add
    

class EmbeddingStatus(IntEnum):
    UNPROCESSED = 0
    PROCESSED = 1
    PROCESSFAIL = 2
    
    
