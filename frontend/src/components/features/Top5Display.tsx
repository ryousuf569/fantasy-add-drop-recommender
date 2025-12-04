import { useEffect, useState } from "react";
import PlayerHeadshot from "@/components/PlayerDashboard/PlayerHeadshot";
import { fetchTop5, Top5Player } from "@/api/top5";

export default function Top5Display() {
  const [players, setPlayers] = useState<Top5Player[]>([]);

  useEffect(() => {
    fetchTop5().then(setPlayers);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Top 5 Fantasy Players</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
        {players.map((p) => (
          <div key={p.playerid} className="flex flex-col items-center space-y-2">
            <PlayerHeadshot playerId={p.playerid} name={p.nickname} />

            <div className="text-center">
              <p className="font-medium">{p.nickname}</p>
              <p className="text-sm text-neutral-400">Rank #{p.fantasyRank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
