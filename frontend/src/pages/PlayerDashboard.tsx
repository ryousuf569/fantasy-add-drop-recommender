import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchPlayerReport, PlayerReport } from "@/api/players";

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

  // ------------------------------------------------------------
  // UI States
  // ------------------------------------------------------------

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

  // ------------------------------------------------------------
  // FINAL RENDER
  // ------------------------------------------------------------

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{data.player_name}</h1>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Badge className="py-2 px-3 text-sm" variant="secondary">
          Position: {data.position}
        </Badge>
        <Badge className="py-2 px-3 text-sm" variant="secondary">
          Avg Projection: {data.projection_avg}
        </Badge>
        <Badge className="py-2 px-3 text-sm" variant="secondary">
          Last 5 +/-: {data.last5_plus_minus}
        </Badge>
        <Badge className="py-2 px-3 text-sm" variant="secondary">
          Risk Score: {data.risk_factor}
        </Badge>
      </div>

      {/* Projection Points */}
      <Card>
        <CardHeader>
          <CardTitle>Projected Fantasy Points (Next Games)</CardTitle>
        </CardHeader>
        <CardContent>
          {data.projection_list?.length ? (
            <ul className="space-y-1 ml-4 text-muted-foreground">
              {data.projection_list.map((p, i) => (
                <li key={i}>
                  Game {i + 1}: <span className="font-semibold text-foreground">{p}</span> pts
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No projection data available.</p>
          )}
        </CardContent>
      </Card>

      {/* Trend Card */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Meter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium text-foreground">{data.trend}</p>
        </CardContent>
      </Card>

      {/* Risk Factor Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Factor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="relative w-full h-6 rounded-md overflow-hidden bg-muted">
            <div
              className="absolute top-0 left-0 h-full transition-all bg-gradient-to-r from-red-600 to-yellow-500"
              style={{ width: `${data.risk_factor}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lower score = more volatile / high-risk player.
          </p>
        </CardContent>
      </Card>

      {/* Similar Players */}
      <Card>
        <CardHeader>
          <CardTitle>Similar Players</CardTitle>
        </CardHeader>
        <CardContent>
          {data.similar_players?.length ? (
            <div className="flex flex-wrap gap-2">
              {data.similar_players.map((p) => (
                <Badge
                  key={p}
                  className="px-3 py-1 text-sm"
                  variant="outline"
                >
                  {p}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No similar players found.</p>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
