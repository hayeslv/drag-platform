/*
 * @Author: Lvhz
 * @Date: 2021-10-19 10:18:46
 * @Description: Description
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from "@vitejs/plugin-vue-jsx"
import closureId from './src/plugin/babel-plugin-closure-id'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    "@" : path.resolve(__dirname, './src')
  },
  plugins: [vue(), vueJSX(), closureId({names : ["lexicalCache"]})]
})
