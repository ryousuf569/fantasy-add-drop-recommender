from fastapi import APIRouter
from app.database.all_players import return_all_players

router = APIRouter(prefix="/players", tags=["Players"])

@router.get("/all")
def list_all_players():
    """
    Returns a list of all NBA player full names.
    """
    return {"players": return_all_players()}
