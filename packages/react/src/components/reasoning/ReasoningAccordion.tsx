import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Clock, Cpu, CheckCircle2, AlertCircle, Loader2, Copy, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ThoughtProcess } from '../../types';

export interface ReasoningAccordionProps {
  thought: ThoughtProcess;
  defaultExpanded?: boolean;
  className?: string;
  onCopy?: (content: string) => void;
}

export const ReasoningAccordion: React.FC<ReasoningAccordionProps> = ({
  thought,
  defaultExpanded = false,
  className,
  onCopy,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || !!thought.isStreaming);
  const [copied, setCopied] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(
    thought.durationMs ? (thought.durationMs / 1000).toFixed(1) : '0.0'
  );

  // Auto-expand when streaming starts
  useEffect(() => {
    if (thought.isStreaming) {
      setIsExpanded(true);
    }
  }, [thought.isStreaming]);

  // Live timer tick when streaming
  useEffect(() => {
    if (!thought.isStreaming) {
      if (thought.durationMs) {
        setElapsedSeconds((thought.durationMs / 1000).toFixed(1));
      }
      return;
    }

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      setElapsedSeconds(elapsed);
    }, 100);

    return () => clearInterval(interval);
  }, [thought.isStreaming, thought.durationMs]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(thought.content);
    setCopied(true);
    if (onCopy) onCopy(thought.content);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'group my-2 rounded-xl border border-border/50 bg-secondary/30 backdrop-blur-sm transition-all duration-200 overflow-hidden',
        thought.isStreaming && 'border-primary/30 bg-primary/5 shadow-sm shadow-primary/5',
        className
      )}
    >
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-primary',
              thought.isStreaming && 'animate-pulse'
            )}
          >
            {thought.isStreaming ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}
          </div>

          <span className="font-medium text-foreground/90 truncate">
            {thought.title || (thought.isStreaming ? 'Thinking...' : 'Reasoning Process')}
          </span>

          {/* Badges */}
          <div className="flex items-center gap-1.5 ml-1">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-background/80 text-[10px] text-muted-foreground border border-border/40 font-mono">
              <Clock className="h-2.5 w-2.5" />
              {elapsedSeconds}s
            </span>

            {thought.tokens && (
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-background/80 text-[10px] text-muted-foreground border border-border/40 font-mono">
                <Cpu className="h-2.5 w-2.5" />
                {thought.tokens} tokens
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isExpanded && thought.content && (
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors"
              title="Copy reasoning markdown"
            >
              {copied ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          )}

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <div className="border-t border-border/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground/90 font-mono bg-background/30 select-text">
              {/* Step progression if available */}
              {thought.steps && thought.steps.length > 0 && (
                <div className="mb-3 space-y-1.5 pb-2.5 border-b border-border/30">
                  {thought.steps.map((step) => (
                    <div key={step.id} className="flex items-center gap-2 text-[11px]">
                      {step.status === 'completed' && (
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                      )}
                      {step.status === 'running' && (
                        <Loader2 className="h-3 w-3 text-primary animate-spin flex-shrink-0" />
                      )}
                      {step.status === 'failed' && (
                        <AlertCircle className="h-3 w-3 text-rose-500 flex-shrink-0" />
                      )}
                      {step.status === 'pending' && (
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 ml-1 mr-0.5 flex-shrink-0" />
                      )}
                      <span
                        className={cn(
                          'truncate font-sans',
                          step.status === 'running' && 'text-foreground font-medium',
                          step.status === 'completed' && 'text-muted-foreground line-through opacity-70'
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Main Thought Stream */}
              <div className="whitespace-pre-wrap font-sans text-xs text-foreground/80 leading-relaxed max-h-72 overflow-y-auto pr-1">
                {thought.content || (
                  <span className="italic text-muted-foreground/60">Contemplating approach...</span>
                )}
                {thought.isStreaming && (
                  <span className="inline-block h-3 w-1.5 bg-primary ml-1 animate-pulse align-middle" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
