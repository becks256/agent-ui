import React from "react";
import { X, FileCode, Brain, Database, Wrench, Sparkles } from "lucide-react";
import { cn } from "../../utils/cn";

export interface ContextItem {
  id: string;
  label: string;
  type: "file" | "memory" | "database" | "tool" | "custom";
  meta?: string;
}

export interface ContextTrayProps {
  items: ContextItem[];
  onRemoveItem: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

const getContextIcon = (type: ContextItem["type"]) => {
  switch (type) {
    case "file":
      return <FileCode className="h-3 w-3 text-blue-500" />;
    case "memory":
      return <Brain className="h-3 w-3 text-primary" />;
    case "database":
      return <Database className="h-3 w-3 text-emerald-500" />;
    case "tool":
      return <Wrench className="h-3 w-3 text-amber-500" />;
    default:
      return <Sparkles className="h-3 w-3 text-primary" />;
  }
};

export const ContextTray: React.FC<ContextTrayProps> = ({
  items,
  onRemoveItem,
  onClearAll,
  className,
}) => {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 border-b border-border/40 bg-secondary/30 overflow-x-auto text-xs rounded-t-2xl",
        className,
      )}
    >
      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground flex-shrink-0">
        Context ({items.length}):
      </span>

      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        {items.map((item) => (
          <div
            key={item.id}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/90 border border-border/60 text-[11px] font-mono text-foreground flex-shrink-0 group shadow-2xs"
          >
            {getContextIcon(item.type)}
            <span className="truncate max-w-[120px]">{item.label}</span>
            {item.meta && (
              <span className="text-[10px] text-muted-foreground">
                ({item.meta})
              </span>
            )}
            <button
              type="button"
              onClick={() => onRemoveItem(item.id)}
              className="p-0.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ml-0.5"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </div>
        ))}
      </div>

      {onClearAll && items.length > 2 && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-[10px] text-muted-foreground hover:text-foreground flex-shrink-0 ml-1 hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
};
