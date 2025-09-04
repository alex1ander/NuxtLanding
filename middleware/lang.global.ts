export default defineNuxtRouteMiddleware((to) => {
  const supportedLangs = ['ru', 'ua', 'en', 'de']
  const langParam = to.params.lang as string

  // Если это корневой путь, редиректим на главную с языком
  if (to.path === '/') {
    return
  }

  // Если язык указан в URL
  if (langParam) {
    // Проверяем, поддерживается ли язык
    if (!supportedLangs.includes(langParam)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
      })
    }
  } else {
    // Если путь не начинается с поддерживаемого языка и это не корневой путь
    const pathSegments = to.path.split('/').filter(Boolean)
    if (pathSegments.length > 0 && !supportedLangs.includes(pathSegments[0])) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
      })
    }
  }

  // Проверяем существование страницы для данного языка
  const allowedPages = ['', 'contacts'] // пустая строка для главной страницы
  const pathWithoutLang = to.path.replace(`/${langParam}`, '') || '/'
  const pageName = pathWithoutLang === '/' ? '' : pathWithoutLang.slice(1)
  
  if (!allowedPages.includes(pageName)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
  }
})
