import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),dts({
    insertTypesEntry: true,
    copyDtsFiles: false,
    tsconfigPath:'tsconfig.app.json'
  })],
  build:{
    minify:'esbuild',
    outDir: 'lib',
    lib: {
      entry: './package/index.ts',
      formats:['es','umd'],
      name:'drag-grid-layout-v3',
      fileName: (format) => `drag-grid-layout-v3.${format}.js`
    },
    
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  }
})
