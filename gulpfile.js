var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var series = require('stream-series');
var express = require('gulp-express');
var rename = require('gulp-rename');

gulp.task('development', ['inject-dev']);

gulp.task('compile-sass', function () {
    return gulp.src('app/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/styles/'));
});

gulp.task('inject-dev', ['compile-sass', 'server'], function () {
    var target = gulp.src('index.tpl.html');
    var sources = gulp.src([
        'libs/**/*.js',
        'app/**/*.mod.js',
        'app/**/*.conf.js',
        'app/**/constants/*.js',
        'app/**/*.dir.js',
        'app/**/*.svc.js',
        'app/**/*.ctrl.js',
        'app/**/*.flt.js',
        'bower_components/font-awesome/css/font-awesome.css',
        'app/**/*.css']);
    return target.pipe(wiredep())
        .pipe(inject(series(sources), {
            transform: function (filepath, file, i, length) {
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(''));
});

gulp.task('server', function(){
    express.run(['index.js'])
});