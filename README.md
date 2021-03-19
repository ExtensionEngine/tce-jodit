# @extensionengine/tce-jodit

[![circleci build status](https://badgen.net/circleci/github/ExtensionEngine/tce-jodit/master?icon)](https://circleci.com/gh/ExtensionEngine/tce-jodit)
[![install size](https://badgen.net/packagephobia/install/@extensionengine/tce-jodit)](https://packagephobia.now.sh/result?p=@extensionengine/tce-jodit)
[![npm package version](https://badgen.net/npm/v/@extensionengine/tce-jodit)](https://npm.im/@extensionengine/tce-jodit)
[![github license](https://badgen.net/github/license/ExtensionEngine/tce-jodit)](https://github.com/ExtensionEngine/tce-jodit/blob/master/LICENSE)
[![js @extensionengine style](https://badgen.net/badge/code%20style/@extensionengine/black)](https://github.com/ExtensionEngine/eslint-config)
[![style @extensionengine style](https://badgen.net/badge/stylelint/@extensionengine/black)](https://github.com/ExtensionEngine/stylelint-config)

### Development 

Install dependencies
```
npm install
```
Use `vue-cli` to run local example
```
npm run serve
```
Build
```
npm run build
```

💁‍♂️  Extra tips: 

For debugging `jodit` use the unminified version. In the `jodit-vue` package export `jodit.es2018.js` in `node_modules/jodit-vue/src/wrapper.js`
```js
//...
export default plugin
export { JoditEditor, JoditEditor as JoditVue }
export { Jodit } from 'jodit/build/jodit.es2018'
```
and in `src/edit/Editor.vue` import 
```vue
<script>
import { Jodit, JoditVue } from 'jodit-vue/src/wrapper';
...
</script>
```
This will make things much easier when developing custom plugins to see what's going on. 
Make sure you revert the changes in the `src/edit/Editor.vue` before submitting a PR.
