<template>
  <div class="inverse-circle" ref="circle"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const circle = ref(null)
const mouseX = ref(window.innerWidth / 2)
const mouseY = ref(window.innerHeight / 2)

const updatePosition = () => {
  // const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  const offsetX = mouseX.value
  const offsetY = centerY - (mouseY.value - centerY)

  const maxScroll = document.body.scrollHeight - window.innerHeight
  const scrollPercent = window.scrollY / maxScroll
  const rotation = scrollPercent * 360

  gsap.to(circle.value, {
    x: offsetX - 60,
    y: offsetY - 60,
    rotation,
    duration: 2,
    ease: 'power2.out',
  })
}

const handleMouseMove = (event) => {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
  updatePosition()
}

const handleScroll = () => {
  updatePosition()
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.inverse-circle {
  position: fixed;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  pointer-events: none;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, rgba(62, 176, 212, 0.5) 0%, rgba(150, 99, 200, 0.5) 100%);
  box-shadow:
    0 0 20px rgba(62, 176, 212, 0.6),
    0 0 40px rgba(150, 99, 200, 0.4),
    0 0 60px rgba(150, 99, 200, 0.3);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  mix-blend-mode: screen;
  transition: all 0.3s ease;
}
</style>
