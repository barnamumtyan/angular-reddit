'use strict';

module.exports = {
  rootDir: '.',
  index: 'index.html',
  srcDir: 'src',
  appDir: 'src/app',
  // angular module files
  ngModules: 'src/app/**/*.module.js',
  // not NgModule used for globbing only non angular module files
  notNgModules: '!src/app/**/*.module.js',
  // all js files
  js: 'src/app/**/*.js',
  html: 'src/app/**/*.html',
  scss: 'src/app/**/*.scss',
  appScss: 'src/app/app.scss',
  css: 'src/assets/css/*.css',
  svg: 'src/app/**/*.svg',
  svgDir: 'src/assets/svg/',
  cssDir: 'src/assets/css/',
  distDir: 'dist/',
  bootstrapFontsDir: 'src/assets/fonts/bootstrap',
  bower: {
    bootstrap: {
      fonts: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*'
    }
  }
};
