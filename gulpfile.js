let gulp = require('gulp');
let pug = require('gulp-pug');
let less = require('gulp-less');
let useref = require('gulp-useref');
let sequence = require('run-sequence');

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
		.pipe(gulp.dest('release'));
});

gulp.task('copyFonts', () => {
	return gulp.src('./bower_components/font-awesome/fonts/*')
		.pipe(gulp.dest('release/fonts'));
});

gulp.task('copyPages', () => {
	return gulp.src('build/app/**/*.html')
		.pipe(gulp.dest('release/app/'));
})