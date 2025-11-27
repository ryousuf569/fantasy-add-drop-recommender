import { AlertTriangle, Activity, TrendingDown } from "lucide-react";

interface RiskMeterProps {
  riskLevel: number; // 1-5
}

export function RiskMeter({ riskLevel = 2 }: RiskMeterProps) {
  const getRiskColor = (level: number) => {
    if (level <= 2) return { color: '#4ade80', label: 'Low Risk', shadow: '0_0_20px_rgba(74,222,128,0.3)' };
    if (level <= 3) return { color: '#fbbf24', label: 'Moderate Risk', shadow: '0_0_20px_rgba(251,191,36,0.3)' };
    return { color: '#ef4444', label: 'High Risk', shadow: '0_0_20px_rgba(239,68,68,0.3)' };
  };

  const risk = getRiskColor(riskLevel);
  const percentage = (riskLevel / 5) * 100;

  const riskFactors = [
    { icon: AlertTriangle, label: "Injury Risk", value: "Low", color: "#4ade80" },
    { icon: Activity, label: "Minute Volatility", value: "Medium", color: "#fbbf24" },
    { icon: TrendingDown, label: "Consistency", value: "High", color: "#4ade80" },
  ];

  return (
    <div className="bg-[#1a1a1e] rounded-[18px] p-6 md:p-8 border border-[#2a2a2e] shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
      <h2 className="text-2xl text-[#f5f5f7] mb-6">Risk Analysis</h2>

      {/* Semicircle Gauge */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-48 h-24 mb-4">
          {/* Background Arc */}
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#2a2a2e"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Colored Arc */}
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke={risk.color}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.51}, 251.2`}
              style={{ filter: `drop-shadow(${risk.shadow})` }}
            />
            {/* Indicator */}
            <circle
              cx={100 + 80 * Math.cos((Math.PI * (1 - percentage / 100)))}
              cy={80 - 80 * Math.sin((Math.PI * (1 - percentage / 100)))}
              r="6"
              fill={risk.color}
              style={{ filter: `drop-shadow(${risk.shadow})` }}
            />
          </svg>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl text-[#f5f5f7]">{riskLevel}/5</p>
          </div>
        </div>
        <p className="text-lg" style={{ color: risk.color }}>{risk.label}</p>
      </div>

      {/* Risk Factors */}
      <div className="space-y-3">
        {riskFactors.map((factor, index) => {
          const Icon = factor.icon;
          return (
            <div
              key={index}
              className="bg-[#0d0d0f] rounded-[12px] p-4 border border-[#2a2a2e] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-[8px] flex items-center justify-center"
                  style={{ backgroundColor: `${factor.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: factor.color }} />
                </div>
                <p className="text-[#f5f5f7]">{factor.label}</p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${factor.color}20`,
                  color: factor.color
                }}
              >
                {factor.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Linear Progress Bar Alternative */}
      <div className="mt-6 pt-6 border-t border-[#2a2a2e]">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[#a1a1aa] text-sm">Overall Risk Score</p>
          <p className="text-[#f5f5f7]">{riskLevel}/5</p>
        </div>
        <div className="w-full bg-[#0d0d0f] rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: risk.color,
              boxShadow: risk.shadow
            }}
          />
        </div>
      </div>
    </div>
  );
}