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

// Состояние попапа
const popupVisible = ref(false)
const popupService = ref('')

// Функция открытия попапа
function handleOpenContactForm(serviceName: string) {
  popupService.value = serviceName
  popupVisible.value = true
}

// Устанавливаем язык из URL один раз
locale.value = route.params.lang || 'en'

// Заголовок и описание для head
const headTitle = computed(() => t('meta.title'))
const headDescription = computed(() => t('meta.description'))

// SEO и hreflang настройки
const currentLang = route.params.lang as string || 'en'

useHead({
  title: headTitle.value,
  htmlAttrs: {
    lang: currentLang
  },
  meta: [
    { name: 'description', content: headDescription.value },
    { property: 'og:title', content: headTitle.value },
    { property: 'og:description', content: headDescription.value },
    { property: 'og:url', content: `https://bitalexis.com/${currentLang}` },
    { property: 'og:image', content: 'https://bitalexis.com/og-image.jpg' },
    { name: 'twitter:title', content: headTitle.value },
    { name: 'twitter:description', content: headDescription.value }
  ],
  link: [
    { rel: 'canonical', href: `https://bitalexis.com/${currentLang}` },
    { rel: 'alternate', hreflang: 'ru', href: 'https://bitalexis.com/ru' },
    { rel: 'alternate', hreflang: 'uk', href: 'https://bitalexis.com/ua' },
    { rel: 'alternate', hreflang: 'en', href: 'https://bitalexis.com/en' },
    { rel: 'alternate', hreflang: 'de', href: 'https://bitalexis.com/de' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://bitalexis.com/en' }
  ]
})

// Следим за изменением языка и обновляем head динамически
watch([locale, headTitle, headDescription], ([newLocale, newTitle, newDesc]) => {
  const lang = route.params.lang as string || 'en'
  useHead({
    title: newTitle,
    htmlAttrs: {
      lang: lang
    },
    meta: [
      { name: 'description', content: newDesc },
      { property: 'og:title', content: newTitle },
      { property: 'og:description', content: newDesc },
      { property: 'og:url', content: `https://bitalexis.com/${lang}` },
      { name: 'twitter:title', content: newTitle },
      { name: 'twitter:description', content: newDesc }
    ],
    link: [
      { rel: 'canonical', href: `https://bitalexis.com/${lang}` }
    ]
  })
})

onMounted(() => {
  $smoothScroll.initAnchorLinks()
  $initAnimations()
})
</script>
