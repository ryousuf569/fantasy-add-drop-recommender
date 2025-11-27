interface LoadingShimmerProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

export function LoadingShimmer({ 
  width = "w-full", 
  height = "h-4", 
  rounded = "rounded-md",
  className = ""
}: LoadingShimmerProps) {
  return (
    <div className={`${width} ${height} ${rounded} shimmer ${className}`} />
  );
}

export function PlayerCardShimmer() {
  return (
    <div className="bg-[#1a1a1e] rounded-[16px] p-6 border border-[#2a2a2e]">
      <div className="flex items-center gap-4 mb-4">
        <LoadingShimmer width="w-16" height="h-16" rounded="rounded-full" />
        <div className="flex-1">
          <LoadingShimmer width="w-32" height="h-5" className="mb-2" />
          <LoadingShimmer width="w-20" height="h-4" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <LoadingShimmer height="h-12" />
        <LoadingShimmer height="h-12" />
        <LoadingShimmer height="h-12" />
        <LoadingShimmer height="h-12" />
      </div>
    </div>
  );
}

export function ChartShimmer() {
  return (
    <div className="bg-[#1a1a1e] rounded-[16px] p-6 border border-[#2a2a2e]">
      <LoadingShimmer width="w-40" height="h-6" className="mb-6" />
      <LoadingShimmer width="w-full" height="h-48" />
    </div>
  );
}