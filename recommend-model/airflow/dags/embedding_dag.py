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
import nltk

default_args = {
    # 'on_failure_callback': task_fail_slack_a
    # 'on_success_callback': success_callbac
    'start_date': days_ago(7),
    'retries': 1

}

model_dir = "/opt/model"
model_tool = ModelTool(model_dir)
model_name_to_version_list = model_tool.get_valid_model_and_version()
daily_tool = DailyPackageTool(model_dir)
doc_tool = DocTool()

@task(task_id=f'calculate_embedding', trigger_rule='all_success')
def create_calculate_embedding_task(model_name,model_version):
    nltk.download('punkt')
    doc_tool.calculate_embedding_for_all_article(model_name,model_version,model_dir)

@task(task_id=f'generate_package', trigger_rule='all_success')
def create_generate_package_task(model_name,model_version):
    for current_support_number in model_tool.get_latest_article_embedding_package_support_number():
        daily_tool.generate_protobuf_package_and_upload_to_s3(model_name,model_version,current_support_number)

    
    
for model_name,model_version_list in model_name_to_version_list.items():
    for current_version in model_version_list:
        with DAG(
            dag_id = f'{model_name}_{current_version}',
            schedule_interval="0 1 * * *",
            default_args=default_args,
            catchup=False,
            tags=[model_name],
            dagrun_timeout=timedelta(hours=12),
            max_active_runs=1
        ) as locals()[f'{model_name}_{current_version}']:
            start_operator = EmptyOperator(task_id="start")
            end_operator = EmptyOperator(task_id="end")
            start_operator >> create_calculate_embedding_task(model_name,current_version) >> create_generate_package_task(model_name,current_version) >> end_operator
                    