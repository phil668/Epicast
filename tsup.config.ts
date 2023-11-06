import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/node/cli.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  format: 'esm',
})
