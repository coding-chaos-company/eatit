from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import status  # from app.routerにすると動きませんでした

app = FastAPI()
app.include_router(status.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}
