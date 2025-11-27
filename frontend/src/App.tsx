import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { PlayerDashboard } from "./components/PlayerDashboard";
import { ErrorState } from "./components/ErrorState";
import { DesignSystem } from "./components/DesignSystem";

type View = "home" | "player" | "error" | "designSystem";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  const handlePlayerSelect = (playerName: string) => {
    setSelectedPlayer(playerName);
    // Simulate player found/not found logic
    if (playerName && playerName.length > 0) {
      setCurrentView("player");
    } else {
      setCurrentView("error");
    }
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedPlayer("");
  };

  const handleRetry = () => {
    setCurrentView("home");
  };

  // Uncomment to view the design system
  // if (currentView === "designSystem" || true) {
  //   return <DesignSystem />;
  // }

  if (currentView === "error") {
    return <ErrorState onRetry={handleRetry} />;
  }

  if (currentView === "player") {
    return <PlayerDashboard onBack={handleBackToHome} />;
  }

  return <HomePage onPlayerSelect={handlePlayerSelect} />;
}