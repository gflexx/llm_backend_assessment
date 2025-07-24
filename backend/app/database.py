from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base

# init db connections

SQLALCHEMY_DATABASE_URL = "sqlite:///./chat.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Create tables
def init_db():
    Base.metadata.create_all(bind=engine)
