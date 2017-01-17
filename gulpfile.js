'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');
var uglify = require('gulp-uglify');

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('bundleScripts', function() {
  return gulp.src('./src/pleaseDontGo.js')
    .pipe(strip())
    .pipe(gulp.dest('./dist'));
});

gulp.task('minifyBundle', ['bundleScripts'], function() {
  return gulp.src('./dist/pleaseDontGo.js')
  .pipe(uglify())
  .pipe(rename('pleaseDontGo.min.js'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['lint', 'minifyBundle']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['lint', 'minifyBundle']);
});

gulp.task('default', ['build', 'watch']);
