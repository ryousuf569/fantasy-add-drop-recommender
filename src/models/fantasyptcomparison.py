import os, sys

# Get the absolute path of the project root (one directory above src/models)
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

from ingest.playerinfo import *
from fantasyalgorithms import *

def get_fantasy_ranks(dpdf, cpdf):

    f1 = cpdf['NBA_FANTASY_PTS_RANK'].iloc[0]
    f2 = dpdf['NBA_FANTASY_PTS_RANK'].iloc[0]

    return int(f1), int(f2)

def compare_fantasyranks(flist, desired_player, current_player):
    
    if (flist[0] < flist[1]) and ((algselection(cp_infodf, cpdf)) > (algselection(dp_infodf, dpdf))):
        switch = False
    elif (flist[0] > flist[1]) and ((algselection(cp_infodf, cpdf)) < (algselection(dp_infodf, dpdf))):
        switch = True
    else:
        switch = False
    
    return switch

switch = compare_fantasyranks(get_fantasy_ranks(dpdf, cpdf), desired_player_name, current_player_name)