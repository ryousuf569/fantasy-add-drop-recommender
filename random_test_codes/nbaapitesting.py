from nba_api.stats.endpoints import playergamelogs
import pandas as pd

gamelog = playergamelogs.PlayerGameLogs(player_id_nullable='1630178', season_nullable='2025-26')

gamelog_df = gamelog.get_data_frames()[0]
print(gamelog_df[['PLAYER_NAME', 'GAME_DATE', 
                  'MIN', 'PTS', 'REB',
                  'AST', 'STL', 'BLK',
                  'TOV', 'FGM', 'FG3M',
                  'FGA', 'FTM', 'FTA' ]].head(5))