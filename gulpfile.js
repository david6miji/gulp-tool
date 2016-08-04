(function() {
'use strict';

var 

	spawn 				= require('child_process').spawn,
    gulp				= require('gulp'),
	
end_base_module;

gulp.task('reload', function() {
	var argvs = [];

	process.argv.forEach((val, index) => {
		if( index > 1 )  {
			argvs.push( val );
		}
	});
	
    spawn('gulp', argvs, {stdio: 'inherit'});
    process.exit();
});

gulp.task('update', function() {
	
	console.log( '-------------------------------------------------------------------' );
	console.log( '>> run gulp-tool update.' );
	console.log( '-------------------------------------------------------------------' );
	
	// git reset --hard HEAD
	// git pull
	// 
	
});

gulp.task('npm:install', function() {
	
	console.log( 'gtl : npm install.' );

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
			
            if( status === 0){
				console.log( 'npm install success!' );
				console.log( 'please rerun gtl' );
            } else {
				console.log( 'npm install fail!' );
				console.log( 'please check gulp-tool package' );
            }
			
			process.exit(1)	;
			
        });
		
});

process.on('uncaughtException', function(error) {
	console.log( error );
	if( error.code === 'MODULE_NOT_FOUND' ){
		gulp.start( 'npm:install' );
		
	} else {
		process.exit(1)	
	}	
	 
});

var 

	requireDir 			= require('require-dir'),
//	install 			= require("gulp-install"),

end_require= true;

requireDir('./gulp_tasks', {recurse: true} );


gulp.task('welcome', function() {
	console.log( "welcome gulp-tool" );
});

gulp.task('test', function() {
	console.log( "ok test" );
});

gulp.task('default', [

	'welcome',
	'testing',

]);

}());
