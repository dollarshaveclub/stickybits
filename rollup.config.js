import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const entry = process.env.entry;

export default {
  entry: `src/${entry}.js`,
  dest: `dist/${entry}.js`,
  format: 'umd',
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
