export interface ComponentMeta {
  name: string;
  suite: string;
  suiteId:
    "reasoning" | "chat" | "input" | "hitl" | "canvas" | "telemetry" | "theme";
  description: string;
  dependencies: string[];
  internalDependencies: string[];
}

export const COMPONENT_REGISTRY: Record<string, ComponentMeta> = {
  // 1. Reasoning & Tools
  ReasoningAccordion: {
    name: "ReasoningAccordion",
    suite: "1. Reasoning & Tools",
    suiteId: "reasoning",
    description:
      "Collapsible thought container for Chain-of-Thought reasoning with live duration ticker & sub-steps.",
    dependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["types", "cn"],
  },
  ToolCallCard: {
    name: "ToolCallCard",
    suite: "1. Reasoning & Tools",
    suiteId: "reasoning",
    description:
      "Expandable card for tool executions (bash, search, file operations) with live status & execution output.",
    dependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["types", "cn"],
  },
  AgentPlanView: {
    name: "AgentPlanView",
    suite: "1. Reasoning & Tools",
    suiteId: "reasoning",
    description:
      "Hierarchical task DAG checklist with progress indicators, status animations, and subtasks.",
    dependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["types", "cn"],
  },
  AgentSwarmView: {
    name: "AgentSwarmView",
    suite: "1. Reasoning & Tools",
    suiteId: "reasoning",
    description:
      "Multi-agent swarm coordinator visualizer showing agent delegation, avatar rings, and active working halos.",
    dependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["types", "cn"],
  },

  // 2. Messages & Streaming
  MessageBubble: {
    name: "MessageBubble",
    suite: "2. Messages & Streaming",
    suiteId: "chat",
    description:
      "Role-aware container (user, assistant, system, agent) with model tags, 4 contrast variants, and artifact launchers.",
    dependencies: ["lucide-react"],
    internalDependencies: [
      "types",
      "cn",
      "ReasoningAccordion",
      "ToolCallCard",
      "AgentPlanView",
      "CodeBlock",
    ],
  },
  StreamingText: {
    name: "StreamingText",
    suite: "2. Messages & Streaming",
    suiteId: "chat",
    description:
      "Zero-flicker streaming Markdown engine with smooth typography and live pulsing cursor.",
    dependencies: ["lucide-react"],
    internalDependencies: ["cn"],
  },
  BranchSwitcher: {
    name: "BranchSwitcher",
    suite: "2. Messages & Streaming",
    suiteId: "chat",
    description:
      "Message branch and alternative response variant navigator (< 2 of 4 >).",
    dependencies: ["lucide-react"],
    internalDependencies: ["cn"],
  },
  ChatContainer: {
    name: "ChatContainer",
    suite: "2. Messages & Streaming",
    suiteId: "chat",
    description:
      "Auto-scrolling conversation container with stick-to-bottom anchor and floating jump-to-bottom pill.",
    dependencies: ["lucide-react"],
    internalDependencies: ["cn"],
  },

  // 3. Input & Multimodal Prompting
  PromptInput: {
    name: "PromptInput",
    suite: "3. Input & Prompting",
    suiteId: "input",
    description:
      "Auto-expanding textarea with token counter, model selector trigger, attachment trigger, and stop generation control.",
    dependencies: ["lucide-react"],
    internalDependencies: [
      "types",
      "cn",
      "ModelSelector",
      "ContextTray",
      "SlashCommandMenu",
    ],
  },
  DragAndDropUploader: {
    name: "DragAndDropUploader",
    suite: "3. Input & Prompting",
    suiteId: "input",
    description:
      "Multi-file drag and drop surface with upload progress and thumbnail previews.",
    dependencies: ["lucide-react"],
    internalDependencies: ["types", "cn"],
  },
  ContextTray: {
    name: "ContextTray",
    suite: "3. Input & Prompting",
    suiteId: "input",
    description: "Pinned context pill bar (files, database tables, memories).",
    dependencies: ["lucide-react"],
    internalDependencies: ["cn"],
  },
  SlashCommandMenu: {
    name: "SlashCommandMenu",
    suite: "3. Input & Prompting",
    suiteId: "input",
    description:
      "Instant autocomplete menu triggered by / with keyboard navigation.",
    dependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["cn"],
  },
  ModelSelector: {
    name: "ModelSelector",
    suite: "3. Input & Prompting",
    suiteId: "input",
    description:
      "Model dropdown with provider badges, speed ratings, and reasoning effort indicators.",
    dependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["types", "cn"],
  },

  // 4. Human-in-the-Loop (HITL)
  ActionConfirmationModal: {
    name: "ActionConfirmationModal",
    suite: "4. Human-in-the-Loop",
    suiteId: "hitl",
    description:
      "Safety gatekeeper modal for sensitive shell commands, file overwrites, and DB migrations.",
    dependencies: ["lucide-react", "framer-motion"],
    internalDependencies: ["cn"],
  },
  InteractiveQuestionCard: {
    name: "InteractiveQuestionCard",
    suite: "4. Human-in-the-Loop",
    suiteId: "hitl",
    description:
      "Structured single/multi-select option cards for agent clarification with accessible recommended badges.",
    dependencies: ["lucide-react"],
    internalDependencies: ["cn"],
  },
  FeedbackActions: {
    name: "FeedbackActions",
    suite: "4. Human-in-the-Loop",
    suiteId: "hitl",
    description: "Thumbs up/down feedback bar with retry and copy actions.",
    dependencies: ["lucide-react"],
    internalDependencies: ["cn"],
  },

  // 5. Artifacts & Canvas
  ArtifactWorkspace: {
    name: "ArtifactWorkspace",
    suite: "5. Artifacts & Canvas",
    suiteId: "canvas",
    description:
      "Split-pane sidecar canvas with Live Preview, Code, Diff, and Doc tabs.",
    dependencies: ["lucide-react"],
    internalDependencies: ["types", "cn", "CodeBlock", "DiffViewer"],
  },
  CodeBlock: {
    name: "CodeBlock",
    suite: "5. Artifacts & Canvas",
    suiteId: "canvas",
    description:
      "Syntax-highlighted code block with line numbering, copy feedback, and fullscreen expansion.",
    dependencies: ["lucide-react"],
    internalDependencies: ["cn"],
  },
  DiffViewer: {
    name: "DiffViewer",
    suite: "5. Artifacts & Canvas",
    suiteId: "canvas",
    description:
      "Side-by-side / unified git diff viewer with line additions/deletions.",
    dependencies: ["lucide-react"],
    internalDependencies: ["cn"],
  },
  TerminalStream: {
    name: "TerminalStream",
    suite: "5. Artifacts & Canvas",
    suiteId: "canvas",
    description: "Dark terminal console with live ANSI output streaming.",
    dependencies: ["lucide-react"],
    internalDependencies: ["cn"],
  },

  // 6. Telemetry & Live States
  AgentStatusBadge: {
    name: "AgentStatusBadge",
    suite: "6. Telemetry & States",
    suiteId: "telemetry",
    description:
      "Ambient state indicator with pulsing halos (Thinking, Searching, Coding, Awaiting approval, Completed).",
    dependencies: ["lucide-react"],
    internalDependencies: ["types", "cn"],
  },
  TokenUsageMeter: {
    name: "TokenUsageMeter",
    suite: "6. Telemetry & States",
    suiteId: "telemetry",
    description: "Context window utilization gauge with live cost tracking.",
    dependencies: ["lucide-react"],
    internalDependencies: ["types", "cn"],
  },

  // 7. Theme & Customization
  ThemeColorPicker: {
    name: "ThemeColorPicker",
    suite: "7. Theme & Customization",
    suiteId: "theme",
    description:
      "Full-featured HSL sliders with smart WCAG contrast estimation, message bubble modes, and CSS export.",
    dependencies: ["lucide-react"],
    internalDependencies: ["cn"],
  },
};
