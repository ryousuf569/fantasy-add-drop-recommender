import { PageContainer } from "../components/layout/PageContainer";
import { SearchBar } from "../components/features/SearchBar";
import Top5Display from "@/components/features/Top5Display";

interface PlayerPageProps {
  onPlayerSelect: (player: string) => void;
}

const HomePage = ({ onPlayerSelect }: PlayerPageProps) => {
  const handleSelect = (player: string) => {
    onPlayerSelect(player);
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Title + Description */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">
            Fantasy NBA Player Insights
          </h1>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Search any NBA player to see trends, projections, risk scores, and matchup insights.  
            Built for faster add/drop decisions — powered by ML + live stats.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto">
          <SearchBar onSelect={handleSelect} />
        </div>

        {/* Top 5 players */}
        <Top5Display />

      </div>
    </PageContainer>
  );
};

export default HomePage;
