from nba_api.stats.endpoints import leaguedashplayerstats
import pandas as pd

season_stats = leaguedashplayerstats.LeagueDashPlayerStats(season='2025-26')

season_df = season_stats.get_data_frames()[0]

desired_player_name = "Tyrese Maxey"
current_player_name = "Scottie Barnes"

def get_fantasy_ranks(season_df, desired_player, current_player):

    desired_player_season_totals = season_df[season_df['PLAYER_NAME'].str.lower() 
                                         == desired_player.lower()]
    current_player_season_totals = season_df[season_df['PLAYER_NAME'].str.lower() 
                                         == current_player.lower()]

    f1 = current_player_season_totals['NBA_FANTASY_PTS_RANK'].iloc[0]
    f2 = desired_player_season_totals['NBA_FANTASY_PTS_RANK'].iloc[0]

    return int(f1), int(f2)

def compare_fantasyranks(flist, desired_player, current_player):
    
    if flist[0] < flist[1]:
        print(f"Wouldn't recommend dropping {current_player} for {desired_player}!")
    else:
        print("Switching him could be benificial.")