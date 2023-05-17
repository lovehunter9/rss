SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd ) # airflow
RECOMMEND_DIR=$(dirname -- "$SCRIPT_DIR")
OUTTER_DIR=$(dirname -- "$RECOMMEND_DIR")
OUTTER_LOG_DIR=$OUTTER_DIR/LOG
OUTTER_MODEL_DIR=$OUTTER_DIR/MODEL
PREFIX=bytetrade
BASE_PATH="/opt/recommend-model"


test_single(){
    AIRFLOW_WEB_SERVER="airflow-webserver-test-single"
    AIRFLOW_WEB_SCHEDULER="airflow-scheduler-test-single"
    BYTETRADE_IMAGE_NAME=$PREFIX/airflow-test-single
    BYTETRADE_IMAGE_VERSION="latest"

    docker run --name $AIRFLOW_WEB_SERVER  -p 8081:8080 -v $RECOMMEND_DIR:$BASE_PATH -v $OUTTER_LOG_DIR:/root/airflow/logs -v $OUTTER_MODEL_DIR:/opt/model  -d $BYTETRADE_IMAGE_NAME:$BYTETRADE_IMAGE_VERSION airflow webserver -p 8080
    docker run --name $AIRFLOW_WEB_SCHEDULER   -v $RECOMMEND_DIR:$BASE_PATH -v $OUTTER_LOG_DIR:/root/airflow/logs -v $OUTTER_MODEL_DIR:/opt/model  -d $BYTETRADE_IMAGE_NAME:$BYTETRADE_IMAGE_VERSION airflow scheduler
    echo "Listening at: http://0.0.0.0:8081"
    echo "username: test-single"
    echo "password: bytetrade"
}


release_single(){
    AIRFLOW_WEB_SERVER="airflow-webserver-release-single"
    AIRFLOW_WEB_SCHEDULER="airflow-scheduler-release-single"
    BYTETRADE_IMAGE_NAME=$PREFIX/airflow-release-single
    BYTETRADE_IMAGE_VERSION="latest"

    docker run --name $AIRFLOW_WEB_SERVER  -p 8080:8080 -v $RECOMMEND_DIR:$BASE_PATH -v $OUTTER_LOG_DIR:/root/airflow/logs -v $OUTTER_MODEL_DIR:/opt/model   -d $BYTETRADE_IMAGE_NAME:$BYTETRADE_IMAGE_VERSION airflow webserver -p 8080
    docker run --name $AIRFLOW_WEB_SCHEDULER   -v $RECOMMEND_DIR:$BASE_PATH -v $OUTTER_LOG_DIR:/root/airflow/logs -v $OUTTER_MODEL_DIR:/opt/model  -d $BYTETRADE_IMAGE_NAME:$BYTETRADE_IMAGE_VERSION airflow scheduler
    echo "Listening at: http://0.0.0.0:8080"
    echo "username: release-single"
    echo "password: bytetrade"
}

release-distribution(){
    # worker or scheduler or master
    echo 'release-distribution'
}

if [ ${1} = "test-single" ]
then
test_single
elif [ ${1} = "release-single" ]
then
release_single
elif [ ${1} = "release-distribution" ]
then
release_distribution
fi