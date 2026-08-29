---
name: SlashCommandMenu
suite: 3. Input & Prompting
suiteId: input
description: "Instant autocomplete command menu triggered by `/` with keyboard navigation, descriptions, and icon badges."
cliCommand: npx @noetic-ui/cli add SlashCommandMenu
importStatement: "import { SlashCommandMenu } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# SlashCommandMenu

Instant autocomplete command menu triggered by `/` with keyboard navigation, descriptions, and icon badges.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `isOpen` | `boolean` | — | Yes | Whether the dropdown popover is currently visible. |
| `filterText` | `string` | — | Yes | The search filter query typed after the slash. |
| `commands` | `SlashCommand[]` | — | No | Optional custom list of commands to override default commands. |
| `onSelectCommand` | `(cmd: SlashCommand) => void` | — | Yes | Callback when a command is selected via enter or mouse click. |
| `placement` | `'bottom-full' | 'top-full' | 'inline'` | `'bottom-full'` | No | Positioning mode: floating above input (bottom-full), below (top-full), or static relative (inline). |
| `onClose` | `() => void` | — | Yes | Callback to dismiss the menu. |

## Basic Usage

```tsx
<SlashCommandMenu
  isOpen={showMenu}
  filterText={searchQuery}
  onSelectCommand={(cmd) => applyCommand(cmd)}
  onClose={() => setShowMenu(false)}
/>
```
