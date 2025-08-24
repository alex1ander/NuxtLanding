<template>
  <div id="top" class="dark-style container">
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
    <PopUp
      v-model="popupVisible"
      :service="popupService"
    />

    <SvgSprite />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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

const { $initAnimations, $initSmoothScroll } = useNuxtApp()
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

// Устанавливаем язык из URL
locale.value = route.params.lang || 'en'

// Следим за изменением URL
watch(() => route.params.lang, (newLang) => {
  if (newLang) locale.value = newLang
})

onMounted(() => {
  $initSmoothScroll()
  $initAnimations()
})
</script>


