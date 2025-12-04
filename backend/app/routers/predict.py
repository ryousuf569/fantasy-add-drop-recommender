import asyncio
from fastapi import APIRouter, HTTPException
from app.cache2 import prediction_cache_get, prediction_cache_set
from app.ML_models.finalcomparison import get_full_player_report

router = APIRouter(prefix="/predict", tags=["Predict"])


@router.get("/player")
async def predict_player(player: str):
    cached = prediction_cache_get(player)
    if cached:
        return cached
    try:
        result = get_full_player_report(player)
        prediction_cache_set(player, result)

        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
