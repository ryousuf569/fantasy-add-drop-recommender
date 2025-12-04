import { fetchPlayerReport, PlayerReport } from "@/api/players";

// Trend Logic

export function trendToBoost(trend: string): number {
  const t = trend.toUpperCase();

  if (t.includes("H")) return 5;     // Hot
  if (t.includes("N")) return 2;     // Neutral / positive
  if (t.includes("C")) return -3;    // Cold

  return 0; // fallback
}

// Status Penalty

export function statusPenalty(status: string): number {
  const s = status.toUpperCase();

  if (s.includes("ACTIVE")) return 0;
  if (s.includes("INJURED")) return -100;

  return -20; // fallback for unknown statuses
}

// Fantasy Fitness Score

export function fantasyFitnessScore(player: PlayerReport): number {
  const proj = player.projection_avg ?? 0;
  const trend = trendToBoost(player.trend ?? "");
  const risk = player.risk_factor ?? 0;
  const pmAvg = player.last5_plus_minus_avg ?? 0;
  const status = statusPenalty(player.status ?? "");

  return proj + trend + 0.4 * pmAvg + status - 2 * risk;
}

// Compare Players

export function comparePlayers(
  playerA: PlayerReport,
  playerB: PlayerReport
) {
  const scoreA = fantasyFitnessScore(playerA);
  const scoreB = fantasyFitnessScore(playerB);

  if (scoreA > scoreB) {
    return {
      winner: playerA,
      winner_name: playerA.player_name,
      scoreA,
      scoreB,
    };
  } else {
    return {
      winner: playerB,
      winner_name: playerB.player_name,
      scoreA,
      scoreB,
    };
  }
}