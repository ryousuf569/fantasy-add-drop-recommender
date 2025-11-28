from nba_api.stats.endpoints import leaguedashplayerstats

_cached_players = None

def return_all_players():
    global _cached_players

    if _cached_players is None:
        season_stats = leaguedashplayerstats.LeagueDashPlayerStats(season='2025-26').get_data_frames()[0]
        top100_df = season_stats[season_stats["NBA_FANTASY_PTS_RANK"] < 201]
        top_100_players_names = top100_df["PLAYER_NAME"].tolist()

    return top_100_players_names
