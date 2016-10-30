const gulp = require('gulp');
const qunit = require('node-qunit-phantomjs');

gulp.task('test', function() {
  qunit('tests/index.html');
});

gulp.task('default', ['test']);
