var browserSync = require('./browser-sync.js')
var paths = require('./paths.js');


module.exports = function () {
    browserSync.init({
      server: {
        baseDir: paths.rootDir
      },
      open: 'local'
    });
};
