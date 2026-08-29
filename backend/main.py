import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import init_db
from app.routers import inquiries, analytics, health
from app.config import PORT

# Ensure DB tables exist on initial import
init_db()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    print("🚀 FastAPI Portfolio Database Initialized!")
    yield
    # Shutdown
    print("🛑 FastAPI Portfolio Backend Stopped.")

app = FastAPI(
    title="Gaurav Data Analyst Portfolio API",
    description="Production FastAPI Backend for contact inquiries, SQLite storage, and visit analytics.",
    version="2.0.0",
    lifespan=lifespan
)

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(health.router)
app.include_router(inquiries.router)
app.include_router(analytics.router)

@app.get("/")
async def root():
    return {
        "title": "Gaurav Data Analyst Portfolio API",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)
