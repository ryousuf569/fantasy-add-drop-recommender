import { TrendingUp, Users, AlertTriangle } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onPlayerSelect: (playerName: string) => void;
}

const featuredPlayers = [
  {
    name: "LeBron James",
    team: "LAL",
    image: "https://images.unsplash.com/photo-1659523585860-c349407e512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTI3ODQxfDA&ixlib=rb-4.1.0&q=80&w=400",
    pts: 25.4,
    reb: 7.2,
    ast: 8.1,
    fpts: 42.3
  },
  {
    name: "Shai Gilgeous-Alexander",
    team: "OKC",
    image: "https://images.unsplash.com/photo-1663576748377-cafb47103042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MTY0MTMwfDA&ixlib=rb-4.1.0&q=80&w=400",
    pts: 31.2,
    reb: 5.5,
    ast: 6.3,
    fpts: 48.7
  },
  {
    name: "Jayson Tatum",
    team: "BOS",
    image: "https://images.unsplash.com/photo-1659523585860-c349407e512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTI3ODQxfDA&ixlib=rb-4.1.0&q=80&w=400",
    pts: 27.8,
    reb: 8.4,
    ast: 4.9,
    fpts: 44.2
  },
  {
    name: "Giannis Antetokounmpo",
    team: "MIL",
    image: "https://images.unsplash.com/photo-1663576748377-cafb47103042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MTY0MTMwfDA&ixlib=rb-4.1.0&q=80&w=400",
    pts: 30.2,
    reb: 11.3,
    ast: 6.1,
    fpts: 52.8
  }
];

export function HomePage({ onPlayerSelect }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#0d0d0f] px-4 py-8 md:px-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-[#f5f5f7] to-[#a1a1aa] bg-clip-text text-transparent">
            Fantasy NBA Projections
          </h1>
          <p className="text-[#a1a1aa] text-lg">Advanced analytics and projections for fantasy basketball</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <SearchBar onSearch={onPlayerSelect} />
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto">
          <button 
            onClick={() => onPlayerSelect("Brandon Ingram")}
            className="bg-[#1a1a1e] border border-[#2a2a2e] rounded-[16px] p-6 hover:border-[#2d6df6] hover:shadow-[0_0_20px_rgba(45,109,246,0.3)] transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#2d6df6] to-[#1e4fc7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-[#f5f5f7] text-lg mb-2">Projections</h3>
            <p className="text-[#a1a1aa] text-sm">5-game performance forecasts</p>
          </button>

          <button 
            onClick={() => onPlayerSelect("Brandon Ingram")}
            className="bg-[#1a1a1e] border border-[#2a2a2e] rounded-[16px] p-6 hover:border-[#4ade80] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-[#f5f5f7] text-lg mb-2">Similar Players</h3>
            <p className="text-[#a1a1aa] text-sm">Find comparable alternatives</p>
          </button>

          <button 
            onClick={() => onPlayerSelect("Brandon Ingram")}
            className="bg-[#1a1a1e] border border-[#2a2a2e] rounded-[16px] p-6 hover:border-[#ef4444] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#ef4444] to-[#dc2626] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-[#f5f5f7] text-lg mb-2">Risk Score</h3>
            <p className="text-[#a1a1aa] text-sm">Injury and volatility analysis</p>
          </button>
        </div>

        {/* Featured Players */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl text-[#f5f5f7] mb-6">Featured Players</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredPlayers.map((player, index) => (
              <button
                key={index}
                onClick={() => onPlayerSelect(player.name)}
                className="bg-[#1a1a1e] border border-[#2a2a2e] rounded-[16px] overflow-hidden hover:border-[#2d6df6] hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all duration-300 group text-left"
              >
                <div className="relative h-48 bg-[#222227] overflow-hidden">
                  <ImageWithFallback
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#1a1a1e]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#a1a1aa] text-sm">
                    {player.team}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[#f5f5f7] mb-3">{player.name}</h3>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="text-center">
                      <p className="text-[#2d6df6]">{player.pts}</p>
                      <p className="text-[#a1a1aa] text-xs">PTS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#4ade80]">{player.reb}</p>
                      <p className="text-[#a1a1aa] text-xs">REB</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#fbbf24]">{player.ast}</p>
                      <p className="text-[#a1a1aa] text-xs">AST</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#f5f5f7]">{player.fpts}</p>
                      <p className="text-[#a1a1aa] text-xs">FPts</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}