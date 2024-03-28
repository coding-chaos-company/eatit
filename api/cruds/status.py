from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from utils import utils, log_info
from stats import MetricsManager
from typing import NamedTuple

import models.status as status_model
import schemas.status as status_schema


class CurrentMetrics(NamedTuple):
    level: int
    exp: int
    code_score: float
    change_files: float
    commits_count: int
    last_date: str


# 恐竜のステータスを確認
async def check_status(
    db: AsyncSession, github_name: str
) -> status_schema.StatusResponse:
    log_info("Status check.")
    users = await db.execute(
        select(status_model.Users).filter(status_model.Users.github_name == github_name)
    )
    user = users.first()
    if user:
        if user[0].is_arrived:
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
                    "exp": user.exp,
                }
            }
    else:
        return {
            "status": {
                "color": "green",
                "kind": "brachio",
                "level": 0,
                "loop": 1,
                "exp": 0,
            }
        }


# 恐竜の初期化
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
        log_info("ユーザを登録しました")
        mm = MetricsManager(status_register.github_name)
        metrics = mm.calc_metrics()
        status = status_model.Users(**status_register.dict())
        status.last_updated = metrics.current_date
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
    elif status_register.level == -1:
        log_info("新たな恐竜が生まれました")
        user = user[0]
        user.color = status_register.color
        user.last_updated = utils.what_time()
        user.loop = 1
        user.level = 1
        user.is_arrived = True
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
    else:
        user = user[0]
        user.loop += 1
        user.exp = 0
        user.level = 1
        user.color = status_register.color
        user.last_updated = utils.what_time()
        log_info(str(user.loop) + "周目に突入します")
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


# 恐竜の経験値獲得
async def feed_dino(db: AsyncSession, github_name: str) -> status_schema.StatusResponse:
    log_info("Feed dino.")
    users = await db.execute(
        select(status_model.Users).filter(status_model.Users.github_name == github_name)
    )
    mm = MetricsManager(github_name)
    user = users.first()[0]
    metrics = mm.calc_metrics(
        CurrentMetrics(
            level=user.level,
            exp=user.exp,
            code_score=user.code_score,
            change_files=user.change_files,
            commits_count=user.commits_count,
            last_date=user.last_updated,
        )
    )
    if metrics:
        user.level = metrics.level
        user.exp = metrics.exp
        user.code_score = metrics.code_score
        user.change_files = metrics.change_files
        user.commits_count = metrics.commits_count
        user.last_updated = metrics.current_date

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
