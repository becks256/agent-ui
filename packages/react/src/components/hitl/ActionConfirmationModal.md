---
name: ActionConfirmationModal
suite: 4. Human-in-the-Loop
suiteId: hitl
description: "Safety gatekeeper modal for sensitive shell commands, file overwrites, and DB migrations with severity badges (LOW, MEDIUM, CRITICAL)."
cliCommand: npx @noetic-ui/cli add ActionConfirmationModal
importStatement: "import { ActionConfirmationModal } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
  - framer-motion
internalDependencies:
  - cn.ts
---

# ActionConfirmationModal

Safety gatekeeper modal for sensitive shell commands, file overwrites, and DB migrations with severity badges (LOW, MEDIUM, CRITICAL).

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `isOpen` | `boolean` | — | Yes | Whether the modal dialog is displayed. |
| `title` | `string` | — | Yes | Dialog title describing the action. |
| `description` | `string` | — | No | Explanation of what will happen upon approval. |
| `actionType` | `'command' | 'file_write' | 'api_call' | 'db_mutation' | string` | — | Yes | Action classification for icon and badge formatting. |
| `payload` | `string | Record<string, unknown>` | — | Yes | Command string or JSON object to inspect before execution. |
| `severity` | `'low' | 'medium' | 'critical'` | `'medium'` | No | Risk severity level. |
| `onApprove` | `() => void` | — | Yes | Callback when user grants approval. |
| `onReject` | `() => void` | — | Yes | Callback when user denies execution. |
| `onClose` | `() => void` | — | Yes | Callback when user dismisses the modal backdrop. |

## Basic Usage

```tsx
<ActionConfirmationModal
  isOpen={isModalOpen}
  title="Execute Shell Command"
  actionType="command"
  payload="pnpm run build && pnpm publish"
  severity="critical"
  onApprove={() => executeCommand()}
  onReject={() => cancelCommand()}
  onClose={() => setIsModalOpen(false)}
/>
```
