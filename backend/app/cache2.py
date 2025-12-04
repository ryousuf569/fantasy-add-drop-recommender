import time

_cache = {}
TTL = 300

def prediction_cache_get(name: str):
    now = time.time()
    if name in _cache:
        value, expires = _cache[name]
        if now < expires:
            return value
        else:
            del _cache[name]
    return None

def prediction_cache_set(name: str, data):
    expires = time.time() + TTL
    _cache[name] = (data, expires)
