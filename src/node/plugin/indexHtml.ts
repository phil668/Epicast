import * as fs from 'node:fs/promises'
import type { Plugin } from 'vite'
import { CLIENT_ENTRY_PATH, DEFAULT_HTML_PATH } from '../constans'

export function pluginIndexHtml(): Plugin {
  return {
    name: 'epicast:index-html',
    apply: 'serve',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              src: `/@fs/${CLIENT_ENTRY_PATH}`,
              type: 'module',
            },
            injectTo: 'body',
          },
        ],

      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await fs.readFile(DEFAULT_HTML_PATH, { encoding: 'utf-8' })
          try {
            html = await server.transformIndexHtml(req.url!, html, req.originalUrl)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(html)
          }
          catch (error) {
            return next(error)
          }
        })
      }
    },
  }
}
