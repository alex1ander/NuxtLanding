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
  <div id="top" class="dark-style container">
    <div class="redirecting">
      <div class="loading-bar"></div>
      Redirecting...
    </div>
  </div>
</template>

<style scoped>
.redirecting {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.loading-bar {
  position: absolute;
  top: 0;
  left: -50%; /* Начинаем за пределами экрана */
  width: 50%;  /* Ширина полосы */
  height: 5px; /* Толщина полосы */
  background: linear-gradient(45deg, rgba(62, 176, 212, 0.6) 0%, rgba(150, 99, 200, 0.6) 100%);
  animation: slide 1s linear infinite;
}

@keyframes slide {
  0% {
    left: -50%;
  }
  50% {
    left: 50%;
  }
  100% {
    left: 100%;
  }
}
</style>
