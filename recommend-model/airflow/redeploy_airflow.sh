remove_none_images(){
    sudo docker rmi $(sudo docker images --filter "dangling=true" -q --no-trunc)
}
test_single(){
   sudo bash stop_pg.sh test
   sudo bash stop_airflow.sh  test-single
   sudo bash pg_build/build.sh
   sudo bash deploy_pg.sh test 
   sudo bash build_base_image_script/build.sh
   sudo bash build_main_image_script/test-single/build.sh  
   sudo bash deploy_airflow.sh test-single
   remove_none_images
}

release_single(){
   sudo bash stop_pg.sh release
   sudo bash stop_airflow.sh  release-single
   sudo bash pg_build/build.sh
   sudo bash deploy_pg.sh test 
   sudo bash build_base_image_script/build.sh
   sudo bash build_main_image_script/release-single/build.sh
   sudo bash deploy_pg.sh release 
   sudo bash deploy_airflow.sh release-single
   remove_none_images
}

release_distribution(){
    echo "release_distribution"
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