import React from 'react';
import { Cpu, DollarSign } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { TokenUsage } from '../../types';

export interface TokenUsageMeterProps {
  usage: TokenUsage;
  maxTokens?: number;
  className?: string;
}

export const TokenUsageMeter: React.FC<TokenUsageMeterProps> = ({
  usage,
  maxTokens = 128000,
  className,
}) => {
  const total = usage.total || (usage.prompt || 0) + (usage.completion || 0);
  const percent = Math.min(Math.round((total / maxTokens) * 100), 100);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 px-3 py-1.5 rounded-xl border border-border/60 bg-secondary/30 text-xs font-mono',
        className
      )}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Cpu className="h-3.5 w-3.5 text-primary" />
        <span className="font-semibold text-foreground">
          {(total / 1000).toFixed(1)}k
        </span>
        <span className="text-[10px] text-muted-foreground">
          / {(maxTokens / 1000).toFixed(0)}k toks
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-16 h-1.5 rounded-full bg-secondary border border-border/40 overflow-hidden hidden sm:block">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            percent > 85 ? 'bg-rose-500' : percent > 60 ? 'bg-amber-500' : 'bg-primary'
          )}
          style={{ width: `${percent}%` }}
        />
      </div>

      {usage.costUsd !== undefined && (
        <div className="hidden md:flex items-center gap-0.5 text-muted-foreground border-l border-border/40 pl-2">
          <DollarSign className="h-3 w-3 text-emerald-500" />
          <span className="text-[11px] font-medium text-foreground">
            {usage.costUsd.toFixed(4)}
          </span>
        </div>
      )}
    </div>
  );
};
