import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Terminal, AlertTriangle, Check, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ActionConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  actionType: 'command' | 'file_write' | 'api_call' | 'db_mutation' | string;
  payload: string | Record<string, unknown>;
  severity?: 'low' | 'medium' | 'critical';
  onApprove: () => void;
  onReject: () => void;
  onClose: () => void;
  className?: string;
}

export const ActionConfirmationModal: React.FC<ActionConfirmationModalProps> = ({
  isOpen,
  title,
  description,
  actionType,
  payload,
  severity = 'medium',
  onApprove,
  onReject,
  onClose,
  className,
}) => {
  if (!isOpen) return null;

  const formattedPayload =
    typeof payload === 'string'
      ? payload
      : JSON.stringify(payload, null, 2);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18 }}
          className={cn(
            'relative w-full max-w-lg rounded-2xl border bg-card p-6 shadow-2xl overflow-hidden',
            severity === 'critical' && 'border-rose-500/50',
            severity === 'medium' && 'border-amber-500/50',
            severity === 'low' && 'border-border/80',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0',
                severity === 'critical' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                severity === 'medium' && 'bg-amber-500/20 text-amber-900 dark:text-amber-300',
                severity === 'low' && 'bg-blue-500/15 text-blue-800 dark:text-blue-400'
              )}
            >
              {severity === 'critical' ? (
                <AlertTriangle className="h-5 w-5" />
              ) : (
                <ShieldAlert className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                <span
                  className={cn(
                    'text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded shadow-2xs',
                    severity === 'critical' && 'bg-rose-500/20 text-rose-900 dark:text-rose-300 border border-rose-500/30',
                    severity === 'medium' && 'bg-amber-500/25 text-amber-950 dark:text-amber-300 border border-amber-500/40',
                    severity === 'low' && 'bg-blue-500/20 text-blue-900 dark:text-blue-300 border border-blue-500/30'
                  )}
                >
                  {severity} risk
                </span>
              </div>

              {description && (
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Action Code / Payload Viewer */}
          <div className="my-4 rounded-xl border border-border/60 bg-secondary/30 overflow-hidden text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/60 border-b border-border/40 text-[11px] font-mono text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" />
                <span>{actionType}</span>
              </div>
            </div>
            <pre className="p-3 font-mono text-[11px] leading-relaxed text-foreground overflow-x-auto max-h-56 select-text whitespace-pre-wrap break-all">
              {formattedPayload}
            </pre>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border/40">
            <button
              type="button"
              onClick={onReject}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Reject
            </button>
            <button
              type="button"
              onClick={onApprove}
              className={cn(
                'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white shadow-md transition-all',
                severity === 'critical'
                  ? 'bg-rose-600 hover:bg-rose-500'
                  : 'bg-amber-600 hover:bg-amber-500'
              )}
            >
              <Check className="h-3.5 w-3.5" />
              Authorize Action
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
