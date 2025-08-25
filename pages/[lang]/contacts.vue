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
const headTitle = computed(() => t('meta.title'))
const headDescription = computed(() => t('meta.description'))

// Устанавливаем начальный head
useHead({
  title: headTitle.value,
  meta: [
    { name: 'description', content: headDescription.value }
  ]
})

// Обновляем head при изменении языка
watch([headTitle, headDescription], ([newTitle, newDesc]) => {
  useHead({
    title: newTitle,
    meta: [
      { name: 'description', content: newDesc }
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
