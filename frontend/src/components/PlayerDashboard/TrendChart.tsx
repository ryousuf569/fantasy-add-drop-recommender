import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

import { Last5Game } from "@/api/players";

type Props = {
  games: Last5Game[];
};

export default function TrendChart({ games }: Props) {
  const chartData = games.map((g, i) => ({
    game: `G${i + 1}`,
    plusMinus: g.PLUS_MINUS,
  }));

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid stroke="#333" strokeDasharray="4 4" />

          <XAxis
            dataKey="game"
            stroke="#777"
            tick={{ fill: "#aaa" }}
          />

          <YAxis
            stroke="#777"
            tick={{ fill: "#aaa" }}
            domain={["auto", "auto"]}
          />

          {/* Zero reference line */}
          <ReferenceLine y={0} stroke="#888" />

          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "1px solid #333",
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />

          <Bar
            dataKey="plusMinus"
            fill="#4ade80"
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
