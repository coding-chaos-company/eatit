from models import status as status_model
from database import async_session
from sqlalchemy import select
from client import GitClient
from utils import utils


async def is_arrive_dino():
    async with async_session() as db:
        async with db.begin():
            result = await db.execute(select(status_model.Users.github_name))
            user_names = result.scalars().all()
            for user_name in user_names:
                users = await db.execute(
                    select(status_model.Users).filter(
                        status_model.Users.github_name == user_name
                    )
                )
                user = users.first()
                if user:
                    user = user[0]
                    git_client = GitClient(user.github_name)
                    if not git_client.exist_5days_commits(
                        last_date=user.last_updated, current_date=utils.what_time()
                    ):
                        user.color = None
                        user.exp = 0
                        user.level = 1
                        user.loop = 1
                        user.is_arrived = False
                        await db.commit()
                        await db.refresh(user)
