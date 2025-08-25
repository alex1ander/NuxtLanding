// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,

  // Глобальные стили подключаются здесь
  css: ['@/assets/scss/main.scss',],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
