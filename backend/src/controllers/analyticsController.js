import { sendTelegramNotification } from '../utils/telegramService.js';

export async function logVisit(req, res, next) {
  try {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
    const ip = rawIp.split(',')[0].trim();
    const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';
    const { path = '/', referrer = 'Direct', screen = 'Unknown' } = req.body || {};

    const timeString = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const message = [
      `🚨 *NEW WEBSITE VISITOR!*`,
      `━━━━━━━━━━━━━━━━━━`,
      `📍 *IP*: \`${ip}\``,
      `⏰ *Time*: ${timeString} IST`,
      `🔗 *Path*: \`${path}\``,
      `🔙 *Referrer*: \`${referrer}\``,
      `🖥 *Screen*: \`${screen}\``,
      `📱 *Device*: \`${userAgent.slice(0, 120)}\``
    ].join('\n');

    // Send async alert so client call isn't blocked
    sendTelegramNotification(message).catch((err) => {
      console.error('Telegram notification error:', err);
    });

    return res.status(200).json({
      success: true,
      message: 'Visit logged successfully'
    });
  } catch (error) {
    return next(error);
  }
}
