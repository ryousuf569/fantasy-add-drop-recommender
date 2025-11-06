from nba_api.stats.endpoints import playergamelogs
import pandas as pd

gamelog = playergamelogs.PlayerGameLogs(player_id_nullable='1630178', season_nullable='2024-25')

gamelog_df = gamelog.get_data_frames()[0]
boxscoredf = gamelog_df[['PLAYER_NAME', 'GAME_DATE', 
                  'MIN', 'PTS', 'REB',
                  'AST', 'STL', 'BLK',
                  'TOV', 'FGM', 'FG3M',
                  'FGA', 'FTM', 'FTA', 'FG_PCT' ]].iloc[0:50]

def guardalgorithm(playerdf):
    return round((playerdf['PTS'].iloc[0] + 2.2*playerdf['AST'].iloc[0] + playerdf['REB'].iloc[0]
            + 4*playerdf['STL'].iloc[0] + 3.5*playerdf['BLK'].iloc[0] + playerdf['FG3M'].iloc[0]
            + 5*playerdf['FG_PCT'].iloc[0] - 3*playerdf['TOV'].iloc[0]), 2)

fantasy_scores = []
for i in range(len(boxscoredf)):
    score = guardalgorithm(boxscoredf.iloc[[i]])
    fantasy_scores.append(score)

boxscoredf['fantasy_points'] = fantasy_scores
boxscoredf = boxscoredf.reset_index(drop=True)

# Will start leaving in-line's a lot from now on, learning XGB for the first time 

'''
create_lags makes lags for our XGB model to work properly
takes a Box Score DF, Base Stats, and window of games
'''

def create_lags(boxs_df, base_stats, window=7):
    """
    Generate lagged features for each stat in base_stats over the last `window` games.
    Returns a DataFrame with all lag features appended.
    """

    df = boxs_df.copy()
    df = df.sort_values('GAME_DATE').reset_index(drop=True)  # ensure chronological order

    lagged_frames = []

    for stat in base_stats:
        for lag in range(1, window + 1):
            lagged_col = df[stat].shift(lag).rename(f'{stat}_lag{lag}')
            lagged_frames.append(lagged_col)

    lagged_df = pd.concat([df] + lagged_frames, axis=1)

    # Drop games without full lag history
    lagged_df = lagged_df.dropna().reset_index(drop=True)

    # Safety check
    if len(lagged_df) == 0:
        raise ValueError(
            f"No valid rows left after applying window={window}. "
            f"Your data has only {len(df)} games."
        )

    return lagged_df


# Setting up data then calling the create_lags function
base_stats = ['PTS','REB','AST','STL','BLK','TOV','FG3M','FG_PCT']
boxscoredf = boxscoredf.sort_values('GAME_DATE').reset_index(drop=True)
lagged_df = create_lags(boxscoredf, base_stats, window=7)

# Creates a list of all columns in df that contain '_lag' in their names.
feature_cols = [c for c in lagged_df.columns if '_lag' in c]
target_set = lagged_df['fantasy_points']

# SANITY CHECK - This checks if the 'Lag' values are shifted down one
# cols_to_check = ['GAME_DATE','PTS','PTS_lag1','PTS_lag2','fantasy_points','fantasy_points_lag1']
# print(lagged_df[cols_to_check].head(8))

split_ratio = max(1, int(len(lagged_df) * 0.8))
X_training_set = lagged_df.loc[:split_ratio-1, feature_cols] # Base Stats
Y_training_set = lagged_df.loc[:split_ratio-1, 'fantasy_points'] # Target 
X_testing_set = lagged_df.loc[split_ratio:, feature_cols]
Y_testing_set  = lagged_df.loc[split_ratio:, 'fantasy_points']

X_train = X_training_set.values if hasattr(X_training_set, 'values') else X_training_set
Y_train = Y_training_set.values if hasattr(Y_training_set, 'values') else Y_training_set
X_test  = X_testing_set.values if hasattr(X_testing_set, 'values') else X_testing_set
Y_test  = Y_testing_set.values if hasattr(Y_testing_set, 'values') else Y_testing_set