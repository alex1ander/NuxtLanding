<template>
  <div class="dropdown-list" ref="dropdown" :class="{ active: isDropdownActive }">
    <div class="dropdown-head text-with-svg btn-backarea mobile-circle" @click="toggleDropdown">
      <svg width="30" height="30" class="sprite-svg-fill">
        <use href="#earth"></use>
      </svg>
      <span class="lang-code">{{ currentLang.toUpperCase() }}</span>
    </div>
    <div class="dropdown-body" @click.stop>
      <ul class="selected-list animated-list">
        <li 
          v-for="lang in languages" 
          :key="lang.code"
          class="cursor-hover"
          :class="{ active: currentLang === lang.code }"
          @click.stop="switchLanguage(lang.code)"
        >
          {{ lang.label }}
          <svg v-if="currentLang === lang.code" width="16" height="16" class="sprite-svg-fill">
            <use href="#check"></use>
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from '#app'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

const isDropdownActive = ref(false)
const currentLang = ref('en')
const dropdown = ref<HTMLElement | null>(null)

const languages = [
  { code: 'ua', label: 'Українська' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
]

function toggleDropdown() {
  isDropdownActive.value = !isDropdownActive.value
}

function onClickOutside(event: MouseEvent) {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isDropdownActive.value = false
  }
}

onMounted(() => {
  const savedLang = localStorage.getItem('lang') || 'en'
  currentLang.value = savedLang
  locale.value = savedLang
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

function switchLanguage(lang: string) {
  if (lang === currentLang.value) return

  currentLang.value = lang
  locale.value = lang
  localStorage.setItem('lang', lang)
  document.documentElement.lang = lang

  // Только меняем URL без перезагрузки компонента
  const segments = window.location.pathname.split('/').filter(Boolean)
  if (['ua','ru','en'].includes(segments[0])) {
    segments[0] = lang
  } else {
    segments.unshift(lang)
  }
  const newPath = '/' + segments.join('/')

  // Меняем URL в адресной строке без перезагрузки
  window.history.replaceState(null, '', newPath + window.location.search)

  isDropdownActive.value = false
}



</script>
