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
        assetFileNames: 'tce-jodit.[ext]'
      }
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  plugins: [
    vue(),
    tailorCe()
  ]
};
