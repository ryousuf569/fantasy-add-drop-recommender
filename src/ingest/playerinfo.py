from nba_api.stats.endpoints import leaguedashplayerstats
from nba_api.stats.endpoints import commonplayerinfo

season_stats = leaguedashplayerstats.LeagueDashPlayerStats(season='2025-26')
season_df = season_stats.get_data_frames()[0]

desired_player_name = "Tyrese Maxey"
current_player_name = "Scottie Barnes"

dpdf = season_df[season_df['PLAYER_NAME'].str.lower() 
                                         == desired_player_name.lower()]
cpdf = season_df[season_df['PLAYER_NAME'].str.lower() 
                                         == current_player_name.lower()]

dp_infodf = commonplayerinfo.CommonPlayerInfo(player_id=dpdf['PLAYER_ID']).get_data_frames()[0]
cp_infodf = commonplayerinfo.CommonPlayerInfo(player_id=cpdf['PLAYER_ID']).get_data_frames()[0]
