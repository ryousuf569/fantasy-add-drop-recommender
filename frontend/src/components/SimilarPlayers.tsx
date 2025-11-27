import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SimilarPlayer {
  name: string;
  team: string;
  position: string;
  similarity: number;
  rating: string;
  image: string;
}

const mockSimilarPlayers: SimilarPlayer[] = [
  {
    name: "Devin Booker",
    team: "PHX",
    position: "SG",
    similarity: 92,
    rating: "A",
    image: "https://images.unsplash.com/photo-1659523585860-c349407e512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTI3ODQxfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    name: "DeMar DeRozan",
    team: "SAC",
    position: "SF",
    similarity: 88,
    rating: "A-",
    image: "https://images.unsplash.com/photo-1663576748377-cafb47103042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MTY0MTMwfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    name: "Khris Middleton",
    team: "MIL",
    position: "SF",
    similarity: 84,
    rating: "B+",
    image: "https://images.unsplash.com/photo-1659523585860-c349407e512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTI3ODQxfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    name: "Mikal Bridges",
    team: "NYK",
    position: "SF",
    similarity: 81,
    rating: "B+",
    image: "https://images.unsplash.com/photo-1663576748377-cafb47103042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MTY0MTMwfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    name: "Paul George",
    team: "PHI",
    position: "SF",
    similarity: 79,
    rating: "B",
    image: "https://images.unsplash.com/photo-1659523585860-c349407e512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTI3ODQxfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
];

const getRatingColor = (rating: string) => {
  if (rating.startsWith('A')) return 'bg-[#4ade80] text-[#0d0d0f]';
  if (rating.startsWith('B')) return 'bg-[#2d6df6] text-white';
  return 'bg-[#a1a1aa] text-[#0d0d0f]';
};

export function SimilarPlayers() {
  return (
    <div className="bg-[#1a1a1e] rounded-[18px] p-6 md:p-8 border border-[#2a2a2e] shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
      <h2 className="text-2xl text-[#f5f5f7] mb-6">Similar Players</h2>

      <div className="space-y-3">
        {mockSimilarPlayers.map((player, index) => (
          <div
            key={index}
            className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e] hover:border-[#2d6df6] transition-all duration-300 hover:shadow-[0_0_20px_rgba(45,109,246,0.2)]"
          >
            <div className="flex items-center gap-4">
              {/* Player Image */}
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#2a2a2e] flex-shrink-0">
                <ImageWithFallback
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[#f5f5f7] truncate">{player.name}</p>
                  <span className="text-[#a1a1aa] text-sm">{player.team}</span>
                  <span className="text-[#a1a1aa] text-sm">·</span>
                  <span className="text-[#a1a1aa] text-sm">{player.position}</span>
                </div>

                {/* Similarity Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-[#1a1a1e] rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2d6df6] to-[#4ade80] rounded-full transition-all duration-500"
                      style={{ width: `${player.similarity}%` }}
                    />
                  </div>
                  <span className="text-[#f5f5f7] text-sm w-10 text-right">{player.similarity}%</span>
                </div>
              </div>

              {/* Rating Tag */}
              <div className={`px-3 py-1 rounded-full text-sm flex-shrink-0 ${getRatingColor(player.rating)}`}>
                {player.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}