import { PageContainer } from "../components/layout/PageContainer";
import { SearchBar } from "../components/features/SearchBar";

interface PlayerPageProps {
  onPlayerSelect: (player: string) => void;
}

const HomePage = ({ onPlayerSelect }: PlayerPageProps) => {
  const handleSelect = (player: string) => {
    onPlayerSelect(player);
  };

  return (
    <PageContainer>
      <div className="max-w-xl mx-auto space-y-6">
        <SearchBar onSelect={handleSelect} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
