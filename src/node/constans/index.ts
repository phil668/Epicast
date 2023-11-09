import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const PACKAGE_ROOT = join(__dirname, '..')

export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html')

export const CLIENT_ENTRY_PATH = join(PACKAGE_ROOT, 'src', 'runtime', 'client-entry.tsx')
