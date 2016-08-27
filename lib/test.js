var

    gulp				= require('gulp'),
	EventEmitter 		= require('events').EventEmitter,
	inherits 			= require('util').inherits,
    pass                = require('stream').PassThrough,
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
//  this._client.on('ready', this.on_ready_client.bind(this) );
    this._ShellStream = undefined;

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

SSHScript.prototype.on_stdout_data = function (data) {
	var self = this;
    process.stdout.write(data);
}

// 클라이언트에 접속 되었다.
SSHScript.prototype.on_ready_client = function () {
	var self = this;

	console.log( 'Event ready - SSHScript.on_ready_client()' );

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
    self._index++;

	gulp.task( cmd , function(done) {
		console.log( "TASK ssh connect");
        console.log( self._ssh_config );
		self._client.connect(self._ssh_config);
        self._client.on('ready', function(){
            console.log( 'Event ready - SSHScript.on_ready_client()' );
            done();
        });
        self._client.on('banner', function(message,language){
            console.log( 'Event banner - SSHScript.on_banner_client()' );
            console.log( language );
            console.log( message );
            done();
        });
//        done();
	});

	return self;
}

SSHScript.prototype.shell = function() {
	console.log( "CALL ssh shell");
	var self = this;

	var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
		console.log( "TASK ssh shell");
        self._client.shell(function(err, stream) {
            if (err) {
                console.log('STDOUT: ' + data);
                console.log( err );
                return;
            }

            self._ShellStream = stream;

            stream
            .on('close', function() {
                console.log('ssh shell Stream :: close ');
                self._client.end();
            })
            .on('data', self.on_stdout_data.bind(self) )
//            .on('data', function(data) {
//                // console.log('STDOUT: ' + data);
//                // sys.puts(data);
//                process.stdout.write(data);
//            })
            .stderr
            .on('data', function(data) {
                console.log('STDERR: ' + data);
                // process.stderr.write(data);
            });
            done();
        });
	});

	return self;
}

SSHScript.prototype.wait = function(wait_str) {
    console.log( "WAIT [" + wait_str + "]" );
	var self = this;

    var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
		console.log( "TASK ssh wait");

        var check_stdout = '';
        var check_stdout_func = undefined;

        check_stdout_func = function(data){
            check_stdout = check_stdout + data;
            console.log( 'B1 - [' + check_stdout + ']' );
            if(check_stdout.indexOf(wait_str) != -1 ) {
                console.log( "OK Find !!!");
                self._ShellStream.removeListener('data', check_stdout_func);
                done();
            } else {
                // 캐리지 리턴 이전 문자열은 버린다
                var crindex = check_stdout.lastIndexOf( "\n" );
                check_stdout = check_stdout.substring(crindex+1);
            }
        };

        self._ShellStream.on('data', check_stdout_func );

    });

    return self;
}

SSHScript.prototype.input = function(str) {
    console.log( "INPUT [" + str + "]" );
	var self = this;

    var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
		console.log( "TASK ssh input");
        self._ShellStream.write( str );
        done();
    });

    return self;
}

SSHScript.prototype.run = function( run ) {
	console.log( "RUN [" + run + "]" );
	var self = this;

//  var cmd = 'SSHScript_CMDS-' + self._index;
//	self._cmds.push( cmd );
//    self._index++;
//
//    gulp.task( cmd , function(done) {
//        console.log( "TASK run [" + run + "]" );
//        self._client.exec(run, function(err, stream) {
//            if (err) {
//                console.log( err );
//                done();
//            } else {
//                stream.on('close', function(code, signal) {
//                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
//                    done();
//                }).on('data', function(data) {
//                    console.log('STDOUT: ' + data);
//                }).stderr.on('data', function(data) {
//                    console.log('STDERR: ' + data);
//                });
//            }
//        });
//
//	});

	return self;
}

SSHScript.prototype.end = function(all_done) {
	console.log( "SCRIPT END" );
	var self = this;

	console.log( self._cmds );

	gulp.series(
        self._cmds ,
        function(done) {
		    console.log( "SCRIPT TASK END" );
//		    self._client.end();
		    done();
        }
    )();
    console.log( "SCRIPT END end" );
	all_done();

}

module.exports = SSHScript;
