/**
 * Rollup is only used for development. See the build:prod script in package.json
 * for the production build command.
 */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';

const banner = `/*!
 * <%= pkg.name %> <%= pkg.version %>
 *
 * Copyright 2024 Zenith
 *
 * Licensed under the CC-BY-NC-ND-1.0 License.
 */`;

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/lumen.js',
    format: 'umd',
    name: 'lumen.txt'
  },
  plugins: [
    babel({
      exclude: ['node_modules/**'],
      runtimeHelpers: true
    }),
    resolve({ preferBuiltins: false }),
    commonjs(),
    license({
      banner: banner
    }),
    builtins()
  ]
};
