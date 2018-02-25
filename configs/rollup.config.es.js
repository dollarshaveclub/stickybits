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
  output: {
    banner,
    file: 'dist/stickybits.es.js',
    format: 'es',
    name,
    sourcemap: false,
  },
}
