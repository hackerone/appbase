var gulp = require('gulp'),
	util = require('gulp-util'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	server = require('tiny-lr')(),
	prefix = require('gulp-autoprefixer'),
	jshint = require('gulp-jshint'),
	nodemon = require('gulp-nodemon'),
	coffee = require('gulp-coffee'),
	coffeelint = require('gulp-coffeelint'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	hogan = require('gulp-hogan-compile');

var source = {
	sass: ['public/sass/**/*.scss'],
	js: ['public/js/**/*.js'],
	coffee: ['public/coffee/**/*.coffee'],
	template: ['public/template/**/*.html']
};

var dest = {
	css: 'public/css',
	js: 'public/js'
};

gulp.task('style', function(){
	return gulp.src(source.sass)
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(prefix("last 3 version"))
		.pipe(gulp.dest(dest.css))
		.pipe(livereload());
});

gulp.task('lr', function () {
	return gulp.src(['views/**/*.hjs', 'models/**/*.js', 'routes/**/*.js'])
			.pipe(livereload());
});


gulp.task('js', function(){
	return gulp.src(source.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(livereload());
});

gulp.task('cafe', function() {
	return gulp.src(source.coffee)
				.pipe(plumber())
				.pipe(coffeelint())
				.pipe(coffee({ sourceMap: true, sourceRoot: '../coffee' }))
				.pipe(gulp.dest(dest.js));
});

gulp.task('template', function() {
	return gulp.src(source.template)
						.pipe(plumber())
						.pipe(hogan('tmpl.js'))
						.pipe(gulp.dest(dest.js));
});

gulp.task('dev', function () {
	nodemon({
		script: 'server.coffee', ext: 'hjs js coffee', ignore: ['public/*.js', 'coffee/*.coffee']
	});
});


gulp.task('watch', function () {
  gulp.watch(source.sass, ['style']);
  gulp.watch(source.coffee, ['cafe', 'js']);
  gulp.watch(source.template, ['template']);
});

gulp.task('default', ['style', 'cafe', 'js', 'template', 'watch', 'dev'])