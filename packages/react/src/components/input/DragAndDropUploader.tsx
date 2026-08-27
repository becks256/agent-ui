import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, FileCode, X, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { FileAttachment } from '../../types';

export interface DragAndDropUploaderProps {
  attachments: FileAttachment[];
  onUploadFiles: (files: File[]) => void;
  onRemoveAttachment: (id: string) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export const DragAndDropUploader: React.FC<DragAndDropUploaderProps> = ({
  attachments,
  onUploadFiles,
  onRemoveAttachment,
  maxFiles = 5,
  accept = 'image/*,.pdf,.txt,.csv,.json,.ts,.js,.py,.html,.css',
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      onUploadFiles(droppedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).slice(0, maxFiles);
      onUploadFiles(selectedFiles);
    }
  };

  const getFileIcon = (type: string, name: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4 text-primary" />;
    if (name.endsWith('.ts') || name.endsWith('.js') || name.endsWith('.py') || name.endsWith('.json')) {
      return <FileCode className="h-4 w-4 text-blue-500" />;
    }
    return <FileText className="h-4 w-4 text-emerald-500" />;
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drop Zone Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 backdrop-blur-sm',
          isDragging
            ? 'border-primary bg-primary/10 scale-[0.99]'
            : 'border-border/60 hover:border-primary/50 hover:bg-secondary/40 bg-secondary/20'
        )}
      >
        <div className="flex flex-col items-center justify-center gap-1.5 text-muted-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border/60 shadow-xs">
            <UploadCloud className="h-4 w-4 text-foreground/70" />
          </div>
          <p className="text-xs font-medium text-foreground">
            Click to upload or drag & drop files
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            Images, PDFs, CSVs, Code files (max {maxFiles} files)
          </p>
        </div>
      </div>

      {/* Attachments List */}
      {attachments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="relative flex items-center gap-2.5 p-2 rounded-lg bg-card border border-border/60 shadow-xs group"
            >
              {/* Thumbnail or File Icon */}
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary/80 flex-shrink-0 overflow-hidden">
                {att.previewUrl ? (
                  <img
                    src={att.previewUrl}
                    alt={att.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getFileIcon(att.type, att.name)
                )}
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground truncate">
                  {att.name}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                  <span>{(att.size / 1024).toFixed(0)}KB</span>
                  {att.status === 'uploading' && (
                    <span className="inline-flex items-center gap-0.5 text-primary">
                      <Loader2 className="h-2.5 w-2.5 animate-spin" />
                      {att.progress !== undefined ? `${att.progress}%` : ''}
                    </span>
                  )}
                  {att.status === 'ready' && (
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                  )}
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveAttachment(att.id);
                }}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                title="Remove attachment"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
