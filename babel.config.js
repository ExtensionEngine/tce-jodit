'use strict';

module.exports = {
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-transform-runtime'
  ],
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
};
