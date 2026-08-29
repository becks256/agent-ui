---
name: CodeBlock
suite: 5. Artifacts & Canvas
suiteId: canvas
description: "Syntax-highlighted code viewer with line numbers, copy-to-clipboard animation, language badges, and fullscreen expansion."
cliCommand: npx @noetic-ui/cli add CodeBlock
importStatement: "import { CodeBlock } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# CodeBlock

Syntax-highlighted code viewer with line numbers, copy-to-clipboard animation, language badges, and fullscreen expansion.

## Props

| Prop              | Type      | Default        | Required | Description                                            |
| :---------------- | :-------- | :------------- | :------- | :----------------------------------------------------- |
| `code`            | `string`  | —              | Yes      | Raw code string to display.                            |
| `language`        | `string`  | `'typescript'` | No       | Programming language for syntax badge formatting.      |
| `filename`        | `string`  | —              | No       | Optional file path shown in the header bar.            |
| `showLineNumbers` | `boolean` | `true`         | No       | Whether line numbers should be rendered in the gutter. |

## Basic Usage

```tsx
<CodeBlock
  filename="index.ts"
  language="typescript"
  code="export const agent = new Agent();"
/>
```
