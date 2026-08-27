import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check, RotateCcw } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface FeedbackActionsProps {
  onFeedback?: (type: 'positive' | 'negative', comments?: string) => void;
  onRetry?: () => void;
  onCopy?: () => void;
  className?: string;
}

export const FeedbackActions: React.FC<FeedbackActionsProps> = ({
  onFeedback,
  onRetry,
  onCopy,
  className,
}) => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    if (onFeedback) onFeedback(type);
  };

  const handleCopy = () => {
    if (onCopy) onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-lg bg-secondary/60 border border-border/60 text-muted-foreground text-xs',
        className
      )}
    >
      <button
        type="button"
        onClick={() => handleFeedback('positive')}
        className={cn(
          'p-1 rounded-md hover:text-foreground hover:bg-background transition-colors',
          feedback === 'positive' && 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 font-semibold'
        )}
        title="Helpful"
      >
        <ThumbsUp className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={() => handleFeedback('negative')}
        className={cn(
          'p-1 rounded-md hover:text-foreground hover:bg-background transition-colors',
          feedback === 'negative' && 'text-rose-700 dark:text-rose-400 bg-rose-500/15 font-semibold'
        )}
        title="Unhelpful"
      >
        <ThumbsDown className="h-3.5 w-3.5" />
      </button>

      {onCopy && (
        <button
          type="button"
          onClick={handleCopy}
          className="p-1 rounded-md hover:text-foreground hover:bg-background/80 transition-colors"
          title="Copy response"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      )}

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="p-1 rounded-md hover:text-foreground hover:bg-background/80 transition-colors"
          title="Regenerate response"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
