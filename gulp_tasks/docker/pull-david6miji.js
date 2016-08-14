var 

    gulp				= require('gulp'),
	shell 				= require('gulp-shell'),
	
end_require= true;

gulp.task('docker-pull-david6miji', 
	gulp.series( 
	
		function(done) {
			console.log( 'docker pull for david6miji' );
			done();
		}, 
		gulp.parallel( 
	
			shell.task( ['docker pull david6miji/gulp-kor']	, 
						{ verbose : true }),
			shell.task( ['docker pull david6miji/gulp-tool'], 
						{ verbose : true }),
			shell.task( ['docker pull david6miji/mongodb']	, 
						{ verbose : true }),
			shell.task( ['docker pull david6miji/loopback']	, 
						{ verbose : true }),
			shell.task( ['docker pull david6miji/simavr']	, 
						{ verbose : true }),
			shell.task( ['docker pull david6miji/hipo']		, 
						{ verbose : true })

		),
				  
		function(done) {
			console.log( 'docker pull for david6miji : success.' );
			done();
		}

	)
);

