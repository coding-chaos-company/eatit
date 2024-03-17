from sqlalchemy import Column, Integer, String, DateTime
from database import Base


class Users(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    github_name = Column(String(64), unique=True)
    level = Column(Integer, default=1)
    exp = Column(Integer, default=0)
    color = Column(String(32), nullable=True)
    kind = Column(String(32), default="brachio")
    code_score = Column(Integer, nullable=True)
    change_files = Column(Integer, nullable=True)
    commits_count = Column(Integer, nullable=True)
    last_update = Column(DateTime, nullable=True)
    loop = Column(Integer, default=1)
