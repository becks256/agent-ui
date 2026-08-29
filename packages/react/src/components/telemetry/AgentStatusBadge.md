---
name: AgentStatusBadge
suite: 6. Telemetry & States
suiteId: telemetry
description: "Ambient status indicator with animated pulsing halos across 6 states (Thinking, Searching, Coding, Awaiting approval, Completed, Idle, Paused)."
cliCommand: npx @noetic-ui/cli add AgentStatusBadge
importStatement: "import { AgentStatusBadge } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# AgentStatusBadge

Ambient status indicator with animated pulsing halos across 6 states (Thinking, Searching, Coding, Awaiting approval, Completed, Idle, Paused).

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `state` | `'idle' | 'thinking' | 'searching' | 'coding' | 'awaiting_approval' | 'completed' | 'paused'` | — | Yes | Current operational state of the agent. |
| `variant` | `'solid' | 'subtle'` | `'subtle'` | No | Visual badge style. |
| `customLabel` | `string` | — | No | Custom text override for the state label. |

## Basic Usage

```tsx
<AgentStatusBadge state="thinking" customLabel="Synthesizing plan..." />
```
