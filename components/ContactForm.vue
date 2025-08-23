<template>
  <form class="contact-from" style="flex:6;" @submit.prevent="handleSubmit">

    <!-- honeypot поле (скрытое) для защиты от спама -->
    <input type="text" v-model="honeypot" name="honeypot" style="display:none" autocomplete="off" tabindex="-1" />

    <!-- Поле имени -->
    <div class="this-input-block required">
      <input type="hidden" v-model="localService" name="service" readonly />
      <label for="name">
        {{ $t('formLabelName') }}
      <span class="requiredLabel">{{ $t('required') }}</span>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        :placeholder="$t('formLabelName')"
        required
        v-model="name"
      />
    </div>

    <!-- Кастомный дропдаун + поле -->
    <div class="this-input-block required">
      <label>
        {{ $t('formLabelContact') }}
        <span class="requiredLabel">{{ $t('required') }}</span>
      </label>
      <div class="wrapper-input">
        <div
          class="dropdown-list"
          ref="dropdown"
          :class="{ active: isDropdownActive }"
        >
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
                <svg
                  v-if="type.value === currentType.value"
                  width="24"
                  height="24"
                  class="sprite-svg-fill"
                >
                  <use href="#check"></use>
                </svg>
              </li>
            </ul>
          </div>
        </div>

        <input
          name="email"
          v-if="currentType.value === 'email'"
          type="email"
          v-model="contactValue"
          placeholder="example@example.com"
          required
        />
        <input
          name="phone"
          v-else-if="currentType.value === 'tel'"
          type="tel"
          v-model="contactValue"
          :placeholder="$t('formPlaceholderType')"
          required
        />
        <input
          name="telegram"
          v-else-if="currentType.value === 'tg'"
          type="text"
          v-model="contactValue"
          placeholder="@telegram_username"
          required
        />
        <input
          name="whatsapp"
          v-else-if="currentType.value === 'whatsapp'"
          type="tel"
          v-model="contactValue"
          :placeholder="$t('formPlaceholderType')"
          required
        />
      </div>
    </div>

    <!-- Чекбокс оставить комментарий -->
    <div class="isWantsComment this-input-block">
      <label>
        {{ $t('formIsWantsComment') }}
      </label>

      <div class="wrapper-checbox-input">
        <input
          type="checkbox"
          id="custom-checkbox"
          v-model="wantsComment"
          class="checkbox-native"
        />
        <span class="custom-checkbox"></span>
      </div>
    </div>


    <!-- Текстовое поле комментария, появляется только если wantsComment === true -->
    <transition name="expand">
      <div class="this-input-block" v-if="wantsComment" style="overflow: hidden;">
        <label for="comment">{{ $t('formLabelComment') }}</label>
        <textarea
          id="comment"
          name="comment"
          v-model="comment"
          rows="4"
          :placeholder="$t('formPlaceholderComment')"
        ></textarea>
      </div>
    </transition>

    <!-- Сообщение об успехе или ошибке -->
    <p v-if="message.text" :class="['form-message', message.type]">{{ message.text }}</p>

    <!-- Кнопка -->
    <button type="submit" class="btn-240 gr-transition" :disabled="loading">
      {{ loading ? $t('loading') : $t('consultBtn') }}
    </button>

  </form>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    service: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localService: this.service,  // локальная копия пропса
      name: '',
      contactValue: '',
      currentTypeValue: 'tel',
      wantsComment: false,
      comment: '',
      isDropdownActive: false,
      honeypot: '', // для защиты от спама
      loading: false,
      message: {
        text: '',
        type: '' // 'success' или 'error'
      },
    }
  },
  computed: {
    contactTypes() {
      return [
        { value: 'email', label: 'Email' },
        { value: 'tel', label: this.$t('phone') },
        { value: 'tg', label: 'Telegram' },
        { value: 'whatsapp', label: 'WhatsApp' },
      ]
    },
    currentType() {
      return this.contactTypes.find(type => type.value === this.currentTypeValue) || this.contactTypes[0]
    },
  },
  watch: {
    service(newVal) {
      this.localService = newVal
    }
  },
  methods: {
    selectType(type) {
      this.currentTypeValue = type.value
      this.contactValue = ''
      this.isDropdownActive = false
      this.clearMessage()
    },
    toggleDropdown() {
      this.isDropdownActive = !this.isDropdownActive
    },
    onClickOutside(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.isDropdownActive = false
      }
    },
    clearMessage() {
      this.message.text = ''
      this.message.type = ''
    },
    async handleSubmit() {
      this.clearMessage()

      if (this.honeypot.trim() !== '') {
        console.warn('Spam detected via honeypot')
        return
      }

      this.loading = true
      try {
        const payload = {
          name: this.name,
          contactType: this.currentTypeValue, // вместо contactValue
          contactValue: this.contactValue,
          service: this.localService,
          comment: this.comment.trim(),
        }
        // Добавляем комментарий, если пользователь хочет его оставить
        if (this.wantsComment && this.comment.trim() !== '') {
          payload.comment = this.comment.trim()
        }
        console.log('API URL:', process.env.VUE_APP_API_URL);

        const apiUrl = process.env.VUE_APP_API_URL;
        const res = await axios.post(`${apiUrl}/send-lead`, payload);

        if (res.data.success) {
          this.message.text = this.$t('formMessageSuccess')
          this.message.type = 'success'
        } else {
          this.message.text = this.$t('formMessageErrorSend')
          this.message.type = 'error'
        }
      } catch (error) {
        console.error('Ошибка при отправке:', error.response ? error.response.data : error.message)
        this.message.text = this.$t('formMessageErrorServer')
        this.message.type = 'error'
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.onClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onClickOutside)
  },
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
