var gulp = require( 'gulp' );

// Require main configuration file
var config = require( './gulp/config.js' );

// Require tasks
var dev = require( './gulp/tasks/dev.js' );
var html = require( './gulp/tasks/html.js' );
var release = require( './gulp/tasks/release.js' );
var sass = require( './gulp/tasks/sass.js' );
var assets = require( './gulp/tasks/assets.js' );

// Build task
gulp.task(
	'build',
	gulp.series( [
		sass.lint,
		sass.build,
		html.inline,
		gulp.parallel( [
			assets.clean,
			sass.clean,
			html.clean,
		] ),
		assets.copy,
	] )
);

// Watch task
gulp.task(
	'watch',
	function() {
		gulp.watch(
			config.paths.watch.src,
			gulp.series( [
				sass.lint,
				sass.build,
				html.inline,
				gulp.parallel( [
					sass.clean,
					html.clean,
				] ),
			] )
		);
	}
);

// Watch + development server and livereload
gulp.task(
	'dev',
	gulp.series( [
		'build',
		gulp.parallel( [
			dev.server,
			'watch',
		] ),
	] )
);

// Copy all the assets to `dist` directory
gulp.task(
	'assets',
	gulp.series( [
		assets.clean,
		assets.copy,
	] )
);

// Prepare everything for new version release
gulp.task(
	'release',
	gulp.series( [
		release.prompt,
		release.version,
	] )
);
