# ⚡ Gaurav Portfolio Backend (FastAPI & SQLite)

High-performance Python FastAPI backend for contact form message handling, SQLite persistence, and visitor analytics.

## 🚀 Features
- **FastAPI Framework:** Asynchronous, OpenAPI documented (`/docs`).
- **SQLite Database:** Local relational table persistence for `inquiries` and `analytics_visits`.
- **Contact Ingestion:** `POST /api/inquiries` with Pydantic validation & email notifications.
- **Analytics Tracking:** `POST /api/analytics/visit` and `GET /api/analytics/summary`.
- **Health Check:** `GET /api/health`.

## 🛠️ Run Locally
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 main.py
```
Interactive Swagger Documentation available at `http://localhost:5000/docs`.
