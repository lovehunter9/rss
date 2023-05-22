import logging
import os
from peewee import *
from playhouse.pool import PooledPostgresqlDatabase

from common_util.common_tool import CommonTool
from embedding.embedding_enum import EmbeddingStatus

current_logger = CommonTool().get_logger()
peewee_logger = logging.getLogger('peewee')
peewee_logger.addHandler(logging.StreamHandler())

def read_recommend_db_config():
    current_common_tool = CommonTool()
    current_logger.debug("project_root {project_root}".format(project_root=current_common_tool.get_project_directory()))
    recommend_pg_db_path = os.path.join(os.path.join(current_common_tool.get_project_directory(),'resources'), 'recommend_pg_db.json')
    recommend_pg_db_config = current_common_tool.read_json(recommend_pg_db_path)
    return recommend_pg_db_config


pg_config = read_recommend_db_config()
RECOMMEND_PG_DB = PooledPostgresqlDatabase(database=pg_config['database'],user=pg_config["user"],password=pg_config["password"],host=pg_config["host"],stale_timeout=300,max_connections=1000)

class RecommendPGBaseModel(Model):
    class Meta:
        database = RECOMMEND_PG_DB


class EntryModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False,unique=True,index=True)
    full_content = TextField(null=True)
    url = TextField(null=True)
    created_at = DateTimeField(null=False,index=True)
    published_at = DateTimeField(null=False,index=True)
    title = TextField(null=True)
    content = TextField(null=True)
    author = TextField(null=True)
    feed_id = BigIntegerField(null=False,index=True)
    hash=TextField(null=True)
    class Meta:
        db_table = 'entries'
        primary_key = False
  
class EntryEmbeddingModel(RecommendPGBaseModel):
    entry_id = BigIntegerField(unique=True,null=False,index=True)
    article_clean = IntegerField(null=True,default=int(EmbeddingStatus.UNPROCESSED))
    word2vec_google_v1 = IntegerField(null=True,default=int(EmbeddingStatus.UNPROCESSED))
    bert_v1 = IntegerField(null=True,default=int(EmbeddingStatus.UNPROCESSED))
    doc2vec_v1 = IntegerField(null=True,default=int(EmbeddingStatus.UNPROCESSED))
    word2vec_google_v2 = IntegerField(null=True,default=int(EmbeddingStatus.UNPROCESSED))
    whether_bert_base_cased_tokenize = IntegerField(null=True,default=int(EmbeddingStatus.UNPROCESSED))
    class Meta:
        db_table = 'entries_embedding'
        primary_key = False


class FeedsModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False,unique=True,index=True)
    feed_url = TextField(null=True)
    site_url = TextField(null=True)
    title = TextField(null=True)
    category_id = BigIntegerField(null=False)
    icon_id = BigIntegerField(null=False)
    class Meta:
        db_table = 'feeds'
        primary_key = False

class IconsModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False,unique=True,index=True)
    mime_type = TextField(null=True)
    content = BlobField(null=True)
    class Meta:
        db_table = 'icons'
        primary_key = False

class CategoriesModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False,unique=True,index=True)
    title = TextField(null=True)
    parent_id = BigIntegerField(null=False)
    class Meta:
        db_table = 'categories'
        primary_key = False