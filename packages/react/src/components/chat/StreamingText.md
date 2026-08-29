---
name: StreamingText
suite: 2. Messages & Streaming
suiteId: chat
description: "Zero-flicker streaming Markdown engine designed for Server-Sent Events (SSE). Renders typography smoothly with an ambient pulsing cursor during active streaming."
cliCommand: npx @noetic-ui/cli add StreamingText
importStatement: "import { StreamingText } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# StreamingText

Zero-flicker streaming Markdown engine designed for Server-Sent Events (SSE). Renders typography smoothly with an ambient pulsing cursor during active streaming.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `content` | `string` | — | Yes | Markdown or plain text content to render. |
| `isStreaming` | `boolean` | `false` | No | Whether the stream is actively in progress (shows animated typing cursor). |
| `className` | `string` | — | No | Optional CSS classes. |

## Basic Usage

```tsx
<StreamingText
  content="I am **analyzing** your TypeScript configuration..."
  isStreaming={true}
/>
```
