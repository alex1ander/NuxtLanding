<template>
  <div style="height: 200vh; position: relative;">
    <!-- SVG на всю ширину и высоту -->
    <svg 
      width="100vw" 
      height="100vh" 
      style="position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none;"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <path
        id="motionPath"
        d="
          M 400 0
          C 650 200, 350 400, 500 600
          S 650 900, 500 1400
        "
        stroke="blue"
        stroke-width="4"
        fill="none"
      />
    </svg>

    <model-viewer
      camera-orbit="180deg 40deg 6m"
      
      ref="model"
      src="/model/low_poly_helicopter.glb"
      alt="Helicopter 3D Model"
      autoplay
      style="width: 400px; height: 200px; position: fixed; z-index: 9999; top: 0; left: 0; transform-origin: center;"
    ></model-viewer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Lenis from '@studio-freight/lenis'

const model = ref(null)

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.type = 'module'
    script.onload = () => resolve()
    script.onerror = () => reject()
    document.head.appendChild(script)
  })
}



onMounted(async () => {
  try {
    await loadScript('https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js')
  } catch {
    console.error('Failed to load model-viewer script')
  }


  const lenis = new Lenis({
    duration: 1.2,
    easing: t => t * (2 - t),
    smooth: true,
  })

  const path = document.getElementById('motionPath')
  const pathLength = path.getTotalLength()

  function raf(time) {
    lenis.raf(time)
    updateModelPosition(lenis.scroll)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  function updateModelPosition(scroll) {
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const t = Math.min(scroll / maxScroll, 1)

    // Текущая точка на пути
    const point = path.getPointAtLength(t * pathLength)
    // Следующая точка для вычисления направления
    const delta = 1
    const nextT = Math.min(t * pathLength + delta, pathLength)
    const nextPoint = path.getPointAtLength(nextT)

    const dx = nextPoint.x - point.x
    const dy = nextPoint.y - point.y
    const angle = Math.atan2(dy, dx) * (180 / Math.PI)

    if (model.value) {
      // Переводим координаты SVG в координаты экрана с учётом размеров и позиции SVG
      // SVG занимает весь экран с viewBox 1000x1000, координаты нормализуем:
      const vw = window.innerWidth
      const vh = window.innerHeight
      const x = (point.x / 1000) * vw
      const y = (point.y / 1000) * vh

      model.value.style.left = `${x}px`
      model.value.style.top = `${y}px`
      model.value.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`
    }
  }
})
</script>
