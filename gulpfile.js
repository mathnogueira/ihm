var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var useref = require('gulp-useref');
var sequence = require('run-sequence');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var babel = require('gulp-babel');
var minify = require('gulp-cssmin');

gulp.task('default', () => {
	sequence('pug', 'copyApp', 'less', 'copyFonts', 'copyPages', 'useref');
});

gulp.task('pug', () => {
	return gulp.src('src/**/*.pug')
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('build/'));
});

gulp.task('copyApp', () => {
	return gulp.src('src/app/**/*.js')
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(gulp.dest('build/app'));
});

gulp.task('less', () => {
	return gulp.src('src/style/app.less')
		.pipe(less())
		.pipe(gulp.dest('build/style/'));
});

gulp.task('useref', () => {
	return gulp.src('build/index.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minify()))
		.pipe(gulp.dest('new'));
});

gulp.task('copyFonts', () => {
	return gulp.src('./bower_components/font-awesome/fonts/*')
		.pipe(gulp.dest('new/fonts'));
});

gulp.task('copyPages', () => {
	return gulp.src('build/app/**/*.html')
		.pipe(gulp.dest('new/app/'));
});