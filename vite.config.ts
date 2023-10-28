import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_PORT } = env as ImportMetaEnv

  const port = parseInt(VITE_PORT, 10)

  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@src': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open: true,
      port
    }
  }
})
