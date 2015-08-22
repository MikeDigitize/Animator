var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var babel = require("gulp-babel");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require("gulp-streamify");

var buildPath = './build';
var compiledPath = './js/temp';
var demo = './js/demo.js';
var js = './js/animator/*.js';
var styles = './styles/*.scss';
var html = './*.html';

gulp.task("html", function () {
    return gulp.src(html)
        .pipe(gulp.dest(buildPath));
});

gulp.task('styles', function () {
    return gulp.src(styles)
        .pipe(concat('demo-styles.scss'))
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('es6', function () {
    return gulp.src(js)
        .pipe(babel())
        .pipe(gulp.dest(compiledPath));    
});

gulp.task('browserify', ['es6'], function() {
    var bundleStream = browserify(compiledPath + '/animator.js', {standalone: "Animator"}).bundle();
    bundleStream
        .pipe(source(compiledPath + '/animator.js'))
        .pipe(streamify(uglify()))
        .pipe(rename('Animator.min.js'))
        .pipe(gulp.dest(buildPath + '/js'))
});

gulp.task('demo', function() {
    return gulp.src(demo)
        .pipe(gulp.dest(buildPath + '/js'))
});

gulp.task('watch', function () {
    gulp.watch(styles, ['styles']);
    gulp.watch(js, ['browserify']);
    gulp.watch(demo, ['demo']);
    gulp.watch(html, ['html']);
});

gulp.task('default', ['html', 'styles', 'browserify', 'demo', 'watch']);