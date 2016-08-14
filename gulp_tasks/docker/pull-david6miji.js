var 

    gulp				= require('gulp'),
	
end_require= true;

gulp.task('docker-pull-david6miji', function(done) {
	gulp.series( 
	
		function(done) {
			console.log( 'docker pull for david6miji' );
			done();
		}, 
	
		shell.task( ['docker pull david6miji/gulp-kor']	, { verbose : true }),
		shell.task( ['docker pull david6miji/gulp-tool'], { verbose : true }),
		shell.task( ['docker pull david6miji/mongodb']	, { verbose : true }),
		shell.task( ['docker pull david6miji/loopback']	, { verbose : true }),
		shell.task( ['docker pull david6miji/simavr']	, { verbose : true }),
		shell.task( ['docker pull david6miji/hipo']		, { verbose : true }),
				  
		function(done) {
			console.log( 'docker pull for david6miji : success.' );
			done();
		}

	)
	
	done();
});

