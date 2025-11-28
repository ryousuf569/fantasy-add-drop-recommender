import React, { useEffect, useState } from "react";
import { fetchAllPlayers } from "@/api/players";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface PlayerSearchProps {
  onSelect: (player: string) => void;
}

export const PlayerSearch: React.FC<PlayerSearchProps> = ({ onSelect }) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load full player list once
  useEffect(() => {
    fetchAllPlayers()
      .then((names) => {
        setPlayers(names);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter players as user types
  useEffect(() => {
    const q = query.toLowerCase();
    const matches = players
      .filter((p) => p.toLowerCase().includes(q))
      .slice(0, 10);

    setFiltered(matches);
  }, [query, players]);

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <Input
        placeholder="Search player..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />

      {/* Dropdown List */}
      {query.length > 0 && filtered.length > 0 && (
        <Card className="absolute w-full mt-1 z-20 bg-white border shadow">
          <ul className="divide-y">
            {filtered.map((name) => (
              <li
                key={name}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(name);
                  setQuery("");
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <p className="text-sm text-gray-400 mt-1">Loading NBA players...</p>
      )}

      {/* No results */}
      {!loading && query.length > 0 && filtered.length === 0 && (
        <p className="text-sm text-gray-400 mt-1">No players found.</p>
      )}
    </div>
  );
};
