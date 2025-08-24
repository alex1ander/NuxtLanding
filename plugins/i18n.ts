// plugins/i18n.ts
import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ua from '../locales/ua.json'
import ru from '../locales/ru.json'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, ua, ru }
  })

  nuxtApp.provide('i18n', i18n)
  nuxtApp.vueApp.use(i18n)
})
