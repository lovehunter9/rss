remove_none_images(){
    sudo docker rmi $(sudo docker images --filter "dangling=true" -q --no-trunc)
}
remove_none_images