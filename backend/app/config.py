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

# SMTP Email Configuration (Optional)
SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")
ALERT_EMAIL = os.getenv("ALERT_EMAIL", "gaurav949855@gmail.com")
