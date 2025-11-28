import { useState } from "react";

import AppLayout from "./components/layout/AppLayout";

import HomePage from "./pages/PlayerPage";
import PlayerDashboard from "./components/PlayerDashboard/PlayerDashboard";
import ErrorState from "./pages/ErrorState";
import DesignSystem from "./pages/DesignSystem";

export type View = "home" | "player" | "error" | "designSystem" | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  const navigate = (view: View) => {
    if (view === "player" && !selectedPlayer) {
      return setCurrentView("error");
    }
    setCurrentView(view);
  };

  const selectPlayer = (playerName: string) => {
    setSelectedPlayer(playerName);

    if (playerName.trim().length === 0) {
      return setCurrentView("error");
    }

    setCurrentView("player");
  };

  const backToHome = () => {
    setSelectedPlayer("");
    setCurrentView("home");
  };

  const retryError = () => {
    setSelectedPlayer("");
    setCurrentView("home");
  };


  if (currentView === "error") {
    return <ErrorState onRetry={retryError} />;
  }

  if (currentView === "designSystem") {
    return <DesignSystem />;
  }


  return (
    <AppLayout currentView={currentView} onNavigate={navigate}>
      {currentView === "home" && (
        <HomePage 
          key={currentView}  
          onPlayerSelect={selectPlayer} 
        />
      )}

      {currentView === "player" && (
        <PlayerDashboard
          playerName={selectedPlayer}
          onBack={backToHome}
          onPlayerSelect={selectPlayer}
        />
      )}

      {currentView === "settings" && (
        <div className="text-foreground space-y-2">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Settings page goes here.
          </p>
        </div>
      )}
    </AppLayout>
  );
}
