import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Search, FileText, CheckSquare, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SlashCommand {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
}

export interface SlashCommandMenuProps {
  isOpen: boolean;
  filterText: string;
  commands?: SlashCommand[];
  onSelectCommand: (command: SlashCommand) => void;
  onClose: () => void;
  placement?: 'bottom-full' | 'top-full' | 'inline';
  className?: string;
}

const defaultCommands: SlashCommand[] = [
  { id: 'plan', name: '/plan', description: 'Generate a step-by-step implementation plan', icon: <CheckSquare className="h-3.5 w-3.5" /> },
  { id: 'search', name: '/search', description: 'Search the web or knowledge base', icon: <Search className="h-3.5 w-3.5" /> },
  { id: 'terminal', name: '/exec', description: 'Run a shell command or script', icon: <Terminal className="h-3.5 w-3.5" /> },
  { id: 'file', name: '/file', description: 'Create or edit an artifact file', icon: <FileText className="h-3.5 w-3.5" /> },
  { id: 'fast', name: '/fast', description: 'Fast reasoning mode with concise response', icon: <Zap className="h-3.5 w-3.5" /> },
];

export const SlashCommandMenu: React.FC<SlashCommandMenuProps> = ({
  isOpen,
  filterText,
  commands = defaultCommands,
  onSelectCommand,
  onClose,
  placement = 'bottom-full',
  className,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredCommands = commands.filter(
    (c) =>
      c.name.toLowerCase().includes(filterText.toLowerCase()) ||
      c.description.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [filterText]);

  // Click-outside listener without hijacking browser viewport
  useEffect(() => {
    if (!isOpen || placement === 'inline') return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen, placement, onClose]);

  if (!isOpen || filteredCommands.length === 0) return null;

  const placementClasses = {
    'bottom-full': 'absolute left-3 bottom-full mb-2 w-72 shadow-xl z-50',
    'top-full': 'absolute left-3 top-full mt-2 w-72 shadow-xl z-50',
    'inline': 'relative w-full shadow-sm',
  }[placement];

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: placement === 'bottom-full' ? 8 : -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: placement === 'bottom-full' ? 8 : -8, scale: 0.97 }}
        transition={{ duration: 0.15 }}
        className={cn(
          'rounded-xl border border-border/80 bg-popover/95 backdrop-blur-md p-1.5 space-y-0.5',
          placementClasses,
          className
        )}
      >
        <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border/40">
          Slash Commands
        </div>

        <div className="max-h-56 overflow-y-auto space-y-0.5">
          {filteredCommands.map((cmd, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={cmd.id}
                type="button"
                onClick={() => onSelectCommand(cmd)}
                className={cn(
                  'w-full flex items-center gap-2.5 p-2 rounded-lg text-xs text-left transition-colors',
                  isSelected
                    ? 'bg-primary text-primary-foreground font-semibold shadow-2xs'
                    : 'text-foreground hover:bg-secondary'
                )}
              >
                <div
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-md text-xs',
                    isSelected
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {cmd.icon || <Sparkles className="h-3 w-3" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      'font-mono font-semibold',
                      isSelected ? 'text-primary-foreground' : 'text-foreground'
                    )}
                  >
                    {cmd.name}
                  </div>
                  <div
                    className={cn(
                      'text-[10px] truncate',
                      isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    )}
                  >
                    {cmd.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
