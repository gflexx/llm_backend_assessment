# LM Chat App

A full-stack AI chat application built as a technical assessment to demonstrate Python (FastAPI) and frontend (Next.js + TailwindCSS).

![Description](images/front_ui.png)

---

## Objectives

- Build a responsive web interface for users to:
  - Input questions in a clean chat-style UI
  - Receive real-time, structured responses from a Language Model (LLM)
  - View past query history

- Create API using FastAPI:
  - Validate user input
  - Handle queries via LLM
  - Expose documentation via Swagger

---
**Backend:**  
- FastAPI  
- Uvicorn  
- Pydantic  
- dotenv
- google-generativeai

**Frontend:**  
- Next.js  
- React  
- TailwindCSS  
- JSX

---

## Running the App Locally

### 🔹 Backend (FastAPI)

```bash
cd backend
cp .env.template .env
pip install -r requirements.txt
uvicorn app.main:app --reload
```
### 🔹 Frontend (NextJS)

```bash
cd frontend
npm i
npm run dev
```
