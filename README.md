# Noetic UI

<p align="center">
  <strong>A high-design, tasteful open-source component library and CLI for cognitive AI and agentic applications.</strong>
</p>

<p align="center">
  <a href="#components">Components</a> •
  <a href="#installation">Installation</a> •
  <a href="#cli-usage">CLI Usage</a> •
  <a href="#quickstart">Quickstart</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Overview

**Noetic UI** (*from the Greek noēsis / nous — intellect, thought, mind*) is built from the ground up to support the complex, dynamic requirements of modern cognitive AI and agentic interfaces:
- **Chain of Thought Reasoning**: Live collapsible reasoning streams with token tracking, duration timers, and step-by-step progress checklists.
- **Tool Invocations & Output Inspectors**: Execution cards with live status indicators, parameters, ANSI terminals, and diff inspectors.
- **Multi-Agent Swarm Orchestration**: Subagent delegation visualizers with live state halos.
- **Hierarchical Task DAGs**: Dynamic plan step tracking with interactive checkboxes and subtasks.
- **Human-in-the-Loop Controls**: High-impact action authorization gates and structured disambiguation cards.
- **Sidecar Artifact Canvas**: Split-pane workspace for rendering live code, diffs, terminal streams, and documents alongside the chat.
- **Multimodal Inputs**: Auto-resizing prompt input, context tray, slash command menu, and drag-and-drop file uploaders.
- **Dynamic Theme & Contrast Studio**: Full-spectrum HSL palette switching with real-time WCAG 2.1 AAA text contrast calculations and 4-tier surface elevation.

---

## Components (23 Primitives across 7 Suites)

### 1. Reasoning & Tool Execution Suite
- `ReasoningAccordion`: Animated Chain-of-Thought stream container with live timer and token metrics.
- `ToolCallCard`: Expandable tool execution card with parameter inspector and output tabs.
- `AgentPlanView`: Hierarchical task checklist with status indicators and progress bar.
- `AgentSwarmView`: Multi-agent collaboration visualizer with delegation paths.

### 2. Messages & Streaming Suite
- `ChatContainer`: Auto-scrolling viewport with stick-to-bottom anchor and floating jump-to-bottom pill.
- `MessageBubble`: Role-aware message container with model badges, token counts, and embedded thoughts/tools/artifacts across 4 contrast variants (`solid`, `subtle`, `neutral`, `bordered`).
- `StreamingText`: Smooth markdown renderer with zero-flicker streaming and pulsing typing cursor.
- `BranchSwitcher`: Fork and branch variant navigator (`< 2 of 4 >`).

### 3. Multimodal Input Suite
- `PromptInput`: Auto-expanding textarea with token counter, attachments, and model switcher.
- `DragAndDropUploader`: Multi-file drag & drop surface with preview cards and progress indicators.
- `ContextTray`: Pinned context items bar (files, database tables, memories).
- `SlashCommandMenu`: Autocomplete menu triggerable by `/`.
- `ModelSelector`: Model dropdown with provider icons and reasoning capacity indicators.

### 4. Human-in-the-Loop (HITL) Suite
- `ActionConfirmationModal`: Destructive command/action authorization interceptor with severity badges.
- `InteractiveQuestionCard`: Structured single/multi-select option cards for agent clarification.
- `FeedbackActions`: Thumbs up/down with feedback and retry actions.

### 5. Artifacts & Canvas Suite
- `ArtifactWorkspace`: Split-pane sidecar canvas with Live Preview, Code, Diff, and Doc tabs.
- `CodeBlock`: Syntax-highlighted code viewer with copy animations and fullscreen mode.
- `DiffViewer`: Git diff viewer with line additions and deletions.
- `TerminalStream`: Dark authentic terminal console with ANSI output streaming.

### 6. Telemetry & States Suite
- `AgentStatusBadge`: Ambient state indicator with pulsing neon halos across 6 states.
- `TokenUsageMeter`: Context window utilization gauge with live cost tracking.

### 7. Theme & Customization Suite
- `ThemeColorPicker`: Reusable theme color picker with continuous HSL sliders, presets, WCAG calculation, and CSS export.

---

## Installation

### NPM Package
```bash
npm install @noetic-ui/react framer-motion lucide-react clsx tailwind-merge
# or
pnpm add @noetic-ui/react framer-motion lucide-react clsx tailwind-merge
```

### Official CLI (shadcn-style)
```bash
# 1. Initialize project with configuration and CSS variables
npx noetic-ui init

# 2. Browse all 23 components
npx noetic-ui list

# 3. Add components with automatic dependency resolution
npx noetic-ui add PromptInput MessageBubble

# 4. Or copy the entire library
npx noetic-ui add --all
```

---

## Quickstart

```tsx
import { ChatContainer, MessageBubble, PromptInput, ThemeColorPicker } from '@noetic-ui/react';
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
      <header className="flex justify-between items-center pb-4">
        <h1 className="font-bold text-lg">Noetic Agent</h1>
        <ThemeColorPicker mode="popover" />
      </header>
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
noetic-ui/
├── apps/
│   └── docs/            # Next.js 15 interactive documentation and live agent simulator
├── packages/
│   ├── react/           # Core React component library (@noetic-ui/react)
│   └── cli/             # CLI for copy-pasting components into projects (noetic-ui)
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
