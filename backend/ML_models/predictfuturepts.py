from nba_api.stats.endpoints import playergamelogs
import pandas as pd
import time
from guardxgbmodel import *
from forwardsxgbmodel import *
from centerxgbmodels import *

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, project_root)

from data_raw.positionbaseddatasetnames import get_position_names
guard_names, forward_names, center_names = get_position_names()

def get_player_name_id_pos(player_name):
    from nba_api.stats.endpoints import leaguedashplayerstats
    from nba_api.stats.endpoints import commonplayerinfo
    from difflib import get_close_matches
    season_stats = leaguedashplayerstats.LeagueDashPlayerStats(season='2025-26')
    season_df = season_stats.get_data_frames()[0]

    all_names = [name.lower() for name in (guard_names + forward_names + center_names)]

    time.sleep(0.300)

    def player_id_pos(season_df, name):
        pdf = season_df[season_df['PLAYER_NAME'].str.lower() == name.lower()]

        if pdf.empty:
            return None, None 

        player_id = pdf['PLAYER_ID'].iloc[0]

        player_info = commonplayerinfo.CommonPlayerInfo(
            player_id=player_id
        ).get_data_frames()[0]

        player_pos = player_info['POSITION'].iloc[0]

        return player_id, player_pos
    
    def find_similar_name(name, allnames_list, cutoff=0.6):
        matches = get_close_matches(name.lower(), allnames_list, n=1, cutoff=cutoff)
        if matches:
            return matches[0]
        return None
    
    name_lower = player_name.lower()

    if name_lower in all_names:
        return player_id_pos(season_df, player_name)

    # Fuzzy match
    new_name = find_similar_name(player_name, all_names)

    if new_name is not None:
        # new_name is lowercase version -> find real-cased version in all list
        for name in guard_names + forward_names + center_names:
            if name.lower() == new_name:
                corrected = name
                break
        return player_id_pos(season_df, corrected)

    raise ValueError(f"No close match found for player name: {player_name}")

def get_recent_games(player_id, season="2025-26", n=12):

    logs = playergamelogs.PlayerGameLogs(
        player_id_nullable=str(player_id),
        season_nullable=season
    ).get_data_frames()[0]

    time.sleep(0.200)

    logs['GAME_DATE'] = pd.to_datetime(logs['GAME_DATE'])
    logs = logs.sort_values("GAME_DATE", ascending=False).head(n)
    logs = logs.sort_values("GAME_DATE")
    return logs

def prepare_prediction_features(raw_df, base_stats, window=7):
    df = raw_df.copy()
    df['GAME_DATE'] = pd.to_datetime(df['GAME_DATE'])
    df = df.sort_values("GAME_DATE").reset_index(drop=True)

    # Create lag features
    lagged_frames = []
    for stat in base_stats:
        for lag in range(1, window + 1):
            lagged_frames.append(
                df[stat].shift(lag).rename(f"{stat}_lag{lag}")
            )

    lagged_df = pd.concat(lagged_frames, axis=1).dropna()
    return lagged_df

def predict_next_n_games(model, recent_games, base_stats, window=7, n_future=5, min_window=1):
    df = recent_games.copy()
    predictions = []

    for _ in range(n_future):

        current_window = window
        pred = None

        while current_window >= min_window:
            try:
                X_latest = prepare_prediction_features(df, base_stats, current_window)

                if X_latest.shape[0] == 0:
                    raise ValueError("Empty feature matrix")

                raw_pred = model.predict(X_latest.iloc[-1:])
                
                if len(raw_pred) == 0:
                    raise ValueError("Model returned empty predictions")

                pred = raw_pred[0]
                break

            except Exception as e:
                current_window -= 1

        if pred is None:
            return [0, 0, 0, 0, 0]

        # Save prediction
        predictions.append(pred)

        fake_row = df.iloc[-1:].copy()
        fake_row['fantasy_points'] = pred
        fake_row['GAME_DATE'] = (
            pd.to_datetime(fake_row['GAME_DATE']) + pd.Timedelta(days=1)
        )

        df = pd.concat([df, fake_row], ignore_index=True)

    return predictions


def get_fantasay_pred(player_name):
    player_id, player_pos = get_player_name_id_pos(player_name)
    base_stats = ["PTS", "REB", "AST", "STL", "BLK", "TOV", "FG3M", "FG_PCT"]

    if (player_pos == "Guard") or (player_pos == "Guard-Forward"):
        model = gmodel
    elif (player_pos == "Forward") or (player_pos == "Forward-Guard") or (player_pos == "Forward-Center"):
        model = fmodel
    elif (player_pos == "Center") or (player_pos == "Center-Forward"):
        model = cmodel
    else:
        pass

    recent = get_recent_games(player_id, season="2025-26", n=12)
    last_12_bpm_avg = round(recent['PLUS_MINUS'].mean())

    future_preds = predict_next_n_games(
        model, 
        recent, 
        base_stats, 
        window=7,
        n_future=5
    )

    fantasy_predictions = [int(x) for x in future_preds]

    return fantasy_predictions, last_12_bpm_avg, player_pos
