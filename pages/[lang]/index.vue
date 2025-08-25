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

// Устанавливаем head сразу при инициализации
useHead({
  title: headTitle.value,
  meta: [
    { name: 'description', content: headDescription.value }
  ]
})

// Следим за изменением языка и обновляем head динамически
watch(locale, () => {
  useHead({
    title: t('meta.title'),
    meta: [
      { name: 'description', content: t('meta.description') }
    ]
  })
})

onMounted(() => {
  $smoothScroll.initAnchorLinks()
  $initAnimations()
})
</script>
