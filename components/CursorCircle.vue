<template>
  <div 
    class="cursor-circle" 
    :class="{ 'cursor-hovered': isHovering }" 
    :style="{ left: x + 'px', top: y + 'px' }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)
const isHovering = ref(false)

function onMouseMove(e) {
  x.value = e.clientX
  y.value = e.clientY
}

const hoverClasses = ['dropdown-head', 'another-class','slider-btn','btn-pop-up','cursor-hover','logo-text'];
const hoverTags = ['BUTTON', 'A','INPUT']; // теги указываются в верхнем регистре

function onMouseOver(e) {
  const el = e.target;
  if (
    hoverClasses.some(cls => el.classList.contains(cls)) ||
    hoverTags.includes(el.tagName)
  ) {
    isHovering.value = true;
  }
}

function onMouseOut(e) {
  const el = e.target;
  if (
    hoverClasses.some(cls => el.classList.contains(cls)) ||
    hoverTags.includes(el.tagName)
  ) {
    isHovering.value = false;
  }
}



onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseover', onMouseOver)
  window.addEventListener('mouseout', onMouseOut)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseover', onMouseOver)
  window.removeEventListener('mouseout', onMouseOut)
})
</script>

<style scoped>
.cursor-circle {
  position: fixed;
  pointer-events: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #3EB0D4;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
  z-index: 100000;
  /* mix-blend-mode: difference; */
}

.cursor-hovered {
  width: 20px;
  height: 20px;
  border: 1px solid rgb(255, 50, 150);
}

@media (max-width: 768px) {
  .cursor-circle{
    display: none;
  }
}
</style>
