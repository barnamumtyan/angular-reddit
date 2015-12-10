var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');

var paths = require('./paths.js');

module.exports = {
  sass: compileSass,
  prefix: prefix
};

function compileSass() {
  gulp.src(paths.appScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.cssDir))
}

function prefix() {
  gulp.src(paths.css)
    .pipe(postcss([
        autoprefixer({
          browsers: ['last 2 versions', 'android 4']
        })
      ]))
    .pipe(gulp.dest(paths.cssDir));
}
