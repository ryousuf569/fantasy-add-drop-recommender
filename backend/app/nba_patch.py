# Limits retries so calls dont run forever

import requests
from requests.adapters import HTTPAdapter, Retry
from nba_api.library.http import NBAHTTP

# Configure a robust Session
session = requests.Session()

retries = Retry(
    total=4,              # total number of retries (including connect + read)
    connect=3,            # retry on connection errors
    read=3,               # retry on read timeouts
    backoff_factor=0.4,   # sleep: 0.4, 0.8, 1.6, ... between retries
    status_forcelist=[429, 500, 502, 503, 504],
    allowed_methods=["HEAD", "GET", "OPTIONS"]  # only retry safe methods
)

adapter = HTTPAdapter(
    max_retries=retries,
    pool_connections=20,  # allow some parallelism
    pool_maxsize=20       # tune depending on how many concurrent requests you expect
)

session.mount("https://", adapter)
session.mount("http://", adapter)


NBAHTTP.session = session
NBAHTTP.timeout = 7
