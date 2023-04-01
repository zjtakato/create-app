import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import typescript2 from 'rollup-plugin-typescript2';
import dts from 'vite-plugin-dts';
import del from 'rollup-plugin-delete';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    del(),
    vue(),
    dts(),
    cssInjectedByJsPlugin(),
    typescript2({
      check: false,
      include: ['src/libs/**/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          declaration: false, // 声明文件交给vite-plugin-dts去生成
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: './src/libs/index.ts',
      formats: ['es', 'cjs'], // 新增format需要去package.json增加到对应的入口文件
      fileName: (format) => `${format}/index.js`,
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
});
