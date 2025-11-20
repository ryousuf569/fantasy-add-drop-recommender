import os, sys

# Get the absolute path of the project root (one directory above src/models)
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

from ML_models.predictfuturepts import *

def guardalgorithm(playerdf):
    return round(((playerdf['PTS'].iloc[0] + 2.2*playerdf['AST'].iloc[0] + playerdf['REB'].iloc[0]
            + 4*playerdf['STL'].iloc[0] + 3.5*playerdf['BLK'].iloc[0] + playerdf['FG3M'].iloc[0]
            + 5*playerdf['FG_PCT'].iloc[0] - 3*playerdf['TOV'].iloc[0]) / playerdf['GP'].iloc[0]), 2)

def fwdalgorithm(playerdf):
    return round(((playerdf['PTS'].iloc[0] + 1.5*playerdf['AST'].iloc[0] + 1.2*playerdf['REB'].iloc[0]
            + 4*playerdf['STL'].iloc[0] + 4*playerdf['BLK'].iloc[0] + 0.5*playerdf['FG3M'].iloc[0]
            + 3*playerdf['FG_PCT'].iloc[0] - 2*playerdf['TOV'].iloc[0]) / playerdf['GP'].iloc[0]), 2)

def centeralgorithm(playerdf):
    return round(((playerdf['PTS'].iloc[0] + 0.8*playerdf['AST'].iloc[0] + 1.5*playerdf['REB'].iloc[0]
            + 4*playerdf['STL'].iloc[0] + 4*playerdf['BLK'].iloc[0] + 6*playerdf['FG_PCT'].iloc[0] 
            - 2*playerdf['TOV'].iloc[0]) / playerdf['GP'].iloc[0]), 2)

def algselection(playerinfodf, playerstatdf):
    if playerinfodf['POSITION'].iloc[0] == 'Guard':
        return guardalgorithm(playerstatdf)
    elif playerinfodf['POSITION'].iloc[0] == 'Forward':
        return fwdalgorithm(playerstatdf)
    else:
        return centeralgorithm(playerstatdf)
    
