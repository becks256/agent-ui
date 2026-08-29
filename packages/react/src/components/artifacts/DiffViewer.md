---
name: DiffViewer
suite: 5. Artifacts & Canvas
suiteId: canvas
description: "Git diff inspector showing line additions, deletions, and hunk headers with high-contrast color highlights."
cliCommand: npx @noetic-ui/cli add DiffViewer
importStatement: "import { DiffViewer } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# DiffViewer

Git diff inspector showing line additions, deletions, and hunk headers with high-contrast color highlights.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `diffText` | `string` | — | Yes | Standard unified diff string (e.g. output from git diff). |
| `filename` | `string` | — | No | Filename displayed in the diff header. |

## Basic Usage

```tsx
<DiffViewer
  filename="AgentOrchestrator.ts"
  diffText={`--- a/src/app.ts\n+++ b/src/app.ts\n@@ -1,3 +1,4 @@\n-const a = 1;\n+const a = 2;`}
/>
```
