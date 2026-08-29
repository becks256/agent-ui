---
name: ChatContainer
suite: 2. Messages & Streaming
suiteId: chat
description: "Auto-scrolling conversation container with stick-to-bottom anchor, scroll-up detection, and floating jump-to-bottom pill."
cliCommand: npx @noetic-ui/cli add ChatContainer
importStatement: "import { ChatContainer } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
  - framer-motion
internalDependencies:
  - cn.ts
---

# ChatContainer

Auto-scrolling conversation container with stick-to-bottom anchor, scroll-up detection, and floating jump-to-bottom pill.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | Yes | Message bubbles and chat stream items to render. |
| `isStreaming` | `boolean` | `false` | No | When true, smoothly locks scroll to the bottom during incoming token generation. |
| `autoScrollThreshold` | `number` | `100` | No | Pixel threshold from bottom to determine if user has scrolled away. |

## Basic Usage

```tsx
<ChatContainer isStreaming={isGenerating}>
  {messages.map((msg) => (
    <MessageBubble key={msg.id} message={msg} />
  ))}
</ChatContainer>
```
