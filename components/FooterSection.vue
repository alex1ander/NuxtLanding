<script setup>
import LogoText from '../components/LogoText.vue'
import MenuList from '../components/MenuList.vue'

import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const { t } = useI18n()
const route = useRoute()

// Реактивный текущий язык из URL, по умолчанию 'ua'
const currentLang = computed(() => (route.params.lang || 'ua').toLowerCase())
</script>

<template>
  <footer>
    <div class="footer-container content">
      <div class="place-for-logo">
        <LogoText />
      </div>
      <MenuList />
      <p class="copyright-text">{{ t('copyrightText')}}</p>
      <!-- <ul class="useful-links main-menu no-animate">
        <li>
          <router-link :to="`/${currentLang}/contacts`">
            {{ t('our_contacts') }}
          </router-link>
        </li>
      </ul> -->
    </div>
  </footer>
</template>

<style scoped lang="scss">
    footer{
        position: relative;
        z-index: 1;
        padding: 20px;
        border-radius: 0 0 20px 20px;
    }

    .copyright-text{
      text-align: center;
      text-wrap: balance;
    }
    .footer-container{
        margin: auto;
        width: 100%;
        border-radius: 20px;
        text-wrap:nowrap;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:40px;
        padding: 60px 0 30px;
        backdrop-filter: blur(6px) saturate(150%);
        -webkit-backdrop-filter: blur(6px) saturate(150%);
        background: linear-gradient(135deg, rgba(62, 176, 212, 0.4) 0%, rgba(150, 99, 200, 0.4) 100%) !important;

        $content-padding: 64px;
        &.content {
            padding-left: $content-padding;
            padding-right: $content-padding;
        }

        .place-for-logo{
            align-self: start;
        }
    }

    @media (max-width: 1024px) {

        .footer-container {
            $content-padding: 20px;

            &.content {
                padding-left: $content-padding;
                padding-right: $content-padding;
            }
        }
    }

    .main-menu{
        height: 100%;
        display: flex;
        gap: 45px;
        list-style: none;
    }
</style>
