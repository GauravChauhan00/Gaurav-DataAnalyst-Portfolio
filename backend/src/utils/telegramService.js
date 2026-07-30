import { env } from '../config/env.js';

/**
 * Send a notification message to Telegram via Bot API
 * @param {string} text Markdown formatted message
 */
export async function sendTelegramNotification(text) {
  const { telegramBotToken, telegramChatId } = env;

  if (!telegramBotToken || !telegramChatId) {
    console.log('[Telegram Alert Skipped] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured in env.');
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('[Telegram API Error]:', data.description);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Telegram Notification Failed]:', error.message);
    return false;
  }
}
