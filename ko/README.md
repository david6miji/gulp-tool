# gulp-tool

## 개요

gulp-tool 은 gulp 를 이용한 처리 자동화 도구이다. 

## gulp-tool 바로 시작하기 

### 시스템 요구 조건


	Linux 배포판 (우분투, 배포판) 또는 윈도우 10
	Docker
	Git

### 사용을 위한 최초 툴 설치 

Linux

	$ cd ~
	$ git clone https://github.com/david6miji/gulp-tool.git
	$ cd gulp-tool
	$ ./install.sh	

Windows

	> cd c:\     
	> git clone https://github.com/david6miji/gulp-tool.git
	> cd gulp-tool
	> install
	
### 최초 설치 후 명령 스크립트 만 재 설치 

	$ cd gulp-tool
	$ ./install_cmd.sh	

### gulp-tool 컨테이너 진입

	$ cd [작업 디렉토리]
	$ gulp-tool
	# 
	
### gulp-tool 컨테이너에서 업그레이드

	$ cd [작업 디렉토리]
	$ gulp-tool
	# gt-update
