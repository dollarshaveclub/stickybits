const gulp = require('gulp');
const head = require('gulp-header');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const qunit = require('node-qunit-phantomjs');

const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');
const commonjs = require('rollup-plugin-commonjs');

const babelSetup = {
  babelrc: false,
  presets: [['es2015', { modules: false }]],
  exclude: 'node_modules/**'
}

gulp.task('build:standard',  () => {
  rollup.rollup({
    entry: 'src/stickybits.js',
    plugins: [ commonjs(), eslint(), babel(babelSetup) ],
    dest: 'dist/stickybits.js',
    format: 'umd',
    moduleName: 'stickybits',
    sourceMap: false, 
    treeshake: false
  });
});

gulp.task('build:es', () => {
  rollup.rollup({
    entry: `src/stickybits.js`,
    plugins: [ commonjs(), eslint(), babel(babelSetup) ],
    dest: 'dist/stickybits.es.js',
    format: 'es',
    moduleName: 'stickybits',
    sourceMap: false, 
    treeshake: false
  });
});

gulp.task('build:jquery', () => {
  rollup.rollup({
    entry: `src/jquery.stickybits.js`,
    plugins: [ commonjs(), eslint(), babel(babelSetup) ],
    dest: 'dist/jquery.stickybits.js',
    format: 'umd',
    moduleName: 'stickybits',
    sourceMap: false, 
    treeshake: false
  });
});

gulp.task('build', ['build:standard', 'build:es', 'build:jquery']);

const pkg = require('./package.json')
const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @license <%= pkg.license %> */',
''].join('\n');


gulp.task('test', () => {
  qunit('tests/acceptance/cleanup/index.html');
  qunit('tests/acceptance/monitoring/index.html');
  qunit('tests/acceptance/multiple/index.html');
  qunit('tests/acceptance/offset/index.html');
});

gulp.task('minify', () => {
  gulp.src('dist/stickybits.js')
    .pipe(uglify())
    .pipe(head(banner, { pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'));
  gulp.src('dist/jquery.stickybits.js')
    .pipe(uglify())
    .pipe(head(banner, { pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['build'], () => {
  gulp.task('test');
  gulp.task('minify');
});
