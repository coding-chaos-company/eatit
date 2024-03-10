from sqlalchemy import create_engine

from models.status import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///db.sqlite3"
Engine = create_engine(
  SQLALCHEMY_DATABASE_URL,
  echo=False
)


def reset_database():
    Base.metadata.drop_all(bind=Engine)
    Base.metadata.create_all(bind=Engine)


if __name__ == "__main__":
    reset_database()