import os
import pandas as pd
from nba_api.stats.endpoints import leaguedashplayerstats
from app.safe_nba import safe_nba_call

CACHE_FILE = "top_players_cache.csv"


def return_all_players():
    if os.path.exists(CACHE_FILE):
        try:
            df = pd.read_csv(CACHE_FILE)
            if len(df) > 0:
                return df["PLAYER_NAME"].tolist()
        except Exception as e:
            print("[CACHE ERROR] Failed to read cache:", e)

    print("[CACHE MISS] Fetching player list from NBA API...")

    df = safe_nba_call(
        lambda: leaguedashplayerstats.LeagueDashPlayerStats(
            season="2025-26"
        ).get_data_frames()[0],
        context="LeagueDashPlayerStats(season='2025-26')"
    )
    
    try:
        df.to_csv(CACHE_FILE, index=False)
        print("[CACHE SAVED] top_players_cache.csv")
    except Exception as e:
        print("[CACHE SAVE ERROR]:", e)

    return df["PLAYER_NAME"].tolist()
