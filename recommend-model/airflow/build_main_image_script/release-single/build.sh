SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd ) #test-single
BUILD_MAIN_IMAGE_SCRIPT_DIR=$(dirname -- "$SCRIPT_DIR")  
AIRFLOW_DIR=$(dirname -- "$BUILD_MAIN_IMAGE_SCRIPT_DIR")  
RECOMMEND_DIR=$(dirname -- "$AIRFLOW_DIR")
OUTTER_DIR=$(dirname -- "$RECOMMEND_DIR")
OUTTER_LOG_DIR=$OUTTER_DIR/LOG
PREFIX=bytetrade
BYTETRADE_IMAGE_NAME=$PREFIX/airflow-release-single
BYTETRADE_IMAGE_VERSION="latest"


sudo docker build -t $BYTETRADE_IMAGE_NAME:$BYTETRADE_IMAGE_VERSION -f $RECOMMEND_DIR/airflow/build_main_image_script/release-single/Dockerfile $OUTTER_DIR