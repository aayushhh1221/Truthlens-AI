"""
TruthLens AI 2.0 — FastAPI Application
Run with: uvicorn api.main:app --reload --port 8000
"""
import traceback
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from api.routes.analysis import router as analysis_router
from api.routes.analytics import router as analytics_router
from api.routes.history import router as history_router
from database.db import init_database

try:
    init_database()
except Exception:
    pass

# ─── App Definition ──────────────────────────────────────────────


app = FastAPI(
    title="TruthLens AI API",
    version="2.0.0",
    description=(
        "Multi-Agent Misinformation & Deepfake Detection REST API. "
        "Analyse text, images, and documents for AI-generated content, "
        "manipulation, and forgery using a 6-agent pipeline backed by Google Gemini."
    ),
    contact={
        "name": "TruthLens AI",
        "url": "https://github.com/truthlens-ai",
    },
    license_info={
        "name": "MIT",
    },
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS & Security Middleware ──────────────────────────────────
import time
from collections import defaultdict

# In-memory sliding window rate limiter: max 45 requests/minute per client IP
RATE_LIMIT_MAX_REQUESTS = 45
RATE_LIMIT_WINDOW_SECONDS = 60
_request_history = defaultdict(list)

@app.middleware("http")
async def security_and_rate_limit_middleware(request: Request, call_next):
    # 1. Rate Limiting for Analysis Endpoints
    path = request.url.path
    if path.startswith("/analyze/"):
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        # Clean timestamps older than window
        _request_history[client_ip] = [t for t in _request_history[client_ip] if now - t < RATE_LIMIT_WINDOW_SECONDS]
        if len(_request_history[client_ip]) >= RATE_LIMIT_MAX_REQUESTS:
            return JSONResponse(
                status_code=429,
                content={
                    "error": "Too Many Requests",
                    "detail": "Rate limit exceeded. Please wait a moment before running more analyses.",
                },
            )
        _request_history[client_ip].append(now)

    # 2. Process Request
    response = await call_next(request)

    # 3. Inject OWASP Defensive Security Headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "https://truthlens-ai-iota.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# ─── Global Error Handler ────────────────────────────────────────

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Catch-all: return a structured JSON error instead of a 500 HTML page."""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc),
            "path": str(request.url),
        },
    )

# ─── Routers ─────────────────────────────────────────────────────

app.include_router(analysis_router)
app.include_router(analytics_router)
app.include_router(history_router)

# ─── Health Check ────────────────────────────────────────────────

@app.get("/health", tags=["Health"], summary="API health check")
def health_check():
    return {
        "status": "ok",
        "service": "TruthLens AI API",
        "version": "2.0.0",
    }

# ─── Static Frontend (React SPA) ─────────────────────────────────
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

DIST_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend", "dist")

if os.path.exists(DIST_DIR):
    assets_dir = os.path.join(DIST_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/", include_in_schema=False)
    async def serve_root():
        index_file = os.path.join(DIST_DIR, "index.html")
        return FileResponse(index_file)

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_react_app(full_path: str):
        file_path = os.path.join(DIST_DIR, full_path)
        if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        index_file = os.path.join(DIST_DIR, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return JSONResponse(status_code=404, content={"detail": "Not found"})