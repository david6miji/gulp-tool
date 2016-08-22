var 

    gulp				= require('gulp'),
	open 				= require("open"),
	
end_require= true;

gulp.task('test-open', function(done) {
	
	console.log( '-------------------------------------------------------------------' );
	console.log( '>> run test open.' );
	console.log( '-------------------------------------------------------------------' );
	
	open("http://www.google.com");
	
	done();
});

