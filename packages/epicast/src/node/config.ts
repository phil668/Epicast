import path from 'node:path'
import fsExtra from 'fs-extra'
import type { ConfigEnv } from 'vite'
import { loadConfigFromFile } from 'vite'
import type { SiteConfig, UserConfig } from '../../types'

export function defineConfig(config: UserConfig) {
  return config
}

export async function resolveConfig(root: string, command: 'serve' | 'build', mode: 'development' | 'production') {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode)
  const siteConfig: SiteConfig = {
    root,
    configPath: configPath as string,
    siteData: resolveSiteData(userConfig as any),
  }
  return siteConfig
}

function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || 'Epicast',
    description: userConfig.description || 'SSG Framework',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {},
  }
}

type RawConfig = UserConfig | Promise<UserConfig> | (() => UserConfig | Promise<UserConfig>)

async function resolveUserConfig(root: string, command: 'serve' | 'build', mode: 'development' | 'production') {
  const configPath = getUserConfigPath(root)
  // 读取内容
  const configEvn: ConfigEnv = {
    command,
    mode,
  }
  const result = await loadConfigFromFile(configEvn, configPath, root)
  if (result) {
    const { config: rawConfig = {} as RawConfig } = result
    const userConfig = await (typeof rawConfig === 'function' ? rawConfig() : rawConfig)
    return [configPath, userConfig]
  }
  else {
    return [configPath, {}]
  }
}

function getUserConfigPath(root: string) {
  try {
    const supportConfigFiles = ['epicast.config.ts', 'epicast.config.js']
    const configPath = supportConfigFiles
      .map(v => path.resolve(root, v))
      .find(fsExtra.pathExistsSync)
    return configPath
  }
  catch (error) {
    console.error(`Failed to load user config: ${error}`)
    throw error
  }
}
