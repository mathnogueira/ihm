let gulp = require('gulp');
let pug = require('gulp-pug');
let less = require('gulp-less')

gulp.task('default', ['pug', 'copyApp', 'less']);

gulp.task('pug', () => {
	return gulp.src('src/**/*.pug')
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('dist/'));
});

gulp.task('copyApp', () => {
	return gulp.src('src/app/**/*.js')
		.pipe(gulp.dest('dist/app'));
});

gulp.task('less', () => {
	return gulp.src('src/style/app.less')
		.pipe(less())
		.pipe(gulp.dest('dist/style/'));
});