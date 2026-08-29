import React from "react";
import { GitCompare } from "lucide-react";
import { cn } from "../../utils/cn";

export interface DiffViewerProps {
  diffText: string;
  filename?: string;
  className?: string;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  diffText,
  filename,
  className,
}) => {
  const lines = diffText.split("\n");

  return (
    <div
      className={cn(
        "my-3 rounded-xl border border-border/60 bg-neutral-950 text-neutral-100 font-mono text-xs overflow-hidden shadow-md",
        className,
      )}
    >
      {/* Diff Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-[11px] select-none">
        <div className="flex items-center gap-2 text-neutral-300">
          <GitCompare className="h-3.5 w-3.5 text-primary" />
          <span className="font-sans font-medium">
            {filename || "File Diff"}
          </span>
        </div>
      </div>

      {/* Diff Lines Body */}
      <div className="p-2 overflow-x-auto select-text font-mono text-[11px] leading-relaxed">
        {lines.map((line, idx) => {
          const isAdd = line.startsWith("+");
          const isDel = line.startsWith("-");
          const isHunk = line.startsWith("@@");

          return (
            <div
              key={idx}
              className={cn(
                "flex items-center px-2 py-0.5 rounded-xs transition-colors",
                isAdd &&
                  "bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500",
                isDel &&
                  "bg-rose-950/40 text-rose-300 border-l-2 border-rose-500",
                isHunk &&
                  "bg-neutral-900 text-neutral-400 italic my-1 font-sans text-[10px]",
                !isAdd && !isDel && !isHunk && "text-neutral-300",
              )}
            >
              <div className="w-5 select-none text-neutral-500 text-center flex-shrink-0 mr-2">
                {isAdd ? "+" : isDel ? "-" : ""}
              </div>
              <span className="whitespace-pre flex-1">
                {line.replace(/^[+-]/, "")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
