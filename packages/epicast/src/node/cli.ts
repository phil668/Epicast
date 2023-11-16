import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { cac } from 'cac'
import { build } from './build'

const cli = cac('Epicast:config')

cli.command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root) => {
    const createServer = async () => {
      const { createDevServer } = await import('./dev')
      const server = await createDevServer(root, async () => {
        server.close()
        await createServer()
      })
      await server.listen()
      await server.printUrls()
    }
    await createServer()
  })

cli.command('build [root]', 'build project')
  .alias('build')
  .action(async (root) => {
    root = root ? resolve(root) : cwd()
    try {
      await build(root)
    }
    catch (error) {
    }
  })

cli.parse()
