<template>
  <section class="information-section">
    <div class="content">
      <div class="two-part-content mobile-column threeBlockAnim">

        <div class="info-wrapper" style="flex:4;">
          <div class="info">
            <h2 class="topAnim">{{ t('questionTitle') }}</h2>
            <div class="section-text leftAnim">
              <p>{{ t('questionText') }}</p>
            </div>
          </div>
        </div>

        <ContactForm class="rightAnim" />

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
