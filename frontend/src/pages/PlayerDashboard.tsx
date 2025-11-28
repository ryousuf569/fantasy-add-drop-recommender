console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
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

  // load report on mount
  useEffect(() => {
    setLoading(true);
    fetchPlayerReport(playerName)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load player data.");
        console.error(err);
        setLoading(false);
      });
  }, [playerName]);

  if (loading) {
    return <p className="text-muted-foreground">Loading player stats...</p>;
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">{error}</p>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{data.player_name}</h1>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>

      {/* Summary Badges */}
      <div className="flex gap-3 flex-wrap">
        <Badge variant="secondary">Position: {data.position}</Badge>
        <Badge variant="secondary">Projection Avg: {data.projection_avg}</Badge>
        <Badge variant="secondary">Last 5 +/-: {data.last5_plus_minus}</Badge>
        <Badge variant="secondary">Risk Score: {data.risk_factor}</Badge>
      </div>

      {/* Projection Card */}
      <Card>
        <CardHeader>
          <CardTitle>Projected Fantasy Points (Next Games)</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          {data.projection_list.length > 0 ? (
            <ul className="space-y-1 ml-4">
              {data.projection_list.map((p, i) => (
                <li key={i}>Game {i + 1}: <span className="font-medium">{p}</span> pts</li>
              ))}
            </ul>
          ) : (
            <p>No projection data available.</p>
          )}
        </CardContent>
      </Card>

      {/* Trend Card */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Meter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium">{data.trend}</p>
        </CardContent>
      </Card>

      {/* Risk Factor */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Factor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full bg-muted h-6 rounded-md overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-red-500 transition-all"
              style={{ width: `${data.risk_factor}%` }}
            />
          </div>
          <p className="text-sm mt-2 text-muted-foreground">
            Lower score = more volatile / high-risk player.
          </p>
        </CardContent>
      </Card>

      {/* Similar Players */}
      <Card>
        <CardHeader>
          <CardTitle>Similar Players</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.similar_players.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.similar_players.map((p) => (
                <Badge key={p} variant="outline">{p}</Badge>
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
