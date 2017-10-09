var

    gulp				= require('gulp'),
	SSHScript			= require(__dirname + '/../../lib/ssh_script.js'),

end_require= true;

gulp.task('test_ssh_script', function(done) {

	console.log( '-------------------------------------------------------------------' );
	console.log( '>> run test ssh script.' );
	console.log( '-------------------------------------------------------------------' );

	var script = new SSHScript();
//	var test_env_name = 'withme';
	var test_env_name = 'gulp-tool';
	script
    .begin()
		.ip			( gt_env[test_env_name].host.ssh.ip       )
		.port		( gt_env[test_env_name].host.ssh.port     )
		.username   ( gt_env[test_env_name].host.ssh.username )
		.password   ( gt_env[test_env_name].host.ssh.password )
		.prompt		( gt_env[test_env_name].host.ssh.prompt   ) 
	.connect()
    .shell()
		.ready()
		.cmd		( 'cd /tmp' )
		.cmd		( 'pwd'     )
		.cmd		( 'ls -al'  )
		.exit(0)
	.end(done);
});

