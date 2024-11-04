import { defineConfig } from 'vite'
import path from "path"; 
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    __ENABLE_CARTA_SSR_HIGHLIGHTER__: false
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
      $component: path.resolve("./src/components"),
      $hook: path.resolve("./src/hooks"),
      "~": path.resolve("./src"),
    },
  }
})
