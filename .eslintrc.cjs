module.exports = {
  root: true,
  extends: ['@extensionengine', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: 'module'
  }
};
