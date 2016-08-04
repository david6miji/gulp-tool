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

gulp.task('git:reset', function() {
	console.log( 'git:reset' );

//    var git_reset = spawn( "git", 
//	                      [ "reset", "--hard HEAD" ], 
//						  { cwd: "/gulp-tool/", env: process.env }
//						 );
//	
//        git_reset.on('error', function(err) {  
//			console.log( 'git:reset(error) : ', err ); 
//		});
//
//        npm.stderr.on('data', function(data) { 
//			console.log( 'git:reset(stderr) : ' + data ); 
//		});
//        npm.stdout.on('data', function(data) { 
//			console.log( 'git:reset(stdout) : ' + data ); 
//		});
//
//        npm.on('exit', function(status) {
//			
//            if( status !== 0){
//				console.log( 'npm install fail!' );
//				console.log( 'please check gulp-tool package' );
//            }
//			
//        });
	
})

gulp.task('git:pull', function() {
	console.log( 'git:pull' );

    var git_reset = spawn( "git", 
	                      [ "reset", "--hard", "HEAD" ], 
						  { cwd: "/gulp-tool/", env: process.env }
						 );
	
        git_reset.on('error', function(err) {  
			console.log( 'git:reset(error) : ', err ); 
		});

        git_reset.stderr.on('data', function(data) { 
			console.log( 'git:reset(stderr) : ' + data ); 
		});
        git_reset.stdout.on('data', function(data) { 
			console.log( 'git:reset(stdout) : ' + data ); 
		});

        git_reset.on('exit', function(status) {
			
            if( status === 0){
				console.log( 'git:reset success' );
            } else {
				console.log( 'git:reset fail! code = ', status );
			}
			
        });
	
})

gulp.task('update', function() {
	
	console.log( 'gtl:update.' );
	gulp.start( 'git:reset' );
	gulp.start( 'git:pull' );
	
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
