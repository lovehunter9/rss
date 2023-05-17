SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR
ROOT_DIR=$(dirname -- "$SCRIPT_DIR")
echo $ROOT_DIR
DOCKER_FILE_PATH=$SCRIPT_DIR/Dockerfile
PREFIX=bytetrade
docker build \
    -f ${DOCKER_FILE_PATH} \
    -t ${PREFIX}/pg $SCRIPT_DIR