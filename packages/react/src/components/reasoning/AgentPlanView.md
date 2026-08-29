---
name: AgentPlanView
suite: 1. Reasoning & Tools
suiteId: reasoning
description: "Hierarchical task DAG checklist with animated progress bars, status indicators (completed, in-progress, failed, skipped), and nested subtasks."
cliCommand: npx @noetic-ui/cli add AgentPlanView
importStatement: "import { AgentPlanView } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
  - framer-motion
internalDependencies:
  - cn.ts
  - types.ts
---

# AgentPlanView

Hierarchical task DAG checklist with animated progress bars, status indicators (completed, in-progress, failed, skipped), and nested subtasks.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `plan` | `AgentPlan` | — | Yes | The hierarchical plan object containing step items, statuses, progress, and nested subtasks. |
| `defaultExpanded` | `boolean` | `true` | No | Whether the plan task list is expanded by default. |
| `onStepClick` | `(step: AgentPlanStep) => void` | — | No | Optional click handler when a user selects a plan step. |
| `className` | `string` | — | No | Optional container CSS classes. |

## Types

### AgentPlan

```typescript
export interface AgentPlan {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'running' | 'completed' | 'failed';
  steps: AgentPlanStep[];
  progressPercent?: number;
}

export interface AgentPlanStep {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  subtasks?: AgentPlanStep[];
  toolCallId?: string;
}
```

## Basic Usage

```tsx
<AgentPlanView
  plan={{
    id: 'plan-1',
    title: 'Bundle Optimization & Refactor',
    status: 'running',
    steps: [
      { id: '1', title: 'Audit bundle dependencies', status: 'completed' },
      { id: '2', title: 'Configure ESM tree-shaking', status: 'in_progress' },
      { id: '3', title: 'Verify exports contract', status: 'pending' },
    ],
  }}
/>
```
