PG_NAME_RELEASE="airflow-pg-release"
PG_NAME_TEST="airflow-pg-test"
PREFIX=bytetrade
PG_ROOT_PASSWORD="bytetrade123!"

test(){
    sudo docker stop $PG_NAME_TEST
    sudo docker rm $PG_NAME_TEST
}


release(){
    sudo docker stop $PG_NAME_RELEASE
    sudo docker rm $PG_NAME_RELEASE
}
if [ ${1} = "test" ]
then
test
elif [ ${1} = "release" ]
then
release
fi