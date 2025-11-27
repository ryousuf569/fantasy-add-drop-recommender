from nba_api.stats.endpoints import playergamelogs
import pandas as pd
import os, sys
import time
from pymongo import MongoClient
import sqlite3

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

from data_raw.positionbaseddataset import get_position_lists
from mongokey import MONGO_URI
guard_ids, forward_ids, center_ids = get_position_lists()

client = MongoClient(MONGO_URI)
db = client["nba_database"]
collection = db["fantasy_datasets"]

DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

#  Fantasy scoring
def guardalgorithm(row):
    return round(
        row['PTS'] + 
        0.8 * row['AST'] +
        1.5 * row['REB'] + 
        4 * row['STL'] +
        4 * row['BLK'] +
        0 * row['FG3M'] +
        6 * row['FG_PCT'] -
        2 * row['TOV'], 
        2
    )

#  Create lag features
def create_lags(boxs_df, base_stats, window=7):
    df = boxs_df.sort_values('GAME_DATE').reset_index(drop=True)

    lagged_frames = []
    for stat in base_stats:
        for lag in range(1, window + 1):
            lagged_frames.append(df[stat].shift(lag).rename(f"{stat}_lag{lag}"))

    lagged_df = pd.concat([df] + lagged_frames, axis=1)

    lagged_df['target_fantasy'] = lagged_df['fantasy_points'].shift(-1)

    lagged_df = lagged_df.dropna().reset_index(drop=True)

    return lagged_df

def build_position_dataset(player_ids, base_stats, window=7):
    all_players_frames = []

    for pid in player_ids:
        print(f"Loading data for player {pid}...")

        time.sleep(0.500)

        logs = playergamelogs.PlayerGameLogs(
            player_id_nullable=str(pid),
            season_nullable='2024-25'
        ).get_data_frames()[0]

        df = logs[
            [
                'PLAYER_NAME', 'GAME_DATE', 'MIN',
                'PTS', 'REB', 'AST', 'STL', 'BLK',
                'TOV', 'FGM', 'FG3M', 'FGA',
                'FTM', 'FTA', 'FG_PCT'
            ]
        ].copy()

        df['fantasy_points'] = df.apply(guardalgorithm, axis=1)

        df['GAME_DATE'] = pd.to_datetime(df['GAME_DATE'])
        df = df.sort_values('GAME_DATE')
        
        lagged_df = create_lags(df, base_stats, window)

        lagged_df['PLAYER_ID'] = pid
        all_players_frames.append(lagged_df)

    combined_df = pd.concat(all_players_frames, ignore_index=True)

    return combined_df

def build_train_test_split(player_ids, base_stats, window=7, split_ratio=0.8):

    combined_dataset = build_position_dataset(player_ids, base_stats, window)

    feature_cols = [c for c in combined_dataset.columns if c.endswith(tuple(f"_lag{i}" for i in range(1, window+1)))] # selects only the lag features from your dataset

    target = combined_dataset["target_fantasy"]

    split = int(len(combined_dataset) * split_ratio)

    X_train = combined_dataset[feature_cols].iloc[:split]
    X_test  = combined_dataset[feature_cols].iloc[split:]
    Y_train = target.iloc[:split]
    Y_test  = target.iloc[split:]

    print("Dataset built successfully!")
    print("Combined shape:", combined_dataset.shape)
    print("Train shape:", X_train.shape)
    print("Test shape:", X_test.shape)

    return X_train, X_test, Y_train, Y_test, combined_dataset

# CALL FUNCTION TO BUILD DATASET
'''X_train, X_test, Y_train, Y_test, combined_dataset = build_train_test_split(
    center_ids,
    base_stats=['PTS', 'REB', 'AST', 'STL', 'BLK', 'TOV', 'FG3M', 'FG_PCT'],
    window=7
)'''

DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

def save_train_test_to_mongo(X_train, X_test, Y_train, Y_test, name="centers_dataset"):
    # File paths
    paths = {
        "X_train": f"{DATA_DIR}/{name}_X_train.csv",
        "X_test":  f"{DATA_DIR}/{name}_X_test.csv",
        "Y_train": f"{DATA_DIR}/{name}_Y_train.csv",
        "Y_test":  f"{DATA_DIR}/{name}_Y_test.csv",
    }

    # Save CSV files
    X_train.to_csv(paths["X_train"], index=False)
    X_test.to_csv(paths["X_test"], index=False)
    Y_train.to_csv(paths["Y_train"], index=False, header=False)
    Y_test.to_csv(paths["Y_test"], index=False, header=False)

    collection.delete_many({"name": name})
    collection.insert_one({
        "name": name,
        "paths": paths
    })

    print(f"[CSV + MongoDB] Saved dataset '{name}' successfully.")

def load_train_test_from_sqlite(db_path="fantasy_nba_test+train_data.db"):
    conn = sqlite3.connect(db_path)

    X_train = pd.read_sql_query("SELECT * FROM centers_X_train;", conn)
    X_test  = pd.read_sql_query("SELECT * FROM centers_X_test;", conn)
    Y_train = pd.read_sql_query("SELECT * FROM centers_Y_train;", conn).iloc[:,0]
    Y_test  = pd.read_sql_query("SELECT * FROM centers_Y_test;", conn).iloc[:,0]

    # fixing model shape
    if len(X_train) == len(Y_train) + 1:
        X_train = X_train.iloc[1:].reset_index(drop=True)
    if len(X_test) == len(Y_test) + 1:
        X_test = X_test.iloc[1:].reset_index(drop=True)

    # reset Y indices (sanity check 😰😰😰)
    Y_train = Y_train.reset_index(drop=True)
    Y_test  = Y_test.reset_index(drop=True)

    print("[SQLite] Clean load successful")
    return X_train, X_test, Y_train, Y_test