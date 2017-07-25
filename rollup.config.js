import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const entry = process.env.entry;
const format = process.env.format ? process.env.format : 'umd';
const dest = format === 'es' ? `${entry}.${format}` : `${entry}`;

export default {
  entry: `src/${entry}.js`,
  dest: `dist/${dest}.js`,
  format: format,
  moduleName: entry,
  sourceMap: false, // removes the sourcemap at the bottom of the file
  treeshake: true,
  plugins: [
    resolve({
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
