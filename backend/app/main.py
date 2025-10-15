from fastapi import FastAPI, HTTPException
from fastapi.middleware import cors
from sqlalchemy import select
import uvicorn

from db.db import create_all, db_session
from db.schemas import BondBase
from db.models import BondModel

from routers.bonds import router

app = FastAPI()

app.include_router(router)

@app.on_event('startup')
async def startup():
    await create_all()

app.add_middleware(
    cors.CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        port=3100,
        reload=True
    )