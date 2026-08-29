---
name: DragAndDropUploader
suite: 3. Input & Prompting
suiteId: input
description: "Multi-file drag-and-drop dropzone surface with thumbnail previews, upload progress meters, and deletion controls."
cliCommand: npx @noetic-ui/cli add DragAndDropUploader
importStatement: "import { DragAndDropUploader } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
  - types.ts
---

# DragAndDropUploader

Multi-file drag-and-drop dropzone surface with thumbnail previews, upload progress meters, and deletion controls.

## Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `attachments` | `FileAttachment[]` | — | Yes | Array of currently attached files with upload status. |
| `onUploadFiles` | `(files: File[]) => void` | — | Yes | Callback fired when files are dropped or selected via file browser. |
| `onRemoveAttachment` | `(id: string) => void` | — | Yes | Callback fired when an attachment is removed. |

## Basic Usage

```tsx
<DragAndDropUploader
  attachments={files}
  onUploadFiles={(newFiles) => handleUpload(newFiles)}
  onRemoveAttachment={(id) => removeFile(id)}
/>
```
