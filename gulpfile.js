'use strict';
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var del = require('del');

gulp.task('clean', function clean() {
  return del(['dist']);
});

gulp.task('compile-stylesheets', function compileCSS() {
  return sass('assets/stylesheets/main.scss')
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe(connect.reload());
});

// TODO browserify
gulp.task('compile-javascripts', function compileJS() {
  gulp.src(['./index.js', 'game_levels.js'])
    .pipe(gulp.dest('dist/javascripts'))
    .pipe(connect.reload());
});

gulp.task('compile-static', function compileStatic() {
  gulp.src('assets/static/*')
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('watch-stylesheets', function watchCSS() {
  gulp.watch('assets/stylesheets/*.scss', ['compile-stylesheets']);
});

gulp.task('watch-javascripts', function watchJS() {
  gulp.watch('./*js', ['compile-javascripts']);
});

gulp.task('watch-static', function watchStatic() {
  gulp.watch('assets/static/*', ['compile-static']);
});

gulp.task('serve', function serveDemo() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('build',
  ['compile-stylesheets', 'compile-javascripts', 'compile-static']);

gulp.task('watch',
  ['watch-stylesheets', 'watch-javascripts', 'watch-static']);

gulp.task('default',
  ['clean', 'build', 'serve', 'watch']);
