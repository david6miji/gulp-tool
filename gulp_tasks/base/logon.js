var 

    gulp				= require('gulp'),
	shell 				= require('gulp-shell'),
	
end_require= true;

// 실패 함 

gulp.task('logon', function(done) {
	
	console.log( "gulp-tool logon" );
	gulp.series( 
//		shell.task( ['export GULP_TOOL_SILENT="AAA"'], { verbose : true  }  )
	)();
	
	done();
});
