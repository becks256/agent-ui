---
name: MessageBubble
suite: 2. Messages & Streaming
suiteId: chat
description: "Role-aware message container supporting 4 contrast variants (solid, subtle, neutral, bordered). Integrates embedded thoughts, tool cards, plans, branch navigation, and artifact links."
cliCommand: npx @noetic-ui/cli add MessageBubble
importStatement: "import { MessageBubble } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
  - framer-motion
internalDependencies:
  - cn.ts
  - types.ts
  - ReasoningAccordion
  - ToolCallCard
  - AgentPlanView
  - CodeBlock
---

# MessageBubble

Role-aware message container supporting 4 contrast variants (solid, subtle, neutral, bordered). Integrates embedded thoughts, tool cards, plans, branch navigation, and artifact links.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `message` | `AgentMessage` | — | Yes | The full message object containing content, role, model, thoughts, tool calls, and artifacts. |
| `variant` | `'solid' | 'subtle' | 'neutral' | 'bordered'` | `'solid'` | No | Visual styling and contrast mode for user bubbles. |
| `onRetry` | `(messageId: string) => void` | — | No | Callback when retry action is clicked. |
| `onEdit` | `(messageId: string) => void` | — | No | Callback when edit action is clicked. |
| `onSelectBranch` | `(messageId: string, branchIndex: number) => void` | — | No | Callback when switching alternate response variants. |
| `onApproveTool` | `(toolCallId: string) => void` | — | No | Callback when user approves an embedded tool call. |
| `onSelectArtifact` | `(artifactId: string) => void` | — | No | Callback when user clicks an artifact launcher pill. |

## Types

### AgentMessage

```typescript
export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'agent';
  content: string;
  createdAt?: Date | string | number;
  name?: string;
  model?: ModelInfo;
  tokens?: TokenUsage;
  latencyMs?: number;
  thoughts?: ThoughtProcess[];
  toolCalls?: ToolCall[];
  artifacts?: Artifact[];
  plan?: AgentPlan;
  branches?: AgentMessage[][];
  selectedBranchIndex?: number;
}
```

## Basic Usage

```tsx
<MessageBubble
  message={{
    id: 'msg-1',
    role: 'user',
    content: 'How do I optimize Next.js 15 bundle size?',
  }}
  variant="solid"
/>
```
