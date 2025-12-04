import { cn } from "@/lib/utils";
import { Home, BarChart3, Info, Sword } from "lucide-react";
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

        <SidebarLink
          label="Home"
          icon={<Home className="w-4 h-4" />}
          active={currentView === "home"}
          onClick={() => onNavigate("home")}
        />

        <SidebarLink
          label="Player Dashboard"
          icon={<BarChart3 className="w-4 h-4" />}
          active={currentView === "player"}
          onClick={() => onNavigate("player")}
        />

        <SidebarLink
          label="Versus Mode"
          icon={<Sword className="w-4 h-4" />}
          active={currentView === "versus"}
          onClick={() => onNavigate("versus")}
        />

        <SidebarLink
          label="About"
          icon={<Info className="w-4 h-4" />}
          active={currentView === "settings"}
          onClick={() => onNavigate("settings")}
        />

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
