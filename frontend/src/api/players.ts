import { api } from "./client";

export const fetchAllPlayers = async (): Promise<string[]> => {
  const res = await api.get("/players/all");
  return res.data.players;
};

export type Last5Game = {
  GAME_DATE: string;
  PLUS_MINUS: number;
  PTS: number;
  REB: number;
  AST: number;
  MIN: number;
};

export interface PlayerReport {
  player_name: string;
  projection_list: number[];
  projection_avg: number;
  trend: string;
  risk_factor: number;
  similar_players: string[];
  last_5_games: Last5Game[];
  last5_plus_minus: number;
  position: string;
  player_id: number;
}

export const fetchPlayerReport = async (player: string): Promise<PlayerReport> => {
  const res = await api.get("/predict/player", {
    params: { player },
  });
  return res.data;
};
