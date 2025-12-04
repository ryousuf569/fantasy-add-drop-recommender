# 🏀 Fantasy NBA Player Insights — ML-Powered Add/Drop Assistant

Welcome to my Fantasy NBA analytics project. This started because I kept losing to my friends in fantasy basketball… and eventually I got tired of losing. So I built something smarter.

This project combines **NBA data**, **machine learning**, and a **full-stack workflow** (FastAPI + React/TypeScript) to help users make better decisions in fantasy leagues.

---

## Features (Current)

### Player Stat Fetching
Fetches live NBA data using the NBA API Python library:
- Recent game logs  
- Basic + advanced box score stats  
- Player metadata (positions, teams, etc.)

### Performance Projections
ML models (XGBoost + KNN) estimate a player’s **next-5-game fantasy performance**, currently accurate **within ~10 points** on average.

### Versus Mode — Compare Two Players
Head-to-head comparison including:
- Trends  
- Projections  
- Risk scoring  
- Recent performance

### Similar Player Suggestions
Returns players with similar statistical profiles.  
Great for waiver decisions, injury replacements, and upside swings.

### Frontend (React + TypeScript)
A functional UI that displays:
- Player dashboards  
- Projections  
- Trends  
- Similar players  
- Headshots  

---

## 🔧 In Progress

### Parlay Analyzer
A tool that lets users enter FanDuel/Stake parlays and get:
- Probability of each leg hitting  
- Confidence scoring  
- Overall parlay risk estimation  

---

## Who This Is For

- Fantasy NBA players  
- Basketball analytics fans  
- Anyone curious about ML in sports  
- Developers looking for a full-stack ML project  
- Anyone who randomly crawls into this repo  

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
It started as “I’m tired of losing matchups,” and it’s turning into a full analytical toolkit.

More documentation coming soon.
