import { api } from "./client";

export const fetchAllPlayers = async (): Promise<string[]> => {
  const res = await api.get("/players/all");
  return res.data.players;
};

export interface PlayerReport {
  player_name: string;
  projection_list: number[];
  projection_avg: number;
  trend: string;
  risk_factor: number;
  similar_players: string[];
  last5_plus_minus: number;
  position: string;
}

export const fetchPlayerReport = async (player: string): Promise<PlayerReport> => {
  const res = await api.get("/predict/player", {
    params: { player },
  });
  return res.data;
};
