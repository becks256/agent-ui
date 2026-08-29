import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, Square, Paperclip } from "lucide-react";
import { cn } from "../../utils/cn";
import type { ModelInfo, FileAttachment } from "../../types";
import { ModelSelector } from "./ModelSelector";
import { ContextTray, type ContextItem } from "./ContextTray";
import { SlashCommandMenu, type SlashCommand } from "./SlashCommandMenu";

export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (content: string, attachments?: FileAttachment[]) => void;
  onStop?: () => void;
  isStreaming?: boolean;
  placeholder?: string;
  models?: ModelInfo[];
  selectedModel?: ModelInfo;
  onSelectModel?: (model: ModelInfo) => void;
  contextItems?: ContextItem[];
  onRemoveContextItem?: (id: string) => void;
  attachments?: FileAttachment[];
  onUploadClick?: () => void;
  className?: string;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  onSubmit,
  onStop,
  isStreaming = false,
  placeholder = "Ask a question or type / for commands...",
  models,
  selectedModel,
  onSelectModel,
  contextItems = [],
  onRemoveContextItem,
  attachments = [],
  onUploadClick,
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashFilter, setSlashFilter] = useState("");

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        220,
      )}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isStreaming && (value.trim() || attachments.length > 0)) {
        onSubmit(value, attachments);
      }
    } else if (e.key === "Escape") {
      setShowSlashMenu(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange(val);

    if (val.startsWith("/")) {
      setShowSlashMenu(true);
      setSlashFilter(val.slice(1));
    } else {
      setShowSlashMenu(false);
    }
  };

  const handleSelectSlashCommand = (cmd: SlashCommand) => {
    onChange(`${cmd.name} `);
    setShowSlashMenu(false);
    textareaRef.current?.focus();
  };

  // Rough token estimation (~4 chars per token)
  const estimatedTokens = Math.ceil(value.length / 4);

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md shadow-lg transition-all duration-200 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/30",
        className,
      )}
    >
      {/* Pinned Context Tray */}
      {contextItems.length > 0 && onRemoveContextItem && (
        <ContextTray items={contextItems} onRemoveItem={onRemoveContextItem} />
      )}

      {/* Slash Command Autocomplete Popover */}
      <SlashCommandMenu
        isOpen={showSlashMenu}
        filterText={slashFilter}
        onSelectCommand={handleSelectSlashCommand}
        onClose={() => setShowSlashMenu(false)}
      />

      {/* Textarea Area */}
      <div className="px-4 pt-3.5 pb-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden leading-relaxed max-h-56"
        />
      </div>

      {/* Bottom Action Controls Bar */}
      <div className="flex items-center justify-between px-3 pb-3 pt-1 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          {/* Model Selector */}
          {models && selectedModel && onSelectModel && (
            <ModelSelector
              models={models}
              selectedModel={selectedModel}
              onSelectModel={onSelectModel}
            />
          )}

          {/* Attachment Upload Button */}
          {onUploadClick && (
            <button
              type="button"
              onClick={onUploadClick}
              className="inline-flex items-center gap-1 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Attach files or images"
            >
              <Paperclip className="h-3.5 w-3.5" />
              {attachments.length > 0 && (
                <span className="text-[10px] font-mono font-medium px-1 rounded bg-secondary">
                  {attachments.length}
                </span>
              )}
            </button>
          )}

          {/* Token Counter */}
          {value.length > 0 && (
            <span className="hidden sm:inline-block text-[10px] font-mono text-muted-foreground/70 ml-1">
              ~{estimatedTokens} tokens
            </span>
          )}
        </div>

        {/* Submit or Stop Button */}
        <div className="flex items-center gap-2">
          {isStreaming ? (
            <button
              type="button"
              onClick={onStop}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-sm transition-all"
              title="Stop generation"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              disabled={!value.trim() && attachments.length === 0}
              onClick={() => onSubmit(value, attachments)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-30 disabled:hover:opacity-30 shadow-sm transition-all"
              title="Send message (Enter)"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
