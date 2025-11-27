import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PlayerDashboardProps {
  playerName: string;
  onBack: () => void;
}

export default function PlayerDashboard({ playerName, onBack }: PlayerDashboardProps) {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{playerName}</h1>

        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* Projection Card */}
      <Card>
        <CardHeader>
          <CardTitle>Projected Fantasy Points</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p className="text-sm">Model output will appear here.</p>
        </CardContent>
      </Card>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center">
            Trend chart placeholder
          </div>
        </CardContent>
      </Card>

      {/* Risk Meter */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Factor</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="h-16 w-full bg-muted rounded-md flex items-center justify-center">
            Risk meter placeholder
          </div>
        </CardContent>
      </Card>

      {/* Similar Players */}
      <Card>
        <CardHeader>
          <CardTitle>Similar Players</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p className="text-sm">Your similarity model output will appear here.</p>
          <div className="h-20 w-full bg-muted rounded-md flex items-center justify-center">
            Similar players placeholder
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
