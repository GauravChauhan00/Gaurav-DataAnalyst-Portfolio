from fastapi import APIRouter, Request
from app.models.schemas import VisitCreate, StandardResponse
from app.database.db import get_db

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.post("/visit", response_model=StandardResponse)
async def record_visit(visit: VisitCreate, request: Request):
    ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")

    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO analytics_visits (path, referrer, screen, ip_address, user_agent)
                VALUES (?, ?, ?, ?, ?)
            """, (visit.path, visit.referrer, visit.screen, ip, user_agent))
            conn.commit()
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
