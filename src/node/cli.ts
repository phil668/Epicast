import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { cac } from 'cac'
import { createDevServer } from './dev'

const cli = cac('epicast')

cli.command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root) => {
    root = root ? resolve(root) : cwd()
    const server = await createDevServer(root)
    await server.listen()
    server.printUrls()
  })

cli.command('build [root]', 'start dev server')
  .alias('build')
  .action((root) => {
    // eslint-disable-next-line no-console
    console.log('dev root', root)
  })

cli.parse()
