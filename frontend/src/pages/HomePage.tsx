import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HomePageProps {
  onPlayerSelect?: (playerName: string) => void;
}

export default function HomePage({ onPlayerSelect }: HomePageProps) {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = () => {
    if (onPlayerSelect) onPlayerSelect(playerName);
  };

  return (
    <div className="space-y-8">

      {/* Hero Section */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Fantasy NBA Analytics</h1>
        <p className="text-muted-foreground">
          Get projections, trends, risk scores, and player similarity analysis.
        </p>
      </section>

      {/* Search Section */}
      <Card className="p-4 max-w-xl">
        <CardHeader>
          <CardTitle>Search Player</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter NBA player name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSubmit}>Search</Button>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        <QuickLink title="Player Dashboard" description="Advanced stats & projections." />
        <QuickLink title="Trending Players" description="Hot and cold streak analysis." />
        <QuickLink title="Similarity Tool" description="Find players with similar profiles." />
      </section>
    </div>
  );
}

function QuickLink({ title, description }: { title: string; description: string }) {
  return (
    <Card className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
    </Card>
  );
}
