from .schemas import UserRequest, LLMResponse
from fastapi import APIRouter

router = APIRouter()


@router.post("/chat", response_model=LLMResponse)
async def ask_question(data: UserRequest):
    """
    takes userinput then requests LLM
    """
    return {"answer": f"You asked: {data.question}"}