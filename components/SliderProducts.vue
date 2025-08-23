<template>
    <section id="our-products" class="information-section scrollAnimation">

        <div class="content top-part-section sliderNumber-3-top-part">

            <div class="two-part-content">
                <h2 class="leftAnim">{{ $t('ourCasesTitle') }}</h2>

                <div class="slider-buttons rightAnim">
                    <div class="arrow-slider-prev slider-btn" tabindex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-8b42af03d429eaf8" aria-disabled="false">
                        <svg width="24" height="24" class="sprite-svg-fill">
                            <use href="#arrow-slider"></use>
                        </svg>
                    </div>
                    <div class="arrow-slider-next slider-btn swiper-button-disabled" tabindex="-1" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-8b42af03d429eaf8" aria-disabled="true">
                        <svg width="24" height="24" class="sprite-svg-fill">
                            <use href="#arrow-slider"></use>
                        </svg>
                    </div>
                </div>
            </div>

        </div>

        <swiper
        :slides-per-view="3.5"
        :watch-overflow="true"
        :space-between="20"
        :pagination="{ clickable: true }"
        :navigation="{
            prevEl: '.arrow-slider-prev',
            nextEl: '.arrow-slider-next'
        }"
        :modules="modules"
        :breakpoints="breakpoints"
        class="swiper content sliderNumber-2 opacityAnim"
        >
            <swiper-slide>
                <div class="page-card ">
                    <img class="card-image" src="../assets/upload/site1.png" alt="">
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="page-card">
                    <img class="card-image" src="../assets/upload/site2.png" alt="">
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="page-card">
                    <img class="card-image" src="../assets/upload/site3.png" alt="">
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="page-card">
                    <img class="card-image" src="../assets/upload/site4.png" alt="">
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="page-card">
                    <img class="card-image" src="../assets/upload/site5.png" alt="">
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="page-card">
                    <img class="card-image" src="../assets/upload/site6.png" alt="">
                </div>
            </swiper-slide>

        </swiper>
    </section>
</template>


<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

// import required modules



export default {
    components: {
    Swiper,
    SwiperSlide,
    },
    setup() {
        const breakpoints = {
            // Если ширина экрана больше 1200px
            1200: {
                slidesPerView: 3.5,
                spaceBetween: 20,
            },
            // Если ширина экрана больше 992px
            500: {
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
            // Для всех экранов меньше 576px
            0: {
                slidesPerView: 1.5,
                spaceBetween: 20,
            },
        };
      return {
        modules: [Navigation],
        breakpoints,
      };
    },

};
</script>

