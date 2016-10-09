@ECHO off
ECHO RUN gulp-tool ...
ECHO %1 %2 %3 %4
docker run -it --rm --volumes-from gulp-tool-dir -v %CD%:/work david6miji/gulp-tool:latest %1 %2 %3 %4
