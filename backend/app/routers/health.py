from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Health"])

@router.get("/health")
async def health_check():
    return {
        "success": True,
        "message": "Portfolio FastAPI backend is healthy and operational.",
        "framework": "FastAPI (Python 3.12)",
        "database": "SQLite3"
    }
