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
    },
    rollupOptions: {
      output: {
        assetFileNames: 'tce-jodit.[ext]',
        exports: 'named'
      }
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  plugins: [
    vue(),
    /*
      Build warning - "install" is not exported by "src/index.js",
      imported by "virtual:/.../tce-jodit/src/index.js"; is caused by
      `@extensionengine/rollup-plugin-tailor-ce` plugin.
     */
    tailorCe()
  ]
};
