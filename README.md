# 🏀 Fantasy NBA Player Insights — ML-Powered Add/Drop Assistant

Welcome to my Fantasy NBA analytics project. This started because I kept losing to my friends in fantasy basketball… and then I got tired of losing. So I built something smarter.

This project combines **NBA data**, **machine learning**, and a **full-stack workflow** (FastAPI + React/TypeScript) to help users make better decisions in fantasy leagues.

---

## Features (Current)

### Player Stat Fetching
Fetches live NBA data using the NBA API Python library:
- Recent game logs
- Basic + advanced box score stats
- Player metadata (positions, teams, etc.)

### Performance Projections
ML models (XGBoost + KNN) estimate a player’s next-5-game fantasy performance.  
Currently accurate **within ~10 points** on average.

### Versus Mode — Compare Two Players
Head-to-head comparison including:
- Trends
- Projections
- Risk scoring
- Recent performance

### Similar Player Suggestions
Returns players with similar statistical profiles.  
Useful for waiver decisions, injury replacements, and scouting upside plays.

### Frontend (React + TypeScript)
A functional (semi-smooth for now) UI that displays:
- Player dashboards
- Projections
- Trends
- Similar players
- Headshots

---

## 🔧 In Progress

### Frontend Improvements
- More responsive layout
- Cleaner design
- Better charts and animations

### Backend Timeout Fixes
NBA API calls can be slow or hang. Currently working on:
- Request caching
- Retry logic
- Centralized API call wrapper
- Faster response times in FastAPI/Uvicorn

### Parlay Analysis (Coming Soon)
Users can enter FanDuel/Stake parlays and get:
- Probability of each leg hitting
- Confidence scoring
- Overall parlay risk

---

## Who This Is For

- Fantasy NBA players
- Anyone into basketball analytics
- People curious about ML in sports
- Developers browsing for full-stack project inspo
- Anyone who randomly crawled this repo

---

## Tech Stack

**Backend**
- Python
- FastAPI + Uvicorn
- pandas, numpy
- XGBoost, scikit-learn
- NBA API Python library

**Frontend**
- React
- TypeScript
- TailwindCSS
- axios

---

## Notes

This app is still evolving.  
It started as “I’m tired of losing fantasy matchups,” but it’s turning into a full analytical toolkit.

More documentation coming soon.
