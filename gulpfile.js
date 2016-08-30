var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

gulp.task('default', function() {
    // place code for your default task here
});


/*
 gulp.task('lint', function() {
 return gulp.src('./lib/!*.js')
 .pipe(jshint())
 .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
 });*/

gulp.task('sass', function () {
    return gulp.src('./src/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});