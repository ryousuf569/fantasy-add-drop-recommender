import { Card } from "@/components/ui/card";

type SimilarPlayersListProps = {
  players: string[];
};

export const SimilarPlayersList = ({ players }: SimilarPlayersListProps) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">Similar Players</h3>

      <ul className="space-y-1">
        {players.map((p) => (
          <li key={p} className="text-zinc-300">
            • {p}
          </li>
        ))}
      </ul>
    </Card>
  );
};
