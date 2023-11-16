import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { pluginIndexHtml } from './plugin/indexHtml'
import { PACKAGE_ROOT } from './constans'
import { resolveConfig } from './config'
import { pluginConfig } from './plugin/config'

export async function createDevServer(root: string, restartServer: () => Promise<void>) {
  const config = await resolveConfig(root, 'serve', 'development')
  return createServer({
    root,
    plugins: [pluginIndexHtml(), react(), pluginConfig(config, restartServer)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
