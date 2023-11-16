import type { Plugin } from 'vite'
import createDebug from 'debug'
import type { SiteConfig } from '../../../types'

const SITE_DATA_ID = 'epicast:site-data'
const EPICAST_VIRTUAL_MODULE_ID = `\0${SITE_DATA_ID}`

const debug = createDebug('Epicast:config')

export function pluginConfig(config: SiteConfig, restartServer: () => Promise<void>): Plugin {
  return {
    name: 'epicast:config',
    resolveId(source) {
      if (source === SITE_DATA_ID)
        return EPICAST_VIRTUAL_MODULE_ID
    },
    load(id) {
      if (id === EPICAST_VIRTUAL_MODULE_ID)
        return `export default ${JSON.stringify(config.siteData)}`
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath]
      const include = (id: string) => {
        return customWatchedFiles.some(file => id.includes(file))
      }
      if (include(ctx.file)) {
        debug('config file change,restarting dev server...')
        await restartServer()
      }
    },
  }
}
