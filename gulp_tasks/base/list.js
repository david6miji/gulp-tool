var 

    gulp				= require('gulp'),
	taskListing 		= require('gulp-task-listing'),
	
end_require= true;

gulp.task('list', function(done) {
	
	console.log( "CALL list" );
	gulp.series(taskListing );
	console.log( 
	taskListing();
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