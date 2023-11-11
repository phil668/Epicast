import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { PlaywrightTestConfig } from '@playwright/test'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 50000,
  webServer: {
    url: 'http://localhost:5173',
    command: 'pnpm prepare:e2e',
    cwd: resolve(__dirname, './packages/epicast'),
  },
  use: {
    headless: true,
  },
}

export default config
