import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayerReport } from "@/api/players";

import PlayerHeadshot from "./PlayerHeadshot";
import RecentGames from "./RecentGames";
import ProjectionChart from "./ProjectionChart";
import TrendChart from "./TrendChart";
import MiniHeadshot from "./MiniHeadshot";

interface PlayerDashboardProps {
  data: PlayerReport;
  loading: boolean;
  error: string | null;
  onBack: () => void;
  onPlayerSelect: (name: string) => void;
}

export default function PlayerDashboard({
  data,
  loading,
  error,
  onBack,
  onPlayerSelect,
}: PlayerDashboardProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground animate-pulse">
          Loading player stats...
        </p>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">{error ?? "No data."}</p>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Player Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{data.player_name}</h1>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* Top Row: Headshot + Quick Stats */}
      <div className="flex gap-6 items-center">
        <PlayerHeadshot playerId={data.player_id} name={data.player_name} />

        <div className="grid grid-cols-3 gap-3">
          <Badge variant="secondary">Position: {data.position}</Badge>
          <Badge variant="secondary">Status: {data.status}</Badge>
          <Badge variant="secondary">
            Avg Projection: {data.projection_avg}
          </Badge>
          <Badge variant="secondary">
            Last 5 +/-: {data.last5_plus_minus_avg}
          </Badge>
          <Badge variant="secondary">Risk Score: {data.risk_factor}</Badge>
        </div>
      </div>

      {/* Projections */}
      <Card>
        <CardHeader>
          <CardTitle>Projected Fantasy Points</CardTitle>
        </CardHeader>
        <CardContent>
          {data.projection_list.length > 0 ? (
            <ProjectionChart data={data.projection_list} />
          ) : (
            <p className="text-muted-foreground">No projection data.</p>
          )}
        </CardContent>
      </Card>

      {/* Trend Card */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Meter (Last 5 Games +/-)</CardTitle>
        </CardHeader>
        <CardContent>
          {data.last5_games.length > 0 ? (
            <TrendChart games={data.last5_games} />
          ) : (
            <p className="text-muted-foreground">No recent trend data.</p>
          )}
        </CardContent>
      </Card>

      {/* Similar Players */}
      <Card>
        <CardHeader>
          <CardTitle>Similar Players</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {data.similar_players.map((p) => (
              <MiniHeadshot
                key={p.name}
                name={p.name}
                playerId={p.player_id}
                onSelect={() => onPlayerSelect(p.name)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Games */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Games</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentGames games={data.last5_games} />
        </CardContent>
      </Card>
    </div>
  );
}
