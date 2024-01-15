import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { mergeConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'


// https://vitejs.dev/config/
export default defineConfig(config => {
    process.env = { ...process.env, ...loadEnv(config.mode, process.cwd()) }
    return mergeConfig(
        viteConfig(config),
        defineConfig({
            test: {
                environment: 'jsdom',
                exclude: [...configDefaults.exclude, 'e2e/*'],
                root: fileURLToPath(new URL('./', import.meta.url))
            }
        })
    )
})
