import os, sys

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, project_root)
from ML_models.predictfuturepts import *

currentplayer_name = input("who do you have that's being idf: ")
desiredplayer_name = input("now who do you want nigga: ")

currentplayer_proj = get_fantasay_pred(currentplayer_name)
desiredplayer_proj = get_fantasay_pred(desiredplayer_name)

print(currentplayer_proj)
print(desiredplayer_proj)

