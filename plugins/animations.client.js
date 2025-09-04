import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Функция для вызова анимаций
  const initAnimations = () => {
    let gridCount
    const screenWidth = window.innerWidth

    if (screenWidth <= 500) gridCount = 1
    else if (screenWidth <= 1024) gridCount = 2
    else gridCount = 3

    // === Все анимации ScrollTrigger ===
    const containers = document.querySelectorAll('.animScroll')
    containers.forEach(container => {
      const cards = container.querySelectorAll('.cardAnim')
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: `center+=${(index % gridCount) * 50} bottom-=20`,
              end: '+=50 center',
              scrub: true,
              markers: true
            },
          }
        )
      })
    })

    const promoContainers = document.querySelectorAll('.promo-lines')
    promoContainers.forEach(container => {
      const firstLines = container.querySelectorAll('.first-line')
      const secondLines = container.querySelectorAll('.second-line')

      gsap.to(firstLines, {
        rotate: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom-=150',
          end: 'bottom center',
          scrub: true,
        },
      })

      gsap.to(secondLines, {
        rotate: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom+=100 center',
          scrub: true,
        },
      })
    })

    const pillContainers = document.querySelectorAll('.pill-place')
    pillContainers.forEach(container => {
      const pillAreas = container.querySelectorAll('.pill-area')
      const pillBtns = container.querySelectorAll('.pill-btn')

      gsap.fromTo(
        pillAreas,
        { x: '-100%', transformOrigin: 'left center' },
        {
          x: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top+=100 bottom',
            end: 'center center',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        pillBtns,
        { x: -208, opacity: 0, transformOrigin: 'left center' },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top center',
            end: 'center center',
            scrub: true,
          },
        }
      )
    })

    // Пример анимаций для секций
    const scrollAnimation = document.querySelectorAll('#our-works, #advantages, #our-service, #price')
    scrollAnimation.forEach(container => {
      if (!container) return
      const leftAnim = container.querySelectorAll('.two-part-content h2')
      const rightAnim = container.querySelectorAll('.rightAnim')
      const opacityAnim = container.querySelectorAll('.opacityAnim')

      if (leftAnim.length)
        gsap.fromTo(leftAnim, { x: '-100%' }, { x: 0, ease: 'power3.out', scrollTrigger: { trigger: container, start: 'top bottom', end: '+=100 center', scrub: true } })
      if (rightAnim.length)
        gsap.fromTo(rightAnim, { x: '100%' }, { x: 0, ease: 'none', scrollTrigger: { trigger: container, start: 'top bottom', end: '+=100 center', scrub: true } })
      if (opacityAnim.length)
        gsap.fromTo(opacityAnim, { opacity: 0 }, { opacity: 1, ease: 'power4.in', scrollTrigger: { trigger: container, start: 'top bottom', end: '+=100 center', scrub: true } })
    })

    const threeBlockContainers = document.querySelectorAll('.threeBlockAnim')
    threeBlockContainers.forEach(container => {
      const topAnim = container.querySelectorAll('.topAnim')
      const leftAnim = container.querySelectorAll('.leftAnim')
      const rightAnim = container.querySelectorAll('.rightAnim')
      const isFromBottom = container.classList.contains('from-bottom')

      if (!isFromBottom) {
        gsap.fromTo(topAnim, { y: '-600%' }, { y: 0, ease: 'power3.out', scrollTrigger: { trigger: container, start: 'top bottom', end: '+=100 center', scrub: true } })
        gsap.fromTo(leftAnim, { x: '-200%' }, { x: 0, ease: 'power3.out', scrollTrigger: { trigger: container, start: 'top bottom', end: '+=100 center', scrub: true } })
        gsap.fromTo(rightAnim, { x: '200%' }, { x: 0, ease: 'power3.out', scrollTrigger: { trigger: container, start: 'top bottom', end: '+=100 center', scrub: true } })
      } else {
        gsap.fromTo(topAnim, { y: '0%' }, { y: '-600%', ease: 'power3.in', scrollTrigger: { trigger: container, start: 'top top+=150', end: '+=250', scrub: true } })
        gsap.fromTo(leftAnim, { x: '0%' }, { x: '-200%', ease: 'power3.in', scrollTrigger: { trigger: container, start: 'top top', end: 'bottom top', scrub: true } })
        gsap.fromTo(rightAnim, { x: '0%' }, { x: '200%', ease: 'power3.in', scrollTrigger: { trigger: container, start: 'top top', end: 'bottom top', scrub: true } })
      }
    })
  }

  // Возвращаем функцию, чтобы её можно было вызвать из компонента
  return {
    provide: {
      initAnimations,
      $gsap: gsap
    }
  }
})
