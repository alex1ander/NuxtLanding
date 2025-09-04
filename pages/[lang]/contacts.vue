<template>
  <div id="top" class="dark-style container">
    <CursorCircle />
    <FigureFirst />
    <FigureSecond />
    <HeaderSection />
    <main>
        <section id="contact" class="information-section">
        <div class="content">
            <h1>{{ t('contactTitle') }}</h1>

            <p>{{ t('contactIntro') }}</p>

            <h2>{{ t('contactAddressTitle') }}</h2>
            <p>{{ t('contactAddressText') }}</p>

            <h2>{{ t('contactPhoneTitle') }}</h2>
            <p>{{ t('contactPhoneText') }}</p>

            <h2>{{ t('contactEmailTitle') }}</h2>
            <p>{{ t('contactEmailText') }}</p>

            <h2>{{ t('contactFormTitle') }}</h2>
            <p>{{ t('contactFormText') }}</p>
        </div>
        </section>
    </main>
    <FooterSection />
    <SvgSprite />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from '#app'
import { useI18n } from 'vue-i18n'
import { useNuxtApp } from '#app'

import HeaderSection from '@/components/HeaderSection.vue'
import CursorCircle from '@/components/CursorCircle.vue'
import FigureFirst from '@/components/FigureFirst.vue'
import FigureSecond from '@/components/FigureSecond.vue'
import SvgSprite from '@/components/SvgSprite.vue'
import FooterSection from '@/components/FooterSection.vue'

const { $initAnimations, $smoothScroll } = useNuxtApp()

const route = useRoute()
const { locale, t } = useI18n()

// Реактивные заголовок и описание
const headTitle = computed(() => t('contactTitle'))
const headDescription = computed(() => t('contactIntro'))

// SEO и hreflang настройки
const currentLang = route.params.lang as string || 'en'

// Устанавливаем начальный head
useHead({
  title: `${headTitle.value} - BitAlexis`,
  htmlAttrs: {
    lang: currentLang
  },
  meta: [
    { name: 'description', content: headDescription.value },
    { property: 'og:title', content: `${headTitle.value} - BitAlexis` },
    { property: 'og:description', content: headDescription.value },
    { property: 'og:url', content: `https://bitalexis.com/${currentLang}/contacts` },
    { property: 'og:image', content: 'https://bitalexis.com/og-image.jpg' },
    { name: 'twitter:title', content: `${headTitle.value} - BitAlexis` },
    { name: 'twitter:description', content: headDescription.value }
  ],
  link: [
    { rel: 'canonical', href: `https://bitalexis.com/${currentLang}/contacts` },
    { rel: 'alternate', hreflang: 'ru', href: 'https://bitalexis.com/ru/contacts' },
    { rel: 'alternate', hreflang: 'uk', href: 'https://bitalexis.com/ua/contacts' },
    { rel: 'alternate', hreflang: 'en', href: 'https://bitalexis.com/en/contacts' },
    { rel: 'alternate', hreflang: 'de', href: 'https://bitalexis.com/de/contacts' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://bitalexis.com/en/contacts' }
  ]
})

// Обновляем head при изменении языка
watch([headTitle, headDescription], ([newTitle, newDesc]) => {
  const lang = route.params.lang as string || 'en'
  useHead({
    title: `${newTitle} - BitAlexis`,
    htmlAttrs: {
      lang: lang
    },
    meta: [
      { name: 'description', content: newDesc },
      { property: 'og:title', content: `${newTitle} - BitAlexis` },
      { property: 'og:description', content: newDesc },
      { property: 'og:url', content: `https://bitalexis.com/${lang}/contacts` },
      { name: 'twitter:title', content: `${newTitle} - BitAlexis` },
      { name: 'twitter:description', content: newDesc }
    ],
    link: [
      { rel: 'canonical', href: `https://bitalexis.com/${lang}/contacts` }
    ]
  })
})

// Состояние попапа
const popupVisible = ref(false)
const popupService = ref('')

// Функция открытия попапа
function handleOpenContactForm(serviceName: string) {
  popupService.value = serviceName
  popupVisible.value = true
}

// Устанавливаем язык из URL
locale.value = route.params.lang || 'en'

// Следим за изменением языка в URL
watch(() => route.params.lang, (newLang) => {
  if (newLang) locale.value = newLang
})

onMounted(() => {
  $smoothScroll.initAnchorLinks()
  $initAnimations()
})
</script>
