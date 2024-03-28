from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import status
from jobs import status as status_jobs
from apscheduler.schedulers.asyncio import AsyncIOScheduler

app = FastAPI()
app.include_router(status.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://github.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# スケジューラ
@app.on_event("startup")
async def skd_process():
    scheduler = AsyncIOScheduler()
    scheduler.add_job(status_jobs.is_arrive_dino, "interval", hours=24)
    scheduler.start()
