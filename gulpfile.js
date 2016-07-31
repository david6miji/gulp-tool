(function() {
'use strict';

var 

	spawn 				= require('child_process').spawn,
    gulp				= require('gulp'),
	requireDir 			= require('require-dir'),
//	install 			= require("gulp-install"),

end_require= true;

process.on('uncaughtException', function(error) {
	console.log( error );
	if( error.code === 'MODULE_NOT_FOUND' ){
		console.log( "Try to npm install" );
		
	} else {
		
	}
	 process.exit(1)
});

requireDir('./gulp_tasks');

gulp.task('welcome', function() {
	console.log( "welcome gulp-tool" );
});

gulp.task('test', function() {
	console.log( "ok test" );
});

gulp.task('default', [

	'welcome',

]);

}());
