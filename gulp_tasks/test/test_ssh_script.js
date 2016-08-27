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
	script
    .begin()
		.ip			( gt_env[test_env_name].host.ssh.ip )
		.port		( gt_env[test_env_name].host.ssh.port )
		.username   ( gt_env[test_env_name].host.ssh.username )
		.password   ( gt_env[test_env_name].host.ssh.password )
	.connect    ()
    .shell      ()
        .wait       ('frog@withme2020:~$')
//        .wait       ('frog@withme2020:~$', timeout, function)
        .input      ('ls -al\n')
        .wait       ('frog@withme2020:~$')
//        .is_error    ( function )
        .input      ('pppsdfksdjf\n')
        .wait       ('frog@withme2020:~$')
        .input      ('exit\n')
//        .run        ('pwd')
//        .run        ('cd ~/gulp-tool/')
//        .run        ('pwd')
//		.run        ('ls -al')
//		.exec        ('ls -al')
//    .exit(0)
	.end(done);

//	done();
});
