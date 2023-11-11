import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    threads: true,
    environment: 'node',
    passWithNoTests: true,
    exclude: ['**/dist/**', '**/node_modules/**'],
  },
})
