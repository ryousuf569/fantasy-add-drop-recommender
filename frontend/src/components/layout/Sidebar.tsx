import { cn } from "@/lib/utils";
import { Home, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { View } from "@/App";

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export default function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <div className="w-60 bg-card h-full p-4 border-r border-border">
      <nav className="flex flex-col gap-2">

        <button
          className={currentView === "home" ? "text-primary font-bold" : ""}
          onClick={() => onNavigate("home")}
        >
          Home
        </button>

        <button
          className={currentView === "player" ? "text-primary font-bold" : ""}
          onClick={() => onNavigate("player")}
        >
          Player Dashboard
        </button>

        <button
          className={currentView === "settings" ? "text-primary font-bold" : ""}
          onClick={() => onNavigate("settings")}
        >
          Settings
        </button>

      </nav>
    </div>
  );
}

interface SidebarLinkProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

function SidebarLink({ label, icon, active, onClick }: SidebarLinkProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "w-full justify-start gap-2 text-sm font-medium",
        active
          ? "bg-accent text-accent-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      {label}
    </Button>
  );
}
