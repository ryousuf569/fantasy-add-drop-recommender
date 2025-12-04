import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import PlayerHeadshot from "@/components/PlayerDashboard/PlayerHeadshot";
import { PlayerReport } from "@/api/players";

interface VersusProps {
  players: string[];

  playerA: string;
  playerB: string;
  setPlayerA: (s: string) => void;
  setPlayerB: (s: string) => void;

  loading: boolean;
  error: string | null;

  dataA: PlayerReport | null;
  dataB: PlayerReport | null;

  scores: { scoreA: number; scoreB: number } | null;
  winner: string | null;

  onCompare: (a: string, b: string) => void;
}

export default function Versus({
  players,
  playerA,
  playerB,
  setPlayerA,
  setPlayerB,
  loading,
  error,
  dataA,
  dataB,
  scores,
  winner,
  onCompare,
}: VersusProps) {

  const [focusedA, setFocusedA] = useState(false);
  const [focusedB, setFocusedB] = useState(false);

  const resultsA = focusedA && playerA
    ? players.filter((p) =>
        p.toLowerCase().includes(playerA.toLowerCase())
      )
    : [];

  const resultsB = focusedB && playerB
    ? players.filter((p) =>
        p.toLowerCase().includes(playerB.toLowerCase())
      )
    : [];

  function findPlayer(name: string): string | null {
    return players.find(
      (p) => p.toLowerCase() === name.toLowerCase()
    ) || null;
  }

  function handleCompareClick() {
    const nameA = findPlayer(playerA.trim());
    const nameB = findPlayer(playerB.trim());

    if (!nameA || !nameB) {
      return alert("One or both players not found.");
    }

    onCompare(nameA, nameB);
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Versus Mode</h1>

      <div className="flex gap-4">

        {/* ------------------- PLAYER A ------------------- */}
        <div className="relative">
          <Input
            placeholder="Enter Player A Name"
            value={playerA}
            onFocus={() => setFocusedA(true)}
            onBlur={() => setTimeout(() => setFocusedA(false), 150)}
            onChange={(e) => setPlayerA(e.target.value)}
            className="w-64"
          />

          {resultsA.length > 0 && (
            <div className="absolute w-full bg-zinc-800 border border-zinc-700 rounded-lg mt-1 max-h-60 overflow-auto z-50">
              {resultsA.slice(0, 12).map((name) => (
                <div
                  key={name}
                  className="px-3 py-2 hover:bg-zinc-700 cursor-pointer"
                  onClick={() => {
                    setPlayerA(name);
                    setFocusedA(false);   // 👈 Hides dropdown immediately
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ------------------- PLAYER B ------------------- */}
        <div className="relative">
          <Input
            placeholder="Enter Player B Name"
            value={playerB}
            onFocus={() => setFocusedB(true)}
            onBlur={() => setTimeout(() => setFocusedB(false), 150)}
            onChange={(e) => setPlayerB(e.target.value)}
            className="w-64"
          />

          {resultsB.length > 0 && (
            <div className="absolute w-full bg-zinc-800 border border-zinc-700 rounded-lg mt-1 max-h-60 overflow-auto z-50">
              {resultsB.slice(0, 12).map((name) => (
                <div
                  key={name}
                  className="px-3 py-2 hover:bg-zinc-700 cursor-pointer"
                  onClick={() => {
                    setPlayerB(name);
                    setFocusedB(false); 
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>

        <Button disabled={loading} onClick={handleCompareClick}>
          {loading ? "Comparing..." : "Compare"}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {dataA && dataB && scores && (
        <div className="grid grid-cols-2 gap-6 mt-4">
          <PlayerCard
            player={dataA}
            score={scores.scoreA}
            isWinner={winner === dataA.player_name}
          />
          <PlayerCard
            player={dataB}
            score={scores.scoreB}
            isWinner={winner === dataB.player_name}
          />
        </div>
      )}
    </div>
  );
}

/* ---------------------- Card Component ---------------------- */

interface PlayerCardProps {
  player: PlayerReport;
  score: number;
  isWinner: boolean;
}

function PlayerCard({ player, score, isWinner }: PlayerCardProps) {
  return (
    <Card
      className={`transition-all ${
        isWinner ? "border-green-500 shadow-lg shadow-green-400/20" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          {player.player_name}
          {isWinner && <span className="text-green-500 font-bold">Winner</span>}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-center">
          <PlayerHeadshot
            playerId={player.player_id}
            name={player.player_name}
          />
        </div>

        <p className="text-xl font-semibold text-center">
          FFS: {score.toFixed(1)}
        </p>

        <div className="text-sm space-y-1">
          <p><strong>Status:</strong> {player.status}</p>
          <p><strong>Avg Projection:</strong> {player.projection_avg}</p>
          <p><strong>Trend:</strong> {player.trend}</p>
          <p><strong>Risk Factor:</strong> {player.risk_factor}</p>
          <p><strong>Plus/Minus:</strong> {player.last5_plus_minus_avg}</p>
          <p><strong>Position:</strong> {player.position}</p>
        </div>
      </CardContent>
    </Card>
  );
}
