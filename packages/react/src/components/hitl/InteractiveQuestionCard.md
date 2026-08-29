---
name: InteractiveQuestionCard
suite: 4. Human-in-the-Loop
suiteId: hitl
description: "Structured single/multi-select option cards for agent clarification with accessible recommended badges."
cliCommand: npx @noetic-ui/cli add InteractiveQuestionCard
importStatement: "import { InteractiveQuestionCard } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# InteractiveQuestionCard

Structured single/multi-select option cards for agent clarification with accessible recommended badges.

## Props

| Prop            | Type                              | Default | Required | Description                                    |
| :-------------- | :-------------------------------- | :------ | :------- | :--------------------------------------------- |
| `question`      | `string`                          | —       | Yes      | The clarification question asked by the agent. |
| `options`       | `InteractiveOption[]`             | —       | Yes      | List of selectable option cards.               |
| `isMultiSelect` | `boolean`                         | `false` | No       | Allows multiple option selections.             |
| `onSubmit`      | `(selectedIds: string[]) => void` | —       | Yes      | Callback with the selected option IDs.         |

## Basic Usage

```tsx
<InteractiveQuestionCard
  question="Which bundler should we configure?"
  options={[
    {
      id: "tsup",
      label: "tsup (Recommended)",
      isRecommended: true,
      description: "Fast TypeScript bundler powered by esbuild",
    },
    {
      id: "rollup",
      label: "Rollup",
      description: "Classic plugin-based bundler",
    },
  ]}
  onSubmit={(ids) => submitAnswer(ids)}
/>
```
