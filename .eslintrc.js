module.exports = {
  root: true,
  extends: ['@extensionengine', 'plugin:vue/recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    requireConfigFile: false,
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['src/**', 'example/**'],
      rules: {
        'vue/component-definition-name-casing': ['error', 'kebab-case'],
        'vue/multi-word-component-names': 'off'
      }
    }
  ],
  plugins: ['vue'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue']
      }
    }
  }
};
