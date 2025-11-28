from fastapi import APIRouter, HTTPException
from app.ML_models.finalcomparison import get_full_player_report

router = APIRouter(prefix="/predict", tags=["Predict"])

@router.get("/player")
def predict_player(player: str):
    try:
        result = get_full_player_report(player)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))