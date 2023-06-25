import os
from datetime import datetime
import time
import traceback
from recommend_model_sdk.tools.common_tool import CommonTool
from handler.recommend_handler import RecommendHandler

current_logger = CommonTool().get_logger()


def schedule_rank_task():
    handler = RecommendHandler()
    current_logger.debug(f'schedule_rank_task')
    try:
        start_time = datetime.now()
        current_logger.debug(f'schedule_rank_task start  {start_time}')
        handler.recommend()
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
    schedule_task_interval_minutes = int(os.environ.get('schedule_task_interval', 2))
    current_logger.debug(f'schedule_task_interval_minutes {schedule_task_interval_minutes}')
    init_first = False
    start_time = datetime.now()
    common_tool = CommonTool()
    while True:
        if init_first is False:
            current_logger.debug(f"checker init_first {init_first} {datetime.now()}")
            diff_time_seconds = common_tool.compute_diff_time(start_time, datetime.now())
            
            if diff_time_seconds > 60:
                current_logger.debug(f"first init time {datetime.now()}")
                schedule_rank_task()
                init_first = True
                start_time = datetime.now()
        else:
            current_logger.debug(f'current execute {datetime.now()}')
            diff_time_seconds = common_tool.compute_diff_time(start_time,datetime.now())
            if diff_time_seconds > schedule_task_interval_minutes * 60:
                schedule_rank_task()
                start_time = datetime.now()      
        time.sleep(60)          
        current_logger.debug(f'current_time {datetime.now()}')
        
   
        