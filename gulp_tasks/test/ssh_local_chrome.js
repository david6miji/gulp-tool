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
	
	console.log( config );
	
	done();
});

