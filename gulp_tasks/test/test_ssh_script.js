var 

    gulp				= require('gulp'),
//	SSHScript			= require(__dirname + '/../../lib/test.js').SSHScript;
	SSHScript			= require(__dirname + '/../../lib/test.js'),
	
end_require= true;

gulp.task('test_ssh_script', function(done) {
	
	console.log( '-------------------------------------------------------------------' );
	console.log( '>> run test ssh script.' );
	console.log( '-------------------------------------------------------------------' );
	
	var script = new SSHScript();
	
	script.begin()
		.ip			( "127.0.0.1" )
		.port		( 22 )
		.username   ('frog')
		.password   ('frog6800' )
		.connect    ()
		.run        ('ls -al')
		
	.end(done);
	
//	done();
});

