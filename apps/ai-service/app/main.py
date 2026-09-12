from fastapi import FastAPI
from app.api.routes import health, detection

app = FastAPI(title="AI Detection Service")

app.include_router(health.router)
app.include_router(detection.router)
