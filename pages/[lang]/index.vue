<template>
  <div id="top" class="dark-style container">
    <!-- Статические компоненты -->
    <CursorCircle />
    <FigureFirst />
    <FigureSecond />
    <HeaderSection />

    <main>
      <HeroSection @open-contact-form="handleOpenContactForm" />
      <SliderStack />
      <OurService @open-contact-form="handleOpenContactForm" />
      <OurWorks />
      <OurAdvantages />
      <PillArea @open-contact-form="handleOpenContactForm" />
      <ServicesCard @open-contact-form="handleOpenContactForm" />
      <RunningString />
      <FormSection />
    </main>

    <FooterSection />
    <PopUp v-model="popupVisible" :service="popupService" />
    <SvgSprite />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from '#app'
import { useI18n } from 'vue-i18n'
import { useNuxtApp } from '#app'

import SliderStack from '@/components/SliderStack.vue'
import HeroSection from '@/components/HeroSection.vue'
import HeaderSection from '@/components/HeaderSection.vue'
import CursorCircle from '@/components/CursorCircle.vue'
import FigureFirst from '@/components/FigureFirst.vue'
import FigureSecond from '@/components/FigureSecond.vue'
import SvgSprite from '@/components/SvgSprite.vue'
import OurService from '@/components/OurService.vue'
import OurWorks from '@/components/OurWorks.vue'
import OurAdvantages from '@/components/OurAdvantages.vue'
import PillArea from '@/components/PillArea.vue'
import PopUp from '@/components/PopUp.vue'
import ServicesCard from '@/components/ServicesCard.vue'
import RunningString from '@/components/RunningString.vue'
import FormSection from '@/components/FormSection.vue'
import FooterSection from '@/components/FooterSection.vue'

const { $initAnimations, $smoothScroll } = useNuxtApp()
const route = useRoute()
const { locale, t } = useI18n()

// Попап
const popupVisible = ref(false)
const popupService = ref('')

function handleOpenContactForm(serviceName: string) {
  popupService.value = serviceName
  popupVisible.value = true
}

// Язык
const supportedLangs = ['ru', 'ua', 'en', 'de']
const currentLangParam = route.params.lang as string
if (currentLangParam && supportedLangs.includes(currentLangParam)) {
  locale.value = currentLangParam
  if (process.client) {
    document.documentElement.lang = currentLangParam
    localStorage.setItem('lang', currentLangParam)
  }
}
const currentLang = currentLangParam || 'en'

// Заголовок и описание
const headTitle = computed(() => t('meta.title'))
const headDescription = computed(() => t('meta.description'))

// --- Полный useHead с динамикой ---
const updateHead = () => {
  const lang = route.params.lang as string || 'en'
  useHead({
    title: headTitle.value,
    htmlAttrs: { lang },
    meta: [
      { name: 'description', content: headDescription.value },
      { property: 'og:title', content: headTitle.value },
      { property: 'og:description', content: headDescription.value },
      { property: 'og:url', content: `https://bitalexis.com/${lang}` },
      { property: 'og:image', content: 'https://bitalexis.com/og-image.jpg' },
      { property: 'og:site_name', content: 'BitAlexis' },
      { name: 'application-name', content: 'BitAlexis' },
      { name: 'apple-mobile-web-app-title', content: 'BitAlexis' },
      { name: 'twitter:title', content: headTitle.value },
      { name: 'twitter:description', content: headDescription.value }
    ],
    link: [
      { rel: 'canonical', href: `https://bitalexis.com/${lang}` },
      { rel: 'alternate', hreflang: 'ru', href: 'https://bitalexis.com/ru' },
      { rel: 'alternate', hreflang: 'ua', href: 'https://bitalexis.com/ua' },
      { rel: 'alternate', hreflang: 'en', href: 'https://bitalexis.com/en' },
      { rel: 'alternate', hreflang: 'de', href: 'https://bitalexis.com/de' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://bitalexis.com/ru' }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "BitAlexis",
          "url": "https://bitalexis.com/"
        })
      }
    ]
  })
}

// Инициализация head
updateHead()

// Следим за изменением языка и контента
watch([locale, headTitle, headDescription], updateHead)
watch(() => route.params.lang, () => {
  if (route.params.lang && supportedLangs.includes(route.params.lang as string)) {
    locale.value = route.params.lang as string
    if (process.client) {
      document.documentElement.lang = route.params.lang
      localStorage.setItem('lang', route.params.lang)
    }
  }
  updateHead()
})

// Монтирование
onMounted(() => {
  $smoothScroll.initAnchorLinks()
  $initAnimations()
})
</script>
