from .schemas import UserRequest, LLMResponse
from fastapi import APIRouter

from .utils import get_gemini_response

router = APIRouter()


@router.post("/chat/", response_model=LLMResponse)
async def ask_question(data: UserRequest):
    """
    takes user input then requests LLM 
    assistant then outputs.
    """
    llm_response = get_gemini_response(data.question)

    return {"answer": f"{llm_response}"}