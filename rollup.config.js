import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/index.js',
  dest: 'umd/basicSignals.js',
  plugins: [ nodeResolve({jsnext: true}), commonjs(), babel() ],
  format: 'umd',
  moduleName: 'BasicSignals',
}
