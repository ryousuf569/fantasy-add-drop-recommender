import json
from datetime import datetime, timedelta
from pathlib import Path

import app.cache as cache


def top5():
    df = cache.LEAGUE_STATS
    return (
        df
        .sort_values("NBA_FANTASY_PTS_RANK", ascending=True)
        .head(5)
        .to_dict(orient="records")
    )


BASE_DIR = Path(__file__).resolve().parents[2]   # goes up to "backend"
TOP5_FILE = BASE_DIR / "app" / "data" / "top5" / "top5.json"


def is_stale(filepath: Path, hours: int = 24) -> bool:
    """Check if the file is missing or older than `hours`."""
    if not filepath.exists():
        return True

    modified = datetime.fromtimestamp(filepath.stat().st_mtime)
    return datetime.now() - modified > timedelta(hours=hours)


def generate_top5_report():
    """
    Loads cached top 5 if fresh.
    Otherwise regenerates and overwrites the existing top5.json.
    """

    # --- If fresh, load and return ---
    if not is_stale(TOP5_FILE):
        with open(TOP5_FILE, "r") as f:
            return json.load(f)

    # --- Otherwise regenerate ---
    print("[Top5] Cache missing or stale. Regenerating Top 5…")
    results = top5()

    # Overwrite the EXISTING file only
    with open(TOP5_FILE, "w") as f:
        json.dump(results, f, indent=2)

    return results


def load_or_refresh_top5():
    return generate_top5_report()
