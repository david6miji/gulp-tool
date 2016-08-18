var 

    gulp				= require('gulp'),
	taskListing 		= require('gulp-task-listing'),
	
end_require= true;

// 실패 함 

gulp.task('list', function(done) {
	
	console.log( "CALL list" );
	console.log( gulp._registry ); // .DefaultRegistry._tasks
	console.log( gulp._registry._tasks ); // ._tasks
	
//	var list = [];
	
	console.log(Object.keys(obj));
	
//	for( k,v in gulp._registry._tasks ){
//		console.log( k );
//	}
	
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