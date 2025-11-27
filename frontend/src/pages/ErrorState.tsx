import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onRetry: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground max-w-sm">
        We couldn’t find that player. Please try again.
      </p>

      <Button size="lg" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}
