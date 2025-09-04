export const useSeo = () => {
  const route = useRoute()
  
  const getSeoMeta = (title: string, description: string, path: string = '') => {
    const currentLang = route.params.lang as string || 'en'
    const fullPath = path ? `/${currentLang}${path}` : `/${currentLang}`
    const fullUrl = `https://bitalexis.com${fullPath}`
    
    return {
      title,
      htmlAttrs: {
        lang: currentLang
      },
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: fullUrl },
        { property: 'og:image', content: 'https://bitalexis.com/og-image.jpg' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description }
      ],
      link: [
        { rel: 'canonical', href: fullUrl },
        { rel: 'alternate', hreflang: 'ru', href: `https://bitalexis.com/ru${path}` },
        { rel: 'alternate', hreflang: 'uk', href: `https://bitalexis.com/ua${path}` },
        { rel: 'alternate', hreflang: 'en', href: `https://bitalexis.com/en${path}` },
        { rel: 'alternate', hreflang: 'de', href: `https://bitalexis.com/de${path}` },
        { rel: 'alternate', hreflang: 'x-default', href: `https://bitalexis.com/en${path}` }
      ]
    }
  }
  
  return {
    getSeoMeta
  }
}
