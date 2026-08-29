import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr, formatdate, make_msgid
from app.config import SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ALERT_EMAIL

logger = logging.getLogger(__name__)

def send_inquiry_notification(name: str, email: str, subject: str, message: str) -> bool:
    if not (SMTP_HOST and SMTP_USER and SMTP_PASS):
        logger.info(f"📧 [Email Simulation] New inquiry from {name} ({email}): {subject}")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"🚀 Portfolio Inquiry: {subject} (from {name})"
        msg["From"] = formataddr(("Portfolio Alert System", SMTP_USER))
        msg["To"] = ALERT_EMAIL
        msg["Reply-To"] = formataddr((name, email))
        msg["Date"] = formatdate(localtime=True)
        msg["Message-ID"] = make_msgid(domain="gauravdataanalyst.onrender.com")

        plain_text = f"""New Portfolio Contact Message
----------------------------------------
Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}
----------------------------------------
Sent via Gaurav Data Analyst Portfolio
"""

        html_body = f"""
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #1e293b; max-width: 600px; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Portfolio Contact Message</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> {name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:{email}" style="color: #2563eb;">{email}</a></p>
            <p style="margin: 8px 0;"><strong>Subject:</strong> {subject}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="margin: 8px 0;"><strong>Message:</strong></p>
            <div style="background: #f8fafc; padding: 16px; border-left: 4px solid #2563eb; border-radius: 4px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">{message}</div>
            <p style="color: #64748b; font-size: 12px; margin-top: 20px;">💡 Tip: You can reply directly to this email to respond to {name}.</p>
        </div>
        """

        msg.attach(MIMEText(plain_text, "plain", "utf-8"))
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, ALERT_EMAIL, msg.as_string())

        logger.info(f"✅ Notification email successfully sent to {ALERT_EMAIL}")
        return True
    except Exception as e:
        logger.error(f"❌ Failed to send email notification: {e}")
        return False

