# Makes it so backend doesn't crash
from fastapi import HTTPException

def safe_nba_call(fn, context=""):
    try:
        return fn()
    except Exception as e:
        print(f"[NBA_API ERROR] {context}: {e!r}")
        raise HTTPException(
            status_code=503,
            detail=f"Could not load NBA data ({context}). Try again."
        )
