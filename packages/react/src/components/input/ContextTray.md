---
name: ContextTray
suite: 3. Input & Prompting
suiteId: input
description: "Pinned context pill bar displaying active files, database tables, documentation, or user memory injected into the agent session."
cliCommand: npx @noetic-ui/cli add ContextTray
importStatement: "import { ContextTray } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# ContextTray

Pinned context pill bar displaying active files, database tables, documentation, or user memory injected into the agent session.

## Props

| Prop           | Type                   | Default | Required | Description                                                                                        |
| :------------- | :--------------------- | :------ | :------- | :------------------------------------------------------------------------------------------------- |
| `items`        | `ContextItem[]`        | —       | Yes      | Array of context items with id, label, type (file, database, memory, tool), and optional metadata. |
| `onRemoveItem` | `(id: string) => void` | —       | No       | Callback fired when user clicks the remove icon on a context pill.                                 |

## Basic Usage

```tsx
<ContextTray
  items={[
    { id: "1", label: "AgentOrchestrator.ts", type: "file" },
    { id: "2", label: "Postgres DB", type: "database" },
  ]}
  onRemoveItem={(id) => removeContext(id)}
/>
```
