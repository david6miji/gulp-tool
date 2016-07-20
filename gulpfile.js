(function() {
'use strict';

var 

    gulp				= require('gulp'),
//	install 			= require("gulp-install"),

end_require= true;

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
