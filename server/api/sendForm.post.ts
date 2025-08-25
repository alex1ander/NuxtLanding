import TelegramBot from 'node-telegram-bot-api'

const token = '7330740463:AAFwWtvVBiH3RDnyo6zyNKyKjzu5xrRm2ZU'
const chatId = '-4675319235'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, contactValue, service, comment, lang } = body

    // Создаём бота внутри обработчика
    const bot = new TelegramBot(token, { polling: false })

    const telegramMessage = `
    📥 *Новый лид:*
    🛠 *Сервис:* ${service || '-'}
    👤 *Имя:* ${name || '-'}
    📞 *Контакт:* ${contactValue || '-'}
    💬 *Комментарий:* ${comment || '-'}
    🌐 *Язык сайта:* ${lang || '-'}
    `

    await bot.sendMessage(chatId, telegramMessage, { parse_mode: 'Markdown' })

    return { success: true }

  } catch (err: any) {
    console.error('Ошибка при отправке в Telegram:', err)
    return { success: false, error: err.message }
  }
})
