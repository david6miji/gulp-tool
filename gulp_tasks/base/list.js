var 

    gulp				= require('gulp'),
	taskListing 		= require('gulp-task-listing'),
	
end_require= true;

gulp.task('list', function(done) {
	
	console.log( "CALL list" );
	console.log( taskListing );
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