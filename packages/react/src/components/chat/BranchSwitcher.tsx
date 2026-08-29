import React from "react";
import { ChevronLeft, ChevronRight, GitFork } from "lucide-react";
import { cn } from "../../utils/cn";

export interface BranchSwitcherProps {
  currentIndex: number;
  totalBranches: number;
  onSelectBranch: (index: number) => void;
  className?: string;
}

export const BranchSwitcher: React.FC<BranchSwitcherProps> = ({
  currentIndex,
  totalBranches,
  onSelectBranch,
  className,
}) => {
  if (totalBranches <= 1) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-secondary/80 border border-border/50 text-[10px] text-muted-foreground font-mono select-none",
        className,
      )}
    >
      <GitFork className="h-2.5 w-2.5 text-muted-foreground/80" />
      <button
        type="button"
        disabled={currentIndex <= 0}
        onClick={() => onSelectBranch(currentIndex - 1)}
        className="p-0.5 rounded hover:bg-background/80 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        aria-label="Previous branch"
      >
        <ChevronLeft className="h-3 w-3" />
      </button>

      <span>
        {currentIndex + 1}/{totalBranches}
      </span>

      <button
        type="button"
        disabled={currentIndex >= totalBranches - 1}
        onClick={() => onSelectBranch(currentIndex + 1)}
        className="p-0.5 rounded hover:bg-background/80 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        aria-label="Next branch"
      >
        <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
};
