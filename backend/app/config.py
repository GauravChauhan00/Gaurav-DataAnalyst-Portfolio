import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

PORT = int(os.getenv("PORT", 5000))
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "*")
ADMIN_SECRET_TOKEN = os.getenv("ADMIN_SECRET_TOKEN", "gaurav-admin-secret-2025")
DB_PATH = os.getenv("DB_PATH", str(BASE_DIR / "portfolio_data.db"))

# Telegram Visitor & Contact Alert Bot
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "8992926370:AAGogt3wrygo2YEocPd3rIW6Uxzto0LCdcM")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "1352837172")

# Gmail SMTP Email Delivery
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "gaurav94855@gmail.com")
SMTP_PASS = os.getenv("SMTP_PASS", "jwtwchktmfzpvtkb")
ALERT_EMAIL = os.getenv("ALERT_EMAIL", "gaurav94855@gmail.com")
