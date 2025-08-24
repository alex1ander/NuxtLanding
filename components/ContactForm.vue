<template>
  <form class="contact-from" style="flex:6;" @submit.prevent="handleSubmit">

    <!-- honeypot поле (скрытое) -->
    <input type="text" v-model="honeypot" name="honeypot" style="display:none" autocomplete="off" tabindex="-1" />

    <!-- Поле имени -->
    <div class="this-input-block required">
      <input type="text" v-model="localService" name="service" readonly />
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
        <input v-else-if="currentType.value === 'tel'" name="phone" type="tel" v-model="contactValue" :placeholder="t('formPlaceholderType')" required />
        <input v-else-if="currentType.value === 'tg'" name="telegram" type="text" v-model="contactValue" placeholder="@telegram_username" required />
        <input v-else-if="currentType.value === 'whatsapp'" name="whatsapp" type="tel" v-model="contactValue" :placeholder="t('formPlaceholderType')" required />
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNuxtApp } from '#app'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  service: { type: String, default: '' }
})

const { t } = useI18n()
const nuxtApp = useNuxtApp()

const localService = ref(props.service)
const name = ref('')
const contactValue = ref('')
const currentTypeValue = ref('tel')
const wantsComment = ref(false)
const comment = ref('')
const isDropdownActive = ref(false)
const honeypot = ref('')
const loading = ref(false)
const message = ref({ text: '', type: '' })

const dropdownRef = ref<HTMLElement | null>(null)

const contactTypes = computed(() => [
  { value: 'email', label: 'Email' },
  { value: 'tel', label: t('phone') },
  { value: 'tg', label: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp' },
])

const currentType = computed(() => contactTypes.value.find(type => type.value === currentTypeValue.value) || contactTypes.value[0])

watch(() => props.service, val => localService.value = val)

function selectType(type: { value: string; label: string }) {
  currentTypeValue.value = type.value
  contactValue.value = ''
  isDropdownActive.value = false
  clearMessage()
}

function toggleDropdown() {
  isDropdownActive.value = !isDropdownActive.value
}

function onClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownActive.value = false
  }
}

function clearMessage() {
  message.value = { text: '', type: '' }
}

async function handleSubmit() {
  clearMessage()

  if (honeypot.value.trim() !== '') return console.warn('Spam detected via honeypot')

  loading.value = true
  try {
    const payload = {
      name: name.value,
      contactType: currentTypeValue.value,
      contactValue: contactValue.value,
      service: localService.value,
      comment: wantsComment.value ? comment.value.trim() : ''
    }

    // Используем $fetch Nuxt 3
    const apiUrl = nuxtApp.$config.public.apiBase || ''
    const res = await $fetch(`${apiUrl}/send-lead`, {
      method: 'POST',
      body: payload
    })

    if (res.success) {
      message.value = { text: t('formMessageSuccess'), type: 'success' }
    } else {
      message.value = { text: t('formMessageErrorSend'), type: 'error' }
    }

  } catch (err) {
    console.error('Ошибка при отправке:', err)
    message.value = { text: t('formMessageErrorServer'), type: 'error' }
  } finally {
    loading.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
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

/* Ховер эффекты */
.wrapper-checbox-input:hover .custom-checkbox {
  border-color: rgb(62, 176, 212)
}

/* Состояние checked */
.checkbox-native:checked + .custom-checkbox {
  border-color: rgb(62, 176, 212)
}

/* Галочка */
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

/* Показываем галочку, если checked */
.checkbox-native:checked + .custom-checkbox::after {
  opacity: 1;
  transform: rotate(45deg) scale(1);
}


</style>

