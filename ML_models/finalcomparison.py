import os, sys
import joblib
import numpy as np
from predictfuturepts import *
from nba_api.stats.endpoints import commonplayerinfo

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, project_root)
DATA_DIR = "data/joblib"

nn = joblib.load(os.path.join(DATA_DIR, "knn_players.joblib"))
scaler = joblib.load(os.path.join(DATA_DIR, "scaler_players.joblib"))
player_ids = joblib.load(os.path.join(DATA_DIR, "player_ids.joblib"))

def build_vector_from_name(player_name):

    posmapping = {
    "Guard": 0,
    "Forward": 1,
    "Center": 2,
    "Guard-Forward": 0,
    "Forward-Guard": 1,
    "Forward-Center": 1,
    "Center-Forward": 2,
}
    player_proj, last_12_bpm_avg, player_pos = get_fantasay_pred(player_name)
    player_avg = sum(player_proj) / len(player_proj)
    player_pos_num = posmapping.get(player_pos, -1)
    
    return np.array([player_avg, last_12_bpm_avg, player_pos_num])

def suggest_similar_players(player_name, top_n=5):
    vec = build_vector_from_name(player_name).reshape(1, -1)
    vec_scaled = scaler.transform(vec)
    distances, indices = nn.kneighbors(vec_scaled)

    similar_ids = [player_ids[i] for i in indices[0][1:top_n+1]]
    return [player_id_to_name(pid) for pid in similar_ids]

def player_id_to_name(pid):
    info = commonplayerinfo.CommonPlayerInfo(player_id=pid).get_data_frames()[0]
    return info['FIRST_NAME'].iloc[0] + " " + info['LAST_NAME'].iloc[0]

currentplayer_name = input("Enter current player: ")
desiredplayer_name = input("Enter desired player: ")

current_proj, current_last_12_bpm_avg, cplayer_pos = get_fantasay_pred(currentplayer_name)
desired_proj, desired_last_12_bpm_avg, dplayer_pos = get_fantasay_pred(desiredplayer_name)

current_avg = round(sum(current_proj) / len(current_proj)) 
desired_avg = round(sum(desired_proj)/ len(desired_proj))

print(f"\n{currentplayer_name} is projected to average ~{current_avg} pts next 5 games.")
print(f"{desiredplayer_name} is projected to average ~{desired_avg} pts next 5 games.\n")

print("\nPlayers similar to", desiredplayer_name)
for p in suggest_similar_players(desiredplayer_name, top_n=5):
    print(" •", p)

