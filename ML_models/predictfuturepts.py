from nba_api.stats.endpoints import playergamelogs
import pandas as pd
from ML_models.guardxgbmodel import *
from ML_models.forwardsxgbmodel import *
from ML_models.centerxgbmodels import *

def get_player_name_id_pos(player_name):
    from nba_api.stats.endpoints import leaguedashplayerstats
    from nba_api.stats.endpoints import commonplayerinfo
    season_stats = leaguedashplayerstats.LeagueDashPlayerStats(season='2025-26')
    season_df = season_stats.get_data_frames()[0]

    pdf = season_df[season_df['PLAYER_NAME'].str.lower() 
                                         == player_name.lower()]
    
    player_id = pdf['PLAYER_ID'].iloc[0]
    player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id).get_data_frames()[0]
    player_pos = player_info['POSITION'].iloc[0]

    return player_id, player_pos

def get_recent_games(player_id, season="2025-26", n=12):

    logs = playergamelogs.PlayerGameLogs(
        player_id_nullable=str(player_id),
        season_nullable=season
    ).get_data_frames()[0]

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

def predict_next_n_games(model, recent_games, base_stats, window=7, n_future=5):
    df = recent_games.copy()
    predictions = []

    for _ in range(n_future):
        # creates lagged features from current df
        X_latest = prepare_prediction_features(df, base_stats, window).iloc[-1:]
        
        pred = model.predict(X_latest)[0]
        predictions.append(pred)

        # adds a fake row representing the predicted future game
        fake_row = df.iloc[-1:].copy()
        fake_row['fantasy_points'] = pred 

        fake_row['GAME_DATE'] = pd.to_datetime(fake_row['GAME_DATE']) + pd.Timedelta(days=1)

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

    future_preds = predict_next_n_games(
        model, 
        recent, 
        base_stats, 
        window=7,
        n_future=5
    )

    fantasy_predictions = [int(x) for x in future_preds]

    return f"Projected performance for {player_name}'s 5 next game: {fantasy_predictions}"