<template>
  <div v-html="sprite" aria-hidden="true"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sprite = ref('')

onMounted(async () => {
  const spriteUrl = new URL('@/assets/icon/sprite.svg', import.meta.url).href
  const response = await fetch(spriteUrl)
  sprite.value = await response.text()
})
</script>

<style scoped>
/* Если нужно, можно скрыть спрайт визуально, но он должен быть в DOM */
div {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
