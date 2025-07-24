import google.generativeai as genai
from dotenv import load_dotenv
import os 

load_dotenv()

# init gemini llm model

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

genai.configure(api_key=GEMINI_API_KEY)


def get_gemini_response(user_prompt: str) -> str:
    """
    uses gemini llm, attaches the base prompt to the user prompt
    base prompt instructs llm to be a helpfull assistant
    returns str
    """
    llm_model = genai.GenerativeModel()
    
    print(llm_model.__class__.__name__)
    
    base_prompt = (
        "You are a helpful assistant that explains concepts clearly and briefly.\n"
        "Answer the following question:\n"
    )
    prompt = base_prompt + user_prompt.strip()

    try:
        response = llm_model.generate_content(prompt)
        return response.text.strip()
    
    except Exception as e:
        print(f"{e}")
        return f"Error: {e}"
