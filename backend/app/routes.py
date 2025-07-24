from fastapi import APIRouter
from .schemas import UserRequest, ChatHistorySchema
from .models import ChatHistory
from .database import SessionLocal, init_db
from .utils import get_gemini_response

router = APIRouter()

init_db()

from .utils import get_gemini_response

router = APIRouter()


@router.post("/chat", response_model=ChatHistorySchema)
async def ask_question(data: UserRequest):
    """
    takes user input then requests LLM 
    assistant then outputs.
    """

    # init db ans save data
    db = SessionLocal()

    user_msg = ChatHistory(message=data.question, is_user=True)
    db.add(user_msg)
    db.commit()

    llm_response = get_gemini_response(data.question)

    bot_msg = ChatHistory(message=llm_response, is_user=False)
    db.add(bot_msg)
    db.commit()
    db.refresh(bot_msg)  # get timestamp and ID
    db.close()

    return bot_msg



@router.get("/chat/history", response_model=list[ChatHistorySchema])
async def chat_history():
    """
    returns a list of chat history
    """
    db = SessionLocal()
    history = db.query(ChatHistory).order_by(ChatHistory.timestamp).all()
    db.close()
    return history
