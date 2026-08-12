import { sendTelegramNotification } from '../utils/telegramService.js';

export async function logVisit(req, res, next) {
  try {
    // req.ip is the Express-resolved real client IP (works correctly when
    // app.set('trust proxy', true) is enabled in app.js).
    // Strip IPv6-mapped IPv4 prefix e.g. "::ffff:1.2.3.4" → "1.2.3.4"
    const rawIp =
      (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP')
        .split(',')[0]
        .trim()
        .replace(/^::ffff:/, '');
    const ip = rawIp;
    const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';
    const { path = '/', referrer = 'Direct', screen = 'Unknown' } = req.body || {};


    const timeString = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    // GeoIP lookup using ip-api (free endpoint)
    let locationStr = 'Unknown Location';
    let ispStr = '';
    let mapUrl = '';

    if (ip && ip !== 'Unknown IP' && !ip.startsWith('127.') && !ip.startsWith('192.168.') && ip !== '::1') {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,lat,lon`);
        const geoData = await geoRes.json();
        if (geoData && geoData.status === 'success') {
          locationStr = `${geoData.city}, ${geoData.regionName}, ${geoData.country}`;
          ispStr = geoData.isp || '';
          if (geoData.lat && geoData.lon) {
            mapUrl = `https://www.google.com/maps?q=${geoData.lat},${geoData.lon}`;
          }
        }
      } catch (e) {
        console.error('GeoIP lookup error:', e.message);
      }
    }

    const messageLines = [
      `🚨 *NEW WEBSITE VISITOR!*`,
      `━━━━━━━━━━━━━━━━━━`,
      `📍 *Location*: \`${locationStr}\``,
      mapUrl ? `🗺 *Map*: [View on Google Maps](${mapUrl})` : null,
      ispStr ? `🌐 *Network/ISP*: \`${ispStr}\`` : null,
      `🌐 *IP*: \`${ip}\``,
      `⏰ *Time*: ${timeString} IST`,
      `🔗 *Path*: \`${path}\``,
      `🔙 *Referrer*: \`${referrer}\``,
      `🖥 *Screen*: \`${screen}\``,
      `📱 *Device*: \`${userAgent.slice(0, 140)}\``
    ].filter(Boolean);

    const message = messageLines.join('\n');

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
