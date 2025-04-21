from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from .models import raffle
from .api.v1.endpoints import raffles

raffle.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API", version="1.0.0")

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens (apenas para desenvolvimento!)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos
    allow_headers=["*"],  # Permite todos os headers
)

app.include_router(raffles.router, prefix="/api/v1/raffles", tags=["raffles"])