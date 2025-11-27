import { ArrowLeft } from "lucide-react";
import { PlayerHeader } from "./PlayerHeader";
import { ProjectionsSection } from "./ProjectionsSection";
import { SimilarPlayers } from "./SimilarPlayers";
import { RiskMeter } from "./RiskMeter";
import { TrendMeter } from "./TrendMeter";

interface PlayerDashboardProps {
  onBack: () => void;
}

export function PlayerDashboard({ onBack }: PlayerDashboardProps) {
  const playerData = {
    name: "Brandon Ingram",
    team: "NOP",
    position: "SF",
    image: "https://images.unsplash.com/photo-1659523585860-c349407e512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTI3ODQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    stats: {
      pts: 23.4,
      reb: 6.1,
      ast: 5.2,
      fpts: 39.8
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] px-4 py-8 md:px-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#a1a1aa] hover:text-[#f5f5f7] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Search</span>
        </button>

        {/* Player Header */}
        <div className="mb-8">
          <PlayerHeader {...playerData} />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Projections & Trend */}
          <div className="lg:col-span-2 space-y-6">
            <ProjectionsSection />
            <TrendMeter />
          </div>

          {/* Right Column - Similar Players & Risk */}
          <div className="space-y-6">
            <SimilarPlayers />
            <RiskMeter riskLevel={2} />
          </div>
        </div>
      </div>
    </div>
  );
}