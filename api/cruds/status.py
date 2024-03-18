from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from utils import utils, log_info
from client.git_client import GitClient
from stats import MetricsManager

import models.status as status_model
import schemas.status as status_schema


async def check_status(
    db: AsyncSession, github_name: str
) -> status_schema.StatusResponse:
    log_info("Status check.")
    users = await db.execute(
        select(status_model.Users).filter(status_model.Users.github_name == github_name)
    )
    user = users.first()
    if user:
        git_client = GitClient(github_name)
        if git_client.exist_5days_commits(
            last_date=user[0].last_update, current_date=utils.what_time()
        ):
            return {"status": user[0]}
        else:
            user = user[0]
            user.color = None
            user.exp = 0
            user.level = 1
            user.loop = 1
            await db.commit()
            await db.refresh(user)
            return {
                "status": {
                    "color": user.color,
                    "kind": "brachio",
                    "level": -1,
                    "loop": user.loop,
                }
            }
    else:
        return {
            "status": {
                "color": "green",
                "kind": "brachio",
                "level": 0,
                "loop": 1,
            }
        }


async def register_user(
    db: AsyncSession, status_register: status_schema.StatusRegisterRequest
) -> status_schema.StatusResponse:
    log_info("Register user.")
    users = await db.execute(
        select(status_model.Users).filter(
            status_model.Users.github_name == status_register.github_name
        )
    )
    user = users.first()
    if user is None:
        mm = MetricsManager(status_register.github_name)
        metrics = mm.calc_metrics()
        status = status_model.Users(**status_register.dict())
        status.last_update = metrics.current_date
        status.code_score = metrics.code_score
        status.change_files = metrics.change_files
        status.commits_count = metrics.commits_count
        status.level = metrics.level
        status.exp = metrics.exp
        db.add(status)
        await db.commit()
        await db.refresh(status)
        return {
            "status": {
                "color": status.color,
                "kind": status.kind,
                "level": status.level,
                "loop": status.loop,
                "exp": status.exp,
            }
        }
    else:
        user = user[0]
        user.loop += 1
        user.exp = 0
        user.level = 1
        user.color = status_register.color
        user.last_update = utils.what_time()
        await db.commit()
        await db.refresh(user)
        return {
            "status": {
                "color": user.color,
                "kind": user.kind,
                "level": user.level,
                "loop": user.loop,
                "exp": user.exp,
            }
        }


async def feed_dino(db: AsyncSession, github_name: str) -> status_schema.StatusResponse:
    log_info("Feed dino.")
    current_time_jst = utils.what_time()
    users = await db.execute(
        select(status_model.Users).filter(status_model.Users.github_name == github_name)
    )
    user = users.first()[0]
    user.level = 3
    user.exp = 3
    user.code_score = 3
    user.change_files = 3
    user.commits_count = 3
    user.last_update = current_time_jst
    user.loop = 3

    await db.commit()
    await db.refresh(user)
    return {
        "status": {
            "color": user.color,
            "kind": user.kind,
            "level": user.level,
            "loop": user.loop,
            "exp": user.exp,
        }
    }


async def kill_dino(db: AsyncSession, github_name: str) -> status_schema.StatusResponse:
    log_info("Kill dino.")
    current_time_jst = utils.what_time()
    users = await db.execute(
        select(status_model.Users).filter(status_model.Users.github_name == github_name)
    )
    user = users.first()[0]
    user.level = 1
    user.exp = 0
    user.color = None
    user.kind = None
    user.last_update = current_time_jst
    user.loop = 1

    await db.commit()
    await db.refresh(user)
    return {
        "status": {
            "color": user.color,
            "kind": user.kind,
            "level": user.level,
            "loop": user.loop,
            "exp": user.exp,
        }
    }
