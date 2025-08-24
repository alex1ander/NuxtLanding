<template>
  <section class="information-section padding-0">
    <div class="scrolling-slider">
      <div class="slide-track">
        <div v-for="img in images" :key="img.src" class="slide-item">
          <img :src="img.src" :alt="img.alt" />
        </div>
        <!-- Дубликат для бесконечного скролла -->
        <div v-for="img in images" :key="'dup-' + img.src" class="slide-item">
          <img :src="img.src" :alt="img.alt" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Импорт картинок напрямую из assets
import grHtml from '@/assets/upload/gr-html.png'
import grCss from '@/assets/upload/gr-css.png'
import grJs from '@/assets/upload/gr-js.png'
import grPhp from '@/assets/upload/gr-php.png'
import grLaravel from '@/assets/upload/gr-laravel.png'
import grReact from '@/assets/upload/gr-react.png'
import grVue from '@/assets/upload/gr-vue.png'
import grWordpress from '@/assets/upload/gr-wordpress.png'
import grFigma from '@/assets/upload/gr-figma.png'
import grTelegram from '@/assets/upload/gr-telegram.png'
import grAndroid from '@/assets/upload/gr-android.png'
import grApple from '@/assets/upload/gr-apple.png'

const images = [
  { src: grHtml, alt: 'HTML' },
  { src: grCss, alt: 'CSS' },
  { src: grJs, alt: 'JavaScript' },
  { src: grPhp, alt: 'PHP' },
  { src: grLaravel, alt: 'Laravel' },
  { src: grReact, alt: 'React' },
  { src: grVue, alt: 'Vue' },
  { src: grWordpress, alt: 'WordPress' },
  { src: grFigma, alt: 'Figma' },
  { src: grTelegram, alt: 'Telegram' },
  { src: grAndroid, alt: 'Android' },
  { src: grApple, alt: 'Apple' },
]
</script>

<style scoped>
.scrolling-slider {
  overflow: hidden;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.slide-track {
  display: flex;
  width: 200%; /* Два раза шире для бесконечности */
  animation: scroll-left 40s linear infinite;
}

.slide-item {
  flex: 0 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-item img {
  height: 64px;
  width: 64px;
  display: block;
  filter: hue-rotate(-23deg) brightness(1.5) grayscale(0.4);
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
