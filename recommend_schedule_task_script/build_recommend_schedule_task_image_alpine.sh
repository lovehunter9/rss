SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
RSS_DIR=$(dirname -- "$SCRIPT_DIR")
DOCKER_FILE_PATH=$RSS_DIR/Dockerfile.recommend_schedule_task_alpine
PREFIX=bytetrade
docker build \
    -f ${DOCKER_FILE_PATH} \
    -t ${PREFIX}/recommend_schedule_task_alpine $RSS_DIR