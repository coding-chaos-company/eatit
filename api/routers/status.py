from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.status as status_shema
import cruds.status as status_crud
from database import get_db

router = APIRouter()


@router.post("/register", response_model=status_shema.StatusResponse)
async def register_user(
    status_body: status_shema.StatusRegisterRequest, db: AsyncSession = Depends(get_db)
):
    return await status_crud.register_user(db, status_body)


@router.put("/feed", response_model=status_shema.StatusResponse)
async def make_feed(
    feed_body: status_shema.FeedRequest, db: AsyncSession = Depends(get_db)
):
    return await status_crud.feed_dino(db, feed_body.github_name)


@router.delete("/bye", response_model=None)
async def kill_dino(
    feed_body: status_shema.FeedRequest, db: AsyncSession = Depends(get_db)
):
    return await status_crud.kill_dino(db, feed_body.github_name)
