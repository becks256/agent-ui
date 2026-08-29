---
name: AgentSwarmView
suite: 1. Reasoning & Tools
suiteId: reasoning
description: "Multi-agent collaboration visualizer showing subagent roles, delegation states, active halos, and live working tasks."
cliCommand: npx @noetic-ui/cli add AgentSwarmView
importStatement: "import { AgentSwarmView } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
  - framer-motion
internalDependencies:
  - cn.ts
  - types.ts
---

# AgentSwarmView

Multi-agent collaboration visualizer showing subagent roles, delegation states, active halos, and live working tasks.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `agents` | `SwarmAgent[]` | — | Yes | Array of subagents with role, name, status, avatar, and current active task. |
| `activeAgentId` | `string` | — | No | ID of the currently focused or active agent in the swarm. |
| `onSelectAgent` | `(agentId: string) => void` | — | No | Callback fired when an agent pill or avatar is clicked. |
| `className` | `string` | — | No | Optional additional CSS classes. |

## Types

### SwarmAgent

```typescript
export interface SwarmAgent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'working' | 'completed' | 'failed';
  avatar?: string;
  currentTask?: string;
  progress?: number;
}
```

## Basic Usage

```tsx
<AgentSwarmView
  agents={[
    { id: 'a1', name: 'Planner', role: 'Architecture', status: 'working', currentTask: 'Formulating task graph...' },
    { id: 'a2', name: 'Coder', role: 'TypeScript', status: 'idle' },
  ]}
  activeAgentId="a1"
/>
```
