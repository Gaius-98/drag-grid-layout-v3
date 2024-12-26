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
})