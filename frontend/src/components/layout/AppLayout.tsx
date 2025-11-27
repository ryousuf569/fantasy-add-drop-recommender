import { ReactNode } from "react";
import type { View } from "@/App";

import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent 
} from "@/components/ui/sheet";

export interface AppLayoutProps {
  children: ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
}

export default function AppLayout({ children, currentView, onNavigate }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex">
        <Sidebar 
          currentView={currentView}
          onNavigate={onNavigate}
        />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="md:hidden absolute top-4 left-4 z-20"
          >
            Menu
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="p-0 w-64">
          <Sidebar 
            currentView={currentView}
            onNavigate={onNavigate}
          />
        </SheetContent>
      </Sheet>

      {/* Main Page */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
