'use strict';

module.exports = {
  root: true,
  extends: '@extensionengine',
  overrides: [{
    files: ['src/**', 'example/**'],
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module'
    }
  }],
  rules: {
    'vue/component-definition-name-casing': ['warn', 'kebab-case']
  }
};
