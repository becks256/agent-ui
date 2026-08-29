import React, { useState } from "react";
import {
  Code,
  Eye,
  FileText,
  Download,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  X,
  Sparkles,
} from "lucide-react";
import { cn } from "../../utils/cn";
import type { Artifact } from "../../types";
import { CodeBlock } from "./CodeBlock";
import { StreamingText } from "../chat/StreamingText";

export interface ArtifactWorkspaceProps {
  artifact: Artifact;
  versions?: Artifact[];
  onSelectVersion?: (version: number) => void;
  onClose?: () => void;
  className?: string;
}

export const ArtifactWorkspace: React.FC<ArtifactWorkspaceProps> = ({
  artifact,
  versions = [],
  onSelectVersion,
  onClose,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<
    "preview" | "code" | "diff" | "doc"
  >("code");
  const [copied, setCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([artifact.content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download =
      artifact.filename ||
      `${artifact.title.toLowerCase().replace(/\s+/g, "_")}.${artifact.language || "txt"}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-2xl border border-border/80 bg-card shadow-xl overflow-hidden",
        isFullScreen && "fixed inset-4 z-50 rounded-2xl shadow-2xl",
        className,
      )}
    >
      {/* Workspace Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/40 border-b border-border/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-semibold text-foreground truncate">
                {artifact.title}
              </h3>
              {artifact.version && (
                <div className="flex items-center gap-1">
                  {versions.length > 1 && onSelectVersion ? (
                    <select
                      value={artifact.version}
                      onChange={(e) => onSelectVersion(Number(e.target.value))}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-foreground border border-border/40 focus:outline-hidden"
                    >
                      {versions.map((v) => (
                        <option key={v.id || v.version} value={v.version}>
                          v{v.version}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-secondary text-muted-foreground border border-border/40">
                      v{artifact.version}
                    </span>
                  )}
                </div>
              )}
            </div>
            {artifact.filename && (
              <p className="text-[10px] font-mono text-muted-foreground truncate">
                {artifact.filename}
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Tab Switcher */}
          <div className="flex items-center bg-background/80 p-0.5 rounded-lg border border-border/60 text-xs">
            {artifact.isLivePreviewable && (
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors",
                  activeTab === "preview"
                    ? "bg-secondary text-foreground font-medium shadow-2xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Eye className="h-3 w-3" />
                <span className="text-[11px]">Preview</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors",
                activeTab === "code"
                  ? "bg-secondary text-foreground font-medium shadow-2xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Code className="h-3 w-3" />
              <span className="text-[11px]">Code</span>
            </button>

            {artifact.type === "markdown" && (
              <button
                type="button"
                onClick={() => setActiveTab("doc")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors",
                  activeTab === "doc"
                    ? "bg-secondary text-foreground font-medium shadow-2xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <FileText className="h-3 w-3" />
                <span className="text-[11px]">Doc</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="Copy content"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="Download file"
          >
            <Download className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullScreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Close artifact"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-background/50">
        {activeTab === "preview" && (
          <div className="h-full min-h-[320px] rounded-xl border border-border/60 bg-background p-4 shadow-inner flex items-center justify-center">
            {artifact.type === "svg" || artifact.type === "html" ? (
              <div
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: artifact.content }}
              />
            ) : (
              <div className="text-center text-muted-foreground text-xs">
                <p>Live interactive component rendering preview</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "code" && (
          <CodeBlock
            code={artifact.content}
            language={artifact.language || "typescript"}
            filename={artifact.filename}
            className="my-0 h-full"
          />
        )}

        {activeTab === "doc" && (
          <div className="prose prose-sm dark:prose-invert max-w-none p-4 rounded-xl border border-border/60 bg-card">
            <StreamingText content={artifact.content} />
          </div>
        )}
      </div>
    </div>
  );
};
