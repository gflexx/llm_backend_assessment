from pydantic import BaseModel
from datetime import datetime


class UserRequest(BaseModel):
    question: str


class ChatHistorySchema(BaseModel):
    id: int
    message: str
    is_user: bool
    timestamp: datetime

    class Config:
        from_attributes = True