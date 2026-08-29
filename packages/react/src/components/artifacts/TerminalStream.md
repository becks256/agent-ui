---
name: TerminalStream
suite: 5. Artifacts & Canvas
suiteId: canvas
description: "Authentic dark terminal console with command header, copy output, and live ANSI output streaming."
cliCommand: npx @noetic-ui/cli add TerminalStream
importStatement: "import { TerminalStream } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# TerminalStream

Authentic dark terminal console with command header, copy output, and live ANSI output streaming.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `output` | `string` | — | Yes | Terminal stdout/stderr text stream. |
| `command` | `string` | — | No | Shell command shown in the terminal titlebar prompt. |
| `status` | `'running' | 'completed' | 'failed'` | `'completed'` | No | Live execution status indicator. |

## Basic Usage

```tsx
<TerminalStream
  command="pnpm test"
  output="✔ 24 test suites passed\nDone in 1.4s"
  status="completed"
/>
```
