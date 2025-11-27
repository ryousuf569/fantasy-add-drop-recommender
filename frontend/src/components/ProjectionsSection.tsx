import { LineChart, Line, ResponsiveContainer } from "recharts";

interface Projection {
  game: number;
  fpts: number;
  pts: number;
  reb: number;
  ast: number;
}

const mockProjections: Projection[] = [
  { game: 1, fpts: 38, pts: 22, reb: 5, ast: 4 },
  { game: 2, fpts: 41, pts: 25, reb: 7, ast: 6 },
  { game: 3, fpts: 33, pts: 19, reb: 5, ast: 5 },
  { game: 4, fpts: 44, pts: 27, reb: 6, ast: 7 },
  { game: 5, fpts: 36, pts: 21, reb: 6, ast: 5 },
];

const trendData = [
  { value: 35 },
  { value: 38 },
  { value: 33 },
  { value: 41 },
  { value: 37 },
  { value: 40 },
  { value: 38 },
];

export function ProjectionsSection() {
  return (
    <div className="bg-[#1a1a1e] rounded-[18px] p-6 md:p-8 border border-[#2a2a2e] shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-[#f5f5f7]">5-Game Projection</h2>
        <span className="text-[#a1a1aa] text-sm">Next 5 Games</span>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-5 gap-4">
        {mockProjections.map((proj) => (
          <div
            key={proj.game}
            className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e] hover:border-[#2d6df6] transition-all duration-300 hover:shadow-[0_0_20px_rgba(45,109,246,0.3)]"
          >
            <div className="text-center mb-3">
              <p className="text-[#a1a1aa] text-xs mb-1">Game {proj.game}</p>
              <p className="text-3xl text-[#2d6df6]">{proj.fpts}</p>
              <p className="text-[#a1a1aa] text-xs">FPts</p>
            </div>
            
            <div className="border-t border-[#2a2a2e] pt-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#a1a1aa]">PTS</span>
                <span className="text-[#f5f5f7]">{proj.pts}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#a1a1aa]">REB</span>
                <span className="text-[#f5f5f7]">{proj.reb}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#a1a1aa]">AST</span>
                <span className="text-[#f5f5f7]">{proj.ast}</span>
              </div>
            </div>

            {/* Mini Sparkline */}
            <div className="mt-3 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2d6df6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        {mockProjections.map((proj) => (
          <div
            key={proj.game}
            className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e]"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[#a1a1aa] text-sm">Game {proj.game}</p>
                <p className="text-2xl text-[#2d6df6]">{proj.fpts} <span className="text-sm text-[#a1a1aa]">FPts</span></p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <p className="text-[#a1a1aa]">PTS</p>
                  <p className="text-[#f5f5f7]">{proj.pts}</p>
                </div>
                <div className="text-center">
                  <p className="text-[#a1a1aa]">REB</p>
                  <p className="text-[#f5f5f7]">{proj.reb}</p>
                </div>
                <div className="text-center">
                  <p className="text-[#a1a1aa]">AST</p>
                  <p className="text-[#f5f5f7]">{proj.ast}</p>
                </div>
              </div>
            </div>
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2d6df6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}