'use strict';

const config = require('bili/babel')();

config.plugins = config.plugins || [];
config.plugins = config.plugins.concat([
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator'
]);

module.exports = config;
