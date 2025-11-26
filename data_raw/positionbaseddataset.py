from nba_api.stats.endpoints import leaguedashplayerstats, commonplayerinfo
from pymongo import MongoClient
import pandas as pd
import time
import os, sys

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

from mongokey import MONGO_URI
client = MongoClient(MONGO_URI)
db = client["nba_database"]
collection = db["positions_cache"]

def fetch_and_cache_positions():
    season_stats = leaguedashplayerstats.LeagueDashPlayerStats(season='2025-26').get_data_frames()[0]
    top100_df = season_stats[season_stats["NBA_FANTASY_PTS_RANK"] < 201]
    top_100_players = top100_df["PLAYER_ID"].tolist()

    guard_ids, forward_ids, center_ids = [], [], []

    print("Fetching player data...")

    for i in top_100_players:
        player_info = commonplayerinfo.CommonPlayerInfo(player_id=i).get_data_frames()[0]
        pos = player_info['POSITION'].iloc[0]

        if pos in ["Guard"]:
            guard_ids.append(i)
        elif pos in ["Forward"]:
            forward_ids.append(i)
        elif pos in ["Center"]:
            center_ids.append(i)
        elif pos in ["Guard-Forward"]:
            guard_ids.append(i)
        elif pos in ["Forward-Guard", "Forward-Center"]:
            forward_ids.append(i)
        elif pos in ["Center-Forward"]:
            center_ids.append(i)

        time.sleep(0.5)

    print("Done fetching!")

    collection.delete_many({})

    collection.insert_one({
        "season": "2025-26",
        "guards": guard_ids,
        "forwards": forward_ids,
        "centers": center_ids,
        "timestamp": time.time()
    })

    print("Saved to MongoDB!")

    return guard_ids, forward_ids, center_ids

def get_position_lists():
    client = MongoClient(MONGO_URI)

    db = client["nba_database"]
    collection = db["positions_cache"]

    doc = collection.find_one({"season": "2025-26"})
    if not doc:
        raise ValueError("No cached position lists found in MongoDB.")

    guard_ids = doc["guards"]
    forward_ids = doc["forwards"]
    center_ids = doc["centers"]

    return guard_ids, forward_ids, center_ids