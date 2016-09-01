var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var gulpCopy = require('gulp-copy');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
const del = require('del');
var rename = require("gulp-rename");
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({root: "app", livereload: true});
});

gulp.task('del', function () {
    del(['./app/**/']).then(function (paths) {
        //return console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

del(['./app/*.*']).then(function (paths) {
    return console.log('Deleted files and folders:\n', paths.join('\n'));
});

gulp.task('jshint', function () {
    return gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

gulp.task('sass', function () {
    gulp.src('./src/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('copy', function () {
    gulp.src('./src/*.html')
        .pipe(gulpCopy('./app/'));

});

gulp.task('concat', function () {
    return gulp.src(['./src/other.js', './src/level3.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./app/'));
});

gulp.task('compress', function () {
    pump([
            gulp.src('app/*.js'),
            uglify(),
            gulp.dest('app')
        ]
    );
});

//dd task ‘prod’, which should delete folder ‘prod’ (if exists),
// create folder ‘prod’,
// copy index.html,

// copy compiled css file to ‘prod/css/styles.css’,

// copy and minify all js code
// (including libs) to 1 file ‘prod/js/app.js’


gulp.task('prod', function () {
    //delete
    del.sync(['./prod/**/']);

    //copy html
    gulp.src('./src/*.{html,htm}')
        .pipe(gulp.dest('./prod'));

    //compile to css
    gulp
        .src('./src/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename("style.css"))
        .pipe(gulp.dest('./prod/css/'))


    gulp.src("./prod/css/main.css")
    //.pipe(rename("./prod/css/style.css"))
    //gulp.src('./prod/css/style.css"')
        .pipe(gulp.dest('./prod/css/style.css'));

    pump([
        gulp.src('./src/*.js'),
        uglify(),
        gulp.dest('./prod/')
    ]);

    gulp.src(['./src/lib/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./prod/js/'))
        .pipe(livereload());

});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.*', ['prod']);
})


gulp.task("asd", function () {
    gulp
        .pipe(function () {
            console.log("I am in asd");
        })

})