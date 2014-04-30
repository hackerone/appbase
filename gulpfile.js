var gulp = require('gulp'),
	util = require('gulp-util'),
	$ = require('gulp-load-plugins')(),
	hogan = require('gulp-hogan-compile'),
	rjs = require('requirejs');

var source = {
	sass: ['public/sass/**/*.scss'],
	js: ['public/js/**/*.js'],
	coffee: ['public/coffee/**/*.coffee'],
	template: ['public/template/**/*.html'],
	img: ['public/img/**/*.jpg'],
	fonts: ['public/fonts/**/**']
};

var dest = {
	css: 'public/css',
	js: 'public/js'
};

var dist = {
	base: ['dist/**/**'],
	css: 'dist/css',
	js: 'dist/js',
	img: 'dist/img',
	fonts: 'dist/fonts'
};

gulp.task('style', function(){
	return gulp.src(source.sass)
		.pipe($.plumber())
		.pipe($.sass({
			outputStyle: 'expanded',
			sourceComments: 'map'
		}))
		.pipe($.autoprefixer("last 3 version"))
		.pipe(gulp.dest(dest.css))
		.pipe($.livereload());
});

gulp.task('lr', function () {
	return gulp.src(['views/**/*.hjs', 'models/**/*.js', 'routes/**/*.js'])
			.pipe($.livereload());
});


gulp.task('js', function(){
	return gulp.src(source.js)
		.pipe($.jshint())
		.pipe($.jshint.reporter('default'))
		.pipe($.livereload());
});

gulp.task('cafe', function() {
	return gulp.src(source.coffee)
				.pipe($.plumber())
				.pipe($.coffeelint())
				.pipe($.coffee({ sourceMap: true, sourceRoot: '../coffee', bare: true }))
				.pipe(gulp.dest(dest.js));
});

gulp.task('template', function() {
	return gulp.src(source.template)
						.pipe($.plumber())
						.pipe(hogan('tmpl.js'))
						.pipe(gulp.dest(dest.js));
});

gulp.task('dev', function () {
	$.nodemon({
		script: 'server.coffee', ext: 'hjs js coffee', ignore: ['public/*.js', 'coffee/*.coffee']
	});
});

gulp.task('cleandist', function () {
	return gulp.src(dist.base)
		.pipe($.clean());
});


gulp.task('jspack', ['images'], function (cb) {

	// optmize js
	rjs.optimize({
		dir: "dist/js",
		baseUrl: "public/js",
		mainConfigFile: "public/js/main.js",
		optimize: "none",

		modules: [{
					name: "main"
				}]
	}, function(response) {
		return cb();
	});

});



gulp.task('pack', ['jspack'], function () {
	return gulp.src(["dist/js/*.js"])
			.pipe($.rev())
			.pipe(gulp.dest('dist/js'));
});


gulp.task('images', ['fonts'], function () {
	return gulp.src(source.img)
		.pipe($.imagemin())
		.pipe(gulp.dest(dist.img));
});

gulp.task('fonts', ['csspack'], function () {
	return gulp.src(source.fonts)
		.pipe(gulp.dest(dist.fonts));
});

gulp.task('csspack', ['cleandist'],function () {
	return gulp.src(source.sass)
		.pipe($.plumber())
		.pipe($.sass({
			outputStyle: 'compressed'
		}))
		.pipe($.autoprefixer("last 3 version"))
		.pipe($.rev())
		.pipe(gulp.dest(dist.css));
});

// hack to rename all css files to scss, so they can be imported into scss
gulp.task('cssfix', function () {
	return gulp.src(['public/components/**/*.css'])
			.pipe($.rename(function (path) {
				path.extname = ".scss";
			}))
			.pipe(gulp.dest('public/components'));
});


gulp.task('watch', function () {
  gulp.watch(source.sass, ['style']);
  gulp.watch(source.coffee, ['cafe', 'js']);
  gulp.watch(source.template, ['template']);
});

gulp.task('default', ['style', 'cafe', 'js', 'template', 'watch', 'dev']);
