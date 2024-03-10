from typing import Union
from fastapi import FastAPI
from routers import status  # from app.routerにすると動きませんでした

app = FastAPI()
app.include_router(status.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
