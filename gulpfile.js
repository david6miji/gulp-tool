(function() {
'use strict';

var 

	spawn 				= require('child_process').spawn,
    gulp				= require('gulp'),
	runSequence 		= require('run-sequence'),
	
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

gulp.task('gtl:git:reset', function() {
	console.log( 'git:reset' );

    var git_reset = spawn( "git", 
	                      [ "reset", "--hard", "HEAD" ], 
						  { cwd: "/gulp-tool/", env: process.env }
						 );
	
        git_reset.on('error', function(err) {  
			console.log( 'gtl:git:reset(error) : ', err ); 
		});

        git_reset.stderr.on('data', function(data) { 
			console.log( 'gtl:git:reset(stderr) : ' + data ); 
		});
        git_reset.stdout.on('data', function(data) { 
			console.log( 'gtl:git:reset(stdout) : ' + data ); 
		});

        git_reset.on('exit', function(status) {
			
            if( status === 0){
				console.log( 'git:reset success' );
            } else {
				console.log( 'git:reset fail! code = ', status );
			}
			
        });
	
})

gulp.task('gtl:git:pull', function() {
	console.log( 'git:pull' );

    var git_pull = spawn( "git", 
	                      [ "pull", "origin", "master" ], 
						  { cwd: "/gulp-tool/", env: process.env }
						 );
	
        git_pull.on('error', function(err) {  
			console.log( 'gtl:git:pull(error) : ', err ); 
		});

        git_pull.stderr.on('data', function(data) { 
			console.log( 'gtl:git:pull(stderr) : ' + data ); 
		});
        git_pull.stdout.on('data', function(data) { 
			console.log( 'gtl:git:pull(stdout) : ' + data ); 
		});

        git_pull.on('exit', function(status) {
			
            if( status === 0){
				console.log( 'gtl:git:pull success' );
            } else {
				console.log( 'gtl:git:pull fail! code = ', status );
			}
			
        });
	
})

gulp.task('update', function() {
	
	console.log( 'gtl:update.' );
	
	runSequence( 'gtl:git:reset', 'gtl:git:pull',
    function(){ 
		console.log( 'gtl:update sucess.' );
	});
	
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
