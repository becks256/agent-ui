---
name: ModelSelector
suite: 3. Input & Prompting
suiteId: input
description: "Model dropdown with provider badges, speed ratings, and reasoning effort indicators."
cliCommand: npx @noetic-ui/cli add ModelSelector
importStatement: "import { ModelSelector } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
  - types.ts
---

# ModelSelector

Model dropdown with provider badges, speed ratings, and reasoning effort indicators.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `models` | `ModelInfo[]` | — | Yes | List of available models. |
| `selectedModel` | `ModelInfo` | — | Yes | Currently selected model. |
| `onSelectModel` | `(model: ModelInfo) => void` | — | Yes | Callback when model is selected. |

## Basic Usage

```tsx
<ModelSelector
  models={modelsList}
  selectedModel={activeModel}
  onSelectModel={(m) => setActiveModel(m)}
/>
```
