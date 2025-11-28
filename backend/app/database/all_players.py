from nba_api.stats.static.players import get_players

_cached_players = None

def return_all_players():
    global _cached_players

    if _cached_players is None:
        raw = get_players()
        _cached_players = [p["full_name"] for p in raw]

    return _cached_players
