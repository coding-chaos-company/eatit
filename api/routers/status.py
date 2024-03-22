from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.status as status_schema
import cruds.status as status_crud
from database import get_db

router = APIRouter()


@router.get("/hc")
def read_root():
    return {"msg": "Health good"}


@router.post("/status", response_model=status_schema.StatusResponse)
async def check_status(
    me_body: status_schema.FeedRequest, db: AsyncSession = Depends(get_db)
):
    return await status_crud.check_status(db, me_body.github_name)


@router.post("/register", response_model=status_schema.StatusResponse)
async def register_user(
    status_body: status_schema.StatusRegisterRequest, db: AsyncSession = Depends(get_db)
):
    return await status_crud.register_user(db, status_body)


@router.put("/feed", response_model=status_schema.StatusResponse)
async def make_feed(
    feed_body: status_schema.FeedRequest, db: AsyncSession = Depends(get_db)
):
    return await status_crud.feed_dino(db, feed_body.github_name)
