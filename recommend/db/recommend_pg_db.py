import logging
import os
from peewee import *
from playhouse.pool import PooledPostgresqlDatabase
from playhouse.postgres_ext import *

from common_util.common_tool import CommonTool

current_logger = CommonTool().get_logger()
peewee_logger = logging.getLogger('peewee')
peewee_logger.addHandler(logging.StreamHandler())

dbhost = os.environ.get('dbhost', '52.90.117.51')
dbuser = os.environ.get('dbuser', 'postgres')
dbpassword = os.environ.get('dbpassword', 'postgres')
database = os.environ.get('database', 'rss')
RECOMMEND_PG_DB = PooledPostgresqlDatabase(database=database, user=dbuser, password=dbpassword, host=dbhost, stale_timeout=300, max_connections=100)


class RecommendPGBaseModel(Model):

    class Meta:
        database = RECOMMEND_PG_DB


class UsersModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    model_name = TextField(null=False)
    model_version = TextField(null=False)
    recommend_language = TextField(null=False)

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
    language = TextField(null=True)

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
    language = TextField(null=True)
    model_name = TextField(null=False)
    model_version = TextField(null=False)

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
    cloud_id = BigIntegerField(null=False)
    keyword = TextField(null=True)
    language = TextField(null=True)

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
    disabled = BooleanField(null=True)

    class Meta:
        db_table = 'recommend_feed'
        primary_key = False


class RecommendResultModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    batch = IntegerField(null=True)
    cloud_id = BigIntegerField(null=True)
    url = BigIntegerField(null=True)
    score = DecimalField(null=True)
    rank = IntegerField(null=True)
    language = TextField(null=True)
    impression_at = DateTimeField(null=True)

    class Meta:
        db_table = 'recommend_result'
        primary_key = False


class RecommendBlacklist(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    feed_id = BigIntegerField(null=False)
    feed_url = TextField(null=False)
    entry_url = TextField(null=True, index=True)
    full_content = TextField(null=True)
    status = IntegerField(null=True)

    class Meta:
        db_table = 'recommend_blacklist'
        primary_key = False


class RecommendKeywordlist(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    batch = IntegerField(null=True)
    keyword = TextField(null=False)
    url = TextField(null=True, index=True)
    rank = TextField(null=True)
    language = TextField(null=True)
    impression_at = DateTimeField(null=True)

    class Meta:
        db_table = 'recommend_result_keyword'
        primary_key = False


class RecommendReadStatModel(RecommendPGBaseModel):
    id = BigIntegerField(null=False, unique=True, index=True)
    batch = IntegerField(null=True)
    entry_id = IntegerField(null=False)
    cloud_id = IntegerField(null=False)
    vector_data_check = IntegerField(null=True, index=True)

    class Meta:
        db_table = 'stat_entry_read'
        primary_key = False


class RecommendPackageInfoModel(RecommendPGBaseModel):
    package_id = TextField(null=False, unique=True, index=True)
    model_name = TextField(null=False)
    model_version = TextField(null=False)
    main_language = TextField(null=True)
    entry_number = IntegerField(null=True)
    published_at_earliest = DateTimeField(null=False)
    published_at_latest = DateTimeField(null=True, index=True)
    generate_package_at = DateTimeField(null=True, index=True)

    class Meta:
        db_table = 'recommend_package_info'
        primary_key = False