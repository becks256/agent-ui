import React, { useState } from 'react';
import {
  User,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Pencil,
  FileText,
  Clock,
  Cpu,
  Code,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import type { AgentMessage } from '../../types';
import { StreamingText } from './StreamingText';
import { BranchSwitcher } from './BranchSwitcher';
import { ReasoningAccordion } from '../reasoning/ReasoningAccordion';
import { ToolCallCard } from '../reasoning/ToolCallCard';
import { AgentPlanView } from '../reasoning/AgentPlanView';

export interface MessageBubbleProps {
  message: AgentMessage;
  variant?: 'solid' | 'subtle' | 'neutral' | 'bordered';
  onRetry?: (messageId: string) => void;
  onEdit?: (messageId: string) => void;
  onSelectBranch?: (messageId: string, branchIndex: number) => void;
  onApproveTool?: (toolCallId: string) => void;
  onRejectTool?: (toolCallId: string) => void;
  onSelectArtifact?: (artifactId: string) => void;
  className?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  variant = 'solid',
  onRetry,
  onEdit,
  onSelectBranch,
  onApproveTool,
  onRejectTool,
  onSelectArtifact,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSystem) {
    return (
      <div className={cn('flex justify-center my-3 px-4', className)}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 border border-border/50 text-[11px] text-muted-foreground">
          <span>{message.content}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group flex gap-3 py-3 px-2 sm:px-4 transition-colors rounded-xl',
        isUser ? 'flex-row-reverse' : 'flex-row',
        className
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        <div
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium shadow-xs select-none',
            isUser
              ? variant === 'subtle'
                ? 'bg-primary/15 text-primary border-primary/30'
                : variant === 'neutral'
                ? 'bg-secondary text-foreground border-border/70'
                : variant === 'bordered'
                ? 'bg-background text-primary border-2 border-primary/60'
                : 'bg-primary text-primary-foreground border-primary/20'
              : 'bg-secondary text-foreground border-border/60'
          )}
        >
          {message.avatar ? (
            <img
              src={message.avatar}
              alt={message.name || 'User'}
              className="h-full w-full rounded-full object-cover"
            />
          ) : isUser ? (
            <User className="h-3.5 w-3.5" />
          ) : (
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          'flex flex-col max-w-[88%] sm:max-w-[82%] min-w-0',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        {/* Header (Author, Model Badge, Latency, Token Metrics) */}
        <div className="flex items-center gap-2 mb-1 text-[11px] text-muted-foreground">
          <span className="font-semibold text-foreground text-xs">
            {message.name || (isUser ? 'You' : 'Assistant')}
          </span>

          {message.model && (
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-secondary text-[10px] text-muted-foreground border border-border/40 font-mono">
              {message.model.name}
            </span>
          )}

          {message.latencyMs !== undefined && (
            <span className="hidden md:inline-flex items-center gap-0.5 text-[10px] text-muted-foreground/70 font-mono">
              <Clock className="h-2.5 w-2.5" />
              {(message.latencyMs / 1000).toFixed(1)}s
            </span>
          )}

          {message.tokens?.total !== undefined && (
            <span className="hidden md:inline-flex items-center gap-0.5 text-[10px] text-muted-foreground/70 font-mono">
              <Cpu className="h-2.5 w-2.5" />
              {message.tokens.total} toks
            </span>
          )}
        </div>

        {/* Attachment Previews */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {message.attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/80 border border-border/60 text-xs font-mono"
              >
                <FileText className="h-3 w-3 text-muted-foreground" />
                <span className="truncate max-w-[140px] text-foreground">
                  {att.name}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {(att.size / 1024).toFixed(0)}KB
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Reasoning / CoT Stream Accordion */}
        {message.thoughts && message.thoughts.length > 0 && (
          <div className="w-full">
            {message.thoughts.map((thought) => (
              <ReasoningAccordion key={thought.id} thought={thought} />
            ))}
          </div>
        )}

        {/* Agent Plan Hierarchy */}
        {message.plan && (
          <div className="w-full">
            <AgentPlanView plan={message.plan} />
          </div>
        )}

        {/* Tool Call Cards */}
        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="w-full space-y-1 my-1">
            {message.toolCalls.map((tc) => (
              <ToolCallCard
                key={tc.id}
                toolCall={tc}
                onApprove={onApproveTool}
                onReject={onRejectTool}
              />
            ))}
          </div>
        )}

        {/* Core Message Bubble Body */}
        {message.content && (
          <div
            className={cn(
              'rounded-2xl px-4 py-2.5 text-xs transition-shadow',
              isUser
                ? variant === 'subtle'
                  ? 'bg-primary/10 text-foreground border border-primary/25 rounded-tr-sm shadow-xs'
                  : variant === 'neutral'
                  ? 'bg-secondary text-foreground border border-border/70 rounded-tr-sm shadow-xs'
                  : variant === 'bordered'
                  ? 'bg-background text-foreground border-2 border-primary/60 rounded-tr-sm shadow-xs'
                  : 'bg-primary text-primary-foreground rounded-tr-sm shadow-xs'
                : variant === 'subtle'
                ? 'bg-secondary/40 border border-border/50 rounded-tl-sm text-foreground shadow-xs w-full'
                : variant === 'bordered'
                ? 'bg-card border-2 border-border/80 rounded-tl-sm text-foreground shadow-sm w-full'
                : 'bg-card border border-border/60 rounded-tl-sm text-foreground shadow-xs w-full'
            )}
          >
            {isUser ? (
              <p className="whitespace-pre-wrap leading-relaxed select-text font-sans">
                {message.content}
              </p>
            ) : (
              <StreamingText
                content={message.content}
                isStreaming={message.status === 'streaming'}
              />
            )}
          </div>
        )}

        {/* Artifacts Attached Pills */}
        {message.artifacts && message.artifacts.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2.5">
            {message.artifacts.map((art) => (
              <button
                key={art.id}
                type="button"
                onClick={() => onSelectArtifact && onSelectArtifact(art.id)}
                className="group/art inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-card hover:bg-secondary border border-border/80 hover:border-primary/50 text-xs font-mono text-foreground shadow-2xs transition-all select-none text-left"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/15 text-primary flex-shrink-0">
                  <Code className="h-3 w-3" />
                </div>
                <span className="font-semibold text-foreground truncate max-w-[200px]">
                  {art.title}
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold tracking-wider shadow-2xs">
                  {art.type}
                </span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover/art:text-foreground transition-colors ml-0.5" />
              </button>
            ))}
          </div>
        )}

        {/* Action Controls Toolbar (Copy, Retry, Branching) */}
        <div
          className={cn(
            'flex items-center gap-1.5 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity',
            isUser ? 'self-end' : 'self-start'
          )}
        >
          {message.branches && message.branches.length > 1 && (
            <BranchSwitcher
              currentIndex={message.selectedBranchIndex || 0}
              totalBranches={message.branches.length}
              onSelectBranch={(idx) =>
                onSelectBranch && onSelectBranch(message.id, idx)
              }
            />
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="Copy message"
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>

          {isUser && onEdit && (
            <button
              type="button"
              onClick={() => onEdit(message.id)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Edit prompt"
            >
              <Pencil className="h-3 w-3" />
            </button>
          )}

          {!isUser && onRetry && (
            <button
              type="button"
              onClick={() => onRetry(message.id)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Regenerate response"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
