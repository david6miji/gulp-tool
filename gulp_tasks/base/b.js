var

    gulp				= require('gulp'),
	SSHScript			= require(__dirname + '/../../lib/ssh_script.js'),

end_require= true;

gulp.task('b', function(done) {

	console.log( '----------------------------------' );
	console.log( '>> run open browser of gulp-tool .' );
	console.log( '----------------------------------' );

	var script = new SSHScript();
	var env_name = 'gulp-tool';
	script
    .begin()
		.ip			( gt_env[env_name].host.ssh.ip       )
		.port		( gt_env[env_name].host.ssh.port     )
		.username   ( gt_env[env_name].host.ssh.username )
		.password   ( gt_env[env_name].host.ssh.password )
		.prompt		( gt_env[env_name].host.ssh.prompt   ) 
	.connect()
    .shell()
		.ready()
		
		.cmd		( 'export DISPLAY=:0' )
		.cmd		( 'sensible-browser 127.0.0.1' )
		.exit(0)
	.end(done);
	
});

