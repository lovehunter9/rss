import logging
import os
from peewee import *
from playhouse.pool import PooledPostgresqlDatabase
from playhouse.postgres_ext import *

from common_util.common_tool import CommonTool

current_logger = CommonTool().get_logger()
peewee_logger = logging.getLogger('peewee')
peewee_logger.addHandler(logging.StreamHandler())

dbhost = os.environ.get('dbhost', '124.222.40.95')
dbuser = os.environ.get('dbuser', 'postgres')
dbpassword = os.environ.get('dbpassword', 'liujx123')
database = os.environ.get('database', 'miniflux2')
RECOMMEND_PG_DB = PooledPostgresqlDatabase(database=database, user=dbuser, password=dbpassword, host=dbhost, stale_timeout=300, max_connections=100)


class RecommendPGBaseModel(Model):

    class Meta:
        database = RECOMMEND_PG_DB


class UsersModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    model_name = TextField(null=False)
    model_version = TextField(null=False)

    class Meta:
        db_table = 'users'
        primary_key = False


class RecommendModelAndVersion(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    model_name = TextField(null=False)
    model_version = TextField(null=False)

    class Meta:
        db_table = 'recommend_model'
        primary_key = False


class EntriesModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    url = TextField(null=True)
    status = TextField(null=True)
    full_content = TextField(null=True)
    created_at = DateTimeField(null=False, index=True)
    published_at = DateTimeField(null=False, index=True)
    last_read_at = DateTimeField(null=False, index=True)

    class Meta:
        db_table = 'entries'
        primary_key = False


class EntriesEmbedingModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    entry_id = BigIntegerField(null=False)
    model_name = TextField(null=False)
    model_version = TextField(null=False)
    embedding = ArrayField(DecimalField, null=False)

    class Meta:
        db_table = 'entries_embedding'
        primary_key = False


class RecommendModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    batch = IntegerField(null=False)
    fetch_at = DateTimeField(null=False)

    class Meta:
        db_table = 'recommend'
        primary_key = False


class RecommendEntriesModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    feed_id = BigIntegerField(null=False)
    created_at = DateTimeField(null=False, index=True)
    published_at = DateTimeField(null=False, index=True)
    hash = TextField(null=True)
    title = TextField(null=True)
    author = TextField(null=True)
    url = TextField(null=True)
    content = TextField(null=True)
    full_content = TextField(null=True)
    image_url = TextField(null=True)

    class Meta:
        db_table = 'recommend_entries'
        primary_key = False


class RecommendEntriesEmbedingModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    url = TextField(null=False)
    model_name = TextField(null=False)
    model_version = TextField(null=False)
    embedding = ArrayField(DecimalField, null=False)

    class Meta:
        db_table = 'recommend_entries_embedding'
        primary_key = False


class RecommendFeedModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    title = TextField(null=True)
    feed_url = TextField(null=True)
    feed_description = TextField(null=True)
    site_url = TextField(null=True)
    icon_type = TextField(null=True)
    icon_content = BlobField(null=True)
    category_id = BigIntegerField(null=True)
    category_title = TextField(null=True)

    class Meta:
        db_table = 'recommend_feed'
        primary_key = False


class RecommendResultModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    batch = IntegerField(null=True)
    url = BigIntegerField(null=True)
    entry_id = DateTimeField(null=False, index=True)
    score = DecimalField(null=True)
    rank = IntegerField(null=True)

    class Meta:
        db_table = 'recommend_result'
        primary_key = False