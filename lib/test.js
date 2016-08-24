var 

    gulp				= require('gulp'),
	EventEmitter 		= require('events').EventEmitter,
	inherits 			= require('util').inherits,
	Client 				= require('ssh2').Client,
	
end_require= true;

console.log( "CALL Lib test.js" );



function SSHScript() {
	
	if (!(this instanceof SSHScript)) return new SSHScript();

	EventEmitter.call(this);
  
	console.log( "CALL SSHScript()" );
  
	this._cmds 			= undefined;
	this._index 		= undefined;
	this._ssh_config	= {
						host		: '127.0.0.1',
						port		: 22,
						username	: 'none',
					  }
					; 
	this._client = new Client();
	this._client.on('error', this.on_error_client.bind(this) );
	this._client.on('ready', this.on_ready_client.bind(this) );  
  
}
inherits(SSHScript, EventEmitter);

// 클라이언트 에러가 발생하였다.
SSHScript.prototype.on_error_client = function (err) {
	var self = this;
	
	console.log( 'Event error - SSHScript.on_error_client()' );
	console.log( 'err = ', err );
	
	// 에러 처리를 나중에 추가 한다. 

	return self;
}

// 클라이언트에 접속 되었다. 
SSHScript.prototype.on_ready_client = function () {
	var self = this;
	
	console.log( 'Event ready - SSHScript.on_ready_client()' );

//	this.SSHShell.shell(function(err, stream) {
//		if (err) {
//				//	throw err;
//				// 에러 처리를 한다. 
//		}	
//		
//		self.stream = stream;
//		self.emit( 'open' );
//		
//		// 쉘이 종료 되었을때의 처리 
//		stream.on('close', function() {
//			self.emit( 'close' );
//			self.SSHShell.end();
//		});
//
//		// 쉘의 표준 출력 처리 
//		stream.on('data', function(data) {
//			self.emit( 'stdout', data );
//		});
//					
//		// 쉘의 표준  에러 처리 
//		stream.stderr.on('data', function(data) {
//			self.emit( 'stderr', data );
//		});
//		
//	});

	return self;
}

SSHScript.prototype.begin = function() {
	console.log( "SCRIPT Start" );
	var self = this;
	
	self._cmds 	= [];
	self._index = 0;
	
	return self;
}

SSHScript.prototype.ip = function( ip ) {
	console.log( "IP = ", ip );
	var self = this;
	
	self._ssh_config['host'] = ip;
	
	return self;
}

SSHScript.prototype.port = function( port ) {
	console.log( "PORT = ", port );
	var self = this;
	
	self._ssh_config['port'] = port;
	
	return self;
}

SSHScript.prototype.username = function( username ) {
	console.log( "USERNAME = ", username );
	var self = this;
	
	self._ssh_config['username'] = username;
	
	return self;
}

SSHScript.prototype.password = function( password ) {
	console.log( "PASSWORD = ", password );
	var self = this;
	
	self._ssh_config['password'] = password;
	
	return self;
}

SSHScript.prototype.connect = function( connect ) {
	console.log( "CALL ssh connect");
	var self = this;

	self._cmds 	= [];
	self._index = 0;
	
	var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
	
	gulp.task( cmd , function(done) {
		console.log( "TASK ssh connect");
		done();
//		self._client.connect(self._ssh_config);
	});
	
	return self;
}

SSHScript.prototype.run = function( run ) {
	console.log( "RUN [" + run + "]" );
	var self = this;
	
	return self;
}

SSHScript.prototype.end = function(done) {
	console.log( "SCRIPT END" );
	var self = this;
	
	console.log( self._ssh_config );
	console.log( self._cmds );
	
	var run_tasks = gulp.series( self._cmds , function(done) {
		console.log( "SCRIPT TASK END" );	
		self._client.end();
		done();
    });
	run_tasks();
	done();
	
}

module.exports = SSHScript;
