<template>
  <section id="our-works" class="information-section">
    <div class="content top-part-section">
      <div class="two-part-content">
        <h2>{{ t('ourCasesTitle') }}</h2>
      </div>
    </div>
    <div class="content">
      <div class="our-works-banner-prew-container opacityAnim">
        <div class="our-works-banner-prew">
          <img class="card-image" src="../assets/upload/site1.webp" alt="" />
          <img class="card-image" src="../assets/upload/site2.webp" alt="" />
          <img class="card-image" src="../assets/upload/site3.webp" alt="" />
          <img class="card-image" src="../assets/upload/site4.webp" alt="" />
          <img class="card-image" src="../assets/upload/site5.webp" alt="" />
          <img class="card-image" src="../assets/upload/site6.webp" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
#our-works {
  padding-top: 20px;
  padding-bottom: 20px;
}

.our-works-banner-prew-container {
  border-radius: 20px;
  overflow: hidden;

  .our-works-banner-prew {
    display: flex;
    width: 100%;
    overflow: hidden;
    height: 300px;

    img {
      flex: 1 1 0;
      width: 0;
      object-fit: cover;
      object-position: center center;
      transition: flex-grow 0.4s ease;
      cursor: pointer;

      &:hover {
        flex-grow: 3;
      }
    }
  }
}

@media (max-width: 768px) {
  .our-works-banner-prew-container {
    overflow: scroll;

    .our-works-banner-prew {
      width: auto;
      height: 200px;
      aspect-ratio: 40 / 9;
    }
  }
}
</style>
