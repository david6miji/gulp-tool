(function() {
'use strict';

var 

	spawn 				= require('child_process').spawn,
    gulp				= require('gulp'),
	
end_base_module;

gulp.task('reload', function() {
    spawn('gulp', [], {stdio: 'inherit'});
    process.exit();
});

gulp.task('ttt', function() {
	console.log( 'CALL ttt' );
	
});

process.on('uncaughtException', function(error) {
	console.log( error );
	if( error.code === 'MODULE_NOT_FOUND' ){
		console.log( "Try to npm install" );
		
        var npm = spawn( "npm", [ "install" ]);
		
        npm.on('error', function(err) {  
			console.log( 'npm install(err) : ', err ); 
		});

        npm.stderr.on('data', function(data) { 
			console.log( 'npm install : ' + data ); 
		});
        npm.stdout.on('data', function(data) { 
			console.log( 'npm install : ' + data ); 
		});

        npm.on('exit', function(status) {
			console.log( 'npm install status = ', status );
			
			gulp.start( 'ttt' );
			
            if( status === 0){
        
            } else {
        
            }
			process.exit(1)
        });
		
	} else {
		process.exit(1)	
	}
	 
});

var 

	requireDir 			= require('require-dir'),
//	install 			= require("gulp-install"),

end_require= true;

requireDir('./gulp_tasks');

gulp.task('welcome', function() {
	console.log( "welcome gulp-tool" );
});

gulp.task('test', function() {
	console.log( "ok test" );
});

gulp.task('default', [

	'welcome',

]);

}());
