// src/assets/js/script.js
import Lenis from '@studio-freight/lenis'


// Инициализация плавного скролла
export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 0.5,
    smooth: true,
    smoothTouch: false,
    wheelMultiplier: 0.7
  })


  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}
