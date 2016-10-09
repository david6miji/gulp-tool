@ECHO off

mkdir -p c:\gulp-env\

docker rm gulp-tool-dir
docker create --name gulp-tool-dir -v c:\gulp-tool:/gulp-tool/ -v c:\gulp-env:/gulp-env -v c:\:/gulp-host busybox /bin/true
