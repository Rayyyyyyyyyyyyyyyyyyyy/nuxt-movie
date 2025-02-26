// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'camelcase': ['error', { properties: 'always', allow: ['imageClickEmit'],
      //@ts-ignore
      'vue/v-on-event-hyphenation': ['error', 'never', {
      'ignore': ['imageClickEmit']
    }]
     }]
  }
})