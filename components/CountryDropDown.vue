<template>
  <div class="dropdown-list" ref="dropdown" :class="{ active: isDropdownActive }">
    <div class="dropdown-head text-with-svg" @click="toggleDropdown">
      <span class="country-flag">{{ currentCountry.flag }}</span>
      <svg width="12" height="12" class="dropdown-arrow">
        <path d="M6 8L2 4h8z" />
      </svg>
    </div>
    <div class="dropdown-body" @click.stop>
      
      <!-- Список стран -->
      <ul class="selected-list animated-list">

        <li  class="cursor-hover country-item">
          <!-- Поле поиска -->
          <div class="country-search">
            <input
              type="text"
              v-model="countrySearchQuery"
              class="country-search-input"
              :placeholder="t('searchCountry') || 'Поиск страны...'"
              @click.stop
            />
            <svg v-if="countrySearchQuery" @click="clearCountrySearch" class="clear-search-icon" width="16" height="16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM11.5 10.1L10.1 11.5 8 9.4 5.9 11.5 4.5 10.1 6.6 8 4.5 5.9 5.9 4.5 8 6.6 10.1 4.5 11.5 5.9 9.4 8l2.1 2.1z" />
            </svg>
            <svg v-else class="search-icon" width="16" height="16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </li>

        <li v-if="filteredCountries.length === 0" class="no-results">
          {{ t('noCountriesFound') || 'Страны не найдены' }}
        </li>
        <li
          v-for="country in filteredCountries"
          :key="country.code"
          :class="{ active: country.code === selectedCountryCode }"
          @click.stop="selectCountry(country)"
          class="cursor-hover country-item"
        >
          <span class="country-flag">{{ country.flag }}</span>
          <span class="country-name">{{ country.name }}</span>
          <span class="country-code">{{ country.code }}</span>
          <svg v-if="country.code === selectedCountryCode" width="16" height="16" class="sprite-svg-fill">
            <use href="#check"></use>
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

interface Country {
  code: string
  names: { ru: string; en: string; de: string; ua: string }
  flag: string
  maxLength: number
  mask: string
}

interface Props {
  selectedCountryCode?: string
}

interface Emits {
  (e: 'update:selectedCountryCode', value: string): void
  (e: 'countrySelected', country: Country): void
}

const props = withDefaults(defineProps<Props>(), {
  selectedCountryCode: '+380'
})

const emit = defineEmits<Emits>()

const { t, locale } = useI18n()

// Реактивные данные
const isDropdownActive = ref(false)
const dropdown = ref<HTMLElement | null>(null)
const countrySearchQuery = ref('')
const selectedCountryCode = ref(props.selectedCountryCode)

// Список стран с кодами, мультиязычными названиями и масками форматирования
const countriesData: Country[] = [
  // Европа
  { code: '+380', names: { ru: 'Украина', en: 'Ukraine', de: 'Ukraine', ua: 'Україна' }, flag: '🇺🇦', maxLength: 13, mask: '+380 XX XXX XX XX' },
  { code: '+44', names: { ru: 'Великобритания', en: 'United Kingdom', de: 'Vereinigtes Königreich', ua: 'Великобританія' }, flag: '🇬🇧', maxLength: 13, mask: '+44 XXXX XXX XXX' },
  { code: '+49', names: { ru: 'Германия', en: 'Germany', de: 'Deutschland', ua: 'Німеччина' }, flag: '🇩🇪', maxLength: 14, mask: '+49 XXX XXXX XXXX' },
]

// Вычисляемые свойства
const countries = computed(() => {
  return countriesData.map(country => ({
    ...country,
    name: country.names[locale.value as keyof typeof country.names] || country.names.en
  }))
})

const filteredCountries = computed(() => {
  if (!countrySearchQuery.value.trim()) {
    return countries.value
  }
  
  const query = countrySearchQuery.value.toLowerCase().trim()
  return countries.value.filter(country => {
    const currentName = country.name.toLowerCase()
    const code = country.code.toLowerCase()
    const allNames = Object.values(country.names).join(' ').toLowerCase()
    
    return currentName.includes(query) || code.includes(query) || allNames.includes(query)
  })
})

const currentCountry = computed(() => {
  return countries.value.find(c => c.code === selectedCountryCode.value) || countries.value[0]
})

// Методы
function toggleDropdown() {
  isDropdownActive.value = !isDropdownActive.value
  if (isDropdownActive.value) {
    countrySearchQuery.value = ''
    nextTick(() => {
      const searchInput = document.querySelector('.country-search-input') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    })
  }
}

function clearCountrySearch() {
  countrySearchQuery.value = ''
}

function selectCountry(country: Country) {
  selectedCountryCode.value = country.code
  isDropdownActive.value = false
  countrySearchQuery.value = ''
  
  emit('update:selectedCountryCode', country.code)
  emit('countrySelected', country)
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

  .dropdown-list{
    left: 6px;
    right: auto;

    .dropdown-body{
      left: 0;
    }
  }

  .country-search{
    position: relative;
    height: fit-content;

    .country-search-input{
      padding: 6px 12px;
    }

    .search-icon,.clear-search-icon{
      position: absolute;
      right: 16px;
      top:0;
      bottom: 0;
      margin: auto;
    }
  }

</style>
