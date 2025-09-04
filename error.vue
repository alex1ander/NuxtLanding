<template>
  <div id="top" class="dark-style container error-page">
    <CursorCircle />
    <FigureFirst />
    <FigureSecond />
    <HeaderSection />
    
    <main class="error-main">
      <div class="error-content">
        <h1 class="error-code">{{ error.statusCode }}</h1>
        <h2 class="error-title">{{ getErrorTitle() }}</h2>
        <p class="error-description">{{ getErrorDescription() }}</p>
        
        <div class="error-actions">
          <button @click="handleError" class="btn-primary">
            {{ getBackButtonText() }}
          </button>
          <NuxtLink :to="getHomeUrl()" class="btn-secondary">
            {{ getHomeButtonText() }}
          </NuxtLink>
        </div>
      </div>
    </main>
    
    <FooterSection />
    <SvgSprite />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from '#app'

import HeaderSection from '@/components/HeaderSection.vue'
import CursorCircle from '@/components/CursorCircle.vue'
import FigureFirst from '@/components/FigureFirst.vue'
import FigureSecond from '@/components/FigureSecond.vue'
import SvgSprite from '@/components/SvgSprite.vue'
import FooterSection from '@/components/FooterSection.vue'

const props = defineProps({
  error: Object
})

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

// Определяем язык из URL или используем по умолчанию
const currentLang = route.params.lang as string || 'en'
const supportedLangs = ['ru', 'ua', 'en', 'de']

// Устанавливаем язык
if (supportedLangs.includes(currentLang)) {
  locale.value = currentLang
}

// SEO метаданные для страницы ошибки
useHead({
  title: `${props.error?.statusCode || '404'} - ${getErrorTitle()}`,
  meta: [
    { name: 'description', content: getErrorDescription() },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

function getErrorTitle(): string {
  const statusCode = props.error?.statusCode || 404
  
  const titles = {
    ru: statusCode === 404 ? 'Страница не найдена' : 'Произошла ошибка',
    ua: statusCode === 404 ? 'Сторінка не знайдена' : 'Сталася помилка',
    en: statusCode === 404 ? 'Page Not Found' : 'An Error Occurred',
    de: statusCode === 404 ? 'Seite nicht gefunden' : 'Ein Fehler ist aufgetreten'
  }
  
  return titles[locale.value as keyof typeof titles] || titles.en
}

function getErrorDescription(): string {
  const statusCode = props.error?.statusCode || 404
  
  const descriptions = {
    ru: statusCode === 404 
      ? 'Запрашиваемая страница не существует. Возможно, она была перемещена или удалена.'
      : 'На сервере произошла ошибка. Попробуйте обновить страницу или вернуться позже.',
    ua: statusCode === 404
      ? 'Запитувана сторінка не існує. Можливо, вона була переміщена або видалена.'
      : 'На сервері сталася помилка. Спробуйте оновити сторінку або повернутися пізніше.',
    en: statusCode === 404
      ? 'The requested page does not exist. It may have been moved or deleted.'
      : 'A server error occurred. Please try refreshing the page or come back later.',
    de: statusCode === 404
      ? 'Die angeforderte Seite existiert nicht. Sie wurde möglicherweise verschoben oder gelöscht.'
      : 'Ein Serverfehler ist aufgetreten. Bitte versuchen Sie, die Seite zu aktualisieren oder kommen Sie später zurück.'
  }
  
  return descriptions[locale.value as keyof typeof descriptions] || descriptions.en
}

function getBackButtonText(): string {
  const texts = {
    ru: 'Назад',
    ua: 'Назад',
    en: 'Go Back',
    de: 'Zurück'
  }
  
  return texts[locale.value as keyof typeof texts] || texts.en
}

function getHomeButtonText(): string {
  const texts = {
    ru: 'На главную',
    ua: 'На головну',
    en: 'Home',
    de: 'Startseite'
  }
  
  return texts[locale.value as keyof typeof texts] || texts.en
}

function getHomeUrl(): string {
  return supportedLangs.includes(currentLang) ? `/${currentLang}` : '/en'
}

function handleError() {
  if (process.client) {
    history.back()
  }
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.error-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(45deg, #3eb0d4, #9663c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.error-title {
  font-size: 2.5rem;
  margin: 1rem 0;
  color: #fff;
}

.error-description {
  font-size: 1.2rem;
  color: #ccc;
  margin: 2rem 0;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(45deg, #3eb0d4, #9663c8);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(62, 176, 212, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #3eb0d4;
  border: 2px solid #3eb0d4;
}

.btn-secondary:hover {
  background: #3eb0d4;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary, .btn-secondary {
    width: 200px;
  }
}
</style>
