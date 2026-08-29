import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ALERT_EMAIL

logger = logging.getLogger(__name__)

def send_inquiry_notification(name: str, email: str, subject: str, message: str):
    if not (SMTP_HOST and SMTP_USER and SMTP_PASS):
        logger.info(f"📧 [Email Simulation] New inquiry from {name} ({email}): {subject}")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"🚀 Portfolio Inquiry: {subject} - from {name}"
        msg["From"] = SMTP_USER
        msg["To"] = ALERT_EMAIL

        html_body = f"""
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b; max-width: 600px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">New Portfolio Contact Message</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
            <p><strong>Subject:</strong> {subject}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p><strong>Message:</strong></p>
            <div style="background: #f8fafc; padding: 14px; border-left: 4px solid #2563eb; border-radius: 4px; white-space: pre-wrap;">{message}</div>
        </div>
        """
        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, ALERT_EMAIL, msg.as_string())
        
        logger.info(f"✅ Notification email successfully sent to {ALERT_EMAIL}")
        return True
    except Exception as e:
        logger.error(f"❌ Failed to send email notification: {e}")
        return False
