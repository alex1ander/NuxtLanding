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
              <ul class="country-list">
                <li
                  v-for="country in countries"
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
          <input name="phone" type="tel" v-model="contactValue" :placeholder="selectedCountryCode + ' ' + t('formPlaceholderType')" required />
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
              <ul class="country-list">
                <li
                  v-for="country in countries"
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
          <input name="whatsapp" type="tel" v-model="contactValue" :placeholder="selectedCountryCode + ' ' + t('formPlaceholderType')" required />
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

// Список стран с кодами
const countries = [
  { code: '+380', name: 'Украина', flag: '🇺🇦' },
  { code: '+7', name: 'Россия', flag: '🇷🇺' },
  { code: '+1', name: 'США', flag: '🇺🇸' },
  { code: '+44', name: 'Великобритания', flag: '🇬🇧' },
  { code: '+49', name: 'Германия', flag: '🇩🇪' },
  { code: '+33', name: 'Франция', flag: '🇫🇷' },
  { code: '+39', name: 'Италия', flag: '🇮🇹' },
  { code: '+34', name: 'Испания', flag: '🇪🇸' },
  { code: '+31', name: 'Нидерланды', flag: '🇳🇱' },
  { code: '+48', name: 'Польша', flag: '🇵🇱' },
  { code: '+420', name: 'Чехия', flag: '🇨🇿' },
  { code: '+421', name: 'Словакия', flag: '🇸🇰' },
  { code: '+36', name: 'Венгрия', flag: '🇭🇺' },
  { code: '+40', name: 'Румыния', flag: '🇷🇴' },
  { code: '+359', name: 'Болгария', flag: '🇧🇬' },
  { code: '+30', name: 'Греция', flag: '🇬🇷' },
  { code: '+90', name: 'Турция', flag: '🇹🇷' },
  { code: '+86', name: 'Китай', flag: '🇨🇳' },
  { code: '+81', name: 'Япония', flag: '🇯🇵' },
  { code: '+82', name: 'Южная Корея', flag: '🇰🇷' },
  { code: '+91', name: 'Индия', flag: '🇮🇳' },
  { code: '+55', name: 'Бразилия', flag: '🇧🇷' },
  { code: '+52', name: 'Мексика', flag: '🇲🇽' },
  { code: '+61', name: 'Австралия', flag: '🇦🇺' },
  { code: '+64', name: 'Новая Зеландия', flag: '🇳🇿' },
  { code: '+27', name: 'ЮАР', flag: '🇿🇦' },
  { code: '+20', name: 'Египет', flag: '🇪🇬' },
  { code: '+971', name: 'ОАЭ', flag: '🇦🇪' },
  { code: '+966', name: 'Саудовская Аравия', flag: '🇸🇦' },
  { code: '+972', name: 'Израиль', flag: '🇮🇱' }
]

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
  return countries.find(c => c.code === selectedCountryCode.value) || countries[0]
})

// Дропдаун функции
function selectType(type: { value: string; label: string }) {
  currentTypeValue.value = type.value
  contactValue.value = ''
  isDropdownActive.value = false
  clearMessage()
  
  // Если выбран tel или whatsapp, добавляем код страны
  if (type.value === 'tel' || type.value === 'whatsapp') {
    contactValue.value = selectedCountryCode.value + ' '
  }
}

function toggleDropdown() {
  isDropdownActive.value = !isDropdownActive.value
}

function toggleCountryDropdown() {
  isCountryDropdownActive.value = !isCountryDropdownActive.value
}

function selectCountry(country: { code: string; name: string; flag: string }) {
  selectedCountryCode.value = country.code
  isCountryDropdownActive.value = false
  
  // Обновляем поле ввода с новым кодом страны
  if (currentTypeValue.value === 'tel' || currentTypeValue.value === 'whatsapp') {
    const phoneNumber = contactValue.value.replace(/^\+\d+\s*/, '').trim()
    contactValue.value = country.code + (phoneNumber ? ' ' + phoneNumber : ' ')
  }
}

function clearMessage() {
  message.value = { text: '', type: '' }
}

// Watcher для автоматического определения кода страны из введенного номера
watch(contactValue, (newValue) => {
  if ((currentTypeValue.value === 'tel' || currentTypeValue.value === 'whatsapp') && newValue) {
    // Ищем код страны в начале строки
    const match = newValue.match(/^\+(\d+)/)
    if (match) {
      const inputCode = '+' + match[1]
      // Ищем точное совпадение кода или код, который является началом введенного
      const foundCountry = countries.find(country => {
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
  background: #fff;
  border: 1px solid rgb(62, 176, 212);
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 200px;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.country-selector.active .country-selector-body {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.country-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.country-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
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
}

.country-item .country-code {
  font-size: 13px;
  color: #666;
  margin-left: auto;
  margin-right: 8px;
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
  }
  
  .country-item {
    padding: 8px 10px;
  }
  
  .country-item .country-name {
    font-size: 13px;
  }
  
  .country-item .country-code {
    font-size: 12px;
  }
}
</style>
