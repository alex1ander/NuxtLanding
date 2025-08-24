
<template>
    <section class="information-section">
        <div class="content padding-left-0 padding-right-plus">
            <div class="pill-place reverse-style mobile-column">
                <div class="pill-area">
                    <h2>{{ t('consultTitle') }}</h2>
                </div>
                <button class="btn-160-circle pill-btn btn-pop-up" @click="openContactForm">{{ t('consultBtn') }}</button>
            </div>

        </div>
    </section>
</template>


<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits<{
  (e: 'open-contact-form', serviceText: string): void
}>()

function openContactForm() {
  emit('open-contact-form', t('PillArea')) // передаём текст для попапа
}
</script>
