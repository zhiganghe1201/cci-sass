const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const sass = require('gulp-sass');

const stripCssComments = require('gulp-strip-css-comments'); 

const paths = {
	css: 'lib',
	dist: 'dist',
	distCss: 'dist/'
};

const srcFiles = {
	css: [
		paths.css + "/*.css",
		paths.css + "/*.scss"
	]
};

const files = {
	css: [
		paths.css + "/*.css",
		paths.css + "/*.scss",
		paths.css + "/**/*.css",
		paths.css + "/**/*.scss"
	]
};

gulp.task('clean', function() {
	return gulp.src(paths.dist)
		.pipe(plugins.clean({
			force: true
		}));
});

// css，scss文件
gulp.task("styles", function() {
	return gulp.src(srcFiles.css)
		.pipe(sass().on('error', sass.logError))
		.pipe(stripCssComments())
		.pipe(plugins.autoprefixer({
			overrideBrowserslist: ['ie 6', 'ie 7', 'ie 8', 'ie 9', 'Android < 4.0', 'Firefox < 20', 'Opera < 12.1', 'last 2 versions'],
			cascade: true,
			remove: true
		}))
		.pipe(plugins.minifyCss({
			 advanced: false
		}))
		.pipe(gulp.dest(paths.distCss));
});

gulp.task("watch:css", function() {
	// 监听css变化
	gulp.watch(files.css, function() {
		gulp.run('styles');
	});
});

gulp.task('default', function() {
	gulp.run('styles');
	gulp.run('watch:css');
});

gulp.task('build', ['clean'], function() {
	gulp.run('default');
});