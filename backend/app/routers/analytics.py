from fastapi import APIRouter, Request, BackgroundTasks
from app.models.schemas import VisitCreate, StandardResponse
from app.database.db import get_db
from app.services.telegram_service import format_visitor_alert, send_telegram_notification

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

def _send_bg_visit_alert(visit_dict: dict, ip: str, ua: str):
    msg = format_visitor_alert(visit_dict, ip, ua)
    send_telegram_notification(msg)

@router.post("/visit", response_model=StandardResponse)
async def record_visit(visit: VisitCreate, request: Request, background_tasks: BackgroundTasks):
    forwarded = request.headers.get("x-forwarded-for")
    ip = forwarded.split(",")[0].strip() if forwarded else (request.client.host if request.client else "unknown")
    user_agent = request.headers.get("user-agent", "unknown")

    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO analytics_visits (path, referrer, screen, ip_address, user_agent)
                VALUES (?, ?, ?, ?, ?)
            """, (visit.path, visit.referrer, visit.screen, ip, user_agent))
            conn.commit()

        # Send rich Telegram Visitor Alert in background thread
        background_tasks.add_task(_send_bg_visit_alert, visit.model_dump(), ip, user_agent)

        return StandardResponse(success=True, message="Visit recorded successfully.")
    except Exception:
        return StandardResponse(success=False, message="Analytics write skipped.")

@router.get("/summary")
async def get_analytics_summary():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) AS total_visits FROM analytics_visits")
        total_visits = cursor.fetchone()["total_visits"]

        cursor.execute("SELECT COUNT(*) AS total_inquiries FROM inquiries")
        total_inquiries = cursor.fetchone()["total_inquiries"]

        cursor.execute("SELECT path, COUNT(*) AS count FROM analytics_visits GROUP BY path ORDER BY count DESC LIMIT 5")
        top_paths = [dict(row) for row in cursor.fetchall()]

        return {
            "success": True,
            "total_visits": total_visits,
            "total_inquiries": total_inquiries,
            "top_paths": top_paths
        }
