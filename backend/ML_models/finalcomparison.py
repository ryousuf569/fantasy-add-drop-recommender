import os, sys
import joblib
import numpy as np
from predictfuturepts import *
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.static.players import get_players

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, project_root)
DATA_DIR = "backend/data/joblib"

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
    from difflib import get_close_matches
    players = get_players()
    all_player_names = [p["full_name"].lower() for p in players]
    name_lower = player_name.lower()

    for p in players:
        if p["full_name"].lower() == player_name.lower():
            return p["id"]
        
    # same search check as predictfuturepts    
    matches = get_close_matches(name_lower, all_player_names, n=1, cutoff=0.6)
    if matches:
        best_match = matches[0] 
        for p in players:
            if p["full_name"].lower() == best_match:
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

def calculate_risk_factor(fproj):
    avg = np.mean(fproj)
    std = np.std(fproj)
    cv = std / avg
    score = (100 - min(100, cv * 100))
    return round(score)

def compute_trend_meter(avg5, avg12, playername):
    trend_raw = (avg5 - avg12) / avg12

    if trend_raw > 0.20: return f"{playername} is going crazy lately."
    elif trend_raw > 0.10: return f"{playername} is turning up."
    elif trend_raw > 0.03: return f"{playername} is playing better recently."
    elif trend_raw > -0.03: return f"{playername} is performing consistent"
    elif trend_raw > -0.10: return f"{playername} been slowing down."
    elif trend_raw > -0.20: return f"{playername} is getting worse and worse"
    else: return f"{playername} is POOO right now"

desiredplayer_name = input("Enter desired player: ")
desiredplayer_name = player_id_to_name(get_player_id_from_name(desiredplayer_name))

desired_proj, desired_last_12_bpm_avg, dplayer_pos = get_fantasay_pred(desiredplayer_name)
time.sleep(0.300)
desiredplayer_id = get_player_id_from_name(desiredplayer_name)

desired_last_5 = get_recent_games(desiredplayer_id, season="2025-26", n=5)
desired_last_5_avg = round(desired_last_5['PLUS_MINUS'].mean())
 
desired_projection_avg = round(sum(desired_proj)/ len(desired_proj))
trend = compute_trend_meter(desired_last_5_avg, desired_last_12_bpm_avg, desiredplayer_name)
risk_factor = calculate_risk_factor(desired_proj)
similar_players = suggest_similar_players(desiredplayer_name, top_n=5)

