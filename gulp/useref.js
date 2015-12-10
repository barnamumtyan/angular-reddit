var gulp = require('gulp');
var useref = require('gulp-useref');
var paths = require('./paths.js');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');

module.exports = function() {
  gulp.src(paths.index)
    .pipe(useref({searchPath: ''}))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest(paths.distDir));
};
