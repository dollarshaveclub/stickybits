const gulp = require('gulp')
const head = require('gulp-header')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const qunit = require('node-qunit-phantomjs')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint')
const commonjs = require('rollup-plugin-commonjs')
const config = require('gulp-replace')

const pkg = require('./package.json')

gulp.task('generate:version', () => {
  gulp.src(['src/stickybits.js'], { base: '' })
    .pipe(config('__VERSION__', pkg.version))
    .pipe(gulp.dest('tmp/'))
})

gulp.task('generate:copy', () => {
  gulp.src(['src/*.js', '!src/stickybits.js'])
    .pipe(gulp.dest('tmp/'))
})

gulp.task('generate', ['generate:version', 'generate:copy'])

const babelSetup = {
  babelrc: false,
  presets: [['es2015', { modules: false }]],
  exclude: 'node_modules/**'
}

gulp.task('build:standard', ['generate'], () => {
  rollup.rollup({
    entry: 'tmp/stickybits.js',
    plugins: [ commonjs(), eslint(), babel(babelSetup) ],
  }).then((bundle) => {
    bundle.write({
      dest: 'dist/stickybits.js',
      format: 'umd',
      moduleName: 'stickybits',
      sourceMap: false, 
      treeshake: false
    })
  })
})

gulp.task('build:es', ['generate'], () => {
  rollup.rollup({
    entry: `tmp/stickybits.js`,
    plugins: [ commonjs(), eslint(), babel(babelSetup) ],
  }).then((bundle) => {
    bundle.write({
      dest: 'dist/stickybits.es.js',
      format: 'es',
      moduleName: 'stickybits',
      sourceMap: false, 
      treeshake: false
    })
  })
})

gulp.task('build:jquery', ['generate'], () => {
  rollup.rollup({
    entry: `tmp/jquery.stickybits.js`,
    plugins: [ commonjs(), eslint(), babel(babelSetup) ],
  }).then((bundle) => {
    bundle.write({
      dest: 'dist/jquery.stickybits.js',
      format: 'umd',
      moduleName: 'stickybits',
      sourceMap: false, 
      treeshake: false
    })
  })
})

gulp.task('build', ['generate', 'build:standard', 'build:es', 'build:jquery'])

const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @license <%= pkg.license %> */',
''].join('\n')


gulp.task('test', () => {
  qunit('tests/acceptance/cleanup/index.html')
  qunit('tests/acceptance/monitoring/index.html')
  qunit('tests/acceptance/multiple/index.html')
  qunit('tests/acceptance/multiple-sticky-classes/index.html')
  qunit('tests/acceptance/offset/index.html')
  qunit('tests/acceptance/scrollTo/index.html')
  qunit('tests/acceptance/stacked/index.html')
})

gulp.task('minify', ['generate', 'build'], () => {
  gulp.src('dist/stickybits.js')
    .pipe(uglify())
    .pipe(head(banner, { pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'))
  gulp.src('dist/jquery.stickybits.js')
    .pipe(uglify())
    .pipe(head(banner, { pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['generate', 'build', 'minify', 'test'])
