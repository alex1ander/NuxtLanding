<script setup lang="ts">
import { onMounted } from 'vue'   // ✅


const router = useRouter()
const supportedLangs = ['en', 'ru', 'ua']

onMounted(() => {
  // Код внутри onMounted выполняется только на клиенте
  const browserLang = navigator.language.slice(0, 2) // 'en', 'ru', 'ua', ...
  const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en'

  router.replace(`/${defaultLang}`)
})
</script>

<template>
  <div>Redirecting...</div>
</template>
