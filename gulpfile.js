process.on('uncaughtException', function(error) {
	console.log( error );
	if( error.code === 'MODULE_NOT_FOUND' ){
		console.log( "Try to npm install" );
	} else {
//		process.exit(1)
	}
//	 errorManagement.handler.handleError(error);
//	 if(!errorManagement.handler.isTrustedError(error))
//	 process.exit(1)
});

(function() {
'use strict';

var 

    gulp				= require('gulp'),
	requireDir 			= require('require-dir'),
//	install 			= require("gulp-install"),

end_require= true;

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
