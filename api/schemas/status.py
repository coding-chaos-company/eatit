from typing import Optional, List

from pydantic import BaseModel, Field


class StatusResponse(BaseModel):
    color: str = Field(None, example="green", description="恐竜の色")
    kind: str = Field(None, description="恐竜の状態")
    level: int = Field(None, example=1, description="恐竜のレベル")
    loop: int = Field(None, example=1, description="何周目の育成か")

    class Config():
        orm_mode = True


class StatusRegisterRequest(BaseModel):
    github_name: str = Field(None, example="Brachiosaurus", description="ユーザの名前")
    color: str = Field(None, example="red", description="恐竜の色")
   
    class Config():
        orm_mode = True 


class FeedRequest(BaseModel):
    github_name: str = Field(None, example="Brachiosaurus", description="ユーザの名前")

    class Config():
        orm_mode = True