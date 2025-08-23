<script setup>
import { computed, ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useRoute } from 'vue-router'

const text = '<BITALEXIS/>'
const textArray = text.split('')
const textContainer = ref(null)
const route = useRoute()

const currentLang = computed(() => route.params.lang || 'ua')

onMounted(() => {
  const chars = textContainer.value.querySelectorAll('.char')
  gsap.set(chars, { opacity: 1, color: 'rgb(255, 50, 150)' })
  gsap.to(chars, {
    opacity: 1,
    color: 'rgb(255, 189, 46)',
    duration: 2,
    ease: 'power1.inOut',
    repeat: -1,
    repeatDelay: 1,
    stagger: 0.1,
    yoyo: true,
  })
})
</script>

<template>
  <router-link :to="`/${currentLang}#top`" class="logo-text">
    <div class="char-container" ref="textContainer">
      <span v-for="(char, index) in textArray" :key="index" class="char">{{ char }}</span>
    </div>
  </router-link>
</template>


<style scoped>
.logo-text span {
  font-family: "Exo 2", sans-serif;
  font-weight: 700;
  color: rgb(255, 189, 46);
  font-size: 24px;
}
.char-container{
  pointer-events: none;
}
</style>