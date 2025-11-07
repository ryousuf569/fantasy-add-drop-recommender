from  nba_api.stats.static import players
from nba_api.stats.endpoints import commonplayerinfo
import pandas as pd

all_players = pd.DataFrame(players.get_active_players())
guard_ids = []

for i in all_players['id']:
    p_info = commonplayerinfo.CommonPlayerInfo(player_id=i).get_data_frames()[0]
    if p_info['POSITION'].iloc[0] == 'Guard':
        guard_ids.append(i)