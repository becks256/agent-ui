# @noetic-ui/react

<p align="center">
  <strong>A high-design, tasteful open-source component library for cognitive AI, Chain-of-Thought reasoning, tool execution, and multi-agent workflows.</strong>
</p>

<p align="center">
  <a href="https://github.com/becks256/agent-ui">GitHub</a> •
  <a href="#installation">Installation</a> •
  <a href="#components">Components</a> •
  <a href="#quickstart">Quickstart</a> •
  <a href="#theme-and-contrast">Theme & Contrast</a>
</p>

---

## Overview

**Noetic UI** (*from the Greek noēsis / nous — intellect, thought, mind*) is built specifically for modern AI agent interfaces:
- **Chain of Thought Reasoning**: Live collapsible reasoning streams with token tracking, live duration timers, and step checklists.
- **Tool Invocations & Output Inspectors**: Interactive execution cards with live status indicators, parameters, ANSI terminals, and diff inspectors.
- **Multi-Agent Swarm Orchestration**: Subagent delegation visualizers with live state halos.
- **Hierarchical Task DAGs**: Dynamic plan step tracking with interactive checkboxes and subtasks.
- **Human-in-the-Loop Controls**: High-impact action authorization gates and structured disambiguation cards.
- **Sidecar Artifact Canvas**: Split-pane workspace for rendering live code, diffs, terminal streams, and documents alongside the chat.
- **Multimodal Inputs**: Auto-resizing prompt input, context tray, slash command menu, and drag-and-drop file uploaders.
- **Dynamic Theme & Contrast Studio**: Full-spectrum HSL palette switching with real-time WCAG 2.1 AAA text contrast calculations and 4-tier surface elevation.

---

## Installation

```bash
npm install @noetic-ui/react framer-motion lucide-react clsx tailwind-merge
# or
pnpm add @noetic-ui/react framer-motion lucide-react clsx tailwind-merge
# or
yarn add @noetic-ui/react framer-motion lucide-react clsx tailwind-merge
```

---

## Quickstart

```tsx
import {
  ChatContainer,
  MessageBubble,
  PromptInput,
  ReasoningAccordion,
  AgentStatusBadge,
  ThemeColorPicker,
} from '@noetic-ui/react';
import { useState } from 'react';

export function AgentApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: text },
    ]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg">Noetic Agent</h1>
          <AgentStatusBadge state="thinking" />
        </div>
        <ThemeColorPicker mode="popover" />
      </header>

      <ChatContainer>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} variant="solid" />
        ))}
      </ChatContainer>

      <PromptInput
        value={input}
        onChange={setInput}
        onSubmit={handleSend}
        placeholder="Ask your agent or type /plan, /search..."
      />
    </div>
  );
}
```

---

## 23 Components Across 7 Core Suites

### 1. Reasoning & Tool Execution Suite
* **`ReasoningAccordion`**: Collapsible thought container for Chain-of-Thought reasoning with live duration ticker (`3.8s`), token count, and step-by-step progress checklist.
* **`ToolCallCard`**: Expandable card for tool executions (`bash`, `web_search`, `read_file`, `sql_query`) with live status pills, execution duration, and multi-tab output inspector.
* **`AgentPlanView`**: Hierarchical task DAG checklist with progress bars, active status animations, and subtasks.
* **`AgentSwarmView`**: Multi-agent swarm coordinator visualizer showing agent delegation, avatar rings, and active working halos.

### 2. Messages & Streaming Suite
* **`MessageBubble`**: Role-aware container (`user`, `assistant`, `system`, `agent`) with model tags, execution latency, token counts, and 4 contrast variants (`solid`, `subtle`, `neutral`, `bordered`).
* **`StreamingText`**: Smooth Markdown renderer with zero-flicker streaming and live pulsing cursor.
* **`BranchSwitcher`**: Message branch and fork variant navigator (`< 2 of 4 >`).
* **`ChatContainer`**: Auto-scrolling conversation container with stick-to-bottom anchor, scroll-up detection, and floating jump-to-bottom pill.

### 3. Multimodal Input Suite
* **`PromptInput`**: Auto-expanding textarea with token counter, model selector trigger, attachment trigger, and stop generation / submit controls.
* **`DragAndDropUploader`**: Multi-file drag and drop surface with upload progress and thumbnail previews.
* **`ContextTray`**: Pinned context pill bar (files, database tables, memories).
* **`SlashCommandMenu`**: Instant autocomplete menu triggered by `/`.
* **`ModelSelector`**: Model dropdown with provider badges, speed ratings, and reasoning effort indicators.

### 4. Human-in-the-Loop (HITL) Suite
* **`ActionConfirmationModal`**: High-impact action interceptor for dangerous bash commands or DB mutations with risk severity badges (`LOW`, `MEDIUM`, `CRITICAL`).
* **`InteractiveQuestionCard`**: Structured single/multi-select option cards for agent clarification with accessible recommended badges.
* **`FeedbackActions`**: Thumbs up/down feedback bar with retry and copy actions.

### 5. Artifacts & Canvas Suite
* **`ArtifactWorkspace`**: Split-pane sidecar canvas with Live Preview, Code, Diff, and Doc tabs.
* **`CodeBlock`**: Syntax-highlighted code block with line numbering, copy feedback, and fullscreen expansion.
* **`DiffViewer`**: Side-by-side / unified git diff viewer with line additions/deletions.
* **`TerminalStream`**: Dark terminal console with live ANSI output streaming.

### 6. Telemetry & Live States Suite
* **`AgentStatusBadge`**: Ambient state indicator with pulsing halos (`Thinking...`, `Searching web...`, `Writing code...`, `Awaiting approval...`, `Completed`, `Idle`).
* **`TokenUsageMeter`**: Context window utilization gauge with live cost tracking.

### 7. Theme & Customization Suite
* **`ThemeColorPicker`**: Full-featured HSL sliders with smart WCAG contrast estimation, message bubble modes, and CSS export.

---

## Theme & Contrast Intelligence

Noetic UI components dynamically adapt their foreground contrast using WCAG 2.1 relative luminance calculations. When bright primary colors like Neon Lime (85°) or Cyber Cyan (195°) are used, text automatically switches to dark foreground to guarantee AA & AAA compliance (10.8:1+ contrast).

```tsx
import { ThemeColorPicker } from '@noetic-ui/react';

// Embed inline or as a popover studio
<ThemeColorPicker mode="popover" triggerLabel="Customize Theme" />
```

---

## CLI Integration

Prefer copy-pasting components into your repository like shadcn/ui? Use the official CLI:

```bash
npx @noetic-ui/cli init
npx @noetic-ui/cli add PromptInput MessageBubble
npx @noetic-ui/cli add --all
```

---

## License

MIT © [becks256](https://github.com/becks256)
