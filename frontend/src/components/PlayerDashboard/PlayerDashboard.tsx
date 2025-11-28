import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchPlayerReport, PlayerReport } from "@/api/players";

import PlayerHeadshot from "./PlayerHeadshot";
import RecentGames from "./RecentGames";

interface PlayerDashboardProps {
  playerName: string;
  onBack: () => void;
}

export default function PlayerDashboard({ playerName, onBack }: PlayerDashboardProps) {
  const [data, setData] = useState<PlayerReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchPlayerReport(playerName)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[PlayerDashboard ERROR]", err);
        setError("Failed to load player data.");
        setLoading(false);
      });
  }, [playerName]);

  if (loading) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground animate-pulse">Loading player stats...</p>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">{error}</p>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>
    );
  }

  // ------------------------------------------
  // Final Render
  // ------------------------------------------

  return (
    <div className="space-y-10">

      {/* Player Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{data.player_name}</h1>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>

      {/* Top Row: Headshot + Quick Stats */}
      <div className="flex gap-6 items-center">
        <PlayerHeadshot playerId={data.player_id} name={data.player_name} />

        <div className="grid grid-cols-2 gap-3">
          <Badge variant="secondary">Position: {data.position}</Badge>
          <Badge variant="secondary">Avg Projection: {data.projection_avg}</Badge>
          <Badge variant="secondary">Last 5 +/-: {data.last5_plus_minus}</Badge>
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
            <ul className="space-y-1 ml-4 text-muted-foreground">
              {data.projection_list.map((pts, i) => (
                <li key={i}>
                  Game {i + 1}: <span className="font-semibold text-white">{pts}</span> pts
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No projection data.</p>
          )}
        </CardContent>
      </Card>

      {/* Trend Card */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Meter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium text-white">{data.trend}</p>
        </CardContent>
      </Card>

      {/* Similar Players */}
      <Card>
        <CardHeader>
          <CardTitle>Similar Players</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.similar_players.map((p) => (
              <Badge key={p} variant="outline" className="px-3 py-1">{p}</Badge>
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
          <RecentGames games={data.last_5_games} />
        </CardContent>
      </Card>

    </div>
  );
}
