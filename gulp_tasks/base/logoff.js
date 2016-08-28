var 

    gulp				= require('gulp'),
	shell 				= require('gulp-shell'),
	
end_require= true;

// 실패 함 

gulp.task('logoff', function(done) {
	
	console.log( "gulp-tool logoff" );
	gulp.series( 
		shell.task( ['export GULP_TOOL_SILENT="-S"'], { verbose : true  }  )
	)();
	
	done();
});
