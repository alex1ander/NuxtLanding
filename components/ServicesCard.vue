<template>
  <section id="price" class="information-section">
    <div class="content">

      <div class="two-part-content">
        <h2>{{ t('serviceTitle') }}</h2>
      </div>

      <p class="opacityAnim info-text">{{ t('serviceText') }}</p>

      <input type="checkbox" id="toggle" class="toggleCheckbox" />
      <label for="toggle" class="toggleContainer opacityAnim">
        <div class="cursor-hover">{{ t('btnDevelopment') }}</div>   
        <div class="cursor-hover">{{ t('btnSupport') }}</div>
      </label>

      <div class="service-relative animScroll">
        <div class="servise-grid-wrapper developmentCards">
          <div 
            v-for="n in 3" 
            :key="n" 
            class="service-card cardAnim"
          >
            <div class="bg-image">
              <img :src="images[n-1]" alt="" />
            </div>

            <div class="top-part"></div>

            <div class="bottom-part">
              <div class="title-area">
                <h3 v-html="t(`serviceCardTitle_${n}`)"></h3>
                <div class="price">{{ t(`serviceCardPrice_${n}`) }}</div>
              </div>

              <div class="content-part">
                <p class="text">{{ t(`serviceCardText_${n}`) }}</p>
                <div class="benefits">
                  <div v-for="i in 3" :key="i" class="benefit">
                    {{ t(`serviceCardBen_${n}_${i}`) }}
                  </div>
                </div>
              </div>

              <button class="btn-240 btn-pop-up" @click="$emit('open-contact-form', t(`serviceCardTitle_${n}`))">
                <span class="btn-text">{{ t('consultBtn') }}</span>
                <div class="btn-after">
                  <svg width="14" height="14" class="sprite-svg-fill">
                    <use href="#arrow-service"></use>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="servise-grid-wrapper supportCards">
          <div 
            v-for="n in [4,5,6]" 
            :key="n" 
            class="service-card cardAnim"
          >
            <div class="bg-image">
              <img :src="images[n-1]" alt="" />
            </div>

            <div class="top-part"></div>

            <div class="bottom-part">
              <div class="title-area">
                <h3 v-html="t(`serviceCardTitle_${n}`)"></h3>
                <div class="price">{{ t(`serviceCardPrice_${n}`) }}</div>
              </div>

              <div class="content-part">
                <p class="text">{{ t(`serviceCardText_${n}`) }}</p>
                <div class="benefits">
                  <div v-for="i in 3" :key="i" class="benefit">
                    {{ t(`serviceCardBen_${n}_${i}`) }}
                  </div>
                </div>
              </div>

              <button class="btn-240 btn-pop-up" @click="$emit('open-contact-form', t(`serviceCardTitle_${n}`))">
                <span class="btn-text">{{ t('consultBtn') }}</span>
                <div class="btn-after">
                  <svg width="14" height="14" class="sprite-svg-fill">
                    <use href="#arrow-service"></use>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Импортируем картинки
import img1 from '~/assets/upload/prev1.webp'
import img2 from '~/assets/upload/prev2.webp'
import img3 from '~/assets/upload/prev3.webp'
import img4 from '~/assets/upload/prev4.webp'
import img5 from '~/assets/upload/prev5.webp'
import img6 from '~/assets/upload/prev6.webp'

const images = [img1, img2, img3, img4, img5, img6]
</script>



<style scoped lang="scss">

.service-card {
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    min-height: 700px;

    
    .bg-image{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        object-position:  top;
        img{
            height: 100%;
            width: 100%;
            object-position:  top;
        }
    }

    &::after{
        content: '';
        position: absolute;
        inset: 0;
        left: 0px;
        top: 0%;
        backdrop-filter: blur(12px);
        background: rgba(255, 255, 255, 0.1);
        pointer-events: none;
        z-index: -1;
        -webkit-mask-image: linear-gradient(to bottom, transparent 20%, black 50%);
        mask-image: linear-gradient(to bottom, transparent 20%, black 50%);
    }



    
    .bottom-part{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        justify-content: space-between;
        gap:20px;
        min-height: 50%;

        .title-area{
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: space-between;

            .price{
                background: #30303080;
                padding: 8px 12px;
                border-radius: 12px;
                text-wrap: nowrap;
            }
        }


        .content-part{
            display: flex;
            flex-direction: column;
            gap:16px;
        
            .benefits{
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                .benefit{
                        font-size: 16px;
                        background: #c1c1c145;
                        padding: 8px 12px;
                        border-radius: 12px;
                        text-wrap: nowrap;
                }
            }
        }
    }

}

.service-card:hover {
    animation: pulse 0.5s ease-in-out 1;
}




.info-text{
    margin-top: 20px;
    max-width: 60%;
}


@media (max-width: 768px) {
    .services {
        flex-direction: column;
        align-items: center;
    }

    .info-text{
        max-width: 100%;
    }
    .service-relative{
        margin-bottom: 80px;
    }
    .toggleContainer{
        position: sticky!important;
        top: calc(100dvh - 65px);
        z-index: 100;
    }
}


.toggleContainer {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: fit-content;
    border-radius: 30px;
    background: rgb(255, 189, 46);
    /* background: #fff; */
    font-weight: 700;
    color: white;
    cursor: pointer;
    margin: 20px auto;

    div {
        padding: 12px;
        text-align: center;
        z-index: 1;
        transition: color 0.3s;
        min-width: 120px;
    }

    &::before {
        content: '';
        position: absolute;
        width: 50%;
        height: 100%;
        left: 0;
        border-radius: 30px;
        background: #fff;
        transition: all 0.3s;
    }

    .toggleCheckbox:checked + &::before {
        left: 50%;
    }
    .toggleCheckbox:checked + & {
        background: #797CCC;
    }

    .toggleCheckbox:checked + & div:first-child {
        color: #fff;
    }

    .toggleCheckbox:checked + & div:last-child {
        color: #000;
    }

    .toggleCheckbox + & div:first-child {
        color: #000;
    }

    .toggleCheckbox + & div:last-child {
        color: #fff;
    }
    
}

.toggleCheckbox {
    display: none;
}

/* Для developmentCards */
.toggleCheckbox:checked ~ .service-relative .developmentCards .cardAnim {
    transform: scale(0);
}

/* Задержка для анимации при отображении */
.developmentCards .cardAnim {
    transform: scale(1);
    transition: transform 0.6s ease;
    &:nth-child(1) {
        transition-delay: 0s;
    }
    &:nth-child(2) {
        transition-delay: 0.1s;
    }
    &:nth-child(3) {
        transition-delay: 0.2s;
    }
}

/* Для supportCards */
.toggleCheckbox:not(:checked) ~ .service-relative .supportCards .cardAnim {
    transform: scale(0);
}

.supportCards .cardAnim {
    transform: scale(1);
    transition: transform 0.6s ease;
    &:nth-child(1) {
        transition-delay: 0s;
    }
    &:nth-child(2) {
        transition-delay: 0.1s;
    }
    &:nth-child(3) {
        transition-delay: 0.2s;
    }
}

.service-relative{
    position: relative;
}
.supportCards{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
}


.service-card{
    .btn-240{
        background: var(--second-color);
        .btn-text{
            color: var(--prime-color);
        }
    }
}



</style>