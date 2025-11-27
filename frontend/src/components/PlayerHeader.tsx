import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PlayerHeaderProps {
  name: string;
  team: string;
  position: string;
  image: string;
  stats: {
    pts: number;
    reb: number;
    ast: number;
    fpts: number;
  };
}

export function PlayerHeader({ name, team, position, image, stats }: PlayerHeaderProps) {
  const teamColors: { [key: string]: string } = {
    'NOP': '#0C2340',
    'LAL': '#552583',
    'BOS': '#007A33',
    'OKC': '#007AC1',
    'MIL': '#00471B',
  };

  const accentColor = teamColors[team] || '#2d6df6';

  return (
    <div className="bg-[#1a1a1e] rounded-[18px] p-6 md:p-8 border border-[#2a2a2e] shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
        {/* Player Image */}
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#2a2a2e] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <ImageWithFallback
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#2d6df6] text-white px-3 py-1 rounded-full text-sm shadow-[0_4px_16px_rgba(45,109,246,0.4)]">
            {position}
          </div>
        </div>

        {/* Player Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl text-[#f5f5f7]">{name}</h1>
            <span className="px-3 py-1 bg-[#222227] rounded-full text-[#a1a1aa]">{team}</span>
          </div>
          <p className="text-[#a1a1aa] mb-4">Season Averages · 2024-25</p>
          
          {/* Team Color Accent Line */}
          <div 
            className="w-full h-1 rounded-full mb-4" 
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>

      {/* Stat Chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e]">
          <p className="text-[#a1a1aa] text-sm mb-1">Points</p>
          <p className="text-2xl text-[#2d6df6]">{stats.pts}</p>
        </div>
        <div className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e]">
          <p className="text-[#a1a1aa] text-sm mb-1">Rebounds</p>
          <p className="text-2xl text-[#4ade80]">{stats.reb}</p>
        </div>
        <div className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e]">
          <p className="text-[#a1a1aa] text-sm mb-1">Assists</p>
          <p className="text-2xl text-[#fbbf24]">{stats.ast}</p>
        </div>
        <div className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e]">
          <p className="text-[#a1a1aa] text-sm mb-1">Fantasy Pts</p>
          <p className="text-2xl text-[#f5f5f7]">{stats.fpts}</p>
        </div>
      </div>
    </div>
  );
}