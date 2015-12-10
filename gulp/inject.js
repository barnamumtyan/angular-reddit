'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var paths = require('./paths.js');
var angularFilesort = require('gulp-angular-filesort');
var series = require('stream-series');

module.exports = {all: all, bower: bower, app: app};

/**
 * Run all injects
 * @return {undefined}
 */
function all() {
  bower();
  app();
}

/**
 * Inject bower components sources in index.html
 * @return {undefined}
 */
function bower() {
  gulp.src(paths.index)
    .pipe(wiredep())
    .pipe(gulp.dest(paths.rootDir));
}

/**
 * Inject app sources in index.html
 * @return {undefined}
 */
function app() {
  var target = gulp.src(paths.index);

  var sources = series(
    // only angular module files are sorted,
    // because the contain the angular module setter: 'angular.module('foo',[])'
    // and angularFilesort works only with files that contain the module setter
    gulp.src([paths.ngModules]).pipe(angularFilesort()),
     // exclude the angular module files, because they were added, and soerted above
    gulp.src([paths.js, paths.notNgModules, paths.css]));

  target.pipe(inject(sources))
    .pipe(gulp.dest(paths.rootDir));
}
