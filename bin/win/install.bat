@ECHO off

ECHO Window Install...

install_docker_images
install_docker_data_volume
gulp-tool "npm install"
