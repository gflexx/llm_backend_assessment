from .schemas import UserRequest, LLMResponse
from fastapi import APIRouter


import os 
from dotenv import load_dotenv
load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

router = APIRouter()


@router.post("/chat", response_model=LLMResponse)
async def ask_question(data: UserRequest):
    """
    takes userinput then requests LLM
    """
    return {"answer": f"You asked: {data.question} {GEMINI_API_KEY}"}