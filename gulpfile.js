'use strict';

console.log( "CALL gulpfile.js" );

var 

    gulp				= require('gulp'),
	install 			= require("gulp-install"),
	
end_base_module;

process.on('uncaughtException', function(error) {
	
	console.log( error );
	if( error.code === 'MODULE_NOT_FOUND' ){
		gulp.src([ __dirname + '/package.json']).pipe(install());
	} else {
		process.exit(1)	
	}	
	 
});

var 

    pty 				= require('pty.js'),
	shell 				= require('gulp-shell'),
	
end_module;

// gulp.task('gt:update', function(done) {
// 	
// 	console.log( "CALL gt:update" );
// 	
//  	gulp.series( 'gt:git:reset',
//  				 'gt:git:pull',
//  				 
//  	function(done) {
//  		console.log( 'gt:update success.' );
//  		done();
//  	});
// 
// });	

gulp.task('gt:dumy', function(done) {

	console.log( "CALL dumy task" );
	done();

});

gulp.task('gt:push', 
	gulp.series( 
	
		'gt:dumy',
		
		function(done) {
			console.log( 'RUN gt:push' );
			done();
		}, 
		
		shell.task( ['git add --all'], 
		            { verbose : true , cwd : "/gulp-tool/"  } 
				  ),
				  
		shell.task( ['git commit -a -m "backup"'], 
		            { verbose : true , cwd : "/gulp-tool/"  } 
				  ),
				  
		function(done) {
			console.log( 'gt:push success.' );
			done();
		}
	)
);




// function(done) {
// 	console.log( "CALL gt:push" );
// 	return gulp.series( 
// //				  'gt:git:add-all',
// //				  'gt:git:commit-backup',
// //				  'gt:git:push',
// 				 
// 	function(done) {
// 		console.log( 'gt:push success.' );
// 		done();
// 	});
// 				 
// });	

gulp.task('default', function(done) {

	console.log( "welcome gulp-tool" );
//	gulp.series( clean, gulp.parallel(styles, scripts));
	done();

});




