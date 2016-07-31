(function() {
'use strict';

var 

	spawn 				= require('child_process').spawn,
    gulp				= require('gulp'),
	
end_base_module;

process.on('uncaughtException', function(error) {
	console.log( error );
	if( error.code === 'MODULE_NOT_FOUND' ){
		console.log( "Try to npm install" );
		
        var npm = spawn( "npm", [ "install" ]);
		
        npm.on('error', function(err) {  console.log( err ); });

        npm.stderr.on('data', function(data) { console.log( data ); });
        npm.stdout.on('data', function(data) { console.log( data ); });

        npm.on('exit', function(status) {
			console.log( 'status = ', status );
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
