// plugins/i18n.ts
import { createI18n } from 'vue-i18n'
import enJson from '../locales/en.json'
import uaJson from '../locales/ua.json'
import ruJson from '../locales/ru.json'
import deJson from '../locales/de.json'

export default defineNuxtPlugin((nuxtApp) => {
  const messages = {
    en: (enJson as any).default ?? enJson,
    ua: (uaJson as any).default ?? uaJson,
    ru: (ruJson as any).default ?? ruJson,
    de: (ruJson as any).default ?? deJson
  }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'ua',
    fallbackLocale: 'en',
    messages,
  })

  nuxtApp.vueApp.use(i18n)
})
