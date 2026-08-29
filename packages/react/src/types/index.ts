import type { ReactNode } from "react";

export type Role = "user" | "assistant" | "system" | "tool" | "agent";

export interface ModelInfo {
  id: string;
  name: string;
  provider?:
    | "openai"
    | "anthropic"
    | "google"
    | "meta"
    | "deepseek"
    | "mistral"
    | "local"
    | string;
  icon?: ReactNode;
  contextWindow?: number;
  description?: string;
  speed?: "fast" | "moderate" | "slow";
  reasoningEffort?: "low" | "medium" | "high";
}

export interface TokenUsage {
  prompt?: number;
  completion?: number;
  total?: number;
  costUsd?: number;
}

export interface ThoughtStep {
  id: string;
  title: string;
  status: "pending" | "running" | "completed" | "failed";
  durationMs?: number;
}

export interface ThoughtProcess {
  id: string;
  title?: string;
  content: string;
  durationMs?: number;
  isStreaming?: boolean;
  tokens?: number;
  steps?: ThoughtStep[];
}

export type ToolStatus =
  "idle" | "running" | "success" | "error" | "cancelled" | "awaiting_approval";

export interface ToolCall {
  id: string;
  name: string;
  args: Record<string, unknown> | string;
  result?: unknown;
  status: ToolStatus;
  durationMs?: number;
  error?: string;
  requiresApproval?: boolean;
  approvalSeverity?: "low" | "medium" | "critical";
  approved?: boolean;
}

export type ArtifactType =
  "code" | "markdown" | "diff" | "html" | "svg" | "table" | "json" | "image";

export interface Artifact {
  id: string;
  title: string;
  type: ArtifactType;
  content: string;
  language?: string;
  filename?: string;
  version?: number;
  description?: string;
  isLivePreviewable?: boolean;
}

export type StepStatus =
  "pending" | "in_progress" | "completed" | "failed" | "skipped";

export interface AgentPlanStep {
  id: string;
  title: string;
  description?: string;
  status: StepStatus;
  subtasks?: AgentPlanStep[];
  toolCallId?: string;
}

export interface AgentPlan {
  id: string;
  title: string;
  description?: string;
  status: "draft" | "running" | "completed" | "failed";
  steps: AgentPlanStep[];
  progressPercent?: number;
}

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  previewUrl?: string;
  status: "uploading" | "ready" | "error";
  progress?: number;
}

export interface AgentMessage {
  id: string;
  role: Role;
  content: string;
  createdAt?: Date | string | number;
  name?: string;
  avatar?: string;
  model?: ModelInfo;
  tokens?: TokenUsage;
  latencyMs?: number;
  status?: "idle" | "streaming" | "completed" | "error";
  thoughts?: ThoughtProcess[];
  toolCalls?: ToolCall[];
  artifacts?: Artifact[];
  plan?: AgentPlan;
  attachments?: FileAttachment[];
  branches?: AgentMessage[][];
  selectedBranchIndex?: number;
}
