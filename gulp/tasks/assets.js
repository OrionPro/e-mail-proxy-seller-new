var gulp = require( 'gulp' );
var del = require( 'del' );

// Require main configuration file
var config = require( '../config.js' );

// Export functions
exports.clean = clean;
exports.copy = copy;

// Remove old distribution files
function clean() {
	return del( config.paths.assets.clean.src );
}

// Copy assets to `dist` directory
function copy() {
	return gulp.src( config.paths.assets.copy.src )
		.pipe( gulp.dest( config.paths.assets.copy.dest ) );
}
