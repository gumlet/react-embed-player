import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
    resolve: {
        alias: {
            // Alias the custom name (e.g., '#parent-pkg') to the actual path
            '#react-embed-player': path.resolve(__dirname, '../src'),
        },
    },
    server: {
        // this ensures that the browser opens upon server start
        open: false,
        // this sets a default port to 3000
        port: 3000
    }
})
