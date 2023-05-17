from airflow import DAG
from airflow.operators.python import PythonVirtualenvOperator
from airflow.utils.task_group import TaskGroup
from airflow.operators.bash import BashOperator
from airflow.operators.empty import EmptyOperator
from airflow.decorators import task
from airflow.utils.dates import days_ago

import sys
sys.path.append("/opt/recommend-model")
from embedding.model_tool import ModelTool
from embedding.daily_package_tool import DailyPackageTool
from embedding.doc_tool import DocTool
import os 
from datetime import timedelta

default_args = {
    # 'on_failure_callback': task_fail_slack_a
    # 'on_success_callback': success_callbac
    'start_date': days_ago(7),
    'retries': 1

}

model_dir = "/opt/model"
daily_tool = DailyPackageTool(model_dir)
doc_tool = DocTool()


@task(task_id=f'calculate_embedding', trigger_rule='all_success')
def create_generate_feed_package_task():
    daily_tool.generate_feed_package_and_upload_to_s3()

with DAG(
    dag_id = f'generate_feed_package',
    schedule_interval="0 1 * * *",
    default_args=default_args,
    catchup=False,
    tags=['generate_feed_package'],
    dagrun_timeout=timedelta(hours=12),
    max_active_runs=1
) as locals()[f'generate_feed_package']:
    start_operator = EmptyOperator(task_id="start")
    end_operator = EmptyOperator(task_id="end")
    start_operator >> create_generate_feed_package_task() >> end_operator