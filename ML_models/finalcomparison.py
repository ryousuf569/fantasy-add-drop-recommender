import os, sys
import joblib
import numpy as np
from predictfuturepts import *
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.static.players import get_players

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, project_root)
DATA_DIR = "data/joblib"

nn = joblib.load(os.path.join(DATA_DIR, "knn_players.joblib"))
scaler = joblib.load(os.path.join(DATA_DIR, "scaler_players.joblib"))
player_ids = joblib.load(os.path.join(DATA_DIR, "player_ids.joblib"))
player_vectors = joblib.load(os.path.join(DATA_DIR, "player_vectors_raw.joblib"))

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

def get_player_id_from_name(player_name):
    players = get_players()
    for p in players:
        if p["full_name"].lower() == player_name.lower():
            return p["id"]
    raise ValueError(f"Player '{player_name}' not found")

def suggest_similar_players(player_name, top_n=5):
    
    target_id = get_player_id_from_name(player_name)
    try:
        target_index = player_ids.index(target_id)
    except ValueError:
        raise ValueError(f"{player_name} not found in KNN dataset")

    target_poscode = player_vectors[target_index][2]

    vec = build_vector_from_name(player_name).reshape(1, -1)
    vec_scaled = scaler.transform(vec)

    distances, indices = nn.kneighbors(vec_scaled, n_neighbors=25)

    # Filter by SAME position only
    same_pos_neighbors = []
    for idx in indices[0][1:]:  # skip self
        neighbor_pos = player_vectors[idx][2]
        if neighbor_pos == target_poscode:
            same_pos_neighbors.append(player_ids[idx])
        if len(same_pos_neighbors) == top_n:
            break

    return [player_id_to_name(pid) for pid in same_pos_neighbors]


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

