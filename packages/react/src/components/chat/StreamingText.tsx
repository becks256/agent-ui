import React from 'react';
import { cn } from '../../utils/cn';

export interface StreamingTextProps {
  content: string;
  isStreaming?: boolean;
  className?: string;
}

export const StreamingText: React.FC<StreamingTextProps> = ({
  content,
  isStreaming = false,
  className,
}) => {
  // Simple, robust markdown line parser for zero-dependency streaming rendering
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';

    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      // Code Block Start/End
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <div
              key={`code-${idx}`}
              className="my-3 rounded-lg overflow-hidden border border-border/60 bg-neutral-950 text-neutral-100 font-mono text-xs shadow-sm"
            >
              {codeBlockLang && (
                <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-neutral-800 text-[10px] text-neutral-400 font-sans uppercase">
                  <span>{codeBlockLang}</span>
                </div>
              )}
              <pre className="p-3 overflow-x-auto">
                <code>{codeBlockContent.join('\n')}</code>
              </pre>
            </div>
          );
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
        } else {
          inCodeBlock = true;
          codeBlockLang = line.replace('```', '').trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Headings
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-sm font-semibold text-foreground mt-3 mb-1">
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-base font-bold text-foreground mt-4 mb-1.5">
            {line.replace('## ', '')}
          </h2>
        );
        return;
      }
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={idx} className="text-lg font-bold text-foreground mt-4 mb-2">
            {line.replace('# ', '')}
          </h1>
        );
        return;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={idx}
            className="border-l-2 border-primary/40 pl-3 italic text-muted-foreground my-2 text-xs"
          >
            {line.replace('> ', '')}
          </blockquote>
        );
        return;
      }

      // Bullet lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={idx} className="ml-4 list-disc text-foreground/90 my-0.5 text-xs">
            {renderInlineSpans(line.substring(2))}
          </li>
        );
        return;
      }

      // Numbered lists
      const numMatch = line.match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        elements.push(
          <li key={idx} className="ml-4 list-decimal text-foreground/90 my-0.5 text-xs">
            {renderInlineSpans(numMatch[2])}
          </li>
        );
        return;
      }

      // Normal paragraph
      if (line.trim() === '') {
        elements.push(<div key={idx} className="h-2" />);
      } else {
        elements.push(
          <p key={idx} className="my-1 text-xs leading-relaxed text-foreground/90">
            {renderInlineSpans(line)}
          </p>
        );
      }
    });

    // If still in codeblock while streaming
    if (inCodeBlock && codeBlockContent.length > 0) {
      elements.push(
        <div
          key="code-incomplete"
          className="my-3 rounded-lg overflow-hidden border border-border/60 bg-neutral-950 text-neutral-100 font-mono text-xs"
        >
          <pre className="p-3 overflow-x-auto">
            <code>{codeBlockContent.join('\n')}</code>
          </pre>
        </div>
      );
    }

    return elements;
  };

  // Inline formatting helper (bold, code, italic)
  const renderInlineSpans = (text: string): React.ReactNode => {
    // Handle inline code `code`
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-muted font-mono text-[11px] text-foreground border border-border/50"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className={cn('text-xs leading-relaxed font-sans select-text', className)}>
      {renderFormattedText(content)}
      {isStreaming && (
        <span className="inline-block h-3.5 w-1.5 ml-0.5 bg-primary animate-stream-cursor align-middle rounded-sm" />
      )}
    </div>
  );
};
