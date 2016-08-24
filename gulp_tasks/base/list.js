var 

    gulp				= require('gulp'),
	
end_require= true;

// 실패 함 

gulp.task('list', function(done) {
	
	console.log( "gulp-tool list" );
	
	var list = gulp.tree().nodes;
	
	list.forEach(function (element, index, array) {
		console.log( "    " + element );
	});
	
	done();
});
