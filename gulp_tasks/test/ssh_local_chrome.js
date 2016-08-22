var 

    gulp				= require('gulp'),
	gulpSSH 			= require('gulp-ssh'),
	
end_require= true;

gulp.task('ssh_local_chrome', function(done) {
	
	console.log( '-------------------------------------------------------------------' );
	console.log( '>> run ssh local chrome.' );
	console.log( '-------------------------------------------------------------------' );
	
	var config = {
	  host: '127.0.0.1',
	  port: 22,
	  username: gt_env[gt_env_name].host.ssh.username,
	  password: gt_env[gt_env_name].host.ssh.password,
	}	
	
	var gs = new gulpSSH({  ignoreErrors: false,  sshConfig: config });
	var out = gs.shell(['export DISPLAY=:0', 'google-chrome2']);
	out.on('ssh_local_chrome : ssh2Data', function (chunk) {
		console.log( "ssh2Data : ", ssh2Data );
		
	});
	out.on('ssh_local_chrome : error', function (error) {
		console.log( "error : ", error );
		
	});
	
	done();
});

