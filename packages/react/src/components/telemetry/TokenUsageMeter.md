---
name: TokenUsageMeter
suite: 6. Telemetry & States
suiteId: telemetry
description: "Context window utilization gauge with prompt/completion token breakdown and live dollar cost tracking."
cliCommand: npx @noetic-ui/cli add TokenUsageMeter
importStatement: "import { TokenUsageMeter } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
  - types.ts
---

# TokenUsageMeter

Context window utilization gauge with prompt/completion token breakdown and live dollar cost tracking.

## Props

| Prop        | Type         | Default  | Required | Description                                                                 |
| :---------- | :----------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `usage`     | `TokenUsage` | —        | Yes      | Token consumption object containing prompt, completion, total, and costUsd. |
| `maxTokens` | `number`     | `128000` | No       | Maximum context capacity of the active model.                               |
| `showCost`  | `boolean`    | `true`   | No       | Whether estimated USD cost should be rendered.                              |

## Basic Usage

```tsx
<TokenUsageMeter
  usage={{ prompt: 1420, completion: 580, total: 2000, costUsd: 0.006 }}
  maxTokens={128000}
/>
```
