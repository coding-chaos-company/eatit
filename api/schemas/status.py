from typing import Optional, List

from pydantic import BaseModel, Field


class BaseResponse(BaseModel):
    color: str = Field(None, example="green", description="恐竜の色")
    kind: str = Field(None, description="恐竜の状態")
    level: int = Field(None, example=1, description="恐竜のレベル")
    loop: int = Field(None, example=1, description="何周目の育成か")
    exp: int = Field(None, example=0, description="現在の経験値")

    class Config:
        orm_mode = True


class StatusResponse(BaseModel):
    status: Optional[BaseResponse] = Field(None)

    class Config:
        orm_mode = True


class StatusRegisterRequest(BaseModel):
    github_name: str = Field(None, example="Brachiosaurus", description="ユーザの名前")
    color: str = Field(None, example="red", description="恐竜の色")

    class Config:
        orm_mode = True


class FeedRequest(BaseModel):
    github_name: str = Field(None, example="Brachiosaurus", description="ユーザの名前")

    class Config:
        orm_mode = True
