<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from '#app'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { locale } = useI18n()

const supportedLangs = ['en', 'ru', 'ua']

onMounted(() => {
  const browserLang = navigator.language.slice(0, 2) // 'en', 'ru', 'ua'
  const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en'

  // Сохраняем язык
  locale.value = defaultLang
  localStorage.setItem('lang', defaultLang)
  document.documentElement.lang = defaultLang

  // Делаем редирект только если мы на главной "/"
  if (router.currentRoute.value.path === '/') {
    router.replace(`/${defaultLang}`)
  }
})
</script>

<template>
  <div>Redirecting...</div>
</template>
