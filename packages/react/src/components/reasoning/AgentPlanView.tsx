import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ListTodo,
  CheckCircle2,
  Circle,
  Loader2,
  AlertCircle,
  ChevronDown,
  CornerDownRight,
  MinusCircle,
} from "lucide-react";
import { cn } from "../../utils/cn";
import type { AgentPlan, AgentPlanStep, StepStatus } from "../../types";

export interface AgentPlanViewProps {
  plan: AgentPlan;
  defaultExpanded?: boolean;
  onStepClick?: (step: AgentPlanStep) => void;
  className?: string;
}

const getStepIcon = (status: StepStatus) => {
  switch (status) {
    case "completed":
      return (
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
      );
    case "in_progress":
      return (
        <Loader2 className="h-3.5 w-3.5 text-primary animate-spin flex-shrink-0" />
      );
    case "failed":
      return (
        <AlertCircle className="h-3.5 w-3.5 text-rose-500 flex-shrink-0" />
      );
    case "skipped":
      return (
        <MinusCircle className="h-3.5 w-3.5 text-muted-foreground/60 flex-shrink-0" />
      );
    case "pending":
    default:
      return (
        <Circle className="h-3.5 w-3.5 text-muted-foreground/40 flex-shrink-0" />
      );
  }
};

export const AgentPlanView: React.FC<AgentPlanViewProps> = ({
  plan,
  defaultExpanded = true,
  onStepClick,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Calculate completed count and progress percentage
  const totalSteps = plan.steps.reduce(
    (acc, s) => acc + 1 + (s.subtasks ? s.subtasks.length : 0),
    0,
  );

  const completedSteps = plan.steps.reduce((acc, s) => {
    let count = s.status === "completed" ? 1 : 0;
    if (s.subtasks) {
      count += s.subtasks.filter((sub) => sub.status === "completed").length;
    }
    return acc + count;
  }, 0);

  const progressPercent =
    plan.progressPercent !== undefined
      ? plan.progressPercent
      : totalSteps > 0
        ? Math.round((completedSteps / totalSteps) * 100)
        : 0;

  return (
    <div
      className={cn(
        "my-3 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm transition-all",
        plan.status === "running" && "border-primary/30",
        className,
      )}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-secondary/40 transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ListTodo className="h-3.5 w-3.5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground truncate">
                {plan.title || "Execution Plan"}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded-full bg-secondary border border-border/40">
                {completedSteps}/{totalSteps}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Progress Pill */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground font-medium">
              {progressPercent}%
            </span>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </button>

      {/* Steps List */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="border-t border-border/40 px-4 py-3 bg-secondary/10 space-y-2">
              {plan.description && (
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {plan.description}
                </p>
              )}

              <div className="space-y-1.5">
                {plan.steps.map((step, idx) => (
                  <div key={step.id || idx} className="space-y-1">
                    {/* Main Step Row */}
                    <div
                      onClick={() => onStepClick && onStepClick(step)}
                      className={cn(
                        "flex items-start gap-2.5 p-2 rounded-lg transition-colors text-xs select-none",
                        onStepClick
                          ? "cursor-pointer hover:bg-secondary/60"
                          : "",
                        step.status === "in_progress" &&
                          "bg-primary/10 border border-primary/20 font-medium",
                      )}
                    >
                      <div className="mt-0.5">{getStepIcon(step.status)}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={cn(
                              "text-foreground/90 leading-snug",
                              step.status === "completed" &&
                                "line-through text-muted-foreground/70",
                              step.status === "in_progress" &&
                                "text-foreground font-semibold",
                            )}
                          >
                            {step.title}
                          </span>
                          {step.status === "in_progress" && (
                            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold tracking-wider shadow-2xs">
                              Active
                            </span>
                          )}
                        </div>
                        {step.description && (
                          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subtasks if any */}
                    {step.subtasks && step.subtasks.length > 0 && (
                      <div className="pl-6 space-y-1 border-l-2 border-border/40 ml-4 py-1">
                        {step.subtasks.map((sub, subIdx) => (
                          <div
                            key={sub.id || subIdx}
                            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-secondary/40 text-[11px] text-muted-foreground"
                          >
                            <CornerDownRight className="h-3 w-3 text-muted-foreground/40" />
                            {getStepIcon(sub.status)}
                            <span
                              className={cn(
                                sub.status === "completed" &&
                                  "line-through text-muted-foreground/60",
                                sub.status === "in_progress" &&
                                  "text-foreground font-medium",
                              )}
                            >
                              {sub.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
