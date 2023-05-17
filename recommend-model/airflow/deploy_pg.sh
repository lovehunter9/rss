
PG_NAME_RELEASE="airflow-pg-release"
PG_NAME_TEST="airflow-pg-test"
PREFIX=bytetrade
PG_ROOT_PASSWORD="bytetrade123!"

test(){
    sudo docker run --name $PG_NAME_TEST -e POSTGRES_PASSWORD=$PG_ROOT_PASSWORD -e ALLOW_IP_RANGE=0.0.0.0/0  -p 5433:5432  -d $PREFIX/pg
}


release(){
    sudo docker run --name $PG_NAME_RELEASE -e POSTGRES_PASSWORD=$PG_ROOT_PASSWORD -e ALLOW_IP_RANGE=0.0.0.0/0  -p 5432:5432  -d $PREFIX/pg
}
if [ ${1} = "test" ]
then
test
elif [ ${1} = "release" ]
then
release
fi