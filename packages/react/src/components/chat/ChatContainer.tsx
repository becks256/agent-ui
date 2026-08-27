import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ChatContainerProps {
  children: React.ReactNode;
  isStreaming?: boolean;
  className?: string;
  autoScrollThreshold?: number;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  children,
  isStreaming = false,
  className,
  autoScrollThreshold = 100,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  const scrollToBottom = useCallback((smooth = true) => {
    bottomAnchorRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'end',
    });
    setUserScrolledUp(false);
    setShowScrollBottom(false);
  }, []);

  // Handle scroll events to detect if user scrolled away from bottom
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom > autoScrollThreshold) {
      setUserScrolledUp(true);
      setShowScrollBottom(true);
    } else {
      setUserScrolledUp(false);
      setShowScrollBottom(false);
    }
  };

  // Auto-scroll when children change or when streaming if user hasn't scrolled up
  useEffect(() => {
    if (!userScrolledUp) {
      scrollToBottom(false);
    }
  }, [children, isStreaming, userScrolledUp, scrollToBottom]);

  return (
    <div className="relative flex-1 h-full w-full overflow-hidden flex flex-col">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 space-y-4 scroll-smooth',
          className
        )}
      >
        {children}
        <div ref={bottomAnchorRef} className="h-4 w-full flex-shrink-0" />
      </div>

      {/* Floating Jump to Bottom Pill */}
      <AnimatePresence>
        {showScrollBottom && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-4 right-6 z-10"
          >
            <button
              type="button"
              onClick={() => scrollToBottom(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 text-foreground border border-border/80 shadow-lg backdrop-blur-md text-xs font-medium hover:bg-secondary transition-all"
            >
              <ArrowDown className="h-3.5 w-3.5" />
              <span>Scroll to bottom</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
