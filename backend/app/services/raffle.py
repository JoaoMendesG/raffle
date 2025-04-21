from sqlalchemy.orm import Session
from app.models.raffle import Raffle
from app.schemas import raffle

def get_raffles(db: Session, skip: int = 0):
    return db.query(Raffle).offset(skip).all()

def save_raffles(db: Session, raffles: list[raffle.RaffleBase]):
    for raffle in raffles:
        db.add(Raffle(**raffle))
    db.commit()