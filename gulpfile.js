const gulp = require('gulp');
const head = require('gulp-header');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const qunit = require('node-qunit-phantomjs');

const pkg = require('./package.json');
const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @license <%= pkg.license %> */',
''].join('\n');

gulp.task('test', function() {
  qunit('tests/index.html');
});

gulp.task('minify', function() {
  gulp.src('dist/stickybits.js')
    .pipe(uglify())
    .pipe(head(banner, { pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'));
  gulp.src('dist/jquery.stickybits.js')
    .pipe(uglify())
    .pipe(head(banner, { pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['test', 'minify']);
