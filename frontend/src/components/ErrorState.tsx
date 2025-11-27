import { Search } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Basketball Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1a1a1e] border-2 border-[#2a2a2e] flex items-center justify-center">
          <svg
            className="w-12 h-12 text-[#a1a1aa]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path d="M12 2a10 10 0 0 0 0 20" strokeWidth="2" />
            <path d="M12 2a10 10 0 0 1 0 20" strokeWidth="2" />
            <ellipse cx="12" cy="12" rx="10" ry="4" strokeWidth="2" />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl text-[#f5f5f7] mb-3">Player Not Found</h2>
        <p className="text-[#a1a1aa] mb-8">
          We couldn't find any player matching your search. Try searching for another player or check your spelling.
        </p>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-[#2d6df6] text-white px-6 py-3 rounded-[12px] hover:bg-[#1e4fc7] transition-all duration-300 shadow-[0_4px_16px_rgba(45,109,246,0.4)] hover:shadow-[0_0_20px_rgba(45,109,246,0.6)] hover:scale-105"
        >
          <Search className="w-5 h-5" />
          <span>Try Another Search</span>
        </button>

        {/* Suggestions */}
        <div className="mt-8 pt-8 border-t border-[#2a2a2e]">
          <p className="text-[#a1a1aa] text-sm mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["LeBron James", "Stephen Curry", "Kevin Durant", "Giannis"].map((name, index) => (
              <button
                key={index}
                onClick={onRetry}
                className="px-3 py-1 bg-[#1a1a1e] text-[#a1a1aa] rounded-full text-sm hover:bg-[#222227] hover:text-[#f5f5f7] transition-colors border border-[#2a2a2e]"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}