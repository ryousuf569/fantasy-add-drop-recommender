import { useState } from "react";
import { SearchBar } from "../components/features/SearchBar";
import { fetchPlayerReport } from "../api/players";
import { PlayerSummary } from "../components/features/PlayerSummary";
import { SimilarPlayersList } from "../components/features/SimilarPlayersList";
import { PageContainer } from "../components/layout/PageContainer";

export type Last5Game = {
  GAME_DATE: string;
  PLUS_MINUS: number;
  PTS: number;
  REB: number;
  AST: number;
  MIN: number;
};

export interface PlayerReport {
  player_name: string;
  projection_list: number[];
  projection_avg: number;
  trend: string;
  risk_factor: number;
  similar_players: string[];
  last_5_games: Last5Game; 
  last5_plus_minus: number;
  position: string;
}

interface PlayerPageProps {
  onPlayerSelect: (player: string) => void;
}

const HomePage = ({ onPlayerSelect }: PlayerPageProps) => {
  const [data, setData] = useState<PlayerReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelect = async (player: string) => {
    try {
      setError("");
      setLoading(true);
      setData(null);

      const result = await fetchPlayerReport(player);
      setData(result);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to fetch player data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-xl mx-auto space-y-6">
        <SearchBar onSelect={handleSelect} />

        {/* Loading */}
        {loading && (
          <div className="text-center text-zinc-400 mt-6 animate-pulse">
            Fetching player data...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-500 bg-red-950/30 border border-red-700 rounded-lg p-3 mt-4">
            {error}
          </div>
        )}

        {/* Player Data */}
        {data && !loading && (
          <div className="space-y-4">
            <PlayerSummary data={data} />
            <SimilarPlayersList players={data.similar_players} />
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default HomePage;