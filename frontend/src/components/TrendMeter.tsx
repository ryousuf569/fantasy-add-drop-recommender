import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const mockTrendData = [
  { game: "G1", fpts: 35 },
  { game: "G2", fpts: 38 },
  { game: "G3", fpts: 33 },
  { game: "G4", fpts: 41 },
  { game: "G5", fpts: 37 },
  { game: "G6", fpts: 40 },
  { game: "G7", fpts: 42 },
];

export function TrendMeter() {
  const isUpTrend = mockTrendData[mockTrendData.length - 1].fpts > mockTrendData[0].fpts;
  const trendColor = isUpTrend ? '#4ade80' : '#ef4444';
  const trendIcon = isUpTrend ? TrendingUp : TrendingDown;
  const trendLabel = isUpTrend ? 'Trending Up' : 'Trending Down';
  const TrendIcon = trendIcon;

  const avgFpts = Math.round(
    mockTrendData.reduce((sum, d) => sum + d.fpts, 0) / mockTrendData.length
  );

  return (
    <div className="bg-[#1a1a1e] rounded-[18px] p-6 md:p-8 border border-[#2a2a2e] shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-[#f5f5f7]">Performance Trend</h2>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: `${trendColor}20` }}>
          <TrendIcon className="w-4 h-4" style={{ color: trendColor }} />
          <span className="text-sm" style={{ color: trendColor }}>{trendLabel}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockTrendData}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={trendColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={trendColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="game"
              stroke="#a1a1aa"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#a1a1aa"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1e',
                border: '1px solid #2a2a2e',
                borderRadius: '8px',
                color: '#f5f5f7'
              }}
            />
            <Line
              type="monotone"
              dataKey="fpts"
              stroke={trendColor}
              strokeWidth={3}
              dot={{ fill: trendColor, r: 4 }}
              activeDot={{ r: 6, fill: trendColor }}
              style={{ filter: `drop-shadow(0 0 8px ${trendColor}50)` }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e] text-center">
          <p className="text-[#a1a1aa] text-sm mb-1">Last Game</p>
          <p className="text-xl text-[#f5f5f7]">{mockTrendData[mockTrendData.length - 1].fpts}</p>
        </div>
        <div className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e] text-center">
          <p className="text-[#a1a1aa] text-sm mb-1">7-Game Avg</p>
          <p className="text-xl text-[#f5f5f7]">{avgFpts}</p>
        </div>
        <div className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e] text-center">
          <p className="text-[#a1a1aa] text-sm mb-1">Momentum</p>
          <p className="text-xl" style={{ color: trendColor }}>
            {isUpTrend ? '+' : ''}{mockTrendData[mockTrendData.length - 1].fpts - mockTrendData[0].fpts}
          </p>
        </div>
      </div>
    </div>
  );
}