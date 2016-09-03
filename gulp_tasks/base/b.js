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
		.ip			( gt_env[env_name].host.ssh.ip )
		.port		( gt_env[env_name].host.ssh.port )
		.username   ( gt_env[env_name].host.ssh.username )
		.password   ( gt_env[env_name].host.ssh.password )
	.connect    ()
    .shell      ()
        .input_ln   ('echo gool-tool:enter host login')
        .wait       ('gool-tool:enter host login')
        .wait       ('$ ')
        .input_ln   ('export DISPLAY=:0')
        .input_ln   ('echo gool-tool:enter host login')
        .wait       ('gool-tool:enter host login')
        .wait       ('$ ')
        .input_ln   ('sensible-browser www.falinux.com &')
        .input_ln   ('echo gool-tool:enter host login')
        .wait       ('gool-tool:enter host login')
        .wait       ('$ ')
        .input_ln   ('exit')
	.end(done);

//	done();
});
