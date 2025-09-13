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

// Данные стран для форматирования (полный список из CountryDropDown)
const countriesData: Country[] = [
  // Европа
  { code: '+380', names: { ru: 'Украина', en: 'Ukraine', de: 'Ukraine', ua: 'Україна' }, flag: '🇺🇦', maxLength: 13, mask: '+380 XX XXX XX XX' },
  { code: '+44', names: { ru: 'Великобритания', en: 'United Kingdom', de: 'Vereinigtes Königreich', ua: 'Великобританія' }, flag: '🇬🇧', maxLength: 13, mask: '+44 XXXX XXX XXX' },
  { code: '+49', names: { ru: 'Германия', en: 'Germany', de: 'Deutschland', ua: 'Німеччина' }, flag: '🇩🇪', maxLength: 14, mask: '+49 XXX XXXX XXXX' },
  { code: '+33', names: { ru: 'Франция', en: 'France', de: 'Frankreich', ua: 'Франція' }, flag: '🇫🇷', maxLength: 12, mask: '+33 X XX XX XX XX' },
  { code: '+39', names: { ru: 'Италия', en: 'Italy', de: 'Italien', ua: 'Італія' }, flag: '🇮🇹', maxLength: 13, mask: '+39 XXX XXX XXXX' },
  { code: '+34', names: { ru: 'Испания', en: 'Spain', de: 'Spanien', ua: 'Іспанія' }, flag: '🇪🇸', maxLength: 12, mask: '+34 XXX XXX XXX' },
  { code: '+31', names: { ru: 'Нидерланды', en: 'Netherlands', de: 'Niederlande', ua: 'Нідерланди' }, flag: '🇳🇱', maxLength: 12, mask: '+31 X XXXX XXXX' },
  { code: '+48', names: { ru: 'Польша', en: 'Poland', de: 'Polen', ua: 'Польща' }, flag: '🇵🇱', maxLength: 12, mask: '+48 XXX XXX XXX' },
  { code: '+420', names: { ru: 'Чехия', en: 'Czech Republic', de: 'Tschechien', ua: 'Чехія' }, flag: '🇨🇿', maxLength: 13, mask: '+420 XXX XXX XXX' },
  { code: '+421', names: { ru: 'Словакия', en: 'Slovakia', de: 'Slowakei', ua: 'Словаччина' }, flag: '🇸🇰', maxLength: 13, mask: '+421 XXX XXX XXX' },
  { code: '+36', names: { ru: 'Венгрия', en: 'Hungary', de: 'Ungarn', ua: 'Угорщина' }, flag: '🇭🇺', maxLength: 12, mask: '+36 XX XXX XXXX' },
  { code: '+40', names: { ru: 'Румыния', en: 'Romania', de: 'Rumänien', ua: 'Румунія' }, flag: '🇷🇴', maxLength: 12, mask: '+40 XXX XXX XXX' },
  { code: '+359', names: { ru: 'Болгария', en: 'Bulgaria', de: 'Bulgarien', ua: 'Болгарія' }, flag: '🇧🇬', maxLength: 13, mask: '+359 XX XXX XXXX' },
  { code: '+30', names: { ru: 'Греция', en: 'Greece', de: 'Griechenland', ua: 'Греція' }, flag: '🇬🇷', maxLength: 13, mask: '+30 XXX XXX XXXX' },
  { code: '+43', names: { ru: 'Австрия', en: 'Austria', de: 'Österreich', ua: 'Австрія' }, flag: '🇦🇹', maxLength: 13, mask: '+43 XXX XXXX XXX' },
  { code: '+41', names: { ru: 'Швейцария', en: 'Switzerland', de: 'Schweiz', ua: 'Швейцарія' }, flag: '🇨🇭', maxLength: 12, mask: '+41 XX XXX XX XX' },
  { code: '+32', names: { ru: 'Бельгия', en: 'Belgium', de: 'Belgien', ua: 'Бельгія' }, flag: '🇧🇪', maxLength: 12, mask: '+32 XXX XX XX XX' },
  { code: '+46', names: { ru: 'Швеция', en: 'Sweden', de: 'Schweden', ua: 'Швеція' }, flag: '🇸🇪', maxLength: 12, mask: '+46 XX XXX XX XX' },
  { code: '+47', names: { ru: 'Норвегия', en: 'Norway', de: 'Norwegen', ua: 'Норвегія' }, flag: '🇳🇴', maxLength: 11, mask: '+47 XXX XX XXX' },
  { code: '+45', names: { ru: 'Дания', en: 'Denmark', de: 'Dänemark', ua: 'Данія' }, flag: '🇩🇰', maxLength: 11, mask: '+45 XX XX XX XX' },
  { code: '+358', names: { ru: 'Финляндия', en: 'Finland', de: 'Finnland', ua: 'Фінляндія' }, flag: '🇫🇮', maxLength: 12, mask: '+358 XX XXX XXXX' },
  { code: '+354', names: { ru: 'Исландия', en: 'Iceland', de: 'Island', ua: 'Ісландія' }, flag: '🇮🇸', maxLength: 10, mask: '+354 XXX XXXX' },
  { code: '+353', names: { ru: 'Ирландия', en: 'Ireland', de: 'Irland', ua: 'Ірландія' }, flag: '🇮🇪', maxLength: 12, mask: '+353 XX XXX XXXX' },
  { code: '+351', names: { ru: 'Португалия', en: 'Portugal', de: 'Portugal', ua: 'Португалія' }, flag: '🇵🇹', maxLength: 12, mask: '+351 XXX XXX XXX' },
  { code: '+352', names: { ru: 'Люксембург', en: 'Luxembourg', de: 'Luxemburg', ua: 'Люксембург' }, flag: '🇱🇺', maxLength: 11, mask: '+352 XXX XXX XXX' },
  { code: '+386', names: { ru: 'Словения', en: 'Slovenia', de: 'Slowenien', ua: 'Словенія' }, flag: '🇸🇮', maxLength: 11, mask: '+386 XX XXX XXX' },
  { code: '+385', names: { ru: 'Хорватия', en: 'Croatia', de: 'Kroatien', ua: 'Хорватія' }, flag: '🇭🇷', maxLength: 12, mask: '+385 XX XXX XXXX' },
  { code: '+387', names: { ru: 'Босния и Герцеговина', en: 'Bosnia and Herzegovina', de: 'Bosnien und Herzegowina', ua: 'Боснія і Герцеговина' }, flag: '🇧🇦', maxLength: 11, mask: '+387 XX XXX XXX' },
  { code: '+382', names: { ru: 'Черногория', en: 'Montenegro', de: 'Montenegro', ua: 'Чорногорія' }, flag: '🇲🇪', maxLength: 11, mask: '+382 XX XXX XXX' },
  { code: '+381', names: { ru: 'Сербия', en: 'Serbia', de: 'Serbien', ua: 'Сербія' }, flag: '🇷🇸', maxLength: 12, mask: '+381 XX XXX XXXX' },
  { code: '+383', names: { ru: 'Косово', en: 'Kosovo', de: 'Kosovo', ua: 'Косово' }, flag: '🇽🇰', maxLength: 11, mask: '+383 XX XXX XXX' },
  { code: '+389', names: { ru: 'Северная Македония', en: 'North Macedonia', de: 'Nordmazedonien', ua: 'Північна Македонія' }, flag: '🇲🇰', maxLength: 11, mask: '+389 XX XXX XXX' },
  { code: '+355', names: { ru: 'Албания', en: 'Albania', de: 'Albanien', ua: 'Албанія' }, flag: '🇦🇱', maxLength: 12, mask: '+355 XX XXX XXXX' },
  { code: '+373', names: { ru: 'Молдова', en: 'Moldova', de: 'Moldau', ua: 'Молдова' }, flag: '🇲🇩', maxLength: 11, mask: '+373 XX XXX XXX' },
  { code: '+370', names: { ru: 'Литва', en: 'Lithuania', de: 'Litauen', ua: 'Литва' }, flag: '🇱🇹', maxLength: 11, mask: '+370 XXX XX XXX' },
  { code: '+371', names: { ru: 'Латвия', en: 'Latvia', de: 'Lettland', ua: 'Латвія' }, flag: '🇱🇻', maxLength: 11, mask: '+371 XX XXX XXX' },
  { code: '+372', names: { ru: 'Эстония', en: 'Estonia', de: 'Estland', ua: 'Естонія' }, flag: '🇪🇪', maxLength: 11, mask: '+372 XXX XXXX' },
  { code: '+375', names: { ru: 'Беларусь', en: 'Belarus', de: 'Belarus', ua: 'Білорусь' }, flag: '🇧🇾', maxLength: 12, mask: '+375 XX XXX XX XX' },
  { code: '+377', names: { ru: 'Монако', en: 'Monaco', de: 'Monaco', ua: 'Монако' }, flag: '🇲🇨', maxLength: 11, mask: '+377 XX XX XX XX' },
  { code: '+378', names: { ru: 'Сан-Марино', en: 'San Marino', de: 'San Marino', ua: 'Сан-Маріно' }, flag: '🇸🇲', maxLength: 13, mask: '+378 XXXX XXXXXX' },
  { code: '+379', names: { ru: 'Ватикан', en: 'Vatican City', de: 'Vatikanstadt', ua: 'Ватикан' }, flag: '🇻🇦', maxLength: 13, mask: '+379 XX XXXX XXXX' },
  { code: '+376', names: { ru: 'Андорра', en: 'Andorra', de: 'Andorra', ua: 'Андорра' }, flag: '🇦🇩', maxLength: 9, mask: '+376 XXX XXX' },
  { code: '+423', names: { ru: 'Лихтенштейн', en: 'Liechtenstein', de: 'Liechtenstein', ua: 'Ліхтенштейн' }, flag: '🇱🇮', maxLength: 11, mask: '+423 XXX XX XX' },
  { code: '+350', names: { ru: 'Гибралтар', en: 'Gibraltar', de: 'Gibraltar', ua: 'Гібралтар' }, flag: '🇬🇮', maxLength: 11, mask: '+350 XXX XXXXX' },
  { code: '+298', names: { ru: 'Фарерские острова', en: 'Faroe Islands', de: 'Färöer-Inseln', ua: 'Фарерські острови' }, flag: '🇫🇴', maxLength: 9, mask: '+298 XX XX XX' },

  // Турция
  { code: '+90', names: { ru: 'Турция', en: 'Turkey', de: 'Türkei', ua: 'Туреччина' }, flag: '🇹🇷', maxLength: 13, mask: '+90 XXX XXX XXXX' },

  // Другие популярные страны
  { code: '+1', names: { ru: 'США/Канада', en: 'United States/Canada', de: 'USA/Kanada', ua: 'США/Канада' }, flag: '🇺🇸', maxLength: 12, mask: '+1 XXX XXX XXXX' },
  { code: '+86', names: { ru: 'Китай', en: 'China', de: 'China', ua: 'Китай' }, flag: '🇨🇳', maxLength: 14, mask: '+86 XXX XXXX XXXX' },
  { code: '+81', names: { ru: 'Япония', en: 'Japan', de: 'Japan', ua: 'Японія' }, flag: '🇯🇵', maxLength: 13, mask: '+81 XX XXXX XXXX' },
  { code: '+82', names: { ru: 'Южная Корея', en: 'South Korea', de: 'Südkorea', ua: 'Південна Корея' }, flag: '🇰🇷', maxLength: 13, mask: '+82 XX XXXX XXXX' },
  { code: '+91', names: { ru: 'Индия', en: 'India', de: 'Indien', ua: 'Індія' }, flag: '🇮🇳', maxLength: 13, mask: '+91 XXXXX XXXXX' },
  { code: '+55', names: { ru: 'Бразилия', en: 'Brazil', de: 'Brasilien', ua: 'Бразилія' }, flag: '🇧🇷', maxLength: 14, mask: '+55 XX XXXXX XXXX' },
  { code: '+52', names: { ru: 'Мексика', en: 'Mexico', de: 'Mexiko', ua: 'Мексика' }, flag: '🇲🇽', maxLength: 13, mask: '+52 XXX XXX XXXX' },
  { code: '+61', names: { ru: 'Австралия', en: 'Australia', de: 'Australien', ua: 'Австралія' }, flag: '🇦🇺', maxLength: 12, mask: '+61 XXX XXX XXX' },
  { code: '+64', names: { ru: 'Новая Зеландия', en: 'New Zealand', de: 'Neuseeland', ua: 'Нова Зеландія' }, flag: '🇳🇿', maxLength: 12, mask: '+64 XX XXX XXXX' },
  { code: '+27', names: { ru: 'ЮАР', en: 'South Africa', de: 'Südafrika', ua: 'ПАР' }, flag: '🇿🇦', maxLength: 12, mask: '+27 XX XXX XXXX' },
  { code: '+20', names: { ru: 'Египет', en: 'Egypt', de: 'Ägypten', ua: 'Єгипет' }, flag: '🇪🇬', maxLength: 13, mask: '+20 XXX XXX XXXX' },
  { code: '+971', names: { ru: 'ОАЭ', en: 'UAE', de: 'VAE', ua: 'ОАЕ' }, flag: '🇦🇪', maxLength: 13, mask: '+971 XX XXX XXXX' },
  { code: '+966', names: { ru: 'Саудовская Аравия', en: 'Saudi Arabia', de: 'Saudi-Arabien', ua: 'Саудівська Аравія' }, flag: '🇸🇦', maxLength: 13, mask: '+966 XX XXX XXXX' },
  { code: '+972', names: { ru: 'Израиль', en: 'Israel', de: 'Israel', ua: 'Ізраїль' }, flag: '🇮🇱', maxLength: 12, mask: '+972 XX XXX XXXX' }
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
  
  // Если номер слишком длинный, возвращаем предыдущее значение
  if (digitsOnly.length > country.maxLength) {
    return phoneValue.value
  }

  // Если введен только код страны
  if (digitsOnly === country.code) {
    return country.code + ' '
  }

  // Извлекаем цифры номера без кода страны
  const phoneDigits = digitsOnly.slice(country.code.length)
  
  // Если нет цифр номера, возвращаем код страны с пробелом
  if (phoneDigits.length === 0) {
    return country.code + ' '
  }

  // Начинаем форматирование с кода страны
  let formatted = country.code + ' '
  const maskPattern = country.mask.slice(country.code.length + 1)
  let digitIndex = 0
  
  // Применяем маску форматирования
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
  
  // Определяем страну по введенному коду
  if (value.length > 1) {
    const match = value.match(/^\+(\d+)/)
    if (match) {
      const inputCode = '+' + match[1]
      
      // Ищем точное совпадение кода страны
      let foundCountry = countriesData.find(country => country.code === inputCode)
      
      // Если точного совпадения нет, ищем частичное совпадение
      if (!foundCountry) {
        foundCountry = countriesData.find(country => {
          return inputCode.startsWith(country.code) || country.code.startsWith(inputCode)
        })
      }
      
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
      
      // Ищем точное совпадение кода страны
      let foundCountry = countriesData.find(country => country.code === inputCode)
      
      // Если точного совпадения нет, ищем частичное совпадение
      if (!foundCountry) {
        foundCountry = countriesData.find(country => {
          return inputCode.startsWith(country.code) || country.code.startsWith(inputCode)
        })
      }
      
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