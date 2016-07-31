#!/bin/bash
sudo docker pull david6miji/gulp-tool
sudo cp -a gulp-tool       /usr/bin/
sudo cp -a gulp-tool-dev   /usr/bin/

gulp-tool "npm install"
