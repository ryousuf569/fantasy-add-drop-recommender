from nba_api.stats.endpoints import playercareerstats
import pandas as pd

career = playercareerstats.PlayerCareerStats(player_id='203999')

df = career.get_data_frames()[0]
print(df)