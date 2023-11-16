import { defineConfig } from 'tsup'

export default defineConfig({
  // entry: ['src/node/cli.ts'],
  entryPoints: ['src/node/cli.ts', 'src/node/index.ts', 'src/node/dev.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  format: 'esm',
  cjsInterop: true,
  shims: true,
  banner: ({ format }) => {
    if (format === 'esm') {
      return {
        js: `import {createRequire as __createRequire} from 'module';var require=__createRequire(import\.meta.url);`,
      }
    }
  },
})
