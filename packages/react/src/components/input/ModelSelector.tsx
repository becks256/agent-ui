import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Zap, Brain, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ModelInfo } from '../../types';

export interface ModelSelectorProps {
  models: ModelInfo[];
  selectedModel: ModelInfo;
  onSelectModel: (model: ModelInfo) => void;
  className?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onSelectModel,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('relative inline-block text-left', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary/80 hover:bg-secondary border border-border/60 text-foreground transition-all shadow-2xs"
      >
        <Sparkles className="h-3 w-3 text-primary" />
        <span className="truncate max-w-[120px]">{selectedModel.name}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground ml-0.5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 bottom-full mb-2 w-64 rounded-xl border border-border/80 bg-popover/95 backdrop-blur-md shadow-xl z-50 p-1.5 space-y-1"
            >
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border/40">
                Select Model
              </div>

              <div className="max-h-60 overflow-y-auto space-y-0.5">
                {models.map((m) => {
                  const isSelected = m.id === selectedModel.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        onSelectModel(m);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors',
                        isSelected
                          ? 'bg-primary text-primary-foreground font-semibold shadow-2xs'
                          : 'text-foreground hover:bg-secondary'
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold">{m.name}</span>
                          {m.speed === 'fast' && (
                            <Zap className={cn("h-2.5 w-2.5", isSelected ? "text-primary-foreground/90" : "text-amber-500")} />
                          )}
                          {m.reasoningEffort === 'high' && (
                            <Brain className={cn("h-2.5 w-2.5", isSelected ? "text-primary-foreground/90" : "text-primary")} />
                          )}
                        </div>
                        {m.description && (
                          <p className={cn("text-[10px] truncate mt-0.5", isSelected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                            {m.description}
                          </p>
                        )}
                      </div>

                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-primary-foreground ml-2 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
