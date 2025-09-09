<template>
  <div class="dropdown-list" ref="dropdown" :class="{ active: isDropdownActive }">
    <div class="dropdown-head text-with-svg btn-backarea mobile-circle" @click="toggleDropdown">
      <svg width="24" height="24" class="sprite-svg-fill">
        <use href="#call"></use>
      </svg>
      <span class="contact-label">{{ t('phoneNumber') }}</span>
    </div>
    <div class="dropdown-body" @click.stop>
      <ul class="selected-list animated-list">
        <li v-for="contact in contacts" :key="contact.key" class="cursor-hover">
          <a :href="contact.hrefKey" rel="noopener noreferrer">
            {{ contact.labelKey }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isDropdownActive = ref(false)
const dropdown = ref<HTMLElement | null>(null)

const contacts = [
  { key: 'phone1', labelKey: '+49 176 60887834', hrefKey: 'tel:+4917660887834' },
  { key: 'emailSupport', labelKey: 'BitAlexisWeb@gmail.com', hrefKey: 'mailto:BitAlexisWeb@gmail.com' },
  { key: 'phone2', labelKey: '+49 176 12345678', hrefKey: 'tel:+4917612345678' },
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
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped lang="scss">
.dropdown-body {
  right: 0;
}

.selected-list li a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
</style>
