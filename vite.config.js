import postcss from 'rollup-plugin-postcss';
import { resolve } from 'node:path';
import tailorCe from '@extensionengine/rollup-plugin-tailor-ce';
import vue from '@vitejs/plugin-vue2';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'TceJodit',
      formats: ['es', 'umd', 'cjs']
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  plugins: [
    vue(),
    postcss({
      extract: 'tce-jodit.css'
    }),
    tailorCe()
  ]
};
