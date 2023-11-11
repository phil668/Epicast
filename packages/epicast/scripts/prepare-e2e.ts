import path from 'node:path'
import * as process from 'node:process'
import { fileURLToPath } from 'node:url'
import fsExtra from 'fs-extra'
import * as execa from 'execa'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const exampleDir = path.resolve(__dirname, '../../../e2e/playground/basic')

const defaultExecaOpts = {
  cwd: exampleDir,
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr,
}

async function prepareE2E() {
  if (fsExtra.existsSync(path.resolve(__dirname, '../dist'))) {
    execa.execaCommand('pnpm build', {
      cwd: path.resolve(__dirname, '../'),
    })
  }
  execa.execaCommandSync('npx playwright install', {
    cwd: path.resolve(__dirname, '../'),
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
  })

  execa.execaCommandSync('pnpm i', {
    cwd: exampleDir,
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
  })

  execa.execaCommandSync('pnpm dev', defaultExecaOpts)
}

prepareE2E()
