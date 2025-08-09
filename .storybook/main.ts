import type { StorybookConfig } from '@storybook/vue3-vite'
import type { Plugin, PluginOption } from 'vite'

function getPluginName(p: PluginOption): string {
  if (!p) return ''

  if (Array.isArray(p)) return p.map(getPluginName).join(',')

  const plugin = p as Plugin

  return plugin.name ?? plugin.constructor?.name ?? ''
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(viteConfig) {
    const namesToRemove = [/inspect/i, /devtools/i]

    viteConfig.plugins = (viteConfig.plugins || []).filter((p) => {
      const name = getPluginName(p)
      return !namesToRemove.some((re) => re.test(name))
    })

    return viteConfig
  },
}

export default config
