---
name: BranchSwitcher
suite: 2. Messages & Streaming
suiteId: chat
description: "Message fork and alternative response variant navigator (e.g. < 2 of 4 >) with smooth transitions."
cliCommand: npx @noetic-ui/cli add BranchSwitcher
importStatement: "import { BranchSwitcher } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# BranchSwitcher

Message fork and alternative response variant navigator (e.g. < 2 of 4 >) with smooth transitions.

## Props

| Prop             | Type                         | Default | Required | Description                                               |
| :--------------- | :--------------------------- | :------ | :------- | :-------------------------------------------------------- |
| `currentIndex`   | `number`                     | —       | Yes      | 1-indexed number of the currently active branch.          |
| `totalBranches`  | `number`                     | —       | Yes      | Total number of available alternative response variants.  |
| `onSelectBranch` | `(newIndex: number) => void` | —       | Yes      | Callback triggered when previous/next chevron is clicked. |

## Basic Usage

```tsx
<BranchSwitcher
  currentIndex={2}
  totalBranches={4}
  onSelectBranch={(index) => setBranch(index)}
/>
```
