# SEO Настройки для мультиязычного сайта

## Что настроено:

### 1. Структура URL
- ✅ `/ru` - русский язык
- ✅ `/ua` - украинский язык  
- ✅ `/en` - английский язык
- ✅ `/de` - немецкий язык
- ✅ `/ru/contacts`, `/ua/contacts`, `/en/contacts`, `/de/contacts`

### 2. SEO мета-теги
- ✅ Правильные title и description для каждого языка
- ✅ Open Graph теги (og:title, og:description, og:url, og:image)
- ✅ Twitter Card теги
- ✅ Canonical URL для каждой страницы
- ✅ hreflang теги для всех языковых версий
- ✅ x-default hreflang указывает на английскую версию

### 3. Robots.txt
```
User-agent: *
Allow: /ru
Allow: /ua  
Allow: /en
Allow: /de
Allow: /ru/contacts
Allow: /ua/contacts
Allow: /en/contacts
Allow: /de/contacts
Disallow: /

Sitemap: https://bitalexis.com/sitemap.xml
```

### 4. Sitemap.xml
- ✅ Включает все языковые версии страниц
- ✅ Правильные hreflang атрибуты
- ✅ x-default для поисковых систем

### 5. Обработка 404 ошибок
- ✅ Создана кастомная страница ошибки `error.vue`
- ✅ Middleware проверяет валидность маршрутов
- ✅ Неподдерживаемые URL возвращают 404

### 6. Middleware для маршрутизации
- ✅ Проверка поддерживаемых языков
- ✅ Валидация существующих страниц
- ✅ Правильная обработка ошибок

## Что нужно добавить:

### 1. OG Image
Создайте файл `public/og-image.jpg` размером 1200x630px с логотипом и названием компании.

### 2. Structured Data (JSON-LD)
Рекомендуется добавить структурированные данные для лучшего понимания сайта поисковыми системами:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BitAlexis",
  "url": "https://bitalexis.com",
  "sameAs": [
    "https://facebook.com/bitalexis",
    "https://twitter.com/bitalexis"
  ]
}
```

### 3. Analytics
Добавьте Google Analytics или другую систему аналитики для отслеживания трафика.

## Проверка настроек:

1. **Google Search Console**: Добавьте сайт и проверьте sitemap
2. **hreflang тестер**: Используйте инструменты для проверки hreflang
3. **Rich Results Test**: Проверьте structured data
4. **PageSpeed Insights**: Проверьте производительность

## Команды для проверки:

```bash
# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен версии
npm run start
```

## Тестирование 404:
- `http://localhost:3000/invalid-page` → должна показать 404
- `http://localhost:3000/fr` → должна показать 404 (неподдерживаемый язык)
- `http://localhost:3000/ru/invalid-page` → должна показать 404

## Валидные URL:
- `http://localhost:3000/ru`
- `http://localhost:3000/ua` 
- `http://localhost:3000/en`
- `http://localhost:3000/de`
- `http://localhost:3000/ru/contacts`
- `http://localhost:3000/ua/contacts`
- `http://localhost:3000/en/contacts`
- `http://localhost:3000/de/contacts`
