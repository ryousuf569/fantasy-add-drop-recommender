import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  showAutocomplete?: boolean;
}

const mockPlayers = [
  { name: "LeBron James", team: "LAL", position: "SF" },
  { name: "Shai Gilgeous-Alexander", team: "OKC", position: "PG" },
  { name: "Jayson Tatum", team: "BOS", position: "SF" },
  { name: "Luka Dončić", team: "DAL", position: "PG" },
  { name: "Giannis Antetokounmpo", team: "MIL", position: "PF" },
];

export function SearchBar({ onSearch, placeholder = "Search NBA Player...", showAutocomplete = true }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredPlayers = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(query.toLowerCase())
  );

  const showDropdown = isFocused && query.length > 0 && filteredPlayers.length > 0 && showAutocomplete;

  const handleSearch = (playerName: string) => {
    setQuery(playerName);
    setIsFocused(false);
    onSearch?.(playerName);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1aa]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full bg-[#1a1a1e] text-[#f5f5f7] pl-12 pr-4 py-4 rounded-[16px] border border-[#2a2a2e] focus:border-[#2d6df6] focus:outline-none focus:shadow-[0_0_20px_rgba(45,109,246,0.3)] transition-all duration-300 placeholder:text-[#a1a1aa]"
        />
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-[12px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50">
          {filteredPlayers.map((player, index) => (
            <button
              key={index}
              onClick={() => handleSearch(player.name)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#222227] transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-[#2a2a2e] flex items-center justify-center">
                <span className="text-[#a1a1aa]">{player.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="flex-1">
                <p className="text-[#f5f5f7]">{player.name}</p>
                <p className="text-[#a1a1aa] text-sm">{player.team} · {player.position}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}