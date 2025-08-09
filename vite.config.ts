import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import vueDevTools from 'vite-plugin-vue-devtools'


// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isStorybook = process.env.STORYBOOK === 'true'
  const enableDevPlugins = command === 'serve' && !isStorybook

  return {
    plugins: [
      vue(),
      ...(enableDevPlugins ? [Inspect(), vueDevTools()] : []),
      createSvgIconsPlugin({
        // https://github.com/vbenjs/vite-plugin-svg-icons
        // Specify the icon folder to be cached
        iconDirs: [
          fileURLToPath(new URL('src/app/assets/icons', import.meta.url)),
        ],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 3000,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use '/src/app/assets/styles/variables' as *;
          @use '/src/app/assets/styles/functions' as *;
          @use '/src/app/assets/styles/font' as *;
          @use 'sass:color' as color;
        `,
        },
      },
    },
  }
})
