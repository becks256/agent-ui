---
name: ArtifactWorkspace
suite: 5. Artifacts & Canvas
suiteId: canvas
description: "Split-pane sidecar canvas with Live Preview, Code, Diff, and Doc tabs. Supports version switching, full-screen toggle, download, and copy."
cliCommand: npx @noetic-ui/cli add ArtifactWorkspace
importStatement: "import { ArtifactWorkspace } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
  - types.ts
  - CodeBlock
  - StreamingText
---

# ArtifactWorkspace

Split-pane sidecar canvas with Live Preview, Code, Diff, and Doc tabs. Supports version switching, full-screen toggle, download, and copy.

## Props

| Prop              | Type                        | Default | Required | Description                                               |
| :---------------- | :-------------------------- | :------ | :------- | :-------------------------------------------------------- |
| `artifact`        | `Artifact`                  | —       | Yes      | Active artifact object (code, markdown, diff, html, svg). |
| `versions`        | `Artifact[]`                | —       | No       | Optional array of previous artifact iterations.           |
| `onSelectVersion` | `(version: number) => void` | —       | No       | Callback when user selects a previous version.            |
| `onClose`         | `() => void`                | —       | No       | Callback when user clicks the close button.               |

## Basic Usage

```tsx
<ArtifactWorkspace
  artifact={{
    id: "art-1",
    title: "AgentOrchestrator.ts",
    type: "code",
    filename: "src/AgentOrchestrator.ts",
    language: "typescript",
    content: codeString,
  }}
  onClose={() => setSelectedArtifact(null)}
/>
```
