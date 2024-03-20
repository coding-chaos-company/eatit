from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import status

app = FastAPI()
app.include_router(status.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://github.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/hc")
def read_root():
    return {"msg": "Health good"}
