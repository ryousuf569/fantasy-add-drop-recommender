import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  last_5_games: Last5Game[];
  last5_plus_minus: number;
  position: string;
  player_id: number; // Needed for headshot
};

type PlayerSummaryProps = {
  player: PlayerReport;
};

export const PlayerSummary = ({ player }: PlayerSummaryProps) => {
  const headshotUrl = `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.player_id}.png`;

  return (
    <Card className="p-4 space-y-4">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden border border-zinc-700 shadow">
          <img
            src={headshotUrl}
            alt={player.player_name}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src = "/fallback_headshot.png";
            }}
          />
        </div>

        <div className="flex-1">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-2xl font-bold">
              {player.player_name}
            </CardTitle>
          </CardHeader>

          <Badge variant="secondary" className="text-sm py-1 px-2">
            {player.position}
          </Badge>
        </div>
      </div>

      <CardContent className="space-y-5 p-0">
        
        {/* Avg Projection */}
        <div>
          <p className="text-sm text-zinc-400">Avg Projection</p>
          <p className="text-xl font-semibold text-white">
            {player.projection_avg} pts
          </p>
        </div>

        {/* Trend */}
        <div>
          <p className="text-sm text-zinc-400 mb-1">Trend</p>
          <p
            className={
              player.trend.toLowerCase().includes("hot")
                ? "text-green-400 font-medium"
                : player.trend.toLowerCase().includes("cold")
                ? "text-red-400 font-medium"
                : "text-white font-medium"
            }
          >
            {player.trend}
          </p>
        </div>

        {/* Risk Gauge */}
        <div>
          <p className="text-sm text-zinc-400 mb-1">Risk Score</p>
          <div className="relative w-full h-3 rounded-md bg-zinc-800 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-yellow-400"
              style={{ width: `${player.risk_factor}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Lower score = more volatility.
          </p>
        </div>

        {/* Projection Preview */}
        <div>
          <p className="text-sm text-zinc-400 mb-1">Upcoming Games</p>
          <div className="flex flex-wrap gap-2">
            {player.projection_list.slice(0, 3).map((p, idx) => (
              <Badge key={idx} variant="outline" className="px-3 py-1">
                G{idx + 1}: {p} pts
              </Badge>
            ))}
            {player.projection_list.length > 3 && (
              <span className="text-zinc-400 text-sm">
                +{player.projection_list.length - 3} more
              </span>
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
