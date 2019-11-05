import {
  babelSetup,
  banner,
  name,
  uglifyOutput,
  version,
} from '../configs/config'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import pkg from '../package.json'

const ensureArray = maybeArr => Array.isArray(maybeArr) ? maybeArr : [maybeArr]

const createConfig = ({ input, output, env } = {}) => {
  const plugins = [
    babel(babelSetup),
    replace({ 'VERSION': JSON.stringify(version).replace(/"/g, '') }),
  ]

  if (env === 'production') plugins.push(uglify(uglifyOutput))

  return {
    input,
    plugins,
    output: ensureArray(output).map(format =>
      Object.assign(
        {},
        format,
        {
          banner,
          name,
        },
      ),
    ),
  }
}

export default [
  createConfig({
    input: 'src/stickybits.js',
    output: [
      { file: pkg.main, format: 'umd' },
      { file: pkg.module, format: 'es' },
    ],
  }),
  createConfig({
    input: 'src/stickybits.js',
    output: {
      file: 'dist/stickybits.min.js',
      format: 'umd',
    },
    env: 'production',
  }),
  createConfig({
    input: 'src/jquery.stickybits.js',
    output: {
      file: 'dist/jquery.stickybits.min.js',
      format: 'umd',
    },
    env: 'production',
  }),
  createConfig({
    input: 'src/umbrella.stickybits.js',
    output: {
      file: 'dist/umbrella.stickybits.js',
      format: 'umd',
    },
  }),
  createConfig({
    input: 'src/jquery.stickybits.js',
    output: {
      file: 'dist/jquery.stickybits.js',
      format: 'umd',
    },
  }),
]
