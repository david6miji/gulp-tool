var 

    gulp				= require('gulp'),
	taskListing 		= require('gulp-task-listing'),
	
end_require= true;

// 실패 함 

gulp.task('list', function(done) {
	
	console.log( "CALL list" );
	console.log( gulp._registry.DefaultRegistry._tasks );
	
//	gulp.series( taskListing );
//	var taskList = gulp.tasks;
//	console.log( taskList );
	
//	console.log( 
//	taskListing();
//	taskListing );

	done();
});



// gulp.task('list', 
// 	gulp.series(
// 		function(done) {
// 			console.log( 'wellcome list' );
// 			done();
// 		}, 
// 		
// 	taskListing,
// 	
// 	function(done) {
// 			console.log( 'list : success.' );
// 			done();
// 		}
// 		
// 	)
// );