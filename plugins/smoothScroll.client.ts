// plugins/smoothScroll.client.ts
import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin(() => {
  const initSmoothScroll = () => {
    const lenis = new Lenis({
      duration: 0.5,
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 0.7,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }

  return {
    provide: {
      initSmoothScroll
    }
  }
})
