import os
from datetime import datetime
import schedule
import time
import traceback
from recommend_model_sdk.tools.common_tool import CommonTool
from handler.rank import RankHandler

current_logger = CommonTool().get_logger()

def schedule_rank_task():
    handler = RankHandler()
    current_logger.debug(f'schedule_rank_task')
    try:
        RankHandler.rank()
    except Exception as ex:
        tb = traceback.format_exc()
        current_logger.error(f'error {tb}')

def schedule_probe():
    current_logger.debug(f'schedule_probe datetime {datetime.now()}')
    

if __name__ == '__main__':
    import nltk
    nltk.download('stopwords')
    schedule_rank_task()
    schedule_task_interval = int(os.environ.get('schedule_task_interval', 240))
    schedule.every(schedule_task_interval).minutes.do(schedule_rank_task)
    schedule.every(1).minutes.do(schedule_probe)
    while True:
        schedule.run_pending()
        time.sleep(60)