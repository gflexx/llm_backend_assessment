from pydantic import BaseModel


class UserRequest(BaseModel):
    question: str


class LLMResponse(BaseModel):
    answer: str