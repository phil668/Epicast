import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { debug } from 'node:console'
import { cac } from 'cac'
import { createDevServer } from './dev'
import { build } from './build'

const cli = cac('epicast')

cli.command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root) => {
    root = root ? resolve(root) : cwd()
    const server = await createDevServer(root)
    await server.listen()
    server.printUrls()
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
