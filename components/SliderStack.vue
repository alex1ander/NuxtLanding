<template>
  <section class="information-section padding-0">
    <div class="scrolling-slider">
      <div class="slide-track">
        <!-- Первый набор картинок -->
        <div v-for="img in images" :key="img.src" class="slide-item">
          <img :src="img.src" :alt="img.alt" />
        </div>
        <!-- Дубликат для бесконечности -->
        <div v-for="img in images" :key="'dup-' + img.src" class="slide-item">
          <img :src="img.src" :alt="img.alt" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  setup() {
    const images = [
      { src: require('../assets/upload/gr-html.png'), alt: 'HTML' },
      { src: require('../assets/upload/gr-css.png'), alt: 'CSS' },
      { src: require('../assets/upload/gr-js.png'), alt: 'JavaScript' },
      { src: require('../assets/upload/gr-php.png'), alt: 'PHP' },
      { src: require('../assets/upload/gr-laravel.png'), alt: 'Laravel' },
      { src: require('../assets/upload/gr-react.png'), alt: 'React' },
      { src: require('../assets/upload/gr-vue.png'), alt: 'Vue' },
      { src: require('../assets/upload/gr-wordpress.png'), alt: 'WordPress' },
      { src: require('../assets/upload/gr-figma.png'), alt: 'Figma' },
      { src: require('../assets/upload/gr-telegram.png'), alt: 'Telegram' },
      { src: require('../assets/upload/gr-android.png'), alt: 'Android' },
      { src: require('../assets/upload/gr-apple.png'), alt: 'Apple' },
    ];
    return { images };
  },
};
</script>

<style scoped>
.scrolling-slider {
  overflow: hidden;
  width: 100%;
  height: 80px; /* подстраивай под высоту картинок */
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.slide-track {
  display: flex;
  width: calc(200%); /* в 2 раза шире для дубликата */
  animation: scroll-left 40s linear infinite;
}

.slide-item {
  flex: 0 0 auto;
  padding: 0 40px; /* увеличил отступы */
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
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
