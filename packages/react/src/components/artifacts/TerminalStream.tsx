import React, { useRef, useEffect } from "react";
import {
  Terminal,
  Square,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "../../utils/cn";

export interface TerminalStreamProps {
  command: string;
  output: string;
  status?: "running" | "completed" | "failed" | "idle";
  exitCode?: number;
  onInterrupt?: () => void;
  className?: string;
}

export const TerminalStream: React.FC<TerminalStreamProps> = ({
  command,
  output,
  status = "completed",
  exitCode,
  onInterrupt,
  className,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  // Auto-scroll as terminal output streams
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`$ ${command}\n${output}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "my-3 rounded-xl border border-neutral-800 bg-[#09090b] text-neutral-100 font-mono text-xs overflow-hidden shadow-lg",
        status === "running" && "border-cyan-500/40 shadow-cyan-500/5",
        className,
      )}
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-neutral-900 border-b border-neutral-800 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <Terminal className="h-3.5 w-3.5 text-neutral-400" />
          <span className="text-[11px] text-neutral-300 font-medium truncate max-w-xs font-sans">
            {command || "bash"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {status === "running" && (
            <div className="flex items-center gap-1 text-[10px] text-cyan-400">
              <Loader2 className="h-2.5 w-2.5 animate-spin" />
              <span>Running</span>
            </div>
          )}

          {status === "completed" && (
            <div className="flex items-center gap-1 text-[10px] text-emerald-400">
              <CheckCircle2 className="h-2.5 w-2.5" />
              <span>Exited (0)</span>
            </div>
          )}

          {status === "failed" && (
            <div className="flex items-center gap-1 text-[10px] text-rose-400">
              <AlertCircle className="h-2.5 w-2.5" />
              <span>Failed ({exitCode ?? 1})</span>
            </div>
          )}

          {status === "running" && onInterrupt && (
            <button
              type="button"
              onClick={onInterrupt}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[10px] font-sans transition-colors"
            >
              <Square className="h-2.5 w-2.5 fill-current" />
              <span>Kill</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
            title="Copy command & output"
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald-400" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div
        ref={terminalRef}
        className="p-3.5 max-h-72 overflow-y-auto font-mono text-[11px] leading-relaxed select-text space-y-1"
      >
        <div className="flex items-center gap-1.5 text-neutral-400 pb-1">
          <span className="text-emerald-400 font-bold">$</span>
          <span className="text-neutral-100 font-semibold">{command}</span>
        </div>

        <pre className="text-neutral-300 whitespace-pre-wrap break-all">
          {output}
        </pre>

        {status === "running" && (
          <span className="inline-block h-3.5 w-1.5 bg-neutral-300 animate-pulse align-middle ml-0.5" />
        )}
      </div>
    </div>
  );
};
