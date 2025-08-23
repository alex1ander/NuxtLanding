<script setup>
import { watch, ref, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: null
  }
})

const emit = defineEmits(['close-menu'])
const { t, locale } = useI18n() // получаем текущий язык
const animateMenu = ref(false)

const menuItems = [
  { labelKey: 'menuOurServices', href: '#our-service' },
  { labelKey: 'menuOurWorks', href: '#our-works' },
  { labelKey: 'menuAboutUs', href: '#advantages' },
  { labelKey: 'menuPrice', href: '#price' },
]

watch(() => props.isOpen, (newVal) => {
  if (newVal === true) {
    animateMenu.value = false
    setTimeout(() => {
      animateMenu.value = true
    }, 50)
  } else if (newVal === false) {
    animateMenu.value = false
  }
})

// Функция для закрытия меню при клике на ссылку
const handleClick = () => {
  emit('close-menu')
}

// Формируем путь с текущим языком
const getLink = (href) => `/${locale.value}/${href}`
</script>

<template>
  <ul 
    class="main-menu" 
    :class="{ animate: animateMenu, 'no-animate': props.isOpen === null }"
  >
    <li
      v-for="(item, index) in menuItems"
      :key="index"
      class="menu-item"
      :style="props.isOpen !== null ? { '--delay': (index * 0.15) + 's' } : {}"
    >
      <router-link 
        :to="getLink(item.href)" 
        @click="handleClick"
      >
        {{ t(item.labelKey) }}
      </router-link>
    </li>
  </ul>
</template>
