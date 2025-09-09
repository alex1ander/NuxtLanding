<template>
  <form class="contact-from" style="flex:6;" @submit.prevent="handleSubmit">

    <!-- honeypot поле (скрытое) -->
    <input type="text" v-model="honeypot" name="honeypot" style="display:none" autocomplete="off" tabindex="-1" />

    <!-- Поле имени -->
    <div class="this-input-block required">
      <input type="hidden" v-model="localService" name="service" readonly />
      <label for="name">
        {{ t('formLabelName') }}
        <span class="requiredLabel">{{ t('required') }}</span>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        :placeholder="t('formLabelName')"
        required
        v-model="name"
      />
    </div>

    <!-- Дропдаун контактного типа -->
    <div class="this-input-block required">
      <label>
        {{ t('formLabelContact') }}
        <span class="requiredLabel">{{ t('required') }}</span>
      </label>
      <div class="wrapper-input">
        <div class="dropdown-list" ref="dropdownRef" :class="{ active: isDropdownActive }">
          <div class="dropdown-head text-with-svg" @click="toggleDropdown">
            <span>{{ currentType.label }}</span>
          </div>
          <div class="dropdown-body" @click.stop>
            <ul class="selected-list animated-list">
              <li
                v-for="type in contactTypes"
                :class="{ active: type.value === currentType.value }"
                :key="type.value"
                @click.stop="selectType(type)"
                class="cursor-hover"
              >
                {{ type.label }}
                <svg v-if="type.value === currentType.value" width="24" height="24" class="sprite-svg-fill">
                  <use href="#check"></use>
                </svg>
              </li>
            </ul>
          </div>
        </div>

        <!-- Поля ввода контакта -->
        <input v-if="currentType.value === 'email'" name="email" type="email" v-model="contactValue" placeholder="example@example.com" required />
        
        <!-- Поле телефона с селектором кода страны -->
        <div v-else-if="currentType.value === 'tel'" class="phone-input-wrapper">
          <div class="country-selector" ref="countryDropdownTelRef" :class="{ active: isCountryDropdownActive }">
            <div class="country-selector-head" @click="toggleCountryDropdown">
              <span class="country-flag">{{ currentCountry.flag }}</span>
              <span class="country-code">{{ currentCountry.code }}</span>
              <svg width="12" height="12" class="dropdown-arrow">
                <path d="M6 8L2 4h8z" fill="currentColor"/>
              </svg>
            </div>
            <div class="country-selector-body" @click.stop>
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
                  <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM11.5 10.1L10.1 11.5 8 9.4 5.9 11.5 4.5 10.1 6.6 8 4.5 5.9 5.9 4.5 8 6.6 10.1 4.5 11.5 5.9 9.4 8l2.1 2.1z" fill="currentColor"/>
                </svg>
                <svg v-else class="search-icon" width="16" height="16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" fill="currentColor"/>
                </svg>
              </div>
              
              <!-- Список стран -->
              <ul class="country-list">
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
          <input name="phone" type="tel" v-model="contactValue" @input="handlePhoneInput" :placeholder="'+' + t('formPlaceholderType')" required />
        </div>
        
        <input v-else-if="currentType.value === 'tg'" name="telegram" type="text" v-model="contactValue" placeholder="@telegram_username" required />
        
        <!-- Поле WhatsApp с селектором кода страны -->
        <div v-else-if="currentType.value === 'whatsapp'" class="phone-input-wrapper">
          <div class="country-selector" ref="countryDropdownWhatsappRef" :class="{ active: isCountryDropdownActive }">
            <div class="country-selector-head" @click="toggleCountryDropdown">
              <span class="country-flag">{{ currentCountry.flag }}</span>
              <span class="country-code">{{ currentCountry.code }}</span>
              <svg width="12" height="12" class="dropdown-arrow">
                <path d="M6 8L2 4h8z" fill="currentColor"/>
              </svg>
            </div>
            <div class="country-selector-body" @click.stop>
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
                  <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM11.5 10.1L10.1 11.5 8 9.4 5.9 11.5 4.5 10.1 6.6 8 4.5 5.9 5.9 4.5 8 6.6 10.1 4.5 11.5 5.9 9.4 8l2.1 2.1z" fill="currentColor"/>
                </svg>
                <svg v-else class="search-icon" width="16" height="16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" fill="currentColor"/>
                </svg>
              </div>
              
              <!-- Список стран -->
              <ul class="country-list">
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
          <input name="whatsapp" type="tel" v-model="contactValue" @input="handlePhoneInput" :placeholder="'+' + t('formPlaceholderType')" required />
        </div>
      </div>
    </div>

    <!-- Чекбокс оставить комментарий -->
    <div class="isWantsComment this-input-block">
      <label>{{ t('formIsWantsComment') }}</label>
      <div class="wrapper-checbox-input">
        <input type="checkbox" id="custom-checkbox" v-model="wantsComment" class="checkbox-native" />
        <span class="custom-checkbox"></span>
      </div>
    </div>

    <!-- Текстовое поле комментария -->
    <transition name="expand">
      <div class="this-input-block" v-if="wantsComment" style="overflow: hidden;">
        <label for="comment">{{ t('formLabelComment') }}</label>
        <textarea
          id="comment"
          name="comment"
          v-model="comment"
          rows="4"
          :placeholder="t('formPlaceholderComment')"
        ></textarea>
      </div>
    </transition>

    <!-- Сообщение об успехе/ошибке -->
    <p v-if="message.text" :class="['form-message', message.type]">{{ message.text }}</p>

    <!-- Кнопка -->
    <button type="submit" class="btn-240 gr-transition" :disabled="loading">
      {{ loading ? t('loading') : t('consultBtn') }}
    </button>

  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// Поля формы
const name = ref('')
const contactValue = ref('')
const localService = ref('')
const comment = ref('')
const honeypot = ref('')
const wantsComment = ref(false)
const currentTypeValue = ref('tel')

// Дропдауны
const dropdownRef = ref<HTMLElement | null>(null)
const countryDropdownTelRef = ref<HTMLElement | null>(null)
const countryDropdownWhatsappRef = ref<HTMLElement | null>(null)
const isDropdownActive = ref(false)
const isCountryDropdownActive = ref(false)

// Коды стран
const selectedCountryCode = ref('+380')

// Список стран с кодами и мультиязычными названиями
const countriesData = [
  { code: '+380', names: { ru: 'Украина', en: 'Ukraine', de: 'Ukraine', ua: 'Україна' }, flag: '🇺🇦' },
  // { code: '+7', names: { ru: 'Россия', en: 'Russia', de: 'Russland', ua: 'Росія' }, flag: '🇷🇺' },
  { code: '+1', names: { ru: 'США', en: 'United States', de: 'USA', ua: 'США' }, flag: '🇺🇸' },
  { code: '+44', names: { ru: 'Великобритания', en: 'United Kingdom', de: 'Vereinigtes Königreich', ua: 'Великобританія' }, flag: '🇬🇧' },
  { code: '+49', names: { ru: 'Германия', en: 'Germany', de: 'Deutschland', ua: 'Німеччина' }, flag: '🇩🇪' },
  { code: '+33', names: { ru: 'Франция', en: 'France', de: 'Frankreich', ua: 'Франція' }, flag: '🇫🇷' },
  { code: '+39', names: { ru: 'Италия', en: 'Italy', de: 'Italien', ua: 'Італія' }, flag: '🇮🇹' },
  { code: '+34', names: { ru: 'Испания', en: 'Spain', de: 'Spanien', ua: 'Іспанія' }, flag: '🇪🇸' },
  { code: '+31', names: { ru: 'Нидерланды', en: 'Netherlands', de: 'Niederlande', ua: 'Нідерланди' }, flag: '🇳🇱' },
  { code: '+48', names: { ru: 'Польша', en: 'Poland', de: 'Polen', ua: 'Польща' }, flag: '🇵🇱' },
  { code: '+420', names: { ru: 'Чехия', en: 'Czech Republic', de: 'Tschechien', ua: 'Чехія' }, flag: '🇨🇿' },
  { code: '+421', names: { ru: 'Словакия', en: 'Slovakia', de: 'Slowakei', ua: 'Словаччина' }, flag: '🇸🇰' },
  { code: '+36', names: { ru: 'Венгрия', en: 'Hungary', de: 'Ungarn', ua: 'Угорщина' }, flag: '🇭🇺' },
  { code: '+40', names: { ru: 'Румыния', en: 'Romania', de: 'Rumänien', ua: 'Румунія' }, flag: '🇷🇴' },
  { code: '+359', names: { ru: 'Болгария', en: 'Bulgaria', de: 'Bulgarien', ua: 'Болгарія' }, flag: '🇧🇬' },
  { code: '+30', names: { ru: 'Греция', en: 'Greece', de: 'Griechenland', ua: 'Греція' }, flag: '🇬🇷' },
  { code: '+90', names: { ru: 'Турция', en: 'Turkey', de: 'Türkei', ua: 'Туреччина' }, flag: '🇹🇷' },
  { code: '+86', names: { ru: 'Китай', en: 'China', de: 'China', ua: 'Китай' }, flag: '🇨🇳' },
  { code: '+81', names: { ru: 'Япония', en: 'Japan', de: 'Japan', ua: 'Японія' }, flag: '🇯🇵' },
  { code: '+82', names: { ru: 'Южная Корея', en: 'South Korea', de: 'Südkorea', ua: 'Південна Корея' }, flag: '🇰🇷' },
  { code: '+91', names: { ru: 'Индия', en: 'India', de: 'Indien', ua: 'Індія' }, flag: '🇮🇳' },
  { code: '+55', names: { ru: 'Бразилия', en: 'Brazil', de: 'Brasilien', ua: 'Бразилія' }, flag: '🇧🇷' },
  { code: '+52', names: { ru: 'Мексика', en: 'Mexico', de: 'Mexiko', ua: 'Мексика' }, flag: '🇲🇽' },
  { code: '+61', names: { ru: 'Австралия', en: 'Australia', de: 'Australien', ua: 'Австралія' }, flag: '🇦🇺' },
  { code: '+64', names: { ru: 'Новая Зеландия', en: 'New Zealand', de: 'Neuseeland', ua: 'Нова Зеландія' }, flag: '🇳🇿' },
  { code: '+27', names: { ru: 'ЮАР', en: 'South Africa', de: 'Südafrika', ua: 'ПАР' }, flag: '🇿🇦' },
  { code: '+20', names: { ru: 'Египет', en: 'Egypt', de: 'Ägypten', ua: 'Єгипет' }, flag: '🇪🇬' },
  { code: '+971', names: { ru: 'ОАЭ', en: 'UAE', de: 'VAE', ua: 'ОАЕ' }, flag: '🇦🇪' },
  { code: '+966', names: { ru: 'Саудовская Аравия', en: 'Saudi Arabia', de: 'Saudi-Arabien', ua: 'Саудівська Аравія' }, flag: '🇸🇦' },
  { code: '+972', names: { ru: 'Израиль', en: 'Israel', de: 'Israel', ua: 'Ізраїль' }, flag: '🇮🇱' }
]

// Поиск по странам
const countrySearchQuery = ref('')

// Вычисляемое свойство для стран с локализованными названиями
const countries = computed(() => {
  return countriesData.map(country => ({
    ...country,
    name: country.names[locale.value as keyof typeof country.names] || country.names.en
  }))
})

// Отфильтрованные страны для поиска
const filteredCountries = computed(() => {
  if (!countrySearchQuery.value.trim()) {
    return countries.value
  }
  
  const query = countrySearchQuery.value.toLowerCase().trim()
  return countries.value.filter(country => {
    // Поиск по названию на текущем языке
    const currentName = country.name.toLowerCase()
    // Поиск по коду страны
    const code = country.code.toLowerCase()
    // Поиск по всем переводам
    const allNames = Object.values(country.names).join(' ').toLowerCase()
    
    return currentName.includes(query) || code.includes(query) || allNames.includes(query)
  })
})

const contactTypes = computed(() => [
  { value: 'email', label: 'Email' },
  { value: 'tel', label: t('phone') },
  { value: 'tg', label: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp' }
])
const currentType = computed(() => contactTypes.value.find(c => c.value === currentTypeValue.value) || contactTypes.value[0])

// Сообщения и загрузка
const loading = ref(false)
const message = ref({ text: '', type: '' })

// Вычисляемое свойство для текущей страны
const currentCountry = computed(() => {
  return countries.value.find(c => c.code === selectedCountryCode.value) || countries.value[0]
})

// Дропдаун функции
function selectType(type: { value: string; label: string }) {
  currentTypeValue.value = type.value
  contactValue.value = ''
  isDropdownActive.value = false
  clearMessage()
  
  // Если выбран tel или whatsapp, начинаем с +
  if (type.value === 'tel' || type.value === 'whatsapp') {
    contactValue.value = '+'
  }
}

function toggleDropdown() {
  isDropdownActive.value = !isDropdownActive.value
}

function toggleCountryDropdown() {
  isCountryDropdownActive.value = !isCountryDropdownActive.value
  if (isCountryDropdownActive.value) {
    // Очищаем поиск при открытии
    countrySearchQuery.value = ''
    // Фокусируемся на поле поиска
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

function selectCountry(country: { code: string; name: string; flag: string }) {
  selectedCountryCode.value = country.code
  isCountryDropdownActive.value = false
  countrySearchQuery.value = '' // Очищаем поиск при выборе
  
  // Обновляем поле ввода с новым кодом страны
  if (currentTypeValue.value === 'tel' || currentTypeValue.value === 'whatsapp') {
    const phoneNumber = contactValue.value.replace(/^\+\d*/, '').trim()
    contactValue.value = country.code + (phoneNumber ? phoneNumber : '')
  }
}

function clearMessage() {
  message.value = { text: '', type: '' }
}

// Функция для обработки ввода в поле телефона
function handlePhoneInput(event: Event) {
  const target = event.target as HTMLInputElement
  let value = target.value
  
  // Удаляем все нецифровые символы кроме +
  value = value.replace(/[^\d+]/g, '')
  
  // Если поле пустое или пользователь удалил +, добавляем его
  if (!value || !value.startsWith('+')) {
    value = '+' + value.replace(/\+/g, '')
  }
  
  // Обновляем значение
  contactValue.value = value
  
  // Определяем код страны
  if (value.length > 1) {
    const match = value.match(/^\+(\d+)/)
    if (match) {
      const inputCode = '+' + match[1]
      // Ищем точное совпадение кода или код, который является началом введенного
      const foundCountry = countries.value.find(country => {
        return inputCode.startsWith(country.code) || country.code.startsWith(inputCode)
      })
      
      if (foundCountry && foundCountry.code !== selectedCountryCode.value) {
        selectedCountryCode.value = foundCountry.code
      }
    }
  }
}

// Watcher для автоматического определения кода страны из введенного номера
watch(contactValue, (newValue) => {
  if ((currentTypeValue.value === 'tel' || currentTypeValue.value === 'whatsapp') && newValue) {
    // Убеждаемся что номер начинается с +
    if (!newValue.startsWith('+')) {
      contactValue.value = '+' + newValue
      return
    }
    
    // Ищем код страны в начале строки
    const match = newValue.match(/^\+(\d+)/)
    if (match) {
      const inputCode = '+' + match[1]
      // Ищем точное совпадение кода или код, который является началом введенного
      const foundCountry = countries.value.find(country => {
        return inputCode.startsWith(country.code) || country.code.startsWith(inputCode)
      })
      
      if (foundCountry && foundCountry.code !== selectedCountryCode.value) {
        selectedCountryCode.value = foundCountry.code
      }
    }
  }
})

// Закрытие дропдаунов по клику вне
function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    isDropdownActive.value = false
  }
  
  // Проверяем, не кликнули ли мы внутри любого из селекторов страны
  const isInsideCountrySelector = (
    (countryDropdownTelRef.value && countryDropdownTelRef.value.contains(target)) ||
    (countryDropdownWhatsappRef.value && countryDropdownWhatsappRef.value.contains(target))
  )
  
  if (!isInsideCountrySelector) {
    isCountryDropdownActive.value = false
  }
}

onMounted(() => {
  nextTick(() => {
    document.addEventListener('click', handleClickOutside, true) // capture phase
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside, true)
})

// Отправка формы
async function handleSubmit() {
  clearMessage()

  if (honeypot.value.trim() !== '') return console.warn('Spam detected')

  loading.value = true
  try {
    const payload = {
      name: name.value,
      contactType: currentTypeValue.value,
      contactValue: contactValue.value,
      service: localService.value,
      comment: wantsComment.value ? comment.value.trim() : '',
      lang: locale.value
    }

    const res = await $fetch('/api/sendForm', {
      method: 'POST',
      body: payload
    })

    if (res.success) {
      message.value = { text: t('formMessageSuccess') || 'Сообщение отправлено!', type: 'success' }
      name.value = ''
      contactValue.value = ''
      localService.value = ''
      comment.value = ''
      wantsComment.value = false
    } else {
      message.value = { text: t('formMessageErrorSend') || 'Ошибка отправки', type: 'error' }
    }

    // Убираем сообщение через 5 секунд
    setTimeout(() => {
      clearMessage()
    }, 5000)

  } catch (err) {
    console.error(err)
    message.value = { text: t('formMessageErrorServer') || 'Ошибка сервера', type: 'error' }

    setTimeout(() => {
      clearMessage()
    }, 5000)
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
.form-message {
  margin-top: 1rem;
  font-weight: 600;
}

.form-message.success {
  color: green;
}

.form-message.error {
  color: red;
}

.isWantsComment{
  flex-direction: row;
  align-items: center;
  align-self: start;
  gap: 20px;
}

.wrapper-checbox-input {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.checkbox-native {
  position: absolute;
  opacity: 0;
  width: 24px;
  height: 24px;
  margin: 0;
  cursor: pointer;
  z-index: 2;
}

.custom-checkbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border: 2px solid #888;
  border-radius: 6px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  z-index: 1;
}

.wrapper-checbox-input:hover .custom-checkbox {
  border-color: rgb(62, 176, 212)
}

.checkbox-native:checked + .custom-checkbox {
  border-color: rgb(62, 176, 212)
}

.custom-checkbox::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 1px;
  width: 6px;
  height: 12px;
  border: solid rgb(255, 50, 150);
  border-width: 0 3px 3px 0;
  opacity: 0;
  transform: rotate(45deg) scale(0);
  transition: all 0.4s ease;
}

.checkbox-native:checked + .custom-checkbox::after {
  opacity: 1;
  transform: rotate(45deg) scale(1);
}

/* Стили для селектора кода страны */
.phone-input-wrapper {
  display: flex;
  gap: 0;
  width: 100%;
}

.country-selector {
  position: relative;
  flex-shrink: 0;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 8px 0 0 8px;
  background: #fff;
  z-index: 10;
}

.country-selector.active {
  border-color: rgb(62, 176, 212);
  z-index: 20;
}

.country-selector-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 10px;
  cursor: pointer;
  min-width: 80px;
  user-select: none;
  transition: all 0.3s ease;
}

.country-selector-head:hover {
  background-color: #f8f9fa;
}

.country-flag {
  font-size: 16px;
  line-height: 1;
}

.country-code {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
  color: #666;
  margin-left: auto;
}

.country-selector.active .dropdown-arrow {
  transform: rotate(180deg);
}

.country-selector-body {
  position: absolute;
  top: 100%;
  left: -1px;
  right: -1px;
  min-width: 300px;
  background: #fff;
  border: 1px solid rgb(62, 176, 212);
  border-top: none;
  border-radius: 0 0 8px 8px;
  width: max-content;
  max-width: 100%;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.country-selector.active .country-selector-body {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Стили для поиска стран */
.country-search {
  position: relative;
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.country-search-input {
  width: 100%;
  padding: 8px 35px 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.country-search-input:focus {
  border-color: rgb(62, 176, 212);
}

.search-icon, .clear-search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
}

.clear-search-icon {
  cursor: pointer;
  pointer-events: auto;
  color: #999;
  transition: color 0.2s ease;
}

.clear-search-icon:hover {
  color: #666;
}

.country-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 180px;
  overflow-y: auto;
}

.no-results {
  padding: 16px;
  text-align: center;
  color: #666;
  font-size: 14px;
  font-style: italic;
}

.country-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
}

.country-item:last-child {
  border-bottom: none;
}

.country-item:hover {
  background-color: #f8f9fa;
}

.country-item.active {
  background-color: rgba(62, 176, 212, 0.1);
  color: rgb(62, 176, 212);
}

.country-item .country-name {
  flex: 1;
  font-size: 14px;
  min-width: 140px;
  text-align: left;
}

.country-item .country-code {
  font-size: 13px;
  color: #666;
  margin-left: auto;
  margin-right: 8px;
  min-width: 50px;
  text-align: right;
}

.country-item.active .country-code {
  color: rgb(62, 176, 212);
}

.country-item .sprite-svg-fill {
  flex-shrink: 0;
  color: rgb(62, 176, 212);
}

/* Адаптация поля ввода для работы с селектором */
.phone-input-wrapper input[type="tel"] {
  border-radius: 0 8px 8px 0;
  border-left: none;
  flex: 1;
}

.phone-input-wrapper input[type="tel"]:focus {
  border-left: 1px solid rgb(62, 176, 212);
}

/* Медиа-запросы для мобильных устройств */
@media (max-width: 768px) {
  .country-selector-head {
    padding: 10px 8px;
    min-width: 70px;
  }
  
  .country-flag {
    font-size: 14px;
  }
  
  .country-code {
    font-size: 12px;
  }
  
  .country-selector-body {
    max-height: 150px;
    min-width: 260px;
  }
  
  .country-search {
    padding: 6px 10px;
  }
  
  .country-search-input {
    padding: 6px 30px 6px 10px;
    font-size: 13px;
  }
  
  .search-icon, .clear-search-icon {
    right: 18px;
    width: 14px;
    height: 14px;
  }
  
  .country-list {
    max-height: 120px;
  }
  
  .country-item {
    padding: 10px 14px;
  }
  
  .country-item .country-name {
    font-size: 13px;
    min-width: 120px;
  }
  
  .country-item .country-code {
    font-size: 12px;
    min-width: 45px;
  }
}
</style>
