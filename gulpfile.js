/**
 * Created by barni on 12/3/2015.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');

var localServer = require('./gulp/server.js');
var inject = require('./gulp/inject.js');
var useref = require('./gulp/useref.js');
var browserSync = require('./gulp/browser-sync.js');
var paths = require('./gulp/paths.js');
var copy = require('./gulp/copy.js');
var css = require('./gulp/css.js');

// Helper tasks
gulp.task('localServer', localServer);

gulp.task('inject:bower', inject.bower);

gulp.task('inject:app', inject.app);

gulp.task('sass', css.sass);

gulp.task('autoprefix', css.prefix);

gulp.task('useref', useref);

gulp.task('copy:bootstrap-fonts', copy.bootstrapFonts);

gulp.task('copy:appSVG', copy.appSVG);
// END Helper tasks

// Watches
// Using gulp-watch as gulp.watch doesn't emit file added events
gulp.task('watch:js', function() {
  watch(paths.js, browserSync.reload);
});

gulp.task('watch:html', function() {
  watch(paths.html, browserSync.reload);
});

gulp.task('watch:scss', function() {
  watch(paths.scss, function() {
    runSequence('sass', 'autoprefix', browserSync.reload);
  });
});

gulp.task('watch:svg', function() {
  watch(paths.svg, function() {
    runSequence('copy:appSVG', browserSync.reload);
  });
});

//END Watches

gulp.task('serve', function() {
  //runSequence('localServer', ['watch:js', 'watch:html', 'watch:scss', 'watch:svg']);
  runSequence('localServer', ['watch:js', 'watch:html', 'watch:scss']);
});
