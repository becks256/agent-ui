import React, { useState } from "react";
import { HelpCircle, Check, ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  isRecommended?: boolean;
}

export interface InteractiveQuestionCardProps {
  question: string;
  description?: string;
  options: QuestionOption[];
  isMultiSelect?: boolean;
  onSubmit: (selectedOptionIds: string[], customInput?: string) => void;
  className?: string;
}

export const InteractiveQuestionCard: React.FC<
  InteractiveQuestionCardProps
> = ({
  question,
  description,
  options,
  isMultiSelect = false,
  onSubmit,
  className,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleOption = (id: string) => {
    if (isMultiSelect) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    } else {
      setSelectedIds([id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length > 0 || customInput.trim()) {
      setIsSubmitted(true);
      onSubmit(selectedIds, customInput);
    }
  };

  return (
    <div
      className={cn(
        "my-3 p-4 rounded-xl border border-primary/30 bg-primary/5 backdrop-blur-sm shadow-sm space-y-3",
        className,
      )}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5 flex-shrink-0">
          <HelpCircle className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-semibold text-foreground leading-snug">
            {question}
          </h4>
          {description && (
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-1.5 pt-1">
        {options.map((opt) => {
          const isSelected = selectedIds.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              disabled={isSubmitted}
              onClick={() => toggleOption(opt.id)}
              className={cn(
                "w-full flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition-all",
                isSelected
                  ? "border-primary bg-primary/15 text-foreground font-medium shadow-2xs"
                  : "border-border/60 bg-card hover:bg-secondary/60 text-muted-foreground hover:text-foreground",
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded border flex-shrink-0 transition-colors",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background",
                    )}
                  >
                    {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                  </div>
                  <span className="truncate text-foreground font-medium">
                    {opt.label}
                  </span>
                  {opt.isRecommended && (
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold tracking-wider shadow-2xs">
                      Recommended
                    </span>
                  )}
                </div>
                {opt.description && (
                  <p className="text-[10px] text-muted-foreground ml-6 mt-0.5 truncate">
                    {opt.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom write-in input & submit */}
      {!isSubmitted && (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
          <input
            type="text"
            placeholder="Or type custom answer..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-border/60 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary"
          />
          <button
            type="submit"
            disabled={selectedIds.length === 0 && !customInput.trim()}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-colors"
          >
            <span>Submit</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </form>
      )}

      {isSubmitted && (
        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1 font-medium">
          <Check className="h-3 w-3" />
          <span>Response recorded</span>
        </div>
      )}
    </div>
  );
};
