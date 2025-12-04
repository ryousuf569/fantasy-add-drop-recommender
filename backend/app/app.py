import app.nba_patch
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.ML_models.finalcomparison import get_full_player_report
from app.ML_models.top5 import *
from nba_api.stats.endpoints import leaguedashplayerstats
import app.cache as cache

# Lifespan function (runs BEFORE the app starts)
@asynccontextmanager
async def lifespan(app: FastAPI):

    print("Loading LeagueDashPlayerStats at startup...")

    try:
        stats = leaguedashplayerstats.LeagueDashPlayerStats(
            season="2025-26"
        ).get_data_frames()[0]
        cache.LEAGUE_STATS = stats
        print("LeagueDashPlayerStats successfully loaded.")
        load_or_refresh_top5()

    except Exception as e:
        print("Failed to load LeagueDashPlayerStats:", e)
        LEAGUE_STATS = None

    # app runs here
    yield

    print("Server shutting down...")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers import players, predict, top5router
app.include_router(players.router)
app.include_router(predict.router)
app.include_router(top5router.router)

@app.get("/")
def root():
    return {"message": "Fantasy NBA API running"}

@app.get("/health")
def health():
    return {"status": "ok"}
