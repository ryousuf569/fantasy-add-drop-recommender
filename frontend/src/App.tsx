import { useState, useEffect } from "react";
import { 
  fetchAllPlayers, 
  fetchPlayerReport, 
  PlayerReport 
} from "@/api/players";

import AppLayout from "./components/layout/AppLayout";

import HomePage from "./pages/PlayerPage";
import PlayerDashboard from "./components/PlayerDashboard/PlayerDashboard";
import ErrorState from "./pages/ErrorState";
import DesignSystem from "./pages/DesignSystem";
import Versus from "./pages/Versus";
import About from "./pages/About"
import { comparePlayers } from "@/utils/comparison";

export type View = 
  "home" | 
  "player" | 
  "versus" | 
  "error" | 
  "designSystem" | 
  "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");

  // Global Players List
  const [allPlayers, setAllPlayers] = useState<string[]>([]);

  useEffect(() => {
    async function loadPlayers() {
      try {
        const names = await fetchAllPlayers();
        setAllPlayers(names);
      } catch (err) {
        console.error("Failed to load players:", err);
      }
    }
    loadPlayers();
  }, []);

  // Player Dashboard State
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [playerData, setPlayerData] = useState<PlayerReport | null>(null);
  const [playerLoading, setPlayerLoading] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);

  const selectPlayer = async (playerName: string) => {
    if (!playerName.trim()) {
      setSelectedPlayer("");
      setPlayerData(null);
      setPlayerError("No player selected.");
      setCurrentView("error");
      return;
    }

    setSelectedPlayer(playerName);
    setPlayerLoading(true);
    setPlayerError(null);
    setCurrentView("player");

    try {
      const report = await fetchPlayerReport(playerName);
      setPlayerData(report);
      setPlayerLoading(false);
    } catch (err) {
      console.error("[App selectPlayer ERROR]", err);
      setPlayerError("Failed to load player data.");
      setPlayerLoading(false);
    }
  };

  const backToHome = () => {
    setSelectedPlayer("");
    setPlayerData(null);
    setPlayerError(null);
    setCurrentView("home");
  };

  // Versus Mode State
  const [vsPlayerA, setVsPlayerA] = useState("");
  const [vsPlayerB, setVsPlayerB] = useState("");

  const [vsDataA, setVsDataA] = useState<PlayerReport | null>(null);
  const [vsDataB, setVsDataB] = useState<PlayerReport | null>(null);

  const [vsLoading, setVsLoading] = useState(false);
  const [vsError, setVsError] = useState<string | null>(null);

  const [vsScores, setVsScores] = useState<{
    scoreA: number;
    scoreB: number;
  } | null>(null);

  const [vsWinner, setVsWinner] = useState<string | null>(null);

  // Clean re-entry into Versus
  const goToVersus = () => {
    setVsPlayerA("");
    setVsPlayerB("");
    setVsDataA(null);
    setVsDataB(null);
    setVsScores(null);
    setVsWinner(null);
    setVsLoading(false);
    setVsError(null);

    setCurrentView("versus");
  };

  async function runComparison(nameA: string, nameB: string) {

  console.log("Matched A:", nameA);
  console.log("Matched B:", nameB);

  console.log("Encoded A:", encodeURIComponent(nameA || ""));
  console.log("Encoded B:", encodeURIComponent(nameB || ""));
    if (vsLoading) return;

    setVsLoading(true);
    setVsError(null);

    try {
      const A = await fetchPlayerReport(nameA);
      setVsDataA(A);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const B = await fetchPlayerReport(nameB);
      setVsDataB(B);

      const result = comparePlayers(A, B);

      setVsScores({ scoreA: result.scoreA, scoreB: result.scoreB });
      setVsWinner(result.winner_name);
    } catch (err) {
      console.error("Versus comparison error:", err);
      setVsError("Failed to compare players. Try loading individually and comeback.");
    }

    setVsLoading(false);
  }

// Error
  const retryError = () => {
    setSelectedPlayer("");
    setPlayerData(null);
    setPlayerError(null);
    setCurrentView("home");
  };

  if (currentView === "error") {
    return <ErrorState onRetry={retryError} />;
  }

  if (currentView === "designSystem") {
    return <DesignSystem />;
  }

// Render 
  return (
    <AppLayout
      currentView={currentView}
      onNavigate={(view) => {
        if (view === "versus") return goToVersus();
        if (view === "player" && !selectedPlayer)
          return setCurrentView("error");

        setCurrentView(view);
      }}
    >
      {currentView === "home" && (
        <HomePage onPlayerSelect={selectPlayer} />
      )}

      {currentView === "player" && (
        <PlayerDashboard
          data={playerData as PlayerReport}
          loading={playerLoading}
          error={playerError}
          onBack={backToHome}
          onPlayerSelect={selectPlayer}
        />
      )}

      {currentView === "versus" && (
        <Versus
          players={allPlayers}
          playerA={vsPlayerA}
          playerB={vsPlayerB}
          setPlayerA={setVsPlayerA}
          setPlayerB={setVsPlayerB}
          loading={vsLoading}
          error={vsError}
          dataA={vsDataA}
          dataB={vsDataB}
          scores={vsScores}
          winner={vsWinner}
          onCompare={runComparison}
        />
      )}

      {currentView === "settings" && <About />}
    </AppLayout>
  );
}
