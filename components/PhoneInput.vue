<template>
  <div class="phone-input-wrapper">
    <CountryDropDown
      :selected-country-code="selectedCountryCode"
      @update:selected-country-code="handleCountryCodeChange"
      @country-selected="handleCountrySelected"
    />
    <input 
      :name="inputName" 
      type="tel" 
      v-model="phoneValue" 
      @input="handlePhoneInput" 
      @keydown="handlePhoneKeydown" 
      :placeholder="placeholder" 
      required 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CountryDropDown from './CountryDropDown.vue'

interface Country {
  code: string
  names: { ru: string; en: string; de: string; ua: string }
  flag: string
  maxLength: number
  mask: string
}

interface Props {
  modelValue: string
  inputName?: string
  placeholder?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  inputName: 'phone',
  placeholder: ''
})

const emit = defineEmits<Emits>()

// Реактивные данные
const selectedCountryCode = ref('+380')
const phoneValue = ref(props.modelValue)

// Данные стран для форматирования (только основные данные)
const countriesData: Country[] = [
  { code: '+380', names: { ru: 'Украина', en: 'Ukraine', de: 'Ukraine', ua: 'Україна' }, flag: '🇺🇦', maxLength: 13, mask: '+380 XX XXX XX XX' },
  { code: '+44', names: { ru: 'Великобритания', en: 'United Kingdom', de: 'Vereinigtes Königreich', ua: 'Великобританія' }, flag: '🇬🇧', maxLength: 13, mask: '+44 XXXX XXX XXX' },
  { code: '+49', names: { ru: 'Германия', en: 'Germany', de: 'Deutschland', ua: 'Німеччина' }, flag: '🇩🇪', maxLength: 14, mask: '+49 XXX XXXX XXXX' },
]

// Методы для работы с CountryDropDown
function handleCountryCodeChange(countryCode: string) {
  selectedCountryCode.value = countryCode
}

function handleCountrySelected(country: Country) {
  const currentDigits = phoneValue.value.replace(/[^\d]/g, '')
  const phoneDigits = currentDigits.slice(selectedCountryCode.value.replace(/[^\d]/g, '').length)
  const newValue = country.code + phoneDigits
  
  phoneValue.value = formatPhoneNumber(newValue, country.code)
  emit('update:modelValue', phoneValue.value)
}

function formatPhoneNumber(value: string, countryCode: string): string {
  const country = countriesData.find(c => c.code === countryCode)
  if (!country) return value

  const digitsOnly = value.replace(/[^\d+]/g, '')
  
  if (digitsOnly.length > country.maxLength) {
    return phoneValue.value
  }

  if (digitsOnly === country.code) {
    return country.code + ' '
  }

  const phoneDigits = digitsOnly.slice(country.code.length)
  
  if (phoneDigits.length === 0) {
    return country.code + ' '
  }

  let formatted = country.code + ' '
  const maskPattern = country.mask.slice(country.code.length + 1)
  let digitIndex = 0
  
  for (let i = 0; i < maskPattern.length && digitIndex < phoneDigits.length; i++) {
    if (maskPattern[i] === 'X') {
      formatted += phoneDigits[digitIndex]
      digitIndex++
    } else if (maskPattern[i] === ' ') {
      formatted += ' '
    }
  }

  return formatted
}

function handlePhoneKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement
  const currentValue = target.value
  const key = event.key
  
  if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key)) {
    return
  }
  
  if (event.ctrlKey || event.metaKey) {
    return
  }
  
  if (!/^\d$/.test(key)) {
    event.preventDefault()
    return
  }
  
  const digitsOnly = currentValue.replace(/[^\d+]/g, '')
  const currentCountry = countriesData.find(c => c.code === selectedCountryCode.value)
  
  if (currentCountry && digitsOnly.length >= currentCountry.maxLength) {
    event.preventDefault()
    return
  }
}

function handlePhoneInput(event: Event) {
  const target = event.target as HTMLInputElement
  let value = target.value
  
  const digitsOnly = value.replace(/[^\d+]/g, '')
  
  if (!digitsOnly || !digitsOnly.startsWith('+')) {
    const cleanDigits = digitsOnly.replace(/\+/g, '')
    value = '+' + cleanDigits
  } else {
    value = digitsOnly
  }

  let detectedCountryCode = selectedCountryCode.value
  if (value.length > 1) {
    const match = value.match(/^\+(\d+)/)
    if (match) {
      const inputCode = '+' + match[1]
      const foundCountry = countriesData.find(country => {
        return inputCode.startsWith(country.code) || country.code.startsWith(inputCode)
      })
      
      if (foundCountry) {
        detectedCountryCode = foundCountry.code
        if (foundCountry.code !== selectedCountryCode.value) {
          selectedCountryCode.value = foundCountry.code
        }
      }
    }
  }

  const formattedValue = formatPhoneNumber(value, detectedCountryCode)
  phoneValue.value = formattedValue
  emit('update:modelValue', phoneValue.value)
}

// Watchers
watch(() => props.modelValue, (newValue) => {
  phoneValue.value = newValue
})

watch(phoneValue, (newValue, oldValue) => {
  if (newValue && newValue !== oldValue) {
    if (!newValue.startsWith('+')) {
      const formatted = formatPhoneNumber('+' + newValue.replace(/[^\d]/g, ''), selectedCountryCode.value)
      phoneValue.value = formatted
      emit('update:modelValue', phoneValue.value)
      return
    }
    
    const digitsOnly = newValue.replace(/[^\d+]/g, '')
    const match = digitsOnly.match(/^\+(\d+)/)
    
    if (match) {
      const inputCode = '+' + match[1]
      const foundCountry = countriesData.find(country => {
        return inputCode.startsWith(country.code) || country.code.startsWith(inputCode)
      })
      
      if (foundCountry && foundCountry.code !== selectedCountryCode.value) {
        selectedCountryCode.value = foundCountry.code
      }
    }
  }
})
</script>

<style scoped>
.phone-input-wrapper {
  display: flex;
  gap: 0;
  width: 100%;

  input{
    padding-left: 92px;
  }
}
</style>