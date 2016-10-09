@ECHO off

ECHO Window Install...

install_docker_images.bat
install_docker_data_volume.bat
gulp-tool.bat "npm install"
