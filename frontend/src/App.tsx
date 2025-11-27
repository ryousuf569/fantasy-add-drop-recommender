import { useState } from "react";

import AppLayout from "./components/layout/AppLayout";

import HomePage from "./pages/HomePage";
import PlayerDashboard from "./pages/PlayerDashboard";
import ErrorState from "./pages/ErrorState";
import DesignSystem from "./pages/DesignSystem";

export type View =
  | "home"
  | "player"
  | "error"
  | "designSystem"
  | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  // Handle navigation coming from the sidebar
  const handleNavigate = (view: View) => {
    // Prevent crashing if navigating to player without a player set
    if (view === "player" && !selectedPlayer) {
      setCurrentView("error");
      return;
    }

    setCurrentView(view);
  };

  // Handle player search
  const handlePlayerSelect = (playerName: string) => {
    setSelectedPlayer(playerName);

    if (playerName.trim().length > 0) {
      setCurrentView("player");
    } else {
      setCurrentView("error");
    }
  };

  const handleBackToHome = () => {
    setSelectedPlayer("");
    setCurrentView("home");
  };

  const handleRetry = () => {
    setSelectedPlayer("");
    setCurrentView("home");
  };

  // Standalone Error Page
  if (currentView === "error") {
    return <ErrorState onRetry={handleRetry} />;
  }

  // Standalone Design System page
  if (currentView === "designSystem") {
    return <DesignSystem />;
  }

  return (
    <AppLayout onNavigate={handleNavigate} currentView={currentView}>
      {currentView === "home" && (
        <HomePage onPlayerSelect={handlePlayerSelect} />
      )}

      {currentView === "player" && (
        <PlayerDashboard
          playerName={selectedPlayer}
          onBack={handleBackToHome}
        />
      )}

      {currentView === "settings" && (
        <div className="text-foreground">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">Settings page goes here.</p>
        </div>
      )}
    </AppLayout>
  );
}
