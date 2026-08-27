import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Globe,
  FileText,
  FileCode,
  Database,
  Code2,
  Wrench,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  Copy,
  Check,
  ShieldAlert,
  Play,
  XCircle,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ToolCall } from '../../types';

export interface ToolCallCardProps {
  toolCall: ToolCall;
  defaultExpanded?: boolean;
  onApprove?: (toolCallId: string) => void;
  onReject?: (toolCallId: string) => void;
  className?: string;
}

const getToolIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('bash') || lower.includes('command') || lower.includes('terminal') || lower.includes('exec')) {
    return <Terminal className="h-3.5 w-3.5" />;
  }
  if (lower.includes('web') || lower.includes('search') || lower.includes('browser') || lower.includes('url')) {
    return <Globe className="h-3.5 w-3.5" />;
  }
  if (lower.includes('read') || lower.includes('view') || lower.includes('cat') || lower.includes('find')) {
    return <FileText className="h-3.5 w-3.5" />;
  }
  if (lower.includes('edit') || lower.includes('write') || lower.includes('replace') || lower.includes('patch')) {
    return <FileCode className="h-3.5 w-3.5" />;
  }
  if (lower.includes('sql') || lower.includes('db') || lower.includes('database') || lower.includes('postgres')) {
    return <Database className="h-3.5 w-3.5" />;
  }
  if (lower.includes('python') || lower.includes('code') || lower.includes('run')) {
    return <Code2 className="h-3.5 w-3.5" />;
  }
  return <Wrench className="h-3.5 w-3.5" />;
};

export const ToolCallCard: React.FC<ToolCallCardProps> = ({
  toolCall,
  defaultExpanded = false,
  onApprove,
  onReject,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || toolCall.status === 'awaiting_approval');
  const [activeTab, setActiveTab] = useState<'output' | 'args' | 'raw'>('output');
  const [copied, setCopied] = useState(false);

  const formattedArgs =
    typeof toolCall.args === 'string'
      ? toolCall.args
      : JSON.stringify(toolCall.args, null, 2);

  const formattedResult =
    typeof toolCall.result === 'string'
      ? toolCall.result
      : JSON.stringify(toolCall.result, null, 2);

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'my-2 rounded-xl border bg-card/60 backdrop-blur-sm transition-all duration-200 overflow-hidden shadow-sm',
        toolCall.status === 'running' && 'border-cyan-500/40 bg-cyan-500/5 shadow-cyan-500/5',
        toolCall.status === 'awaiting_approval' && 'border-amber-500/40 bg-amber-500/5 shadow-amber-500/5',
        toolCall.status === 'error' && 'border-rose-500/30 bg-rose-500/5',
        toolCall.status === 'success' && 'border-border/60 hover:border-border',
        className
      )}
    >
      {/* Card Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between px-3.5 py-2.5 cursor-pointer select-none text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Tool Icon */}
          <div
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-lg border text-foreground/80 transition-colors',
              toolCall.status === 'running' && 'border-cyan-500/30 bg-cyan-500/10 text-cyan-500',
              toolCall.status === 'awaiting_approval' && 'border-amber-500/30 bg-amber-500/10 text-amber-500',
              toolCall.status === 'error' && 'border-rose-500/30 bg-rose-500/10 text-rose-500',
              toolCall.status === 'success' && 'border-border/60 bg-secondary/50 text-foreground/80'
            )}
          >
            {getToolIcon(toolCall.name)}
          </div>

          {/* Tool Name & Quick Args */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono font-medium text-foreground text-xs">
              {toolCall.name}
            </span>

            {/* Quick summary parameter */}
            {typeof toolCall.args === 'object' && toolCall.args !== null && (
              <span className="hidden md:inline-block font-mono text-[11px] text-muted-foreground/70 truncate max-w-xs">
                {Object.entries(toolCall.args)[0]
                  ? `${Object.entries(toolCall.args)[0][0]}: "${String(Object.entries(toolCall.args)[0][1]).slice(0, 30)}..."`
                  : ''}
              </span>
            )}
          </div>
        </div>

        {/* Status Badge & Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {toolCall.status === 'running' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/15 text-[10px] text-cyan-800 dark:text-cyan-300 border border-cyan-500/30 font-medium">
              <Loader2 className="h-2.5 w-2.5 animate-spin" />
              Running
            </span>
          )}

          {toolCall.status === 'awaiting_approval' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-[10px] text-amber-950 dark:text-amber-300 border border-amber-500/40 font-semibold animate-pulse">
              <ShieldAlert className="h-2.5 w-2.5" />
              Requires Approval
            </span>
          )}

          {toolCall.status === 'success' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-[10px] text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-medium">
              <CheckCircle2 className="h-2.5 w-2.5" />
              Completed
            </span>
          )}

          {toolCall.status === 'error' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 text-[10px] text-rose-800 dark:text-rose-300 border border-rose-500/30 font-medium">
              <AlertCircle className="h-2.5 w-2.5" />
              Failed
            </span>
          )}

          {toolCall.durationMs !== undefined && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
              <Clock className="h-2.5 w-2.5" />
              {toolCall.durationMs}ms
            </span>
          )}

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.div>
        </div>
      </div>

      {/* Human In The Loop Approval Banner */}
      {toolCall.status === 'awaiting_approval' && (
        <div className="px-3.5 py-2.5 bg-amber-500/10 border-t border-b border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300">
            <ShieldAlert className="h-4 w-4 flex-shrink-0" />
            <span>Agent wants to execute this action. Confirm to proceed.</span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onReject) onReject(toolCall.id);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60 transition-colors"
            >
              <XCircle className="h-3 w-3" />
              Reject
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onApprove) onApprove(toolCall.id);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500 text-amber-950 hover:bg-amber-400 font-semibold transition-colors shadow-sm"
            >
              <Play className="h-3 w-3 fill-current" />
              Approve
            </button>
          </div>
        </div>
      )}

      {/* Expanded Details Body */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <div className="border-t border-border/40 bg-secondary/20">
              {/* Tab Navigation */}
              <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-border/30 bg-background/50 text-[11px]">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('output')}
                    className={cn(
                      'px-2 py-0.5 rounded-md font-medium transition-colors',
                      activeTab === 'output'
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Output
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('args')}
                    className={cn(
                      'px-2 py-0.5 rounded-md font-medium transition-colors',
                      activeTab === 'args'
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Arguments
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('raw')}
                    className={cn(
                      'px-2 py-0.5 rounded-md font-medium transition-colors',
                      activeTab === 'raw'
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Raw JSON
                  </button>
                </div>

                {/* Copy current view */}
                <button
                  type="button"
                  onClick={(e) =>
                    handleCopy(
                      e,
                      activeTab === 'output'
                        ? formattedResult
                        : activeTab === 'args'
                        ? formattedArgs
                        : JSON.stringify(toolCall, null, 2)
                    )
                  }
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  title="Copy snippet"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>

              {/* Tab Content Panes */}
              <div className="p-3 font-mono text-[11px] leading-relaxed max-h-80 overflow-y-auto select-text">
                {activeTab === 'output' && (
                  <div>
                    {toolCall.status === 'running' && (
                      <div className="flex items-center gap-2 text-muted-foreground py-2">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-500" />
                        <span>Awaiting tool execution result...</span>
                      </div>
                    )}
                    {toolCall.error && (
                      <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 whitespace-pre-wrap">
                        {toolCall.error}
                      </div>
                    )}
                    {toolCall.result !== undefined && !toolCall.error && (
                      <pre className="text-foreground/90 whitespace-pre-wrap break-all">
                        {formattedResult}
                      </pre>
                    )}
                    {toolCall.result === undefined && !toolCall.error && toolCall.status !== 'running' && (
                      <span className="text-muted-foreground italic">No output returned.</span>
                    )}
                  </div>
                )}

                {activeTab === 'args' && (
                  <pre className="text-foreground/90 whitespace-pre-wrap break-all">
                    {formattedArgs}
                  </pre>
                )}

                {activeTab === 'raw' && (
                  <pre className="text-foreground/80 whitespace-pre-wrap break-all">
                    {JSON.stringify(toolCall, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
