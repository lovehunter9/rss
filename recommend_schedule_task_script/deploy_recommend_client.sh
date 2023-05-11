# sudo bash deploy_recommend_client.sh /home/ubuntu/download_s3
PREFIX=bytetrade
RECOMMEND_SCHEDULE_TASK=recommend_schedule_task
CONTAINER_MODEL_PATH=/opt/model
HOST_MODEL_PATH=$1 #/home/ubuntu/download_s3
docker run --name $RECOMMEND_SCHEDULE_TASK -e model_path=$CONTAINER_MODEL_PATH -e schedule_task_interval=2  -v $HOST_MODEL_PATH:$CONTAINER_MODEL_PATH    -d $PREFIX/recommend_schedule_task:latest 