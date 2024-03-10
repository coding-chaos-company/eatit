from sqlalchemy.ext.asyncio import AsyncSession

import models.status as status_model
import schemas.status as status_schema


async def register_user(
    db: AsyncSession, status_register: status_schema.StatusRegisterRequest
) -> status_schema.StatusResponse:
    status = status_model.Users(**status_register.dict())
    db.add(status)
    await db.commit()
    await db.refresh(status)
    return {
        "color": status.color,
        "kind": status.kind,
        "level": status.level,
        "loop": status.loop,
    }


async def feed_dino(
    db: AsyncSession, status_register: status_schema.FeedRequest
) -> status_schema.StatusResponse:
    pass
