// AUTO-GENERATED FILE — DO NOT EDIT DIRECTLY.
// Generated from component README markdown files in packages/react/src/components/*/*.md
// Run "pnpm prebuild" or "node scripts/generate-component-docs.mjs" to regenerate.

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface TypeDoc {
  name: string;
  code: string;
}

export interface ComponentDoc {
  name: string;
  suite: string;
  suiteId:
    "reasoning" | "chat" | "input" | "hitl" | "canvas" | "telemetry" | "theme";
  description: string;
  cliCommand: string;
  importStatement: string;
  peerDependencies: string[];
  internalDependencies: string[];
  props: PropDoc[];
  types?: TypeDoc[];
  basicUsage: string;
  advancedUsage?: string;
}

export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  ArtifactWorkspace: {
    name: "ArtifactWorkspace",
    suite: "5. Artifacts & Canvas",
    suiteId: "canvas",
    description:
      "Split-pane sidecar canvas with Live Preview, Code, Diff, and Doc tabs. Supports version switching, full-screen toggle, download, and copy.",
    cliCommand: "npx @noetic-ui/cli add ArtifactWorkspace",
    importStatement: "import { ArtifactWorkspace } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts", "types.ts", "CodeBlock", "StreamingText"],
    props: [
      {
        name: "artifact",
        type: "Artifact",
        required: true,
        description:
          "Active artifact object (code, markdown, diff, html, svg).",
      },
      {
        name: "versions",
        type: "Artifact[]",
        description: "Optional array of previous artifact iterations.",
      },
      {
        name: "onSelectVersion",
        type: "(version: number) => void",
        description: "Callback when user selects a previous version.",
      },
      {
        name: "onClose",
        type: "() => void",
        description: "Callback when user clicks the close button.",
      },
    ],
    basicUsage:
      "<ArtifactWorkspace\n  artifact={{\n    id: 'art-1',\n    title: 'AgentOrchestrator.ts',\n    type: 'code',\n    filename: 'src/AgentOrchestrator.ts',\n    language: 'typescript',\n    content: codeString,\n  }}\n  onClose={() => setSelectedArtifact(null)}\n/>",
  },
  CodeBlock: {
    name: "CodeBlock",
    suite: "5. Artifacts & Canvas",
    suiteId: "canvas",
    description:
      "Syntax-highlighted code viewer with line numbers, copy-to-clipboard animation, language badges, and fullscreen expansion.",
    cliCommand: "npx @noetic-ui/cli add CodeBlock",
    importStatement: "import { CodeBlock } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "code",
        type: "string",
        required: true,
        description: "Raw code string to display.",
      },
      {
        name: "language",
        type: "string",
        default: "'typescript'",
        description: "Programming language for syntax badge formatting.",
      },
      {
        name: "filename",
        type: "string",
        description: "Optional file path shown in the header bar.",
      },
      {
        name: "showLineNumbers",
        type: "boolean",
        default: "true",
        description: "Whether line numbers should be rendered in the gutter.",
      },
    ],
    basicUsage:
      '<CodeBlock\n  filename="index.ts"\n  language="typescript"\n  code="export const agent = new Agent();"\n/>',
  },
  DiffViewer: {
    name: "DiffViewer",
    suite: "5. Artifacts & Canvas",
    suiteId: "canvas",
    description:
      "Git diff inspector showing line additions, deletions, and hunk headers with high-contrast color highlights.",
    cliCommand: "npx @noetic-ui/cli add DiffViewer",
    importStatement: "import { DiffViewer } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "diffText",
        type: "string",
        required: true,
        description:
          "Standard unified diff string (e.g. output from git diff).",
      },
      {
        name: "filename",
        type: "string",
        description: "Filename displayed in the diff header.",
      },
    ],
    basicUsage:
      '<DiffViewer\n  filename="AgentOrchestrator.ts"\n  diffText={`--- a/src/app.ts\\n+++ b/src/app.ts\\n@@ -1,3 +1,4 @@\\n-const a = 1;\\n+const a = 2;`}\n/>',
  },
  TerminalStream: {
    name: "TerminalStream",
    suite: "5. Artifacts & Canvas",
    suiteId: "canvas",
    description:
      "Authentic dark terminal console with command header, copy output, and live ANSI output streaming.",
    cliCommand: "npx @noetic-ui/cli add TerminalStream",
    importStatement: "import { TerminalStream } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "output",
        type: "string",
        required: true,
        description: "Terminal stdout/stderr text stream.",
      },
      {
        name: "command",
        type: "string",
        description: "Shell command shown in the terminal titlebar prompt.",
      },
      {
        name: "status",
        type: "'running'",
        default: "'completed'",
        description: "`'completed'`",
      },
    ],
    basicUsage:
      '<TerminalStream\n  command="pnpm test"\n  output="✔ 24 test suites passed\\nDone in 1.4s"\n  status="completed"\n/>',
  },
  BranchSwitcher: {
    name: "BranchSwitcher",
    suite: "2. Messages & Streaming",
    suiteId: "chat",
    description:
      "Message fork and alternative response variant navigator (e.g. < 2 of 4 >) with smooth transitions.",
    cliCommand: "npx @noetic-ui/cli add BranchSwitcher",
    importStatement: "import { BranchSwitcher } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "currentIndex",
        type: "number",
        required: true,
        description: "1-indexed number of the currently active branch.",
      },
      {
        name: "totalBranches",
        type: "number",
        required: true,
        description: "Total number of available alternative response variants.",
      },
      {
        name: "onSelectBranch",
        type: "(newIndex: number) => void",
        required: true,
        description:
          "Callback triggered when previous/next chevron is clicked.",
      },
    ],
    basicUsage:
      "<BranchSwitcher\n  currentIndex={2}\n  totalBranches={4}\n  onSelectBranch={(index) => setBranch(index)}\n/>",
  },
  ChatContainer: {
    name: "ChatContainer",
    suite: "2. Messages & Streaming",
    suiteId: "chat",
    description:
      "Auto-scrolling conversation container with stick-to-bottom anchor, scroll-up detection, and floating jump-to-bottom pill.",
    cliCommand: "npx @noetic-ui/cli add ChatContainer",
    importStatement: "import { ChatContainer } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Message bubbles and chat stream items to render.",
      },
      {
        name: "isStreaming",
        type: "boolean",
        default: "false",
        description:
          "When true, smoothly locks scroll to the bottom during incoming token generation.",
      },
      {
        name: "autoScrollThreshold",
        type: "number",
        default: "100",
        description:
          "Pixel threshold from bottom to determine if user has scrolled away.",
      },
    ],
    basicUsage:
      "<ChatContainer isStreaming={isGenerating}>\n  {messages.map((msg) => (\n    <MessageBubble key={msg.id} message={msg} />\n  ))}\n</ChatContainer>",
  },
  MessageBubble: {
    name: "MessageBubble",
    suite: "2. Messages & Streaming",
    suiteId: "chat",
    description:
      "Role-aware message container supporting 4 contrast variants (solid, subtle, neutral, bordered). Integrates embedded thoughts, tool cards, plans, branch navigation, and artifact links.",
    cliCommand: "npx @noetic-ui/cli add MessageBubble",
    importStatement: "import { MessageBubble } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react", "framer-motion"],
    internalDependencies: [
      "cn.ts",
      "types.ts",
      "ReasoningAccordion",
      "ToolCallCard",
      "AgentPlanView",
      "CodeBlock",
    ],
    props: [
      {
        name: "message",
        type: "AgentMessage",
        required: true,
        description:
          "The full message object containing content, role, model, thoughts, tool calls, and artifacts.",
      },
      {
        name: "variant",
        type: "'solid'",
        default: "'subtle'",
        description: "'bordered'`",
      },
      {
        name: "onRetry",
        type: "(messageId: string) => void",
        description: "Callback when retry action is clicked.",
      },
      {
        name: "onEdit",
        type: "(messageId: string) => void",
        description: "Callback when edit action is clicked.",
      },
      {
        name: "onSelectBranch",
        type: "(messageId: string, branchIndex: number) => void",
        description: "Callback when switching alternate response variants.",
      },
      {
        name: "onApproveTool",
        type: "(toolCallId: string) => void",
        description: "Callback when user approves an embedded tool call.",
      },
      {
        name: "onSelectArtifact",
        type: "(artifactId: string) => void",
        description: "Callback when user clicks an artifact launcher pill.",
      },
    ],
    types: [
      {
        name: "AgentMessage",
        code: "export interface AgentMessage {\n  id: string;\n  role: 'user' | 'assistant' | 'system' | 'agent';\n  content: string;\n  createdAt?: Date | string | number;\n  name?: string;\n  model?: ModelInfo;\n  tokens?: TokenUsage;\n  latencyMs?: number;\n  thoughts?: ThoughtProcess[];\n  toolCalls?: ToolCall[];\n  artifacts?: Artifact[];\n  plan?: AgentPlan;\n  branches?: AgentMessage[][];\n  selectedBranchIndex?: number;\n}",
      },
    ],
    basicUsage:
      "<MessageBubble\n  message={{\n    id: 'msg-1',\n    role: 'user',\n    content: 'How do I optimize Next.js 15 bundle size?',\n  }}\n  variant=\"solid\"\n/>",
  },
  StreamingText: {
    name: "StreamingText",
    suite: "2. Messages & Streaming",
    suiteId: "chat",
    description:
      "Zero-flicker streaming Markdown engine designed for Server-Sent Events (SSE). Renders typography smoothly with an ambient pulsing cursor during active streaming.",
    cliCommand: "npx @noetic-ui/cli add StreamingText",
    importStatement: "import { StreamingText } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "content",
        type: "string",
        required: true,
        description: "Markdown or plain text content to render.",
      },
      {
        name: "isStreaming",
        type: "boolean",
        default: "false",
        description:
          "Whether the stream is actively in progress (shows animated typing cursor).",
      },
      {
        name: "className",
        type: "string",
        description: "Optional CSS classes.",
      },
    ],
    basicUsage:
      '<StreamingText\n  content="I am **analyzing** your TypeScript configuration..."\n  isStreaming={true}\n/>',
  },
  ActionConfirmationModal: {
    name: "ActionConfirmationModal",
    suite: "4. Human-in-the-Loop",
    suiteId: "hitl",
    description:
      "Safety gatekeeper modal for sensitive shell commands, file overwrites, and DB migrations with severity badges (LOW, MEDIUM, CRITICAL).",
    cliCommand: "npx @noetic-ui/cli add ActionConfirmationModal",
    importStatement:
      "import { ActionConfirmationModal } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "isOpen",
        type: "boolean",
        required: true,
        description: "Whether the modal dialog is displayed.",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Dialog title describing the action.",
      },
      {
        name: "description",
        type: "string",
        description: "Explanation of what will happen upon approval.",
      },
      {
        name: "actionType",
        type: "'command'",
        default: "'file_write'",
        description: "'db_mutation'",
      },
      {
        name: "payload",
        type: "string",
        default: "Record<string, unknown>",
        description: "Yes",
      },
      {
        name: "severity",
        type: "'low'",
        default: "'medium'",
        description: "`'medium'`",
      },
      {
        name: "onApprove",
        type: "() => void",
        required: true,
        description: "Callback when user grants approval.",
      },
      {
        name: "onReject",
        type: "() => void",
        required: true,
        description: "Callback when user denies execution.",
      },
      {
        name: "onClose",
        type: "() => void",
        required: true,
        description: "Callback when user dismisses the modal backdrop.",
      },
    ],
    basicUsage:
      '<ActionConfirmationModal\n  isOpen={isModalOpen}\n  title="Execute Shell Command"\n  actionType="command"\n  payload="pnpm run build && pnpm publish"\n  severity="critical"\n  onApprove={() => executeCommand()}\n  onReject={() => cancelCommand()}\n  onClose={() => setIsModalOpen(false)}\n/>',
  },
  FeedbackActions: {
    name: "FeedbackActions",
    suite: "4. Human-in-the-Loop",
    suiteId: "hitl",
    description:
      "Thumbs up/down rating bar with copy, retry, and feedback confirmation state.",
    cliCommand: "npx @noetic-ui/cli add FeedbackActions",
    importStatement: "import { FeedbackActions } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "onFeedback",
        type: "(type: 'thumbs_up'",
        default: "'thumbs_down') => void",
        description: "No",
      },
      {
        name: "onCopy",
        type: "() => void",
        description: "Callback when copy button is clicked.",
      },
      {
        name: "onRetry",
        type: "() => void",
        description: "Callback when regenerate/retry is clicked.",
      },
    ],
    basicUsage:
      "<FeedbackActions\n  onFeedback={(type) => console.log(type)}\n  onCopy={() => navigator.clipboard.writeText(content)}\n  onRetry={() => regenerate()}\n/>",
  },
  InteractiveQuestionCard: {
    name: "InteractiveQuestionCard",
    suite: "4. Human-in-the-Loop",
    suiteId: "hitl",
    description:
      "Structured single/multi-select option cards for agent clarification with accessible recommended badges.",
    cliCommand: "npx @noetic-ui/cli add InteractiveQuestionCard",
    importStatement:
      "import { InteractiveQuestionCard } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "question",
        type: "string",
        required: true,
        description: "The clarification question asked by the agent.",
      },
      {
        name: "options",
        type: "InteractiveOption[]",
        required: true,
        description: "List of selectable option cards.",
      },
      {
        name: "isMultiSelect",
        type: "boolean",
        default: "false",
        description: "Allows multiple option selections.",
      },
      {
        name: "onSubmit",
        type: "(selectedIds: string[]) => void",
        required: true,
        description: "Callback with the selected option IDs.",
      },
    ],
    basicUsage:
      "<InteractiveQuestionCard\n  question=\"Which bundler should we configure?\"\n  options={[\n    { id: 'tsup', label: 'tsup (Recommended)', isRecommended: true, description: 'Fast TypeScript bundler powered by esbuild' },\n    { id: 'rollup', label: 'Rollup', description: 'Classic plugin-based bundler' },\n  ]}\n  onSubmit={(ids) => submitAnswer(ids)}\n/>",
  },
  ContextTray: {
    name: "ContextTray",
    suite: "3. Input & Prompting",
    suiteId: "input",
    description:
      "Pinned context pill bar displaying active files, database tables, documentation, or user memory injected into the agent session.",
    cliCommand: "npx @noetic-ui/cli add ContextTray",
    importStatement: "import { ContextTray } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "items",
        type: "ContextItem[]",
        required: true,
        description:
          "Array of context items with id, label, type (file, database, memory, tool), and optional metadata.",
      },
      {
        name: "onRemoveItem",
        type: "(id: string) => void",
        description:
          "Callback fired when user clicks the remove icon on a context pill.",
      },
    ],
    basicUsage:
      "<ContextTray\n  items={[\n    { id: '1', label: 'AgentOrchestrator.ts', type: 'file' },\n    { id: '2', label: 'Postgres DB', type: 'database' },\n  ]}\n  onRemoveItem={(id) => removeContext(id)}\n/>",
  },
  DragAndDropUploader: {
    name: "DragAndDropUploader",
    suite: "3. Input & Prompting",
    suiteId: "input",
    description:
      "Multi-file drag-and-drop dropzone surface with thumbnail previews, upload progress meters, and deletion controls.",
    cliCommand: "npx @noetic-ui/cli add DragAndDropUploader",
    importStatement: "import { DragAndDropUploader } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts", "types.ts"],
    props: [
      {
        name: "attachments",
        type: "FileAttachment[]",
        required: true,
        description: "Array of currently attached files with upload status.",
      },
      {
        name: "onUploadFiles",
        type: "(files: File[]) => void",
        required: true,
        description:
          "Callback fired when files are dropped or selected via file browser.",
      },
      {
        name: "onRemoveAttachment",
        type: "(id: string) => void",
        required: true,
        description: "Callback fired when an attachment is removed.",
      },
    ],
    basicUsage:
      "<DragAndDropUploader\n  attachments={files}\n  onUploadFiles={(newFiles) => handleUpload(newFiles)}\n  onRemoveAttachment={(id) => removeFile(id)}\n/>",
  },
  ModelSelector: {
    name: "ModelSelector",
    suite: "3. Input & Prompting",
    suiteId: "input",
    description:
      "Model dropdown with provider badges, speed ratings, and reasoning effort indicators.",
    cliCommand: "npx @noetic-ui/cli add ModelSelector",
    importStatement: "import { ModelSelector } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts", "types.ts"],
    props: [
      {
        name: "models",
        type: "ModelInfo[]",
        required: true,
        description: "List of available models.",
      },
      {
        name: "selectedModel",
        type: "ModelInfo",
        required: true,
        description: "Currently selected model.",
      },
      {
        name: "onSelectModel",
        type: "(model: ModelInfo) => void",
        required: true,
        description: "Callback when model is selected.",
      },
    ],
    basicUsage:
      "<ModelSelector\n  models={modelsList}\n  selectedModel={activeModel}\n  onSelectModel={(m) => setActiveModel(m)}\n/>",
  },
  PromptInput: {
    name: "PromptInput",
    suite: "3. Input & Prompting",
    suiteId: "input",
    description:
      "Auto-expanding textarea with token counter, model selector trigger, context tray, attachment manager, and stop generation control.",
    cliCommand: "npx @noetic-ui/cli add PromptInput",
    importStatement: "import { PromptInput } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: [
      "cn.ts",
      "types.ts",
      "ModelSelector",
      "ContextTray",
      "SlashCommandMenu",
    ],
    props: [
      {
        name: "value",
        type: "string",
        required: true,
        description: "Current prompt text input value.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: true,
        description: "Change handler for the input textarea.",
      },
      {
        name: "onSubmit",
        type: "(content: string, attachments?: FileAttachment[]) => void",
        required: true,
        description: "Submit handler triggered via Enter key or submit button.",
      },
      {
        name: "onStop",
        type: "() => void",
        description:
          "Handler called when user clicks the stop generation button during streaming.",
      },
      {
        name: "isStreaming",
        type: "boolean",
        default: "false",
        description: "Switches the action button into a stop button when true.",
      },
      {
        name: "placeholder",
        type: "string",
        default: "'Ask a question or type / for commands...'",
        description: "Textarea placeholder string.",
      },
      {
        name: "models",
        type: "ModelInfo[]",
        description:
          "Optional list of AI models to display in the embedded model selector dropdown.",
      },
      {
        name: "selectedModel",
        type: "ModelInfo",
        description: "Currently selected model.",
      },
      {
        name: "onSelectModel",
        type: "(model: ModelInfo) => void",
        description: "Callback when user selects a different model.",
      },
      {
        name: "contextItems",
        type: "ContextItem[]",
        description: "Pinned context items displayed in the input tray.",
      },
      {
        name: "onRemoveContextItem",
        type: "(id: string) => void",
        description: "Handler called when user dismisses a context item.",
      },
    ],
    basicUsage:
      '<PromptInput\n  value={text}\n  onChange={setText}\n  onSubmit={(content) => handleSend(content)}\n  placeholder="Ask your agent or type /plan, /search..."\n/>',
  },
  SlashCommandMenu: {
    name: "SlashCommandMenu",
    suite: "3. Input & Prompting",
    suiteId: "input",
    description:
      "Instant autocomplete command menu triggered by `/` with keyboard navigation, descriptions, and icon badges.",
    cliCommand: "npx @noetic-ui/cli add SlashCommandMenu",
    importStatement: "import { SlashCommandMenu } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "isOpen",
        type: "boolean",
        required: true,
        description: "Whether the dropdown popover is currently visible.",
      },
      {
        name: "filterText",
        type: "string",
        required: true,
        description: "The search filter query typed after the slash.",
      },
      {
        name: "commands",
        type: "SlashCommand[]",
        description:
          "Optional custom list of commands to override default commands.",
      },
      {
        name: "onSelectCommand",
        type: "(cmd: SlashCommand) => void",
        required: true,
        description:
          "Callback when a command is selected via enter or mouse click.",
      },
      {
        name: "placement",
        type: "'bottom-full'",
        default: "'top-full'",
        description: "`'bottom-full'`",
      },
      {
        name: "onClose",
        type: "() => void",
        required: true,
        description: "Callback to dismiss the menu.",
      },
    ],
    basicUsage:
      "<SlashCommandMenu\n  isOpen={showMenu}\n  filterText={searchQuery}\n  onSelectCommand={(cmd) => applyCommand(cmd)}\n  onClose={() => setShowMenu(false)}\n/>",
  },
  AgentPlanView: {
    name: "AgentPlanView",
    suite: "1. Reasoning & Tools",
    suiteId: "reasoning",
    description:
      "Hierarchical task DAG checklist with animated progress bars, status indicators (completed, in-progress, failed, skipped), and nested subtasks.",
    cliCommand: "npx @noetic-ui/cli add AgentPlanView",
    importStatement: "import { AgentPlanView } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["cn.ts", "types.ts"],
    props: [
      {
        name: "plan",
        type: "AgentPlan",
        required: true,
        description:
          "The hierarchical plan object containing step items, statuses, progress, and nested subtasks.",
      },
      {
        name: "defaultExpanded",
        type: "boolean",
        default: "true",
        description: "Whether the plan task list is expanded by default.",
      },
      {
        name: "onStepClick",
        type: "(step: AgentPlanStep) => void",
        description: "Optional click handler when a user selects a plan step.",
      },
      {
        name: "className",
        type: "string",
        description: "Optional container CSS classes.",
      },
    ],
    types: [
      {
        name: "AgentPlan",
        code: "export interface AgentPlan {\n  id: string;\n  title: string;\n  description?: string;\n  status: 'draft' | 'running' | 'completed' | 'failed';\n  steps: AgentPlanStep[];\n  progressPercent?: number;\n}\n\nexport interface AgentPlanStep {\n  id: string;\n  title: string;\n  description?: string;\n  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';\n  subtasks?: AgentPlanStep[];\n  toolCallId?: string;\n}",
      },
    ],
    basicUsage:
      "<AgentPlanView\n  plan={{\n    id: 'plan-1',\n    title: 'Bundle Optimization & Refactor',\n    status: 'running',\n    steps: [\n      { id: '1', title: 'Audit bundle dependencies', status: 'completed' },\n      { id: '2', title: 'Configure ESM tree-shaking', status: 'in_progress' },\n      { id: '3', title: 'Verify exports contract', status: 'pending' },\n    ],\n  }}\n/>",
  },
  AgentSwarmView: {
    name: "AgentSwarmView",
    suite: "1. Reasoning & Tools",
    suiteId: "reasoning",
    description:
      "Multi-agent collaboration visualizer showing subagent roles, delegation states, active halos, and live working tasks.",
    cliCommand: "npx @noetic-ui/cli add AgentSwarmView",
    importStatement: "import { AgentSwarmView } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["cn.ts", "types.ts"],
    props: [
      {
        name: "agents",
        type: "SwarmAgent[]",
        required: true,
        description:
          "Array of subagents with role, name, status, avatar, and current active task.",
      },
      {
        name: "activeAgentId",
        type: "string",
        description:
          "ID of the currently focused or active agent in the swarm.",
      },
      {
        name: "onSelectAgent",
        type: "(agentId: string) => void",
        description: "Callback fired when an agent pill or avatar is clicked.",
      },
      {
        name: "className",
        type: "string",
        description: "Optional additional CSS classes.",
      },
    ],
    types: [
      {
        name: "SwarmAgent",
        code: "export interface SwarmAgent {\n  id: string;\n  name: string;\n  role: string;\n  status: 'idle' | 'working' | 'completed' | 'failed';\n  avatar?: string;\n  currentTask?: string;\n  progress?: number;\n}",
      },
    ],
    basicUsage:
      "<AgentSwarmView\n  agents={[\n    { id: 'a1', name: 'Planner', role: 'Architecture', status: 'working', currentTask: 'Formulating task graph...' },\n    { id: 'a2', name: 'Coder', role: 'TypeScript', status: 'idle' },\n  ]}\n  activeAgentId=\"a1\"\n/>",
  },
  ReasoningAccordion: {
    name: "ReasoningAccordion",
    suite: "1. Reasoning & Tools",
    suiteId: "reasoning",
    description:
      "Animated collapsible container for Chain-of-Thought (CoT) reasoning streams. Includes live duration ticker (e.g. 3.8s), token consumption counter, and step-by-step progress checklist.",
    cliCommand: "npx @noetic-ui/cli add ReasoningAccordion",
    importStatement: "import { ReasoningAccordion } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["cn.ts", "types.ts"],
    props: [
      {
        name: "thought",
        type: "ThoughtProcess",
        required: true,
        description:
          "The thought process object containing title, markdown content, durationMs, tokens, and sub-steps.",
      },
      {
        name: "defaultExpanded",
        type: "boolean",
        default: "false",
        description:
          "Whether the reasoning accordion should be expanded upon initial mount.",
      },
      {
        name: "className",
        type: "string",
        description:
          "Optional additional Tailwind CSS class names to apply to the container.",
      },
    ],
    types: [
      {
        name: "ThoughtProcess",
        code: "export interface ThoughtProcess {\n  id: string;\n  title?: string;\n  content: string;\n  durationMs?: number;\n  isStreaming?: boolean;\n  tokens?: number;\n  steps?: ThoughtStep[];\n}\n\nexport interface ThoughtStep {\n  id: string;\n  title: string;\n  status: 'pending' | 'running' | 'completed' | 'failed';\n  durationMs?: number;\n}",
      },
    ],
    basicUsage:
      "<ReasoningAccordion\n  thought={{\n    id: 'th-1',\n    title: 'Evaluating query intent & execution DAG',\n    content: '1. Parsed user prompt.\\n2. Validating workspace constraints.\\n3. Dispatching bash tool.',\n    durationMs: 2400,\n    tokens: 312,\n  }}\n/>",
    advancedUsage:
      "// Live streaming reasoning with animated progress steps\n<ReasoningAccordion\n  defaultExpanded={true}\n  thought={{\n    id: 'th-stream',\n    title: 'Synthesizing build artifacts...',\n    content: streamContent,\n    isStreaming: true,\n    steps: [\n      { id: '1', title: 'Verify workspace contracts', status: 'completed' },\n      { id: '2', title: 'Compile ESM and DTS bundles', status: 'running' },\n      { id: '3', title: 'Run typecheck verification', status: 'pending' },\n    ],\n  }}\n/>",
  },
  ToolCallCard: {
    name: "ToolCallCard",
    suite: "1. Reasoning & Tools",
    suiteId: "reasoning",
    description:
      "Expandable inspection card for agent tool executions (bash, search, file operations, SQL queries). Displays live status badges, latency timers, input parameters, and output results.",
    cliCommand: "npx @noetic-ui/cli add ToolCallCard",
    importStatement: "import { ToolCallCard } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["cn.ts", "types.ts"],
    props: [
      {
        name: "toolCall",
        type: "ToolCall",
        required: true,
        description:
          "The tool execution payload with tool name, arguments, status, result, duration, and approval states.",
      },
      {
        name: "defaultExpanded",
        type: "boolean",
        default: "false",
        description:
          "Whether the card body showing args and results is open by default.",
      },
      {
        name: "onApprove",
        type: "() => void",
        description:
          "Callback triggered when user approves a tool requiring explicit human authorization.",
      },
      {
        name: "onReject",
        type: "() => void",
        description:
          "Callback triggered when user rejects a pending tool execution.",
      },
      {
        name: "className",
        type: "string",
        description: "Optional additional Tailwind CSS class names.",
      },
    ],
    types: [
      {
        name: "ToolCall",
        code: "export interface ToolCall {\n  id: string;\n  name: string;\n  args: Record<string, unknown> | string;\n  result?: unknown;\n  status: 'idle' | 'running' | 'success' | 'error' | 'cancelled' | 'awaiting_approval';\n  durationMs?: number;\n  error?: string;\n  requiresApproval?: boolean;\n  approvalSeverity?: 'low' | 'medium' | 'critical';\n  approved?: boolean;\n}",
      },
    ],
    basicUsage:
      "<ToolCallCard\n  toolCall={{\n    id: 'tc-1',\n    name: 'bash',\n    args: { command: 'pnpm test' },\n    result: '✔ 24 test suites passed',\n    status: 'success',\n    durationMs: 420,\n  }}\n/>",
  },
  AgentStatusBadge: {
    name: "AgentStatusBadge",
    suite: "6. Telemetry & States",
    suiteId: "telemetry",
    description:
      "Ambient status indicator with animated pulsing halos across 6 states (Thinking, Searching, Coding, Awaiting approval, Completed, Idle, Paused).",
    cliCommand: "npx @noetic-ui/cli add AgentStatusBadge",
    importStatement: "import { AgentStatusBadge } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "state",
        type: "'idle'",
        default: "'thinking'",
        description: "'coding'",
      },
      {
        name: "variant",
        type: "'solid'",
        default: "'subtle'",
        description: "No",
      },
      {
        name: "customLabel",
        type: "string",
        description: "Custom text override for the state label.",
      },
    ],
    basicUsage:
      '<AgentStatusBadge state="thinking" customLabel="Synthesizing plan..." />',
  },
  TokenUsageMeter: {
    name: "TokenUsageMeter",
    suite: "6. Telemetry & States",
    suiteId: "telemetry",
    description:
      "Context window utilization gauge with prompt/completion token breakdown and live dollar cost tracking.",
    cliCommand: "npx @noetic-ui/cli add TokenUsageMeter",
    importStatement: "import { TokenUsageMeter } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts", "types.ts"],
    props: [
      {
        name: "usage",
        type: "TokenUsage",
        required: true,
        description:
          "Token consumption object containing prompt, completion, total, and costUsd.",
      },
      {
        name: "maxTokens",
        type: "number",
        default: "128000",
        description: "Maximum context capacity of the active model.",
      },
      {
        name: "showCost",
        type: "boolean",
        default: "true",
        description: "Whether estimated USD cost should be rendered.",
      },
    ],
    basicUsage:
      "<TokenUsageMeter\n  usage={{ prompt: 1420, completion: 580, total: 2000, costUsd: 0.006 }}\n  maxTokens={128000}\n/>",
  },
  ThemeColorPicker: {
    name: "ThemeColorPicker",
    suite: "7. Theme & Customization",
    suiteId: "theme",
    description:
      "Dynamic HSL color & contrast studio with automated WCAG 2.1 AAA text contrast calculations, preset palettes, bubble modes, and CSS export.",
    cliCommand: "npx @noetic-ui/cli add ThemeColorPicker",
    importStatement: "import { ThemeColorPicker } from '@noetic-ui/react';",
    peerDependencies: ["lucide-react"],
    internalDependencies: ["cn.ts"],
    props: [
      {
        name: "hue",
        type: "number",
        default: "265",
        description: "Primary color hue value in degrees (0 - 360).",
      },
      {
        name: "saturation",
        type: "number",
        default: "85",
        description: "Primary color saturation percentage (0 - 100).",
      },
      {
        name: "lightness",
        type: "number",
        default: "60",
        description: "Primary color lightness percentage (0 - 100).",
      },
      {
        name: "onChangeHsl",
        type: "(hue: number, sat: number, light: number) => void",
        description: "Callback when hue, saturation, or lightness changes.",
      },
      {
        name: "mode",
        type: "'popover'",
        default: "'inline'",
        description: "No",
      },
      {
        name: "messageVariant",
        type: "'solid'",
        default: "'subtle'",
        description: "'bordered'`",
      },
      {
        name: "onChangeMessageVariant",
        type: "(variant: 'solid'",
        default: "'subtle'",
        description: "'bordered') => void`",
      },
      {
        name: "triggerLabel",
        type: "string",
        default: "'Theme'",
        description: "Button text in popover mode.",
      },
    ],
    basicUsage:
      '<ThemeColorPicker\n  mode="popover"\n  hue={265}\n  saturation={85}\n  lightness={60}\n  onChangeHsl={(h, s, l) => updateTheme(h, s, l)}\n/>',
  },
};
