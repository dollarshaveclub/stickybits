import {
  babelSetup,
  banner,
  name,
  version,
} from '../configs/config'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'

export default {
  input: 'src/stickybits.js',
  plugins: [
    babel(babelSetup),
    replace({ VERSION: JSON.stringify(version) }),
  ],
  treeshake: false,
  output: {
    banner,
    file: 'dist/stickybits.js',
    format: 'umd',
    name,
    sourcemap: false,
  },
}
