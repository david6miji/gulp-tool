var

    gulp				= require('gulp'),
	SSHScript			= require(__dirname + '/../../lib/test.js'),

end_require= true;

gulp.task('test_ssh_script', function(done) {

	console.log( '-------------------------------------------------------------------' );
	console.log( '>> run test ssh script.' );
	console.log( '-------------------------------------------------------------------' );

	var script = new SSHScript();
	var test_env_name = 'withme';
	script.begin()
		.ip			( gt_env[test_env_name].host.ssh.ip )
		.port		( gt_env[test_env_name].host.ssh.port )
		.username   ( gt_env[test_env_name].host.ssh.username )
		.password   ( gt_env[test_env_name].host.ssh.password )
		.connect    ()
        .run        ('pwd')
        .run        ('cd ~/gulp-tool/')
        .run        ('pwd')
		.run        ('ls -al')

	.end(done);

//	done();
});
