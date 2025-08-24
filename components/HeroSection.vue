<template>
  <section id="hero-content" class="information-section" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="hero-content threeBlockAnim from-bottom">

      <!-- Hero Name -->
      <div class="hero-name topAnim">
        <p class="fw-700">BitAlexis Agency</p>
        <p>{{ t('studioText') }}</p>
      </div>

      <!-- Hero Titles -->
      <div class="hero-titles leftAnim">
        <div class="this-titles">
          <h1 class="title">{{ t('mainTitle') }}</h1>
          <span class="sub-title">{{ t('mainSubTitle') }}</span>
        </div>
        <div class="hero-button">
          <button class="btn-240 gr-fill btn-pop-up" @click="setService(t('HeroSection'))">
            <span class="btn-text">{{ t('consultBtn') }}</span>
            <div class="btn-after">
              <svg width="14" height="14" class="sprite-svg-fill"><use href="#arrow-service"></use></svg>
            </div>
          </button>
        </div>
      </div>

      <!-- Code SVG -->
      <div class="code-svg box rightAnim">
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" :style="boxStyle" style="background:#1e1e1e; border-radius: 10px;">
          <rect x="0" y="0" width="700" height="30" rx="10" fill="#2d2d2d"/>
          <circle cx="580" cy="15" r="6" fill="#ff5f56"/>
          <circle cx="560" cy="15" r="6" fill="#ffbd2e"/>
          <circle cx="540" cy="15" r="6" fill="#27c93f"/>
          <text x="20" y="60" font-family="Courier New, monospace" font-size="16" fill="#6a9955">// some OOP in JavaScript</text>
          <text x="20" y="90" font-family="Courier New, monospace" font-size="16">
            <tspan fill="#569cd6">class</tspan> <tspan fill="#dcdcaa">Animal</tspan> <tspan fill="#dcdcdc">{</tspan>
          </text>
          <text x="40" y="120" font-family="Courier New, monospace" font-size="16">
            <tspan fill="#569cd6">constructor</tspan><tspan fill="#dcdcdc">(</tspan><tspan fill="#9cdcfe">name</tspan><tspan fill="#dcdcdc">)</tspan> <tspan fill="#dcdcdc">{</tspan>
          </text>
          <text x="60" y="150" font-family="Courier New, monospace" font-size="16">
            <tspan fill="#dcdcaa">this</tspan><tspan fill="#dcdcdc">.</tspan><tspan fill="#9cdcfe">name</tspan> <tspan fill="#dcdcdc">=</tspan> <tspan fill="#9cdcfe">name</tspan><tspan fill="#dcdcdc">;</tspan>
          </text>
          <text x="40" y="180" font-family="Courier New, monospace" font-size="16" fill="#dcdcdc">}</text>
          <text x="20" y="210" font-family="Courier New, monospace" font-size="16" fill="#dcdcdc">}</text>
          <text x="20" y="240" font-family="Courier New, monospace" font-size="16">
            <tspan fill="#569cd6">class</tspan> <tspan fill="#dcdcaa">Dog</tspan> <tspan fill="#569cd6">extends</tspan> <tspan fill="#dcdcaa">Animal</tspan> <tspan fill="#dcdcdc">{</tspan>
          </text>
          <text x="40" y="270" font-family="Courier New, monospace" font-size="16">
            <tspan fill="#569cd6">speak</tspan><tspan fill="#dcdcdc">() {</tspan>
          </text>
          <text x="60" y="300" font-family="Courier New, monospace" font-size="16">
            <tspan fill="#dcdcdc">console</tspan><tspan fill="#dcdcdc">.</tspan><tspan fill="#4fc1ff">log</tspan><tspan fill="#dcdcdc">(</tspan>
            <tspan fill="#d69d85">`${</tspan><tspan fill="#dcdcaa">this</tspan><tspan fill="#dcdcdc">.</tspan><tspan fill="#9cdcfe">name</tspan><tspan fill="#d69d85">}</tspan>
            <tspan fill="#d69d85"> barks!`</tspan><tspan fill="#dcdcdc">);</tspan>
          </text>
          <text x="40" y="330" font-family="Courier New, monospace" font-size="16" fill="#dcdcdc">}</text>
          <text x="20" y="360" font-family="Courier New, monospace" font-size="16" fill="#dcdcdc">}</text>
        </svg>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n() // теперь используем Composition API вместо $t

const emit = defineEmits<{
  (e: 'open-contact-form', serviceText: string): void
}>()

const boxStyle = ref({
  transform: 'perspective(525px) translateZ(0) rotateX(0deg) rotateY(0deg)',
  transition: 'all 150ms linear'
})

const Z = 50

function handleMouseMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const width = rect.width
  const height = rect.height

  const xRel = e.clientX - rect.left
  const yRel = e.clientY - rect.top

  const yAngle = -(0.5 - xRel / width) * 40
  const xAngle = (0.5 - yRel / height) * 40

  boxStyle.value = {
    transform: `perspective(525px) translateZ(${Z}px) rotateX(${xAngle}deg) rotateY(${yAngle}deg)`,
    transition: 'transform 200ms ease'
  }
}

function handleMouseLeave() {
  boxStyle.value = {
    transform: 'perspective(525px) translateZ(0) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 200ms ease'
  }
}

function setService(serviceText: string) {
  emit('open-contact-form', serviceText)
}
</script>
