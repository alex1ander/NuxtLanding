<template>
  <section id="advantages" class="information-section">
    <div class="content top-part-section">
      <div class="two-part-content">
        <h2>{{ t('ourAdvantagesTitle') }}</h2>
      </div>
    </div>

    <div class="content">
      <div class="servise-grid-wrapper our-advantages animScroll">
        <div
          v-for="(adv, index) in advantages"
          :key="index"
          class="advantage cardAnim reverse-style"
          ref="advBoxes"
        >
          <svg width="100" height="100" class="sprite-svg-fill">
            <use :href="adv.icon"></use>
          </svg>
          <h3>{{ t(adv.titleKey) }}</h3>
          <p>{{ t(adv.textKey) }}</p>
          <div class="fill-overlay"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Список преимуществ с ключами переводов и иконками
const advantages = [
  { titleKey: 'advantageTitle_1', textKey: 'advantageText_1', icon: '#bf-1' },
  { titleKey: 'advantageTitle_2', textKey: 'advantageText_2', icon: '#bf-2' },
  { titleKey: 'advantageTitle_3', textKey: 'advantageText_3', icon: '#bf-3' },
  { titleKey: 'advantageTitle_4', textKey: 'advantageText_4', icon: '#bf-4' },
  { titleKey: 'advantageTitle_5', textKey: 'advantageText_5', icon: '#bf-5' },
  { titleKey: 'advantageTitle_6', textKey: 'advantageText_6', icon: '#bf-6' },
]

const advBoxes = ref<HTMLDivElement[]>([])

onMounted(() => {
  advBoxes.value.forEach((box) => {
    const overlay = box.querySelector('.fill-overlay') as HTMLDivElement
    if (!overlay) return

    box.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = box.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percent = (x / rect.width) * 100
      overlay.style.width = `${percent}%`
    })

    box.addEventListener('mouseleave', () => {
      overlay.style.width = '0%'
    })
  })
})
</script>



<style lang="scss">
$gradient-start: #3EB0D4;
$gradient-end: #9663C8;
$hover-bg: #fff;
$box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

.advantages {
  padding: 60px 20px;
  background-color: #f9f9f9;
  font-family: sans-serif;

  &__title {
    margin-bottom: 40px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
  }
}

.advantage {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 16px;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "img title"
    "text text";
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: $box-shadow;
  border: 3px solid #797CCC;
  transition: transform 0.4s ease,border 0.4s ease;

  &:hover, &.simulated-hover {
    border: 3px solid $hover-bg;
    transform: translateY(-5px);

    &::after {
      height: 200%;
      width: 200%;
    }

    h3, p {
      color: #fff;
    }

    svg {
      filter: brightness(2);
    }
  }

  img {
    grid-area: img;
    height: 40px;
    width: 40px;
  }

  h3 {
    grid-area: title;
    background: linear-gradient(180deg, $gradient-start 0%, $gradient-end 100%);
    color: transparent;
    background-clip: text;
    transition: color 0.5s;
  }

  p {
    grid-area: text;
    transition: color 0.5s;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    height: 0;
    width: 0;
    z-index: -1;
    border-radius: 100%;
    background-image: linear-gradient(135deg, $gradient-start 0%, $gradient-end 100%);
    transition: height 0.5s ease-in, width 0.5s ease-in;
  }
}

svg {
  .svg-el-2 {
    fill: rgb(230, 225, 225);
  }
  .svg-el-1 {
    fill: rgb(105, 115, 172);
  }
  
  transition: filter 0.5s ease-in;
}


</style>