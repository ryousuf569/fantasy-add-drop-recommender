from nba_api.stats.endpoints import commonplayerinfo
from app.ML_models.predictfuturepts import *
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors 
import joblib
import time

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)
from data_raw.positionbaseddataset import get_position_lists

guard_ids, forward_ids, center_ids = get_position_lists()

posmapping = {
    "Guard": 0,
    "Forward": 1,
    "Center": 2,
    "Guard-Forward": 0,
    "Forward-Guard": 1,
    "Forward-Center": 1,
    "Center-Forward": 2,
}


all_vecs = []
all_ids = []
all_pos_groups = [guard_ids, forward_ids, center_ids]
label_map = ["guard", "forward", "center"]


TEMP_DIR = "data/temp"
os.makedirs(TEMP_DIR, exist_ok=True)

def get_position_vector(pos_id,label):

    """
    pos_id: list of player IDs for the position group
    label: string, e.g., "guard", "forward", "center"
    """

    # Old fetch and cache was WAY too slow so I added temporary vectors to load

    save_path = os.path.join(TEMP_DIR, f"{label}_vectors.joblib")

    if os.path.exists(save_path):
        print(f"Loaded cached vector for {label.upper()} from {save_path}")
        data = joblib.load(save_path)
        return data["X"]

    print(f"Starting fresh data loading for {label.upper()}...")

    # If the temp vec doesn't exist make a new one

    X = []

    for id in pos_id:
        player_info = commonplayerinfo.CommonPlayerInfo(player_id=id).get_data_frames()[0]
        player_name = player_info['FIRST_NAME'].iloc[0] + " " + player_info['LAST_NAME'].iloc[0]

        print(f"Now loading {player_name}")

        player_proj, last_12_bpm_avg, player_pos = get_fantasay_pred(player_name)
        player_avg = sum(player_proj) / len(player_proj)

        pos_str = player_info['POSITION'].iloc[0] 
        player_pos_num = posmapping.get(pos_str)

        vec = [player_avg, last_12_bpm_avg, player_pos_num]
        X.append(vec)

        time.sleep(1)

    X = np.array(X)

    # Save to data/temp
    joblib.dump({"X": X}, save_path)
    print(f"Saved {label.upper()} vectors to {save_path}")

    return X

get_position_vector(guard_ids, "guard")

for label, pos_group in zip(label_map, all_pos_groups):
    X_pos = get_position_vector(pos_group, label)
    all_vecs.append(X_pos)

# Combine into single matrix
X = np.vstack(all_vecs)
player_ids = guard_ids + forward_ids + center_ids

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

k = 8
nn = NearestNeighbors(
    n_neighbors=k,
    metric="euclidean",
    algorithm="auto"
)
nn.fit(X_scaled)

DATA_DIR = "data/joblib"

joblib.dump(nn, os.path.join(DATA_DIR, "knn_players.joblib"))
joblib.dump(scaler, os.path.join(DATA_DIR, "scaler_players.joblib"))
joblib.dump(player_ids, os.path.join(DATA_DIR, "player_ids.joblib"))
joblib.dump(X, os.path.join(DATA_DIR, "player_vectors_raw.joblib"))

print("done loading joblib")