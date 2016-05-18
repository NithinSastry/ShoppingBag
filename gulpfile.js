var gulp = require("gulp"),
    connect = require('gulp-connect'),
	open = require('gulp-open'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
	concat = require('gulp-concat');
    
var config = {
    port:9090,
    devBaseUrl: 'http://localhost',
    paths:{
        html: './src/*.html',
		js: ['./src/**/*.js',
			'./src/**/*.jsx'	
		],
		css:[
			'./src/**/*.css'
		],
        dist: './dist',
        mainJs:'./src/Components/main.jsx'
    }
};

gulp.task('connect', function () {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('css', function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + "/css"))
		.pipe(connect.reload());
});

gulp.task('js', function () {
	browserify(config.paths.mainJs)
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('open', ['connect'], function () {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ":" + config.port + '/' }));
});

gulp.task('watch', function () {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.css,['css']);
});

gulp.task('default', ['html', 'css' ,'js' ,'open', 'watch']);