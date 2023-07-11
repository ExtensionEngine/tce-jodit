module.exports = {
  extends: [
    '@extensionengine/stylelint-config'
  ],
  overrides: [
    {
      files: ['src/**', 'example/**'],
      rules: {
        'selector-pseudo-class-no-unknown': null,
        'selector-class-pattern': null,
        'value-keyword-case': null
      }
    }
  ]
};
