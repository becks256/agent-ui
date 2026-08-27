# @noetic-ui/cli

<p align="center">
  <strong>Command-line tool to initialize and copy Noetic UI components directly into your codebase with 100% source code ownership.</strong>
</p>

<p align="center">
  <a href="https://github.com/becks256/agent-ui">GitHub</a> •
  <a href="#quickstart">Quickstart</a> •
  <a href="#commands">Commands</a> •
  <a href="#configuration">Configuration</a>
</p>

---

## Overview

The `@noetic-ui/cli` tool is a shadcn/ui-inspired component distribution and project scaffolding utility for **Noetic UI**. It allows you to:
- Detect your framework (Next.js App/Pages Router, Vite, Remix, Astro).
- Inject CSS color variables and theme tokens into your global stylesheet.
- Copy unbundled TypeScript source code for any of the 23 components into your repository.
- Automatically resolve internal dependencies (e.g. adding `PromptInput` copies `ModelSelector`, `ContextTray`, `SlashCommandMenu`, `cn.ts`, and `types.ts`).

---

## Quickstart

### 1. Initialize Noetic UI in your project:
```bash
npx @noetic-ui/cli init
```
This detects your project setup, creates `noetic-ui.json`, adds `components/noetic-ui/cn.ts` and `types.ts`, and injects theme tokens into your `globals.css`.

### 2. Add components:
```bash
npx @noetic-ui/cli add PromptInput MessageBubble
```

### 3. Or copy all 23 components at once:
```bash
npx @noetic-ui/cli add --all
```

---

## Commands Reference

### `init`
```bash
# Interactive setup with prompts
npx @noetic-ui/cli init

# Accept default configuration
npx @noetic-ui/cli init -y
```

### `list`
Displays a categorized index of all 23 components across the 7 architectural suites:
```bash
npx @noetic-ui/cli list
```

### `add [...components]`
Copies component source code into your repository:
```bash
# Add specific components
npx @noetic-ui/cli add ReasoningAccordion ToolCallCard

# Add an entire suite (reasoning, chat, input, hitl, canvas, telemetry, theme)
npx @noetic-ui/cli add --suite reasoning

# Add all components
npx @noetic-ui/cli add --all

# Launch interactive autocomplete multi-select checklist
npx @noetic-ui/cli add

# Overwrite existing local components with latest upstream
npx @noetic-ui/cli add MessageBubble --overwrite
```

### `theme [preset]`
Configures your project's brand palette directly in `globals.css` with auto-calibrated text contrast:
```bash
# Interactive palette selector
npx @noetic-ui/cli theme

# Specify a preset directly (violet, indigo, cyan, lime, emerald, amber, orange, rose, fuchsia)
npx @noetic-ui/cli theme cyan
```

---

## Configuration (`noetic-ui.json`)

When you run `npx @noetic-ui/cli init`, a `noetic-ui.json` file is created at the root of your project:

```json
{
  "baseColor": "violet",
  "css": "app/globals.css",
  "components": "components/noetic-ui",
  "aliases": {
    "components": "components/noetic-ui",
    "utils": "components/noetic-ui/cn"
  }
}
```

---

## Component Suites Available

1. **Reasoning & Tools (4)**: `ReasoningAccordion`, `ToolCallCard`, `AgentPlanView`, `AgentSwarmView`
2. **Messages & Streaming (4)**: `MessageBubble`, `StreamingText`, `BranchSwitcher`, `ChatContainer`
3. **Input & Prompting (5)**: `PromptInput`, `DragAndDropUploader`, `ContextTray`, `SlashCommandMenu`, `ModelSelector`
4. **Human-in-the-Loop (3)**: `ActionConfirmationModal`, `InteractiveQuestionCard`, `FeedbackActions`
5. **Artifacts & Canvas (4)**: `ArtifactWorkspace`, `CodeBlock`, `DiffViewer`, `TerminalStream`
6. **Telemetry & States (2)**: `AgentStatusBadge`, `TokenUsageMeter`
7. **Theme & Customization (1)**: `ThemeColorPicker`

---

## License

MIT © [becks256](https://github.com/becks256)
