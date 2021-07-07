'use strict';

const path = require('path');

/** @type {import('bili').Config} */
module.exports = {
  input: {
    'tce-jodit': 'src/index.js'
  },
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'TceJodit'
  },
  externals: [
    /@babel\/runtime/
  ],
  bundleNodeModules: ['rollup-plugin-vue', 'vue-runtime-helpers'],
  plugins: {
    vue: true,
    'tailor-ce': true,
    postcss: {
      extract: 'tce-jodit.css'
    },
    babel: {
      babelHelpers: 'runtime',
      sourceMap: true,
      extensions: ['.js', '.vue']
    },
    alias: {
      resolve: ['.vue', '.js'],
      entries: [
        { find: '@', replacement: path.resolve(__dirname, './src') }
      ]
    },
    visualizer: {
      sourceMap: true,
      open: false
    },
    replace: {
      preventAssignment: true
    }
  },
  resolvePlugins: {
    alias: require('@rollup/plugin-alias'),
    'tailor-ce': require('@extensionengine/rollup-plugin-tailor-ce')
  }
};
