# FORCES ONLY ONE API CALL AT A TIME
import threading

nba_lock = threading.Lock()

def with_nba_lock(fn):
    def wrapper(*args, **kwargs):
        with nba_lock:
            return fn(*args, **kwargs)
    return wrapper
