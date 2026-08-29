import React from "react";
import {
  Sparkles,
  Loader2,
  Globe,
  FileCode,
  ShieldAlert,
  CheckCircle2,
  Pause,
} from "lucide-react";
import { cn } from "../../utils/cn";

export type AgentState =
  | "idle"
  | "thinking"
  | "searching"
  | "coding"
  | "awaiting_approval"
  | "completed"
  | "paused";

export interface AgentStatusBadgeProps {
  state: AgentState;
  variant?: "solid" | "subtle";
  customLabel?: string;
  className?: string;
}

export const AgentStatusBadge: React.FC<AgentStatusBadgeProps> = ({
  state,
  variant = "subtle",
  customLabel,
  className,
}) => {
  const getBadgeConfig = () => {
    const isSolid = variant === "solid";

    switch (state) {
      case "thinking":
        return {
          icon: (
            <Loader2
              className={cn(
                "h-3 w-3 animate-spin",
                isSolid ? "text-primary-foreground" : "text-primary",
              )}
            />
          ),
          label: customLabel || "Reasoning...",
          classes: isSolid
            ? "bg-primary text-primary-foreground border-primary/40 font-semibold shadow-xs"
            : "bg-primary/15 text-foreground border-primary/30 font-medium",
          dot: isSolid ? "bg-primary-foreground" : "bg-primary",
        };
      case "searching":
        return {
          icon: <Globe className="h-3 w-3 animate-pulse" />,
          label: customLabel || "Browsing web...",
          classes: isSolid
            ? "bg-cyan-500 text-cyan-950 border-cyan-400 font-semibold shadow-xs"
            : "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30",
          dot: isSolid ? "bg-cyan-950" : "bg-cyan-500",
        };
      case "coding":
        return {
          icon: <FileCode className="h-3 w-3 animate-pulse" />,
          label: customLabel || "Synthesizing code...",
          classes: isSolid
            ? "bg-blue-600 text-white border-blue-500 font-semibold shadow-xs"
            : "bg-blue-500/15 text-blue-800 dark:text-blue-300 border-blue-500/30",
          dot: isSolid ? "bg-white" : "bg-blue-500",
        };
      case "awaiting_approval":
        return {
          icon: <ShieldAlert className="h-3 w-3" />,
          label: customLabel || "Awaiting approval",
          classes: isSolid
            ? "bg-amber-500 text-amber-950 border-amber-400 font-semibold shadow-xs animate-pulse"
            : "bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-500/40 font-medium animate-pulse",
          dot: isSolid ? "bg-amber-950" : "bg-amber-500",
        };
      case "completed":
        return {
          icon: <CheckCircle2 className="h-3 w-3" />,
          label: customLabel || "Task completed",
          classes: isSolid
            ? "bg-emerald-600 text-white border-emerald-500 font-semibold shadow-xs"
            : "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
          dot: isSolid ? "bg-white" : "bg-emerald-500",
        };
      case "paused":
        return {
          icon: <Pause className="h-3 w-3" />,
          label: customLabel || "Paused",
          classes: "bg-secondary text-muted-foreground border-border/60",
          dot: "bg-muted-foreground",
        };
      case "idle":
      default:
        return {
          icon: <Sparkles className="h-3 w-3 text-muted-foreground" />,
          label: customLabel || "Agent Ready",
          classes: "bg-secondary/80 text-foreground/80 border-border/60",
          dot: "bg-muted-foreground/60",
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border shadow-2xs transition-all",
        config.classes,
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        {state !== "idle" && state !== "completed" && state !== "paused" && (
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              config.dot,
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            config.dot,
          )}
        />
      </span>

      {config.icon}
      <span className="font-medium text-[11px]">{config.label}</span>
    </div>
  );
};
