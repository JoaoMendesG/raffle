from pydantic import BaseModel

class RaffleBase(BaseModel):
    
    name: str

class Raffle(RaffleBase):
    
    id: int
    name: str