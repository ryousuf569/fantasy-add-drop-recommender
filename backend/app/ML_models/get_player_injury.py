from nba_api.stats.static import players
from nba_api.stats.endpoints import playergamelog
import pandas as pd
from datetime import datetime

def get_recent_games_with_status(player_name: str, season="2025-26", last_n=5):
    player_list = players.find_players_by_full_name(player_name)
    if not player_list:
        return f"No player found for name: {player_name}"
    
    player_id = player_list[0]["id"]

    logs = playergamelog.PlayerGameLog(player_id=player_id, season=season)
    df = logs.get_data_frames()[0]

    if df.empty:
        return "NOT ENOUGH GAME DATA"

    most_recent = df.iloc[0]
    game_date = datetime.strptime(most_recent["GAME_DATE"], "%b %d, %Y")

    days_since = (datetime.today() - game_date).days

    status = "INJURED" if days_since > 10 else "ACTIVE"

    return status
