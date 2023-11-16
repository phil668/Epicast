import type { UserConfig as ViteConfig } from 'vite'

interface NavItemWithLink {
  text: string
  link: string
}

interface Sidebar {
  [path: string]: SidebarGroup[]
}

interface SidebarGroup {
  text: string
  items: SidebarItem[]
}

type SidebarItem = { text: string;link: string } | { text: string;link: string;items: SidebarItem[] }

interface Footer {
  message: string
  copyright: string
}

interface ThemeConfig {
  nav: NavItemWithLink
  sidebar: Sidebar
  footer: Footer
}

export interface UserConfig {
  title: string
  description: string
  themeConfig: ThemeConfig
  vite?: ViteConfig
}

export interface SiteConfig {
  root: string
  configPath: string
  siteData: UserConfig
}
