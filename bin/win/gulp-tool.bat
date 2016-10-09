ECHO RUN gulp-tool ...
REM docker run --rm --net=host -it \
REM --volumes-from gulp-tool-dir \
REM 	   -v $(pwd):/work \
REM 	   david6miji/gulp-tool:latest \
REM 	   $*
