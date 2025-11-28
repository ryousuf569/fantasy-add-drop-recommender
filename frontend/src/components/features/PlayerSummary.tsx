import { Card } from "@/components/ui/card";

export type Last5Game = {
  GAME_DATE: string;
  PLUS_MINUS: number;
  PTS: number;
  REB: number;
  AST: number;
  MIN: number;
};

type PlayerReport = {
  player_name: string;
  projection_avg: number;
  risk_factor: number;
  trend: string;
  similar_players: string[];
  projection_list: number[];
  last_5_games: Last5Game;
  last5_plus_minus: number;
  position: string;
};

type PlayerSummaryProps = {
  data: PlayerReport;
};

export const PlayerSummary = ({ data }: PlayerSummaryProps) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-2">{data.player_name}</h2>

      <p className="mb-1">
        <strong>Average Projection:</strong> {data.projection_avg} pts
      </p>

      <p className="mb-1">
        <strong>Risk Score:</strong> {data.risk_factor}
      </p>

      <p className="mb-1">
        <strong>Trend:</strong> {data.trend}
      </p>
    </Card>
  );
};