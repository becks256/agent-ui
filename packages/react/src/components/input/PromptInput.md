---
name: PromptInput
suite: 3. Input & Prompting
suiteId: input
description: "Auto-expanding textarea with token counter, model selector trigger, context tray, attachment manager, and stop generation control."
cliCommand: npx @noetic-ui/cli add PromptInput
importStatement: "import { PromptInput } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
  - types.ts
  - ModelSelector
  - ContextTray
  - SlashCommandMenu
---

# PromptInput

Auto-expanding textarea with token counter, model selector trigger, context tray, attachment manager, and stop generation control.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `string` | — | Yes | Current prompt text input value. |
| `onChange` | `(value: string) => void` | — | Yes | Change handler for the input textarea. |
| `onSubmit` | `(content: string, attachments?: FileAttachment[]) => void` | — | Yes | Submit handler triggered via Enter key or submit button. |
| `onStop` | `() => void` | — | No | Handler called when user clicks the stop generation button during streaming. |
| `isStreaming` | `boolean` | `false` | No | Switches the action button into a stop button when true. |
| `placeholder` | `string` | `'Ask a question or type / for commands...'` | No | Textarea placeholder string. |
| `models` | `ModelInfo[]` | — | No | Optional list of AI models to display in the embedded model selector dropdown. |
| `selectedModel` | `ModelInfo` | — | No | Currently selected model. |
| `onSelectModel` | `(model: ModelInfo) => void` | — | No | Callback when user selects a different model. |
| `contextItems` | `ContextItem[]` | — | No | Pinned context items displayed in the input tray. |
| `onRemoveContextItem` | `(id: string) => void` | — | No | Handler called when user dismisses a context item. |

## Basic Usage

```tsx
<PromptInput
  value={text}
  onChange={setText}
  onSubmit={(content) => handleSend(content)}
  placeholder="Ask your agent or type /plan, /search..."
/>
```
