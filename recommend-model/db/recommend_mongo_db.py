import os
from pymongo import MongoClient

from common_util.common_tool import CommonTool

current_logger = CommonTool().get_logger()

def read_recommend_mongo_db_config():
    current_common_tool = CommonTool()
    current_logger.debug("project_root {project_root}".format(project_root=current_common_tool.get_project_directory()))
    recommend_pg_db_path = os.path.join(os.path.join(current_common_tool.get_project_directory(),'resources'), 'recommend_mongo_db.json')
    recommend_pg_db_config = current_common_tool.read_json(recommend_pg_db_path)
    return recommend_pg_db_config

recommend_mongo_db_config  = read_recommend_mongo_db_config()

RECOMMEND_MONGO_CLIENT = MongoClient(host=recommend_mongo_db_config['host'],port=recommend_mongo_db_config['port'],username=recommend_mongo_db_config['username'],password=recommend_mongo_db_config['password'],connect=True,maxPoolSize = 50)
RECOMMEND_MONGO_DB = RECOMMEND_MONGO_CLIENT['recommend']