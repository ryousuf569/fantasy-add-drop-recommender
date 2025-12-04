from fastapi import APIRouter
from typing import List, Any

from app.ML_models.top5 import load_or_refresh_top5, generate_top5_report

router = APIRouter(
    prefix="/top5",
    tags=["Top 5 Players"]
)

@router.get("", response_model=List[Any])
def get_top_five_players():
    return load_or_refresh_top5()


@router.get("/refresh", response_model=List[Any])
def refresh_top_five_players():
    return generate_top5_report()
