@ECHO off
REM This is a installing script for gulp-tool of window
SET np=c:\gulp-tool\bin\win
ECHO %path%|find /i "%np%">nul || SETX PATH "%np%;%path%"
start cmd.exe /K C:\gulp-tool\bin\win\install.bat
EXIT
