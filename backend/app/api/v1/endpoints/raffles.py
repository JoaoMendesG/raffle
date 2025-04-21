from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List

from app.models.raffle import Raffle as RaffleModel
from app.schemas.raffle import Raffle
from app.services.raffle import get_raffles, save_raffles
from app.database import get_db

import random

router = APIRouter()

@router.get("", response_model=List[Raffle])
def get_all_raffles(db: Session = Depends(get_db)):
    try:
        return get_raffles(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("")
async def save_raffles_file(raffles_file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        content = await raffles_file.read()
        data = [{"name": name} for name in content.decode("utf-8").splitlines()]
        save_raffles(db, data)
        return JSONResponse({"message": "Raffles saved successfully"}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/drawn", response_model=Raffle)
def get_drawn(db: Session = Depends(get_db)):
    try:
        all_raffles = get_raffles(db)
        
        if not all_raffles:
            return JSONResponse(content={"message": "Raffles not registered"}, status_code=status.HTTP_400_BAD_REQUEST)
        
        db.query(RaffleModel).delete()
        db.commit()
        return random.choice(all_raffles)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))