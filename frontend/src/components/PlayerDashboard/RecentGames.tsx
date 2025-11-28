import { Last5Game } from "@/api/players";

interface Props {
  games: Last5Game[];
}

export default function RecentGames({ games }: Props) {
  if (!games || games.length === 0)
    return <p className="text-muted-foreground">No recent games available.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Recent Games (Last 5)</h2>

      <table className="w-full text-sm">
        <thead className="border-b border-neutral-700 text-neutral-400">
          <tr>
            <th className="py-2 text-left">Date</th>
            <th className="py-2 text-left">MIN</th>
            <th className="py-2 text-left">PTS</th>
            <th className="py-2 text-left">REB</th>
            <th className="py-2 text-left">AST</th>
            <th className="py-2 text-left">+/-</th>
          </tr>
        </thead>

        <tbody>
          {games.map((g, idx) => (
            <tr key={idx} className="border-b border-neutral-800">
              <td className="py-2">{g.GAME_DATE}</td>
              <td>{g.MIN}</td>
              <td className={g.PTS >= 25 ? "text-green-400" : ""}>{g.PTS}</td>
              <td>{g.REB}</td>
              <td>{g.AST}</td>
              <td className={g.PLUS_MINUS >= 10 ? "text-green-400" : g.PLUS_MINUS <= -10 ? "text-red-400" : ""}>
                {g.PLUS_MINUS}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
