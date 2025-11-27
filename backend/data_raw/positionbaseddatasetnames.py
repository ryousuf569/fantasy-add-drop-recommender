from nba_api.stats.endpoints import leaguedashplayerstats, commonplayerinfo
from pymongo import MongoClient
import sqlite3
import pandas as pd
import time
import os, sys

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

from mongokey import MONGO_URI
client = MongoClient(MONGO_URI)
db = client["nba_database"]
collection = db["names_cache"]

def fetch_and_cache_names():
    season_stats = leaguedashplayerstats.LeagueDashPlayerStats(season='2025-26').get_data_frames()[0]
    top100_df = season_stats[season_stats["NBA_FANTASY_PTS_RANK"] < 201]
    top_100_players = top100_df["PLAYER_ID"].tolist()
    top_100_players_names = top100_df["PLAYER_NAME"].tolist()

    guard_names, forward_names, center_names = [], [], []

    print("Fetching player data...")

    for i in top_100_players:
        index = top_100_players.index(i)
        player_info = commonplayerinfo.CommonPlayerInfo(player_id=i).get_data_frames()[0]
        pos = player_info['POSITION'].iloc[0]

        if pos in ["Guard"]:
            guard_names.append(top_100_players_names[index])
        elif pos in ["Forward"]:
            forward_names.append(top_100_players_names[index])
        elif pos in ["Center"]:
            center_names.append(top_100_players_names[index])
        elif pos in ["Guard-Forward"]:
            guard_names.append(top_100_players_names[index])
        elif pos in ["Forward-Guard", "Forward-Center"]:
            forward_names.append(top_100_players_names[index])
        elif pos in ["Center-Forward"]:
            center_names.append(top_100_players_names[index])

        time.sleep(0.5)

    print("Done fetching!")

    collection.delete_many({})

    collection.insert_one({
        "season": "2025-26",
        "guards": guard_names,
        "forwards": forward_names,
        "centers": center_names,
        "timestamp": time.time()
    })

    print("Saved to MongoDB!")

    return guard_names, forward_names, center_names

def get_position_names():
    conn = sqlite3.connect("backend/database/position_names.db")
    cursor = conn.cursor()

    cursor.execute("SELECT name FROM guards;")
    guard_names = [row[0] for row in cursor.fetchall()]

    cursor.execute("SELECT name FROM forwards;")
    forward_names = [row[0] for row in cursor.fetchall()]

    cursor.execute("SELECT name FROM centers;")
    center_names = [row[0] for row in cursor.fetchall()]

    conn.close()
    return guard_names, forward_names, center_names