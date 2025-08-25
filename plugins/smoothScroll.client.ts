// plugins/smoothScroll.client.ts
import { onMounted } from 'vue'
import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin((nuxtApp) => {
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

  const scrollTo = (selector: string) => {
    const target = document.querySelector(selector)
    if (target) lenis.scrollTo(target, { offset: 0 })
  }

const initAnchorLinks = () => {
  const containerSelectors = ['.main-menu', '.place-for-logo']

  containerSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((container) => {
      container.querySelectorAll('a[href*="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href')
          if (!href) return

          const anchor = href.split('#')[1]
          if (!anchor) return

          e.preventDefault()
          const targetEl = document.querySelector(`#${anchor}`)
          if (!targetEl) return

          // Проверяем, находимся ли уже на элементе
          const rect = targetEl.getBoundingClientRect()
          const offsetTop = window.scrollY + rect.top

          // если элемент уже вверху, Lenis всё равно прокручивает до него
          lenis.scrollTo(offsetTop, {
            duration: 0.5,
            easing: (t: number) => t, // можно кастом
          })
        })
      })
    })
  })
}



  onMounted(() => initAnchorLinks())

  nuxtApp.provide('smoothScroll', {
    lenis,
    scrollTo,
    initAnchorLinks
  })
})
