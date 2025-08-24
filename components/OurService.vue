<template>
  <section id="our-service" class="information-section">
    <div class="content top-part-section">
      <div class="two-part-content">
        <h2>{{ t('servicesTitle') }}</h2>
      </div>
    </div>

    <div class="content">
      <div class="servise-grid-wrapper animScroll">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="the-grid-card gr-transition page-card-grid cardAnim"
        >
          <h3 class="card-title">{{ t(service.titleKey) }}</h3>
          <p class="card-text">{{ t(service.textKey) }}</p>

          <div class="place-for-benefit-icon">
            <svg width="14" height="14" class="sprite-svg-fill">
              <use href="#arrow-service"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Массив сервисов с ключами переводов
const services = [
  { titleKey: 'serviceTitle_1', textKey: 'serviceText_1' },
  { titleKey: 'serviceTitle_2', textKey: 'serviceText_2' },
  { titleKey: 'serviceTitle_3', textKey: 'serviceText_3' },
  { titleKey: 'serviceTitle_4', textKey: 'serviceText_4' },
  { titleKey: 'serviceTitle_5', textKey: 'serviceText_5' },
  { titleKey: 'serviceTitle_6', textKey: 'serviceText_6' },
]
</script>
