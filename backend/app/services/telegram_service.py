import os
import json
import urllib.request
import logging

logger = logging.getLogger(__name__)

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "8992926370:AAGogt3wrygo2YEocPd3rIW6Uxzto0LCdcM")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "1352837172")

def send_telegram_notification(text: str) -> bool:
    """
    Sends instant Markdown formatted alerts to your Telegram chat via Bot API.
    """
    token = os.getenv("TELEGRAM_BOT_TOKEN", TELEGRAM_BOT_TOKEN)
    chat_id = os.getenv("TELEGRAM_CHAT_ID", TELEGRAM_CHAT_ID)

    if not token or not chat_id:
        logger.info("[Telegram Alert Skipped] Token or Chat ID not configured.")
        return False

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown"
    }

    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            if res_data.get("ok"):
                logger.info("✅ Telegram notification sent successfully!")
                return True
            else:
                logger.error(f"❌ Telegram API Error: {res_data.get('description')}")
                return False
    except Exception as e:
        logger.error(f"❌ Telegram notification failed: {e}")
        return False
