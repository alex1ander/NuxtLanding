<template>
  <section class="information-section overflow-visible">
    <div class="promo-lines">
      <div class="container-lines first-line">
        <div class="line-help line">
          <div class="line-text">{{ t('lineText') }}</div>
          <div class="line-text">{{ t('lineText') }}</div>
        </div>
      </div>
      <div class="container-lines second-line">
        <div class="line-help line">
          <div class="line-text">{{ t('lineText') }}</div>
          <div class="line-text">{{ t('lineText') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// Получаем функцию t() для перевода
const { t } = useI18n()
</script>

<style scoped>
section {
  overflow-x: clip !important;
}
.promo-lines {
  position: relative;
}
.container-lines {
  position: absolute;
  top: 0;
  left: -5%;
  right: 0;
  margin: auto;
  overflow: hidden;
  z-index: 5;
  width: 120%;
}

.first-line {
  transform-origin: center;
}

.second-line {
  transform-origin: center;
}

.first-line .line-text,
.second-line .line-text {
  background: radial-gradient(circle, rgba(92, 168, 194, 1) 0%, rgba(140, 105, 172, 1) 100%);
}

.line-text {
  font-size: 62px;
  text-align: center;
  color: #1D1932;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 16px 40px;
  will-change: transform;
  flex: 1;
}

.first-line .line-text {
  animation: animate-first-screen 80s -80s linear infinite;
}
.first-line .line-text:nth-child(2) {
  animation: animate-second-screen 80s -40s linear infinite;
}

.second-line .line-text {
  animation: animate-first-screen-reverse 80s -80s linear infinite;
}
.second-line .line-text:nth-child(2) {
  animation: animate-second-screen-reverse 80s -40s linear infinite;
}

.line {
  display: flex;
  background: rgba(140, 105, 172, 1);
  position: relative;
}

.line::before {
  content: '';
  height: 4px;
  width: 100%;
  position: absolute;
  top: 10px;
  background: #000;
  z-index: 1;
}

.line::after {
  content: '';
  height: 4px;
  width: 100%;
  position: absolute;
  bottom: 10px;
  background: #000;
  z-index: 1;
}

@keyframes animate-first-screen {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

@keyframes animate-second-screen {
  0% { transform: translateX(0); }
  100% { transform: translateX(-200%); }
}

@keyframes animate-first-screen-reverse {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes animate-second-screen-reverse {
  0% { transform: translateX(-200%); }
  100% { transform: translateX(0); }
}

@media (max-width: 769px) {
  .promo-lines .line-text {
    font-size: 36px;
  }
}
</style>
