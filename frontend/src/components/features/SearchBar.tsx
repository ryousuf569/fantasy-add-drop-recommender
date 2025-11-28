import { useState, useEffect } from "react";
import { fetchAllPlayers } from "@/api/players";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  onSelect: (playerName: string) => void;
};

export const SearchBar = ({ onSelect }: SearchBarProps) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchAllPlayers().then(setPlayers);
  }, []);

  const results = players.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <Input
        placeholder="Search NBA Player"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="absolute w-full bg-zinc-800 border border-zinc-700 rounded-lg mt-1 max-h-60 overflow-auto">
          {results.slice(0, 12).map((name) => (
            <div
              key={name}
              className="px-3 py-2 hover:bg-zinc-700 cursor-pointer"
              onClick={() => {
                onSelect(name);
                setQuery("");
              }}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};