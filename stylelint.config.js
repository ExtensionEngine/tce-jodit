module.exports = {
  extends: [
    'stylelint-config-standard-scss', // configure for SCSS
    'stylelint-config-recommended-vue', // add overrides for .Vue files
    'stylelint-config-recess-order', // use the recess order for properties
    'stylelint-config-css-modules', // configure for CSS Modules methodology
    '@extensionengine/stylelint-config' // override with ExtensionEnigine custom rules
  ],
  overrides: [
    {
      files: ['src/**'],
      rules: {
        'selector-pseudo-class-no-unknown': null,
        'selector-class-pattern': null
      }
    }
  ]
};
