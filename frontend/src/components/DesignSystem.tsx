import { Search, TrendingUp, Users, AlertTriangle } from "lucide-react";
import { LoadingShimmer, PlayerCardShimmer, ChartShimmer } from "./LoadingShimmer";

export function DesignSystem() {
  return (
    <div className="min-h-screen bg-[#0d0d0f] px-4 py-8 md:px-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-[#f5f5f7] mb-2">Fantasy NBA Design System</h1>
        <p className="text-[#a1a1aa] mb-12">Component library and style guide</p>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#f5f5f7] mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#0d0d0f] rounded-[12px] border border-[#2a2a2e]" />
              <p className="text-[#f5f5f7] text-sm">Background Primary</p>
              <p className="text-[#a1a1aa] text-xs">#0D0D0F</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#1a1a1e] rounded-[12px] border border-[#2a2a2e]" />
              <p className="text-[#f5f5f7] text-sm">Card Background</p>
              <p className="text-[#a1a1aa] text-xs">#1A1A1E</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#2d6df6] rounded-[12px] shadow-[0_0_20px_rgba(45,109,246,0.3)]" />
              <p className="text-[#f5f5f7] text-sm">Accent Blue</p>
              <p className="text-[#a1a1aa] text-xs">#2D6DF6</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#4ade80] rounded-[12px] shadow-[0_0_20px_rgba(74,222,128,0.3)]" />
              <p className="text-[#f5f5f7] text-sm">Accent Green</p>
              <p className="text-[#a1a1aa] text-xs">#4ADE80</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#ef4444] rounded-[12px] shadow-[0_0_20px_rgba(239,68,68,0.3)]" />
              <p className="text-[#f5f5f7] text-sm">Accent Red</p>
              <p className="text-[#a1a1aa] text-xs">#EF4444</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#fbbf24] rounded-[12px]" />
              <p className="text-[#f5f5f7] text-sm">Accent Yellow</p>
              <p className="text-[#a1a1aa] text-xs">#FBBF24</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#f5f5f7] rounded-[12px]" />
              <p className="text-[#f5f5f7] text-sm">Text Primary</p>
              <p className="text-[#a1a1aa] text-xs">#F5F5F7</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#a1a1aa] rounded-[12px]" />
              <p className="text-[#f5f5f7] text-sm">Text Secondary</p>
              <p className="text-[#a1a1aa] text-xs">#A1A1AA</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#f5f5f7] mb-6">Typography</h2>
          <div className="bg-[#1a1a1e] rounded-[18px] p-6 border border-[#2a2a2e] space-y-4">
            <div>
              <p className="text-6xl text-[#f5f5f7]">Heading 1</p>
              <p className="text-[#a1a1aa] text-sm mt-1">4xl / 60px · Inter / SF Pro Display</p>
            </div>
            <div>
              <p className="text-3xl text-[#f5f5f7]">Heading 2</p>
              <p className="text-[#a1a1aa] text-sm mt-1">3xl / 30px · Inter / SF Pro Display</p>
            </div>
            <div>
              <p className="text-2xl text-[#f5f5f7]">Heading 3</p>
              <p className="text-[#a1a1aa] text-sm mt-1">2xl / 24px · Inter / SF Pro Display</p>
            </div>
            <div>
              <p className="text-lg text-[#f5f5f7]">Body Large</p>
              <p className="text-[#a1a1aa] text-sm mt-1">lg / 18px · Inter / SF Pro Display</p>
            </div>
            <div>
              <p className="text-[#f5f5f7]">Body Regular</p>
              <p className="text-[#a1a1aa] text-sm mt-1">base / 16px · Inter / SF Pro Display</p>
            </div>
            <div>
              <p className="text-sm text-[#a1a1aa]">Body Small</p>
              <p className="text-[#a1a1aa] text-xs mt-1">sm / 14px · Inter / SF Pro Display</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#f5f5f7] mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#2d6df6] text-white px-6 py-3 rounded-[12px] hover:bg-[#1e4fc7] transition-all shadow-[0_4px_16px_rgba(45,109,246,0.4)]">
              Primary Button
            </button>
            <button className="bg-[#1a1a1e] text-[#f5f5f7] px-6 py-3 rounded-[12px] border border-[#2a2a2e] hover:border-[#2d6df6] transition-all">
              Secondary Button
            </button>
            <button className="bg-transparent text-[#a1a1aa] px-6 py-3 rounded-[12px] hover:text-[#f5f5f7] transition-all">
              Ghost Button
            </button>
            <button className="bg-[#4ade80] text-[#0d0d0f] px-6 py-3 rounded-[12px] hover:bg-[#22c55e] transition-all">
              Success Button
            </button>
            <button className="bg-[#ef4444] text-white px-6 py-3 rounded-[12px] hover:bg-[#dc2626] transition-all">
              Danger Button
            </button>
          </div>
        </section>

        {/* Tags & Badges */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#f5f5f7] mb-6">Tags & Badges</h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-[#2d6df6] text-white rounded-full text-sm">Primary Tag</span>
            <span className="px-3 py-1 bg-[#4ade80] text-[#0d0d0f] rounded-full text-sm">Success Tag</span>
            <span className="px-3 py-1 bg-[#ef4444] text-white rounded-full text-sm">Danger Tag</span>
            <span className="px-3 py-1 bg-[#fbbf24] text-[#0d0d0f] rounded-full text-sm">Warning Tag</span>
            <span className="px-3 py-1 bg-[#1a1a1e] text-[#a1a1aa] rounded-full text-sm border border-[#2a2a2e]">Neutral Tag</span>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#f5f5f7] mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1a1a1e] rounded-[16px] p-6 border border-[#2a2a2e]">
              <h3 className="text-[#f5f5f7] mb-2">Standard Card</h3>
              <p className="text-[#a1a1aa] text-sm">Basic card with 16px radius and border</p>
            </div>
            <div className="bg-[#1a1a1e] rounded-[18px] p-6 border border-[#2a2a2e] shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <h3 className="text-[#f5f5f7] mb-2">Elevated Card</h3>
              <p className="text-[#a1a1aa] text-sm">Card with shadow and 18px radius</p>
            </div>
            <div className="bg-[#1a1a1e] rounded-[16px] p-6 border border-[#2d6df6] shadow-[0_0_20px_rgba(45,109,246,0.3)]">
              <h3 className="text-[#f5f5f7] mb-2">Accent Card (Blue)</h3>
              <p className="text-[#a1a1aa] text-sm">Card with accent border and glow</p>
            </div>
            <div className="bg-[#1a1a1e] rounded-[16px] p-6 border border-[#4ade80] shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              <h3 className="text-[#f5f5f7] mb-2">Accent Card (Green)</h3>
              <p className="text-[#a1a1aa] text-sm">Card with accent border and glow</p>
            </div>
          </div>
        </section>

        {/* Icons */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#f5f5f7] mb-6">Icons</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[12px] bg-[#2d6df6] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-[#a1a1aa] text-xs">Trending Up</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[12px] bg-[#4ade80] flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-[#a1a1aa] text-xs">Users</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[12px] bg-[#ef4444] flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <p className="text-[#a1a1aa] text-xs">Alert</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[12px] bg-[#1a1a1e] border border-[#2a2a2e] flex items-center justify-center">
                <Search className="w-6 h-6 text-[#a1a1aa]" />
              </div>
              <p className="text-[#a1a1aa] text-xs">Search</p>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#f5f5f7] mb-6">Loading States</h2>
          <div className="space-y-4">
            <div>
              <p className="text-[#a1a1aa] text-sm mb-2">Text Shimmer</p>
              <LoadingShimmer width="w-48" height="h-4" />
            </div>
            <div>
              <p className="text-[#a1a1aa] text-sm mb-2">Player Card Shimmer</p>
              <PlayerCardShimmer />
            </div>
            <div>
              <p className="text-[#a1a1aa] text-sm mb-2">Chart Shimmer</p>
              <ChartShimmer />
            </div>
          </div>
        </section>

        {/* Spacing & Border Radius */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#f5f5f7] mb-6">Spacing & Border Radius</h2>
          <div className="bg-[#1a1a1e] rounded-[18px] p-6 border border-[#2a2a2e]">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#2d6df6] rounded" />
                <p className="text-[#a1a1aa]">8px spacing (xs)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-[#2d6df6] rounded" />
                <p className="text-[#a1a1aa]">12px spacing (sm)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-[#2d6df6] rounded" />
                <p className="text-[#a1a1aa]">16px spacing (md)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-[#2d6df6] rounded-[12px]" />
                <p className="text-[#a1a1aa]">12px border radius (sm)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#2d6df6] rounded-[16px]" />
                <p className="text-[#a1a1aa]">16px border radius (md)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#2d6df6] rounded-[18px]" />
                <p className="text-[#a1a1aa]">18px border radius (lg)</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}