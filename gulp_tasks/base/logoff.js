var 

    gulp				= require('gulp'),
	fs 					= require('fs'),
	
end_require= true;

gulp.task('logoff', function(done) {
	
	console.log( "gulp-tool logoff" );
	
	var script_name = "/gulp-env/gulp-tool-silent.sh"
	var script_text = '#!/bin/bash\n'
	                + 'export GULP_TOOL_SILENT="-S"\n'
					;
	
	fs.writeFile( script_name, script_text, function(err) {
		if(err) {
			return console.log(err);
		}
	});
	
	done();
});
