import os
from datetime import datetime
import schedule
import time
import traceback
from recommend_model_sdk.tools.common_tool import CommonTool
from handler.rank import RankHandler

current_logger = CommonTool().get_logger()
common_tool = CommonTool()


def schedule_rank_task():
    handler = RankHandler()
    current_logger.debug(f'schedule_rank_task')
    try:
        start_time = datetime.now()
        current_logger.debug(f'schedule_rank_task start  {start_time}')
        RankHandler.rank()
        current_logger.debug(f'diff time {common_tool.compute_diff_time(start_time,datetime.now())}')
    except Exception as ex:
        tb = traceback.format_exc()
        current_logger.error(f'error {tb}')


def schedule_probe():
    current_logger.debug(f'schedule_probe datetime {datetime.now()}')


if __name__ == '__main__':
    import nltk
    nltk.download('stopwords')
    # schedule_rank_task()
    schedule_task_interval = int(os.environ.get('schedule_task_interval', 240))
    schedule.every(schedule_task_interval).minutes.do(schedule_rank_task)
    schedule.every(1).minutes.do(schedule_probe)
    init_first = False
    start_time = datetime.now()
    common_tool = CommonTool()
    while True:
        if init_first is False:
            current_logger.debug(f"checker init_first {init_first} {datetime.now()}")
            diff_time = common_tool.compute_diff_time(start_time, datetime.now())
            if diff_time > 60:
                current_logger.debug(f"first init time {datetime.now()}")
                schedule_rank_task()
                init_first = True
        schedule.run_pending()
        time.sleep(60)