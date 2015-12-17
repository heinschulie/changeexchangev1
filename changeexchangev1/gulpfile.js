// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');


var config = {
    //Include all js files but exclude any min.js files
    src: ['app/**/*.js', '!app/**/*.min.js']
}

//delete the output file(s)
gulp.task('clean', function () {
    //del is an async function and not a gulp plugin (just standard nodejs)
    //It returns a promise, so make sure you return that from this task function
    //  so gulp knows when the delete is complete
    return del(['app/all.min.js']);
});

gulp.task('minify-css', function () {
    return gulp.src('content/css/*.css')
      .pipe(minifyCSS({ compatibility: 'ie8' }))
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('content/css'));
});

// Combine and minify all files from the app folder
// This tasks depends on the clean task which means gulp will ensure that the 
// Clean task is completed before running the scripts task.
gulp.task('scripts', ['clean'], function () {

    return gulp.src(config.src)
      .pipe(uglify())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('app/'));
});

//Set a default tasks
gulp.task('default', ['scripts', 'minify-css'], function () { });

gulp.task('watch', function () {
    return gulp.watch(config.src, ['default']);
});