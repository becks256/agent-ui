# Agent UI

<p align="center">
  <strong>A high-design, tasteful open-source component library for agentic AI applications.</strong>
</p>

<p align="center">
  <a href="#components">Components</a> •
  <a href="#installation">Installation</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Overview

Agent UI is built from the ground up to support the complex, dynamic requirements of modern agentic AI interfaces:
- **Chain of Thought Reasoning**: Live collapsible reasoning streams with token tracking and duration timers.
- **Tool Invocations & Output Inspectors**: Execution cards with live status indicators, parameters, ANSI terminals, and diff inspectors.
- **Multi-Agent Swarm Orchestration**: Subagent delegation visualizers with live state halos.
- **Hierarchical Task DAGs**: Dynamic plan step tracking with interactive checkboxes and subtasks.
- **Human-in-the-Loop Controls**: High-impact action authorization gates and structured disambiguation cards.
- **Sidecar Artifact Canvas**: Split-pane workspace for rendering live code, diffs, terminal streams, and documents alongside the chat.
- **Multimodal Inputs**: Auto-resizing prompt input, context tray, slash command menu, and drag-and-drop file uploaders.

---

## Components

### 1. Reasoning & Tool Execution Suite
- `ReasoningAccordion`: Animated Chain-of-Thought stream container with live timer and token metrics.
- `ToolCallCard`: Expandable tool execution card with parameter inspector and output tabs.
- `AgentPlanView`: Hierarchical task checklist with status indicators and progress bar.
- `AgentSwarmView`: Multi-agent collaboration visualizer with delegation paths.

### 2. Conversation & Message Suite
- `ChatContainer`: Auto-scrolling viewport with stick-to-bottom anchor and floating jump-to-bottom pill.
- `MessageBubble`: Role-aware message container with model badges, token counts, and embedded thoughts/tools/artifacts.
- `StreamingText`: Smooth markdown renderer with typing cursor and math support.
- `BranchSwitcher`: Fork and branch variant navigator (`< 2 of 4 >`).

### 3. Multimodal Input Suite
- `PromptInput`: Auto-expanding textarea with keyboard shortcuts and model switcher.
- `DragAndDropUploader`: Multi-file drag & drop surface with preview cards and progress indicators.
- `ContextTray`: Pinned context items bar (files, database tables, memories).
- `SlashCommandMenu`: Autocomplete menu triggerable by `/`.
- `ModelSelector`: Model dropdown with provider icons and reasoning capacity indicators.

### 4. Human-in-the-Loop (HITL) Suite
- `ActionConfirmationModal`: Destructive command/action authorization interceptor.
- `InteractiveQuestionCard`: Structured single/multi-select option cards for agent clarification.
- `FeedbackActions`: Thumbs up/down with feedback and retry actions.

### 5. Artifacts & Canvas Suite
- `ArtifactWorkspace`: Split-pane sidecar canvas with Live Preview, Code, Diff, and Doc tabs.
- `CodeBlock`: Syntax-highlighted code viewer with copy animations and fullscreen mode.
- `DiffViewer`: Git diff viewer with line additions and deletions.
- `TerminalStream`: Dark authentic terminal console with ANSI output streaming.

### 6. Telemetry Suite
- `AgentStatusBadge`: Ambient state indicator with pulsing neon halos.
- `TokenUsageMeter`: Context window utilization gauge with live cost tracking.

---

## Installation

### NPM Package
```bash
npm install @agent-ui/react framer-motion lucide-react
# or
pnpm add @agent-ui/react framer-motion lucide-react
```

### Registry CLI (shadcn-style)
```bash
npx agent-ui init
npx agent-ui add ReasoningAccordion
npx agent-ui add ToolCallCard
npx agent-ui add PromptInput
```

---

## Quickstart

```tsx
import { ChatContainer, MessageBubble, PromptInput } from '@agent-ui/react';
import { useState } from 'react';

export function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: text },
    ]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <ChatContainer>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </ChatContainer>
      <PromptInput
        value={input}
        onChange={setInput}
        onSubmit={handleSend}
      />
    </div>
  );
}
```

---

## Monorepo Structure

```text
agent-ui/
├── apps/
│   └── docs/            # Next.js 15 interactive documentation and live agent simulator
├── packages/
│   ├── react/           # Core React component library (@agent-ui/react)
│   └── cli/             # CLI for copy-pasting components into projects (agent-ui)
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

---

## Development

```bash
# Install dependencies
pnpm install

# Start documentation and showcase playground
pnpm dev

# Build all packages
pnpm build
```

---

## License
MIT
