from fastapi import FastAPI
from app.routers import players, predict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(players.router)
app.include_router(predict.router)

@app.get("/")
def root():
    return {"message": "Fantasy NBA API running"}
