<template>
  <div class="second-shape" ref="shape"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const shape = ref(null)
const mouseX = ref(window.innerWidth / 2)
const mouseY = ref(window.innerHeight / 2)

// Обновление позиции и вращения фигуры
const updateShape = () => {

  const centerX = window.innerWidth / 2
  // const centerY = window.innerHeight / 2

  const offsetX = centerX - (mouseX.value - centerX)
  const offsetY = mouseY.value


  const maxScroll = document.body.scrollHeight - window.innerHeight
  const scrollPercent = maxScroll > 0 ? window.scrollY / maxScroll : 0
  const rotation = scrollPercent * 360

  gsap.to(shape.value, {
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
  updateShape()
}

const handleScroll = () => {
  updateShape()
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
.second-shape {
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: 20%;
  pointer-events: none;
  transform: translate(0, -50%);
  background: linear-gradient(135deg, rgba(255, 189, 46, 0.5) 0%, rgba(255, 50, 150, 0.5) 100%);
  box-shadow:
    0 0 20px rgba(255, 189, 46, 0.6),
    0 0 40px rgba(255, 50, 150, 0.4),
    0 0 60px rgba(255, 50, 150, 0.3);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  mix-blend-mode: screen;
  transition: all 0.3s ease;
}
</style>
