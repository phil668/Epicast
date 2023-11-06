import { cac } from 'cac'

const cli = cac('epicast')

cli.command('[root]', 'start dev server')
  .alias('dev')
  .action((root) => {
    console.log('dev root', root)
  })

cli.command('build [root]', 'start dev server')
  .alias('dev')
  .action((root) => {
    console.log('dev root', root)
  })

cli.parse()
