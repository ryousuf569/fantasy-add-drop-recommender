import { api } from "./client";

export interface Top5Player {
  nickname: string;
  playerid: number;
  fantasyRank: number;
}
interface RawTop5Player {
  NICKNAME: string;
  PLAYER_ID: number;
  NBA_FANTASY_PTS_RANK: number;
}

export async function fetchTop5(): Promise<Top5Player[]> {
  const res = await api.get<RawTop5Player[]>("/top5");

  const data = res.data;

  return data.map((player) => ({
    nickname: player.NICKNAME,
    playerid: player.PLAYER_ID,
    fantasyRank: player.NBA_FANTASY_PTS_RANK,
  }));
}
