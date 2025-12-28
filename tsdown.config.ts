import { defineConfig } from 'tsdown'

export default defineConfig({
  platform: 'neutral',
  unbundle: true,
  inputOptions: {
    experimental: { attachDebugInfo: 'none' },
  },
})
