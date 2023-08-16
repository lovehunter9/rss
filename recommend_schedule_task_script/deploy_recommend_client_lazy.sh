# sudo bash deploy_recommend_client_lazy.sh /ssd/code/MODEL_CLIENT
PREFIX=bytetrade
RECOMMEND_SCHEDULE_TASK=recommend_schedule_task_lazy
CONTAINER_MODEL_PATH=/opt/model
HOST_MODEL_PATH=$1 #/ssd/code/MODEL_CLIENT
docker run --name $RECOMMEND_SCHEDULE_TASK -e model_path=$CONTAINER_MODEL_PATH -e schedule_task_interval=2  -v $HOST_MODEL_PATH:$CONTAINER_MODEL_PATH    -d $PREFIX/recommend_schedule_task_lazy:latest 