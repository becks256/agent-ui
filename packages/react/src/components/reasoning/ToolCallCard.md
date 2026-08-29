---
name: ToolCallCard
suite: 1. Reasoning & Tools
suiteId: reasoning
description: "Expandable inspection card for agent tool executions (bash, search, file operations, SQL queries). Displays live status badges, latency timers, input parameters, and output results."
cliCommand: npx @noetic-ui/cli add ToolCallCard
importStatement: "import { ToolCallCard } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
  - framer-motion
internalDependencies:
  - cn.ts
  - types.ts
---

# ToolCallCard

Expandable inspection card for agent tool executions (bash, search, file operations, SQL queries). Displays live status badges, latency timers, input parameters, and output results.

## Props

| Prop              | Type         | Default | Required | Description                                                                                          |
| :---------------- | :----------- | :------ | :------- | :--------------------------------------------------------------------------------------------------- |
| `toolCall`        | `ToolCall`   | —       | Yes      | The tool execution payload with tool name, arguments, status, result, duration, and approval states. |
| `defaultExpanded` | `boolean`    | `false` | No       | Whether the card body showing args and results is open by default.                                   |
| `onApprove`       | `() => void` | —       | No       | Callback triggered when user approves a tool requiring explicit human authorization.                 |
| `onReject`        | `() => void` | —       | No       | Callback triggered when user rejects a pending tool execution.                                       |
| `className`       | `string`     | —       | No       | Optional additional Tailwind CSS class names.                                                        |

## Types

### ToolCall

```typescript
export interface ToolCall {
  id: string;
  name: string;
  args: Record<string, unknown> | string;
  result?: unknown;
  status:
    | "idle"
    | "running"
    | "success"
    | "error"
    | "cancelled"
    | "awaiting_approval";
  durationMs?: number;
  error?: string;
  requiresApproval?: boolean;
  approvalSeverity?: "low" | "medium" | "critical";
  approved?: boolean;
}
```

## Basic Usage

```tsx
<ToolCallCard
  toolCall={{
    id: "tc-1",
    name: "bash",
    args: { command: "pnpm test" },
    result: "✔ 24 test suites passed",
    status: "success",
    durationMs: 420,
  }}
/>
```
