---
name: FeedbackActions
suite: 4. Human-in-the-Loop
suiteId: hitl
description: "Thumbs up/down rating bar with copy, retry, and feedback confirmation state."
cliCommand: npx @noetic-ui/cli add FeedbackActions
importStatement: "import { FeedbackActions } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# FeedbackActions

Thumbs up/down rating bar with copy, retry, and feedback confirmation state.

## Props

| Prop         | Type                | Default                 | Required | Description                                |
| :----------- | :------------------ | :---------------------- | :------- | :----------------------------------------- |
| `onFeedback` | `(type: 'thumbs_up' | 'thumbs_down') => void` | —        | No                                         | Callback when positive or negative feedback is clicked. |
| `onCopy`     | `() => void`        | —                       | No       | Callback when copy button is clicked.      |
| `onRetry`    | `() => void`        | —                       | No       | Callback when regenerate/retry is clicked. |

## Basic Usage

```tsx
<FeedbackActions
  onFeedback={(type) => console.log(type)}
  onCopy={() => navigator.clipboard.writeText(content)}
  onRetry={() => regenerate()}
/>
```
