from sqlalchemy import Column, Integer, String
from app.database import Base

class Raffle(Base):
    __tablename__ = "raffles"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)