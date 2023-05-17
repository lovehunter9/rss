test_single(){
  sudo docker stop airflow-scheduler-test-single
  sudo docker stop airflow-webserver-test-single
  sudo docker rm airflow-scheduler-test-single
  sudo docker rm airflow-webserver-test-single

}

release_single(){
  sudo docker stop airflow-scheduler-release-single
  sudo docker stop airflow-webserver-release-single
  sudo docker rm airflow-scheduler-release-single
  sudo docker rm airflow-webserver-release-single
}

release_distribution(){
    echo "release-distribution"
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