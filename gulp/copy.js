var gulp = require('gulp');

var paths = require('./paths.js');

module.exports = {
  bootstrapFonts: bootstrapFonts,
  appSVG: appSVG,
};

function bootstrapFonts() {
  return gulp.src(paths.bower.bootstrap.fonts)
    .pipe(gulp.dest(paths.bootstrapFontsDir));
}

function appSVG() {
  return gulp.src(paths.svg)
    .pipe(gulp.dest(paths.svgDir));
}
