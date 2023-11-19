import { cwd } from 'node:process'
import { pathToFileURL } from 'node:url'
import { join } from 'node:path'
import fsExtra from 'fs-extra'
import type { InlineConfig, Rollup } from 'vite'
import { build as viteBuild } from 'vite'
import react from '@vitejs/plugin-react'
import createDebug from 'debug'
import jsBeautify from 'js-beautify'
import type { SiteConfig } from '../../types'
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constans'
import { pluginConfig } from './plugin/config'

const debug = createDebug('Epicast:build')

export async function build(root: string = cwd(), config: SiteConfig) {
  const res = await bundle(root, config)
  if (res) {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const [clientBundle, serverBundle] = res
    // 获取服务端渲染的html
    const { render } = await import(pathToFileURL(join(root, '.temp', 'ssr-entry.cjs')).href)
    await renderPage(render, root, clientBundle)
  }
}

async function renderPage(render: () => string, root: string, clientBundle: Rollup.RollupOutput) {
  // 从clientBndle中取出对应的客户端脚本，将事件注册html中
  const clientChunk = clientBundle.output.find(v => v.type === 'chunk' && v.isEntry)
  debug('Rendering page in server side')
  const appHtml = render()
  let htmlStr = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/${clientChunk?.fileName}"></script>
    </body>
    </html>
  `.trim()
  htmlStr = jsBeautify.html(htmlStr)
  await fsExtra.ensureDir(join(root, 'build'))
  await fsExtra.writeFile(join(root, 'build/index.html'), htmlStr)
  await fsExtra.remove(join(root, '.temp'))
}

export async function bundle(root: string, config: SiteConfig) {
  const resolveBuildConfig = (isServer: boolean): InlineConfig => {
    return {
      mode: 'production',
      root,
      plugins: [react(), pluginConfig(config)],
      ssr: {
        noExternal: ['react-router-dom'],
      },
      build: {
        ssr: isServer,
        outDir: isServer ? '.temp' : 'build',
        rollupOptions: {
          input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
          output: {
            format: isServer ? 'cjs' : 'esm',
          },
        },
      },
    }
  }

  // eslint-disable-next-line no-console
  console.log('building server and client')

  try {
    const [clientBundle, serverBundle] = await Promise.all([
      viteBuild(resolveBuildConfig(false)),
      viteBuild(resolveBuildConfig(true)),
    ])
    return [clientBundle, serverBundle] as [Rollup.RollupOutput, Rollup.RollupOutput]
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error)
  }
}
