import React, { useState } from 'react';
import { Copy, Check, FileCode, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'group my-3 rounded-xl border border-border/60 bg-neutral-950 text-neutral-100 font-mono text-xs overflow-hidden shadow-md transition-all',
        isFullScreen && 'fixed inset-4 z-50 my-0 shadow-2xl flex flex-col',
        className
      )}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-[11px] select-none">
        <div className="flex items-center gap-2 text-neutral-400">
          <FileCode className="h-3.5 w-3.5 text-neutral-500" />
          <span className="font-sans font-medium text-neutral-200">
            {filename || `${language} snippet`}
          </span>
          <span className="uppercase text-[9px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 font-mono">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-[10px] text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span className="text-[10px]">Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
            title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullScreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-3.5 overflow-x-auto select-text flex-1">
        <pre className="flex text-xs leading-relaxed">
          {showLineNumbers && (
            <div className="flex flex-col text-neutral-600 select-none pr-4 text-right border-r border-neutral-800 mr-4 font-mono text-[11px]">
              {lines.map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
          )}
          <code className="text-neutral-200 flex-1 whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  );
};
