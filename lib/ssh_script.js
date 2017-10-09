var

    gulp				= require('gulp'),
	EventEmitter 		= require('events').EventEmitter,
	inherits 			= require('util').inherits,
    pass                = require('stream').PassThrough,
	Client 				= require('ssh2').Client,


end_require= true;

const prompt_check_mark = "checking end of run by prompt-#> ";

function SSHScript(debug) {

	if (!(this instanceof SSHScript)) return new SSHScript();

	EventEmitter.call(this);

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
    this._ShellStream 	= undefined;
	this._out_enable 	= true;
	
	if (typeof(debug) === "undefined") {
		this._debug  =  {
			script_list : false,
		};
	} else {
		this._debug  =  debug;
	}

}
inherits(SSHScript, EventEmitter);

// 클라이언트 에러가 발생하였다.
SSHScript.prototype.on_error_client = function (err) {
	var self = this;

	console.log( 'Event error - SSHScript.on_error_client()' );
	console.log( 'err = ', err );

	return self;
}

SSHScript.prototype.on_stdout_data = function (data) {
	
	var self = this;
	if( self._out_enable ) process.stdout.write(data);
	
}

SSHScript.prototype.begin = function() {
	
	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : Start" );

	self._cmds 	= [];
	self._index = 0;

	return self;
}

SSHScript.prototype.ip = function( ip ) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : IP = ", ip );

	self._ssh_config['host'] = ip;

	return self;
}

SSHScript.prototype.port = function( port ) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : PORT = ", port );

	self._ssh_config['port'] = port;

	return self;
}

SSHScript.prototype.username = function( username ) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : USERNAME = ", username );

	self._ssh_config['username'] = username;

	return self;
}

SSHScript.prototype.password = function( password ) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : PASSWORD = ", password );

	self._ssh_config['password'] = password;

	return self;
}

SSHScript.prototype.prompt = function( prompt ) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : PROMPT = ", prompt );

	self._ssh_config['prompt'] = prompt;

	return self;
}

SSHScript.prototype.connect = function( connect ) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : CONNECT" );

	self._cmds 	= [];
	self._index = 0;

	var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
//		console.log( "TASK ssh connect");
		self._client.connect(self._ssh_config);
        self._client.on('ready', function(){
//            console.log( 'Event ready - SSHScript.on_ready_client()' );
            done();
        });
        self._client.on('banner', function(message,language){
//            console.log( 'Event banner - SSHScript.on_banner_client()' );
//            console.log( language );
//            console.log( message );
            done();
        });
	});

	return self;
}

SSHScript.prototype.shell = function() {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : SHELL" );

	var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
//		console.log( "TASK ssh shell");
        self._client.shell(function(err, stream) {
            if (err) {
                console.log( 'ERROR: ' + err );
                return;
            }

            self._ShellStream = stream;

            stream
            .on('close', function() {
//                console.log('ssh shell close ');
                self._client.end();
            })
            .on('data', self.on_stdout_data.bind(self) )
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



SSHScript.prototype.ready = function() {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : READY" );

	self.wait( self._ssh_config.prompt ); 

    return self;
}

SSHScript.prototype.exit = function(code) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : EXIT ["+code+"]" );

    var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
//		console.log( "TASK ssh exit [" + code + "]");
		self._client.end();
        done();
    });

    return self;
}

SSHScript.prototype.cmd = function(cmd) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : CMD ["+cmd+"]" );
	
	self.out_disable();
	self.input_ln('export PS1="' + prompt_check_mark + '"');
	self.wait( prompt_check_mark ); 
//	self.input_ln('export DISPLAY=:0');
//	self.wait( prompt_check_mark ); 
	self.out_enable();
	self.input_ln(cmd);
	self.wait( prompt_check_mark ); 
	
    return self;
}

SSHScript.prototype.out_enable = function() {
	
	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : OUT ENABLE" );

    var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
//		console.log( "TASK out enable");
		self._out_enable = true;
        done();
    });

    return self;
	
}

SSHScript.prototype.out_disable = function() {
	
	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : OUT DISABLE" );

    var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
//		console.log( "TASK out disable");
		self._out_enable = false;
        done();
    });

    return self;
	
}

SSHScript.prototype.wait = function(wait_str) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : WAIT ["+wait_str+"]" );

    var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
//		console.log( "TASK ssh [" + wait_str + "]" );

        var check_stdout = '';
        var check_stdout_func = undefined;

        check_stdout_func = function(data){
            check_stdout = check_stdout + data;
            if(check_stdout.indexOf(wait_str) != -1 ) {
                self._ShellStream.removeListener('data', check_stdout_func);
                done();
            } else {
                var crindex = check_stdout.lastIndexOf( "\n" );
                check_stdout = check_stdout.substring(crindex+1);
            }
        };

        self._ShellStream.on('data', check_stdout_func );

    });

    return self;
}

SSHScript.prototype.input = function(str) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : INPUT ["+str+"]" );

    var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
//		console.log( "TASK ssh input [" + str + "]");
        self._ShellStream.write( str );
        done();
    });

    return self;
}

SSHScript.prototype.input_ln = function(str) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : INPUT_LN["+str+"]" );

    var cmd = 'SSHScript_CMDS-' + self._index;
	self._cmds.push( cmd );
    self._index++;

	gulp.task( cmd , function(done) {
//		console.log( "TASK ssh input [" + str + "]");
        self._ShellStream.write( str + "\n" );
        done();
    });

    return self;
}

SSHScript.prototype.run = function( run ) {

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : RUN["+run+"]" );

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

	var self = this;
	if( self._debug.script_list ) console.log( "SSH SCRIPT : END" );

	gulp.series( self._cmds , function(done) {
		console.log( "" );
		if( self._debug.script_list ) console.log( "SSH SCRIPT : END" );
		done();
    })();
	
	all_done();

}

module.exports = SSHScript;
