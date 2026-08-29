from fastapi import APIRouter, Request, HTTPException, Header, BackgroundTasks
from app.models.schemas import InquiryCreate, InquiryResponse
from app.database.db import get_db
from app.services.email_service import send_inquiry_notification
from app.services.telegram_service import send_telegram_notification
from app.config import ADMIN_SECRET_TOKEN

router = APIRouter(prefix="/api/inquiries", tags=["Inquiries"])

@router.post("", response_model=InquiryResponse)
async def submit_inquiry(inquiry: InquiryCreate, request: Request, background_tasks: BackgroundTasks):
    ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")

    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO inquiries (name, email, subject, message, ip_address, user_agent)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (inquiry.name, inquiry.email, inquiry.subject, inquiry.message, ip, user_agent))
            conn.commit()
            inquiry_id = cursor.lastrowid

        # 1. Telegram Instant Alert
        telegram_msg = (
            f"📩 *New Portfolio Inquiry Received!*\n\n"
            f"👤 *Name:* {inquiry.name}\n"
            f"📧 *Email:* `{inquiry.email}`\n"
            f"🎯 *Subject:* {inquiry.subject}\n"
            f"💬 *Message:*\n_{inquiry.message}_\n\n"
            f"🌐 *IP:* `{ip}`"
        )
        background_tasks.add_task(send_telegram_notification, telegram_msg)

        # 2. Email Notification
        background_tasks.add_task(send_inquiry_notification, inquiry.name, inquiry.email, inquiry.subject, inquiry.message)

        return InquiryResponse(
            success=True,
            message="Message sent successfully. I will get back to you soon.",
            inquiry_id=inquiry_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to record inquiry: {str(e)}")

@router.get("")
async def list_inquiries(x_admin_token: str = Header(None)):
    if x_admin_token != ADMIN_SECRET_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized access to inquiries.")

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM inquiries ORDER BY created_at DESC")
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
