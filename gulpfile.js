'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const purifyCSS = require('gulp-purifycss');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const mqpacker = require("css-mqpacker");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const server = require('gulp-server-livereload');
const imagemin = require('gulp-imagemin');
const inline = require('gulp-inline-source');

gulp.task('copy', () => {
  gulp.src('./dist/stickybits.min.js')
    .pipe(gulp.dest('./page/'));
});

gulp.task('imagemin', () => {
  gulp.src('./assets/*')
    .pipe(imagemin())
    .pipe(gulp.dest(''));
});

gulp.task('styles', () => {
  const processors = [
    mqpacker({
      sort: true
    })
  ];
  gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./page/'))
    .pipe(autoprefixer({browsers: ['last 3 versions']}))
    .pipe(postcss(processors))
    .pipe(purifyCSS([
      'index.html',
      './scripts/app.js',
      './../dist/stickybits.min.js'
    ]))
    .pipe(cssnano())
    .pipe(gulp.dest('./page/'));
});

gulp.task('minify', () => {
  gulp.src(['./scripts/app.js'])
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('./page/'))
  ;
});

gulp.task('inline', () => {
  gulp.src('./page/index.html')
    .pipe(inline())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(''));
});

gulp.task('serve', () => {
  gulp.src('')
    .pipe(server({
      defaultFile: 'index.html',
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['copy', 'imagemin', 'styles', 'inline', 'minify']);
