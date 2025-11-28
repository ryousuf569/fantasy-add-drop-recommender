import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ProjectionChartProps = {
  data: number[];
};

export default function ProjectionChart({ data }: ProjectionChartProps) {
  const chartData = data.map((pts, i) => ({
    game: `G${i + 1}`,
    points: pts,
  }));

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
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
          <Tooltip
            contentStyle={{ background: "#18181b", border: "1px solid #333" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="points"
            stroke="#4ade80"
            strokeWidth={3}
            dot={{ r: 5, fill: "#4ade80" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
