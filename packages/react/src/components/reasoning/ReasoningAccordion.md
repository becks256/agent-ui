---
name: ReasoningAccordion
suite: 1. Reasoning & Tools
suiteId: reasoning
description: "Animated collapsible container for Chain-of-Thought (CoT) reasoning streams. Includes live duration ticker (e.g. 3.8s), token consumption counter, and step-by-step progress checklist."
cliCommand: npx @noetic-ui/cli add ReasoningAccordion
importStatement: "import { ReasoningAccordion } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
  - framer-motion
internalDependencies:
  - cn.ts
  - types.ts
---

# ReasoningAccordion

Animated collapsible container for Chain-of-Thought (CoT) reasoning streams. Includes live duration ticker (e.g. 3.8s), token consumption counter, and step-by-step progress checklist.

## Props

| Prop              | Type             | Default | Required | Description                                                                                       |
| :---------------- | :--------------- | :------ | :------- | :------------------------------------------------------------------------------------------------ |
| `thought`         | `ThoughtProcess` | —       | Yes      | The thought process object containing title, markdown content, durationMs, tokens, and sub-steps. |
| `defaultExpanded` | `boolean`        | `false` | No       | Whether the reasoning accordion should be expanded upon initial mount.                            |
| `className`       | `string`         | —       | No       | Optional additional Tailwind CSS class names to apply to the container.                           |

## Types

### ThoughtProcess

```typescript
export interface ThoughtProcess {
  id: string;
  title?: string;
  content: string;
  durationMs?: number;
  isStreaming?: boolean;
  tokens?: number;
  steps?: ThoughtStep[];
}

export interface ThoughtStep {
  id: string;
  title: string;
  status: "pending" | "running" | "completed" | "failed";
  durationMs?: number;
}
```

## Basic Usage

```tsx
<ReasoningAccordion
  thought={{
    id: "th-1",
    title: "Evaluating query intent & execution DAG",
    content:
      "1. Parsed user prompt.\n2. Validating workspace constraints.\n3. Dispatching bash tool.",
    durationMs: 2400,
    tokens: 312,
  }}
/>
```

## Advanced Usage

```tsx
// Live streaming reasoning with animated progress steps
<ReasoningAccordion
  defaultExpanded={true}
  thought={{
    id: "th-stream",
    title: "Synthesizing build artifacts...",
    content: streamContent,
    isStreaming: true,
    steps: [
      { id: "1", title: "Verify workspace contracts", status: "completed" },
      { id: "2", title: "Compile ESM and DTS bundles", status: "running" },
      { id: "3", title: "Run typecheck verification", status: "pending" },
    ],
  }}
/>
```
