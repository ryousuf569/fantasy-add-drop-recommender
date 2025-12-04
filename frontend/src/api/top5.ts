import { api } from "./client";

export interface Top5Player {
  nickname: string;
  playerid: number;
  fantasyRank: number;
}

export async function fetchTop5(): Promise<Top5Player[]> {
  const res = await api.get("/top5");

  const data = res.data;

  return data.map((player: any) => ({
    nickname: player.NICKNAME,
    playerid: player.PLAYER_ID,
    fantasyRank: player.NBA_FANTASY_PTS_RANK,
  }));
}
