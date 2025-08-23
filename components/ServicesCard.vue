<template>
    <section id="price" class="information-section">
        <div class="content">

            <div class="two-part-content">
                <h2>{{ $t('serviceTitle') }}</h2>
            </div>

            <p class="opacityAnim info-text">{{ $t('serviceText') }}</p>

            <input type="checkbox" id="toggle" class="toggleCheckbox" />
            <label for="toggle" class="toggleContainer opacityAnim">
                <div class="cursor-hover">{{ $t('btnDevelopment') }}</div>   
                <div class="cursor-hover">{{ $t('btnSupport') }}</div>
            </label>

            <div class="service-relative animScroll">
                <div class="servise-grid-wrapper developmentCards">

                    <div class="service-card cardAnim ">
                        <div class="bg-image">
                            <img src="../assets/upload/prev1.webp" alt="">
                        </div>

                        <div class="top-part"></div>

                        <div class="bottom-part">
                            <div class="title-area">
                                <h3 v-html="$t('serviceCardTitle_1')"></h3>
                                <div class="price">{{ $t('serviceCardPrice_1') }}</div>
                            </div>

                            <div class="content-part">
                                <p class="text">{{ $t('serviceCardText_1') }}</p>
                                <div class="benefits">
                                    <div class="benefit">{{ $t('serviceCardBen_1_1') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_1_2') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_1_3') }}</div>
                                </div>
                            </div>

                            <button class="btn-240 btn-pop-up" @click="$emit('open-contact-form', $t('serviceCardTitle_1'))">
                                    <span class="btn-text">{{ $t('consultBtn') }}</span>
                                    <div class="btn-after"><svg width="14" height="14" class="sprite-svg-fill"><use href="#arrow-service"></use></svg></div>
                                </button>
                        </div>
                    </div>


                    <div class="service-card cardAnim ">
                        <div class="bg-image">
                            <img src="../assets/upload/prev2.webp" alt="">
                        </div>

                        <div class="top-part"></div>

                        <div class="bottom-part">
                            <div class="title-area">
                                <h3 v-html="$t('serviceCardTitle_2')"></h3>
                                <div class="price">{{ $t('serviceCardPrice_2') }}</div>
                            </div>
                            <div class="content-part">
                                <p class="text">{{ $t('serviceCardText_2') }}</p>
                                <div class="benefits">
                                    <div class="benefit">{{ $t('serviceCardBen_2_1') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_2_2') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_2_3') }}</div>
                                </div>
                            </div>
                            <button class="btn-240 btn-pop-up" @click="$emit('open-contact-form', $t('serviceCardTitle_2'))">
                                    <span class="btn-text">{{ $t('consultBtn') }}</span>
                                    <div class="btn-after"><svg width="14" height="14" class="sprite-svg-fill"><use href="#arrow-service"></use></svg></div>
                                </button>
                        </div>
                    </div>


                    <div class="service-card cardAnim ">
                        <div class="bg-image">
                            <img src="../assets/upload/prev3.webp" alt="">
                        </div>

                        <div class="top-part"></div>

                        <div class="bottom-part">
                            <div class="title-area">
                                <h3 v-html="$t('serviceCardTitle_3')"></h3>
                                <div class="price">{{ $t('serviceCardPrice_3') }}</div>
                            </div>
                            <div class="content-part">
                                <p class="text">{{ $t('serviceCardText_3') }}</p>
                                <div class="benefits">
                                    <div class="benefit">{{ $t('serviceCardBen_3_1') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_3_2') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_3_3') }}</div>
                                </div>
                            </div>
                            <button class="btn-240 btn-pop-up" @click="$emit('open-contact-form', $t('serviceCardTitle_3'))">
                                    <span class="btn-text">{{ $t('consultBtn') }}</span>
                                    <div class="btn-after"><svg width="14" height="14" class="sprite-svg-fill"><use href="#arrow-service"></use></svg></div>
                                </button>
                        </div>
                    </div>

            

                </div>

                <div class="servise-grid-wrapper supportCards">
                    
                    <div class="service-card cardAnim ">
                        <div class="bg-image">
                            <img src="../assets/upload/prev4.webp" alt="">
                        </div>

                        <div class="top-part"></div>

                        <div class="bottom-part">
                            <div class="title-area">
                                <h3 v-html="$t('serviceCardTitle_4')"></h3>
                                <div class="price">{{ $t('serviceCardPrice_4') }}</div>
                            </div>

                            <div class="content-part">
                                <p class="text">{{ $t('serviceCardText_4') }}</p>
                                <div class="benefits">
                                    <div class="benefit">{{ $t('serviceCardBen_4_1') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_4_2') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_4_3') }}</div>
                                </div>
                            </div>

                            <button class="btn-240 btn-pop-up" @click="$emit('open-contact-form', $t('serviceCardTitle_4'))">
                                    <span class="btn-text">{{ $t('consultBtn') }}</span>
                                    <div class="btn-after"><svg width="14" height="14" class="sprite-svg-fill"><use href="#arrow-service"></use></svg></div>
                                </button>
                        </div>
                    </div>


                    <div class="service-card cardAnim ">
                        <div class="bg-image">
                            <img src="../assets/upload/prev5.webp" alt="">
                        </div>

                        <div class="top-part"></div>

                        <div class="bottom-part">
                            <div class="title-area">
                                <h3 v-html="$t('serviceCardTitle_5')"></h3>
                                <div class="price">{{ $t('serviceCardPrice_5') }}</div>
                            </div>
                            <div class="content-part">
                                <p class="text">{{ $t('serviceCardText_5') }}</p>
                                <div class="benefits">
                                    <div class="benefit">{{ $t('serviceCardBen_5_1') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_5_2') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_5_3') }}</div>
                                </div>
                            </div>
                            <button class="btn-240 btn-pop-up" @click="$emit('open-contact-form', $t('serviceCardTitle_5'))">
                                    <span class="btn-text">{{ $t('consultBtn') }}</span>
                                    <div class="btn-after"><svg width="14" height="14" class="sprite-svg-fill"><use href="#arrow-service"></use></svg></div>
                                </button>
                        </div>
                    </div>


                    <div class="service-card cardAnim ">
                        <div class="bg-image">
                            <img src="../assets/upload/prev6.webp" alt="">
                        </div>

                        <div class="top-part"></div>

                        <div class="bottom-part">
                            <div class="title-area">
                                <h3 v-html="$t('serviceCardTitle_6')"></h3>
                                <div class="price">{{ $t('serviceCardPrice_6') }}</div>
                            </div>
                            <div class="content-part">
                                <p class="text">{{ $t('serviceCardText_6') }}</p>
                                <div class="benefits">
                                    <div class="benefit">{{ $t('serviceCardBen_6_1') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_6_2') }}</div>
                                    <div class="benefit">{{ $t('serviceCardBen_6_3') }}</div>
                                </div>
                            </div>
                            <button class="btn-240 btn-pop-up" @click="$emit('open-contact-form', $t('serviceCardTitle_6'))">
                                    <span class="btn-text">{{ $t('consultBtn') }}</span>
                                    <div class="btn-after"><svg width="14" height="14" class="sprite-svg-fill"><use href="#arrow-service"></use></svg></div>
                            </button>
                        </div>
                    </div>
                
                </div>
            </div>

        </div>
    </section>
</template>


<script>
export default {
  methods: {
    setService(serviceText) {
      this.$emit('open-contact-form', serviceText)
    }
  }
}
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

.cardAnim{
    display: flex;
    flex-direction: column;
    transform: scaleX(1);
    transition: transform 0.6s ease;
}

.toggleCheckbox:checked ~ .service-relative .developmentCards .cardAnim{  
    transform: scaleX(0);
}
.toggleCheckbox:not(:checked) ~ .service-relative .supportCards .cardAnim{  
    transform: scaleX(0)
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