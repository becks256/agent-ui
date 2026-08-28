'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  Terminal,
  FileCode,
  Layers,
  ShieldAlert,
  Play,
  RotateCcw,
  Sun,
  Moon,
  Copy,
  Check,
  CheckCircle2,
  ListTodo,
  Cpu,
  ArrowRight,
  Code2,
  Users,
  MessageSquare,
  SlidersHorizontal,
  UploadCloud,
  Activity,
  CheckSquare,
  Palette,
  ChevronDown,
  Eye,
  Sliders,
  Paintbrush,
  BookOpen,
  Wrench,
  HelpCircle,
  Settings,
  Search,
  ExternalLink,
  ChevronRight,
  FileText,
  Table,
} from 'lucide-react';
import {
  ChatContainer,
  MessageBubble,
  StreamingText,
  BranchSwitcher,
  PromptInput,
  DragAndDropUploader,
  ContextTray,
  SlashCommandMenu,
  ModelSelector,
  ReasoningAccordion,
  ToolCallCard,
  AgentPlanView,
  AgentSwarmView,
  ArtifactWorkspace,
  TerminalStream,
  DiffViewer,
  CodeBlock,
  ActionConfirmationModal,
  InteractiveQuestionCard,
  FeedbackActions,
  AgentStatusBadge,
  TokenUsageMeter,
  ThemeColorPicker,
  defaultColorPresets,
  getContrastMetrics,
  type AgentMessage,
  type ModelInfo,
  type FileAttachment,
  type Artifact,
  type AgentPlan,
  type AgentState,
} from '@noetic-ui/react';
import { COMPONENT_DOCS, type ComponentDoc } from '../data/component-docs';

const mockModels: ModelInfo[] = [
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    description: 'Most intelligent model for agentic reasoning and coding',
    speed: 'fast',
    reasoningEffort: 'high',
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    description: 'Massive 2M context window with multimodal comprehension',
    speed: 'fast',
    reasoningEffort: 'high',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    description: 'High performance multimodal model for general agent tasks',
    speed: 'fast',
    reasoningEffort: 'medium',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'deepseek',
    description: 'Open-weight reasoning model with deep Chain of Thought',
    speed: 'moderate',
    reasoningEffort: 'high',
  },
];

const mockArtifact: Artifact = {
  id: 'art-1',
  title: 'AgentOrchestrator.ts',
  type: 'code',
  filename: 'src/orchestrator/AgentOrchestrator.ts',
  language: 'typescript',
  version: 2,
  content: `import { AgentSwarm, ToolRegistry, type ExecutionContext } from '@noetic-ui/core';

export class AgentOrchestrator {
  private swarm: AgentSwarm;
  private tools: ToolRegistry;

  constructor(context: ExecutionContext) {
    this.swarm = new AgentSwarm(context);
    this.tools = new ToolRegistry();
  }

  async runWorkflow(prompt: string): Promise<WorkflowResult> {
    const plan = await this.swarm.planner.createPlan(prompt);
    
    for (const step of plan.steps) {
      const agent = this.swarm.getAgentForRole(step.role);
      const execution = await agent.executeStep(step, { tools: this.tools });
      
      if (execution.requiresApproval) {
        await this.swarm.requestApproval(execution);
      }
    }
    
    return this.swarm.synthesizeResults();
  }
}`,
};

const mockDiff = `--- a/src/orchestrator/AgentOrchestrator.ts
+++ b/src/orchestrator/AgentOrchestrator.ts
@@ -10,4 +10,8 @@
   async runWorkflow(prompt: string): Promise<WorkflowResult> {
+    // Initialize stream metrics tracker
     const plan = await this.swarm.planner.createPlan(prompt);
     
     for (const step of plan.steps) {
-      const agent = this.swarm.getAgentForRole('general');
+      const agent = this.swarm.getAgentForRole(step.role);
+      const execution = await agent.executeStep(step, { tools: this.tools });`;

const cliSimulations: Record<string, { cmd: string; output: string }> = {
  list: {
    cmd: 'npx @noetic-ui/cli list',
    output: `⚡ Noetic UI — Component Registry (23 Components)

1. Reasoning & Tools (4)
  ReasoningAccordion         Collapsible thought container for Chain-of-Thought reasoning with live duration ticker & sub-steps.
  ToolCallCard               Expandable card for tool executions (bash, search, file operations) with live status & execution output.
  AgentPlanView              Hierarchical task DAG checklist with progress indicators, status animations, and subtasks.
  AgentSwarmView             Multi-agent swarm coordinator visualizer showing agent delegation, avatar rings, and active working halos.

2. Messages & Streaming (4)
  MessageBubble              Role-aware container (user, assistant, system, agent) with model tags, 4 contrast variants, and artifact launchers.
  StreamingText              Zero-flicker streaming Markdown engine with smooth typography and live pulsing cursor.
  BranchSwitcher             Message branch and alternative response variant navigator (< 2 of 4 >).
  ChatContainer              Auto-scrolling conversation container with stick-to-bottom anchor and floating jump-to-bottom pill.

3. Input & Prompting (5)
  PromptInput                Auto-expanding textarea with token counter, model selector trigger, attachment trigger, and stop generation control.
  DragAndDropUploader        Multi-file drag and drop surface with upload progress and thumbnail previews.
  ContextTray                Pinned context pill bar (files, database tables, memories).
  SlashCommandMenu           Instant autocomplete menu triggered by / with keyboard navigation.
  ModelSelector              Model dropdown with provider badges, speed ratings, and reasoning effort indicators.

4. Human-in-the-Loop (3)
  ActionConfirmationModal    Safety gatekeeper modal for sensitive shell commands, file overwrites, and DB migrations.
  InteractiveQuestionCard    Structured single/multi-select option cards for agent clarification with accessible recommended badges.
  FeedbackActions            Thumbs up/down feedback bar with retry and copy actions.

5. Artifacts & Canvas (4)
  ArtifactWorkspace          Split-pane sidecar canvas with Live Preview, Code, Diff, and Doc tabs.
  CodeBlock                  Syntax-highlighted code block with line numbering, copy feedback, and fullscreen expansion.
  DiffViewer                 Side-by-side / unified git diff viewer with line additions/deletions.
  TerminalStream             Dark terminal console with live ANSI output streaming.

6. Telemetry & States (2)
  AgentStatusBadge           Ambient state indicator with pulsing halos (Thinking, Searching, Coding, Awaiting approval, Completed).
  TokenUsageMeter            Context window utilization gauge with live cost tracking.

7. Theme & Customization (1)
  ThemeColorPicker           Full-featured HSL sliders with smart WCAG contrast estimation, message bubble modes, and CSS export.

Use npx @noetic-ui/cli add <component> to add components to your project.`,
  },
  init: {
    cmd: 'npx @noetic-ui/cli init',
    output: `⚡ Initializing Noetic UI in your project...

✔ Detected Next.js (App Router)
✔ Created noetic-ui.json
✔ Created components directory at components/noetic-ui
✔ Created utility helper at components/noetic-ui/cn.ts
✔ Created shared agent types at components/noetic-ui/types.ts
✔ Added Noetic UI color tokens to app/globals.css

✨ Noetic UI initialized successfully!
Next steps:
1. Install peer dependencies:
   pnpm add lucide-react framer-motion clsx tailwind-merge
2. Add components:
   npx @noetic-ui/cli add <component>
   npx @noetic-ui/cli add --all`,
  },
  addSingle: {
    cmd: 'npx @noetic-ui/cli add PromptInput',
    output: `⚡ Adding 6 files to components/noetic-ui...

✔ Added components/noetic-ui/cn.ts
✔ Added components/noetic-ui/types.ts
✔ Added components/noetic-ui/PromptInput.tsx
✔ Added components/noetic-ui/ModelSelector.tsx
✔ Added components/noetic-ui/ContextTray.tsx
✔ Added components/noetic-ui/SlashCommandMenu.tsx

✨ Successfully installed 1 component(s) with internal dependencies!
Required peer packages:
pnpm add lucide-react framer-motion`,
  },
  addAll: {
    cmd: 'npx @noetic-ui/cli add --all',
    output: `⚡ Adding 25 files to components/noetic-ui...

✔ Added ReasoningAccordion.tsx
✔ Added ToolCallCard.tsx
✔ Added AgentPlanView.tsx
✔ Added AgentSwarmView.tsx
✔ Added MessageBubble.tsx
✔ Added StreamingText.tsx
✔ Added BranchSwitcher.tsx
✔ Added ChatContainer.tsx
✔ Added PromptInput.tsx
✔ Added DragAndDropUploader.tsx
✔ Added ContextTray.tsx
✔ Added SlashCommandMenu.tsx
✔ Added ModelSelector.tsx
✔ Added ActionConfirmationModal.tsx
✔ Added InteractiveQuestionCard.tsx
✔ Added FeedbackActions.tsx
✔ Added ArtifactWorkspace.tsx
✔ Added CodeBlock.tsx
✔ Added DiffViewer.tsx
✔ Added TerminalStream.tsx
✔ Added AgentStatusBadge.tsx
✔ Added TokenUsageMeter.tsx
✔ Added ThemeColorPicker.tsx
✔ Added cn.ts and types.ts

✨ Successfully installed all 23 components across 7 suites!`,
  },
  themePreset: {
    cmd: 'npx @noetic-ui/cli theme cyan',
    output: `✨ Set theme to Cyber Cyan (HSL: 195°, 90%, 50%)
Calculated relative luminance: 0.384
Optimal foreground contrast: #ffffff (6.8:1 AAA)
Updated CSS custom properties in app/globals.css`,
  },
};

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeView, setActiveView] = useState<'demo' | 'components' | 'docs'>('demo');
  const [docsSection, setDocsSection] = useState<'cli' | 'quickstart' | 'components-api' | 'theme' | 'messages'>('components-api');
  const [selectedDocComponent, setSelectedDocComponent] = useState<string>('ReasoningAccordion');
  const [docSearchQuery, setDocSearchQuery] = useState<string>('');
  const [activeCliDemo, setActiveCliDemo] = useState<string>('list');
  const [componentCategory, setComponentCategory] = useState<string>('all');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedDocCmd, setCopiedDocCmd] = useState(false);
  const [copiedDocImport, setCopiedDocImport] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelInfo>(mockModels[0]);
  const [promptText, setPromptText] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(mockArtifact);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [sampleBranchIndex, setSampleBranchIndex] = useState(1);
  const [sampleInputText, setSampleInputText] = useState('Inspect active agent tasks and optimize bundle...');
  
  // Dynamic Primary Color Theme State: Hue, Saturation, Lightness
  const [primaryHue, setPrimaryHue] = useState<number>(265);
  const [primarySat, setPrimarySat] = useState<number>(85);
  const [primaryLight, setPrimaryLight] = useState<number>(60);

  // Message Bubble Contrast & Style Variant
  const [messageVariant, setMessageVariant] = useState<'solid' | 'subtle' | 'neutral' | 'bordered'>('solid');

  // Compute contrast metrics via reusable helper
  const metrics = getContrastMetrics(primaryHue, primarySat, primaryLight);

  // Update theme colors and dynamically adjust --primary-foreground for optimal contrast
  const updateThemeColor = (h: number, s: number, l: number) => {
    setPrimaryHue(h);
    setPrimarySat(s);
    setPrimaryLight(l);

    if (typeof document !== 'undefined') {
      const currentMetrics = getContrastMetrics(h, s, l);
      const primaryHsl = `${h} ${s}% ${l}%`;

      document.documentElement.style.setProperty('--primary', primaryHsl);
      document.documentElement.style.setProperty('--ring', primaryHsl);
      document.documentElement.style.setProperty('--agent-thought', primaryHsl);
      document.documentElement.style.setProperty('--primary-hue', h.toString());
      document.documentElement.style.setProperty('--primary-sat', `${s}%`);
      document.documentElement.style.setProperty('--primary-light', `${l}%`);
      document.documentElement.style.setProperty('--primary-foreground', currentMetrics.foregroundHsl);
    }
  };

  useEffect(() => {
    updateThemeColor(primaryHue, primarySat, primaryLight);
  }, []);

  const [sampleAttachments, setSampleAttachments] = useState<FileAttachment[]>([
    {
      id: 'att-1',
      name: 'architecture_diagram.png',
      size: 245000,
      type: 'image/png',
      status: 'ready',
    },
    {
      id: 'att-2',
      name: 'schema.json',
      size: 14200,
      type: 'application/json',
      status: 'ready',
    },
  ]);

  // Mock messages stream for Live Demo
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'msg-1',
      role: 'user',
      content: 'Can you analyze our TypeScript build pipeline, optimize the bundle size, and verify the multi-package exports?',
      createdAt: new Date(),
    },
    {
      id: 'msg-2',
      role: 'assistant',
      name: 'Cognitive Architect',
      model: mockModels[0],
      createdAt: new Date(),
      latencyMs: 1420,
      tokens: { prompt: 820, completion: 430, total: 1250 },
      thoughts: [
        {
          id: 'th-1',
          title: 'Deconstructing workspace dependency graph & bundling strategy',
          content: `1. Inspecting package.json across monorepo packages.
2. Checking tsup.config.ts for ESM/CJS dual output and d.ts generation.
3. Analyzing tree-shaking flags and peer dependency exclusions for React 19.
4. Identified optimization: externalize large icon sets and enable sourcemap isolation.`,
          durationMs: 3840,
          tokens: 412,
          steps: [
            { id: 's1', title: 'Parse monorepo dependency graph', status: 'completed' },
            { id: 's2', title: 'Analyze rollup bundle chunking', status: 'completed' },
            { id: 's3', title: 'Verify exports map in package.json', status: 'completed' },
          ],
        },
      ],
      plan: {
        id: 'plan-1',
        title: 'Build Optimization Plan',
        status: 'running',
        steps: [
          {
            id: 'p1',
            title: 'Audit bundle size and duplicate lodash/lucide imports',
            status: 'completed',
          },
          {
            id: 'p2',
            title: 'Configure tsup build targets for modern ESM bundling',
            status: 'in_progress',
            subtasks: [
              { id: 'p2-1', title: 'Inject "use client" directives', status: 'completed' },
              { id: 'p2-2', title: 'Enable DTS rollup optimization', status: 'in_progress' },
            ],
          },
          {
            id: 'p3',
            title: 'Run automated type-check and benchmark verification',
            status: 'pending',
          },
        ],
      },
      toolCalls: [
        {
          id: 'tc-1',
          name: 'bash',
          args: { command: 'pnpm run build --filter @noetic-ui/react' },
          result: `> @noetic-ui/react@0.1.0 build
> tsup

CLI Building entry: src/index.ts
CJS dist/index.js     48.2 KB
ESM dist/index.mjs    42.8 KB
DTS dist/index.d.ts   14.1 KB
✔ Build completed in 242ms`,
          status: 'success',
          durationMs: 242,
        },
      ],
      content: `I've analyzed the build pipeline and configured optimized dual-package exports (CJS + ESM) with streamlined type declarations.

Key improvements:
- Externalized \`react\` and \`react-dom\` to eliminate bundle duplication.
- Configured automated \`"use client"\` banner injection.
- Total package footprint reduced to **42.8 KB** gzip!`,
      artifacts: [mockArtifact],
    },
  ]);

  const handleSimulateFlow = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const userMsg: AgentMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: 'Please execute the deployment verification checks and confirm system readiness.',
      createdAt: new Date(),
    };

    const agentMsgId = `agent-${Date.now()}`;
    const agentMsg: AgentMessage = {
      id: agentMsgId,
      role: 'assistant',
      name: 'Cognitive Architect',
      model: selectedModel,
      status: 'streaming',
      createdAt: new Date(),
      thoughts: [
        {
          id: `th-${Date.now()}`,
          title: 'Evaluating deployment preconditions and health metrics',
          content: 'Synthesizing test coverage, lint results, and environment configuration...',
          isStreaming: true,
        },
      ],
      content: '',
    };

    setMessages((prev) => [...prev, userMsg, agentMsg]);

    // Simulate streaming progression
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === agentMsgId
            ? {
                ...msg,
                thoughts: [
                  {
                    id: 'th-sim',
                    title: 'Deployment checks completed',
                    content: 'All verification checks passed with 100% test coverage.',
                    durationMs: 2400,
                    tokens: 280,
                  },
                ],
                toolCalls: [
                  {
                    id: 'tc-sim',
                    name: 'bash',
                    args: { command: 'pnpm test && pnpm typecheck' },
                    result: '✔ 28 test suites passed\n✔ Typecheck passed with 0 errors',
                    status: 'success',
                    durationMs: 480,
                  },
                ],
                content: 'All automated verification suites passed successfully! The package is ready for publication.',
                status: 'completed',
              }
            : msg
        )
      );
      setIsSimulating(false);
    }, 3000);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: AgentMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setPromptText('');
  };

  const copyInstallCommand = () => {
    navigator.clipboard.writeText('npm i @noetic-ui/react');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const copyText = (text: string, setFn: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const navigateToComponentDoc = (componentName: string) => {
    setSelectedDocComponent(componentName);
    setDocsSection('components-api');
    setActiveView('docs');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  const categories = [
    { id: 'all', label: 'All Components (23)' },
    { id: 'reasoning', label: '1. Reasoning & Tools (4)' },
    { id: 'chat', label: '2. Messages & Streaming (4)' },
    { id: 'input', label: '3. Input & Prompting (5)' },
    { id: 'hitl', label: '4. Human-in-the-Loop (3)' },
    { id: 'canvas', label: '5. Artifacts & Canvas (4)' },
    { id: 'telemetry', label: '6. Telemetry & States (2)' },
    { id: 'theme', label: '7. Theme & Customization (1)' },
  ];

  // Helper to render live component previews inside the Component API Reference page
  const renderLiveComponentPreview = (name: string) => {
    switch (name) {
      case 'ReasoningAccordion':
        return (
          <ReasoningAccordion
            defaultExpanded={true}
            thought={{
              id: 'th-demo',
              title: 'Deconstructing workspace graph & bundling strategy',
              content: `1. Verified workspace dependencies across 3 packages.\n2. Checking tsup.config.ts for ESM/CJS dual output.\n3. Identified optimization: externalize icons and isolate sourcemaps.`,
              durationMs: 3840,
              tokens: 412,
              steps: [
                { id: 's1', title: 'Parse monorepo dependency graph', status: 'completed' },
                { id: 's2', title: 'Analyze rollup bundle chunking', status: 'completed' },
                { id: 's3', title: 'Verify exports contract', status: 'completed' },
              ],
            }}
          />
        );
      case 'ToolCallCard':
        return (
          <ToolCallCard
            defaultExpanded={true}
            toolCall={{
              id: 'tc-demo',
              name: 'bash',
              args: { command: 'pnpm run build --filter @noetic-ui/react' },
              result: `CJS dist/index.js     48.2 KB\nESM dist/index.mjs    42.8 KB\nDTS dist/index.d.ts   14.1 KB\n✔ Build completed in 242ms`,
              status: 'success',
              durationMs: 242,
            }}
          />
        );
      case 'AgentPlanView':
        return (
          <AgentPlanView
            plan={{
              id: 'p-demo',
              title: 'Refactor Package Exports & Optimize Bundle',
              status: 'running',
              steps: [
                { id: '1', title: 'Audit bundle dependencies', status: 'completed' },
                {
                  id: '2',
                  title: 'Configure tsup build targets for modern ESM',
                  status: 'in_progress',
                  subtasks: [
                    { id: '2-1', title: 'Inject "use client" directives', status: 'completed' },
                    { id: '2-2', title: 'Enable DTS rollup optimization', status: 'in_progress' },
                  ],
                },
                { id: '3', title: 'Run automated typecheck verification', status: 'pending' },
              ],
            }}
          />
        );
      case 'AgentSwarmView':
        return (
          <AgentSwarmView
            agents={[
              {
                id: 'a1',
                name: 'Orchestrator',
                role: 'Task Coordinator',
                status: 'working',
                currentTask: 'Delegating code review to Coder agent...',
              },
              {
                id: 'a2',
                name: 'Code Synthesizer',
                role: 'TypeScript Specialist',
                status: 'working',
                currentTask: 'Writing unit test suites...',
              },
            ]}
            activeAgentId="a1"
          />
        );
      case 'MessageBubble':
        return (
          <div className="space-y-3">
            <MessageBubble
              variant={messageVariant}
              message={{
                id: 'msg-u-prev',
                role: 'user',
                content: 'Can you optimize our React 19 server actions in Next.js 15?',
              }}
            />
            <MessageBubble
              variant={messageVariant}
              message={{
                id: 'msg-a-prev',
                role: 'assistant',
                name: 'Claude 3.5 Sonnet',
                model: mockModels[0],
                latencyMs: 840,
                tokens: { total: 420 },
                content: 'Collocating mutations with `useActionState` and optimistic UI guarantees seamless zero-flicker transitions.',
              }}
            />
          </div>
        );
      case 'StreamingText':
        return (
          <div className="p-3.5 rounded-xl border border-border/60 bg-secondary/30 text-xs">
            <StreamingText
              content={`### Zero-Flicker Streaming
- Smooth token accumulation without layout shifts.
- Real-time inline code formatting: \`import { useChat } from '@noetic-ui/react'\``}
              isStreaming={true}
            />
          </div>
        );
      case 'BranchSwitcher':
        return (
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/60">
            <span className="text-xs text-muted-foreground font-mono">Variant Navigator:</span>
            <BranchSwitcher
              currentIndex={sampleBranchIndex}
              totalBranches={4}
              onSelectBranch={setSampleBranchIndex}
            />
          </div>
        );
      case 'ChatContainer':
        return (
          <div className="h-44 border border-border/60 rounded-xl overflow-hidden">
            <ChatContainer isStreaming={false} className="p-4">
              <MessageBubble
                message={{ id: 'c-1', role: 'user', content: 'Testing auto-scrolling viewport...' }}
              />
              <MessageBubble
                message={{ id: 'c-2', role: 'assistant', content: 'ChatContainer automatically maintains scroll anchoring!' }}
              />
            </ChatContainer>
          </div>
        );
      case 'PromptInput':
        return (
          <PromptInput
            value={sampleInputText}
            onChange={setSampleInputText}
            onSubmit={() => {}}
            models={mockModels}
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            contextItems={[{ id: '1', label: 'AgentOrchestrator.ts', type: 'file' }]}
          />
        );
      case 'DragAndDropUploader':
        return (
          <DragAndDropUploader
            attachments={sampleAttachments}
            onUploadFiles={() => {}}
            onRemoveAttachment={(id) =>
              setSampleAttachments((prev) => prev.filter((a) => a.id !== id))
            }
          />
        );
      case 'ContextTray':
        return (
          <ContextTray
            items={[
              { id: '1', label: 'AgentOrchestrator.ts', type: 'file' },
              { id: '2', label: 'UserPreferences', type: 'memory' },
              { id: '3', label: 'Postgres DB', type: 'database' },
            ]}
            onRemoveItem={() => {}}
          />
        );
      case 'SlashCommandMenu':
        return (
          <div className="relative h-44 bg-secondary/20 rounded-xl p-2 border border-border/40">
            <SlashCommandMenu
              isOpen={true}
              filterText=""
              onSelectCommand={() => {}}
              onClose={() => {}}
            />
          </div>
        );
      case 'ModelSelector':
        return (
          <div className="flex items-center gap-3">
            <ModelSelector
              models={mockModels}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
            />
            <span className="text-xs text-muted-foreground">
              Selected: <strong className="text-foreground">{selectedModel.name}</strong>
            </span>
          </div>
        );
      case 'ActionConfirmationModal':
        return (
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Safety Gatekeeper Modal</p>
              <p className="text-[11px] text-muted-foreground">Intercepts destructive commands and DB mutations.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsApprovalOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-amber-950 hover:bg-amber-400 transition-colors shadow-xs"
            >
              Preview Modal
            </button>
          </div>
        );
      case 'InteractiveQuestionCard':
        return (
          <InteractiveQuestionCard
            question="Which bundling strategy would you like configured?"
            description="Agent detected multiple valid bundlers in workspace."
            options={[
              {
                id: 'tsup',
                label: 'tsup (Recommended)',
                description: 'Fast, zero-config bundler powered by esbuild with dual ESM/CJS output',
                isRecommended: true,
              },
              {
                id: 'rollup',
                label: 'Rollup',
                description: 'Classic plugin-based ecosystem for complex tree-shaking',
              },
            ]}
            onSubmit={() => {}}
          />
        );
      case 'FeedbackActions':
        return (
          <div className="p-3 bg-secondary/30 rounded-xl border border-border/40">
            <FeedbackActions
              onFeedback={() => {}}
              onCopy={() => {}}
              onRetry={() => {}}
            />
          </div>
        );
      case 'ArtifactWorkspace':
        return (
          <div className="h-64 rounded-xl border border-border/60 overflow-hidden">
            <ArtifactWorkspace artifact={mockArtifact} />
          </div>
        );
      case 'CodeBlock':
        return (
          <CodeBlock
            filename="AgentOrchestrator.ts"
            language="typescript"
            code={`import { AgentSwarm } from '@noetic-ui/react';\n\nexport const orchestrator = new AgentSwarm();`}
          />
        );
      case 'DiffViewer':
        return <DiffViewer diffText={mockDiff} filename="AgentOrchestrator.ts" />;
      case 'TerminalStream':
        return (
          <TerminalStream
            command="pnpm test"
            output={`PASS packages/react/src/components/reasoning/ReasoningAccordion.test.tsx\nPASS packages/react/src/components/chat/MessageBubble.test.tsx\n\nTests:  28 passed, 28 total\nTime:   1.24s`}
            status="completed"
          />
        );
      case 'AgentStatusBadge':
        return (
          <div className="flex flex-wrap gap-2">
            {(['idle', 'thinking', 'searching', 'coding', 'awaiting_approval', 'completed'] as AgentState[]).map(
              (state) => (
                <AgentStatusBadge key={state} state={state} />
              )
            )}
          </div>
        );
      case 'TokenUsageMeter':
        return (
          <div className="space-y-3">
            <TokenUsageMeter
              usage={{ prompt: 14200, completion: 4800, total: 19000, costUsd: 0.057 }}
              maxTokens={128000}
            />
          </div>
        );
      case 'ThemeColorPicker':
        return (
          <ThemeColorPicker
            mode="inline"
            hue={primaryHue}
            saturation={primarySat}
            lightness={primaryLight}
            onChangeHsl={updateThemeColor}
            messageVariant={messageVariant}
            onChangeMessageVariant={setMessageVariant}
          />
        );
      default:
        return null;
    }
  };

  const activeDoc: ComponentDoc = COMPONENT_DOCS[selectedDocComponent] || COMPONENT_DOCS['ReasoningAccordion'];

  // Filter components for the docs sidebar
  const filteredDocComponents = Object.values(COMPONENT_DOCS).filter((comp) => {
    if (!docSearchQuery) return true;
    const q = docSearchQuery.toLowerCase();
    return (
      comp.name.toLowerCase().includes(q) ||
      comp.suite.toLowerCase().includes(q) ||
      comp.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 border-b border-border/80 bg-card/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-colors">
            <Bot className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight">Noetic UI</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-foreground border border-border/80 font-bold transition-colors">
              v0.1.1
            </span>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1 bg-secondary/80 p-1 rounded-xl border border-border/60 text-xs">
          <button
            type="button"
            onClick={() => setActiveView('demo')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeView === 'demo'
                ? 'bg-card text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Live Agent Demo
          </button>
          <button
            type="button"
            onClick={() => setActiveView('components')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeView === 'components'
                ? 'bg-card text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Component Suite (23)
          </button>
          <button
            type="button"
            onClick={() => setActiveView('docs')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeView === 'docs'
                ? 'bg-card text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Docs & API Reference
          </button>
        </div>

        {/* Right Action Controls: Reusable ThemeColorPicker, Install, Theme */}
        <div className="flex items-center gap-2">
          {/* Reusable Theme Color & Contrast Studio Component */}
          <ThemeColorPicker
            hue={primaryHue}
            saturation={primarySat}
            lightness={primaryLight}
            onChangeHsl={updateThemeColor}
            messageVariant={messageVariant}
            onChangeMessageVariant={setMessageVariant}
          />

          {/* Quick Install Pill */}
          <button
            type="button"
            onClick={copyInstallCommand}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/60 text-xs font-mono text-muted-foreground hover:text-foreground transition-all"
          >
            <span>npm i @noetic-ui/react</span>
            {copiedInstall ? (
              <Check className="h-3 w-3 text-emerald-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60 transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Main Content Body: 1. Demo View */}
      {activeView === 'demo' && (
        <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-57px)] overflow-hidden">
          {/* Left Column: Chat Conversation Stream */}
          <div className="flex-1 flex flex-col h-full border-r border-border/60 min-w-0 bg-background/50">
            {/* Ambient Telemetry & Message Style Controller Status Bar */}
            <div className="flex items-center justify-between px-6 py-2 border-b border-border/40 bg-secondary/20 text-xs">
              <div className="flex items-center gap-2">
                <AgentStatusBadge
                  state={isSimulating ? 'thinking' : 'idle'}
                  customLabel={isSimulating ? 'Streaming CoT Reasoning...' : 'Agent Idle'}
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Bubble Style Switcher */}
                <div className="hidden sm:flex items-center gap-1 bg-secondary/80 p-0.5 rounded-lg border border-border/60 text-[10px]">
                  {(['solid', 'subtle', 'neutral', 'bordered'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setMessageVariant(v)}
                      className={`px-2 py-0.5 rounded-md font-medium capitalize transition-all ${
                        messageVariant === v
                          ? 'bg-card text-foreground shadow-xs font-bold'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <TokenUsageMeter
                  usage={{ prompt: 1240, completion: 890, total: 2130, costUsd: 0.0085 }}
                />

                <button
                  type="button"
                  onClick={handleSimulateFlow}
                  disabled={isSimulating}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary hover:opacity-90 disabled:opacity-50 text-primary-foreground text-xs font-semibold shadow-xs transition-all"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Simulate Stream</span>
                </button>
              </div>
            </div>

            {/* Virtualized / Auto-scrolling Chat Viewport */}
            <ChatContainer isStreaming={isSimulating} className="px-4 sm:px-8 py-6">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  variant={messageVariant}
                  onSelectArtifact={(artId) => setSelectedArtifact(mockArtifact)}
                  onApproveTool={(tcId) => setIsApprovalOpen(true)}
                />
              ))}
            </ChatContainer>

            {/* Bottom Prompt Input */}
            <div className="p-4 sm:p-6 bg-background border-t border-border/40">
              <PromptInput
                value={promptText}
                onChange={setPromptText}
                onSubmit={handleSendMessage}
                isStreaming={isSimulating}
                models={mockModels}
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
                contextItems={[
                  { id: 'ctx-1', label: 'AgentOrchestrator.ts', type: 'file' },
                  { id: 'ctx-2', label: 'UserPreferences', type: 'memory' },
                ]}
                onRemoveContextItem={(id) => {}}
                placeholder="Ask your agent or type /plan, /search, /exec..."
              />
            </div>
          </div>

          {/* Right Column: Artifacts, Code Canvas & Live Sidecar */}
          <div className="w-full lg:w-[480px] xl:w-[560px] h-full flex flex-col p-4 bg-secondary/10 overflow-hidden">
            {selectedArtifact ? (
              <ArtifactWorkspace
                artifact={selectedArtifact}
                onClose={() => setSelectedArtifact(null)}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-border/60 bg-secondary/20 text-muted-foreground">
                <Layers className="h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium text-foreground">
                  No Active Artifact Selected
                </p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  When your agent generates code, files, or canvas documents, they will be rendered in this sidecar workspace.
                </p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Main Content Body: 2. Comprehensive Component Suite Gallery View */}
      {activeView === 'components' && (
        <div className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
          {/* Header & Theme Customization Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-border/80 bg-card shadow-sm">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Noetic UI Component Catalog
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Interactive sandbox showcasing all 23 components across the 7 core architectural suites.
              </p>
            </div>

            {/* Reusable Palette Studio Trigger & Indicators */}
            <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded-full border border-background shadow-xs flex-shrink-0"
                  style={{ backgroundColor: `hsl(${primaryHue}, ${primarySat}%, ${primaryLight}%)` }}
                />
                <span className="text-xs font-semibold font-mono">
                  {primaryHue}° / {primarySat}% / {primaryLight}%
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary text-primary-foreground font-bold shadow-2xs">
                  {metrics.isLightBackground ? 'Black text' : 'White text'}
                </span>
              </div>
              
              <ThemeColorPicker
                hue={primaryHue}
                saturation={primarySat}
                lightness={primaryLight}
                onChangeHsl={updateThemeColor}
                messageVariant={messageVariant}
                onChangeMessageVariant={setMessageVariant}
                triggerLabel="Customize Palette"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setComponentCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  componentCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Suite 1: Reasoning & Tool Execution */}
          {(componentCategory === 'all' || componentCategory === 'reasoning') && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h2 className="text-base font-semibold text-foreground">
                    1. Reasoning & Tool Execution Suite
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Reasoning Accordion */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono font-semibold text-foreground">
                        ReasoningAccordion
                      </h3>
                      <button
                        type="button"
                        onClick={() => navigateToComponentDoc('ReasoningAccordion')}
                        className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Props & Docs</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <ReasoningAccordion
                      defaultExpanded={true}
                      thought={{
                        id: 'sample-th',
                        title: 'Synthesizing Multi-Agent Strategy',
                        content: `1. Verified workspace dependencies.\n2. Formulated task DAG for parallel tool dispatch.\n3. Validated schema contracts across subagents.`,
                        durationMs: 3200,
                        tokens: 284,
                        steps: [
                          { id: 's1', title: 'Verify workspace contracts', status: 'completed' },
                          { id: 's2', title: 'Formulate execution DAG', status: 'completed' },
                        ],
                      }}
                    />
                  </div>
                </div>

                {/* Tool Call Card */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono font-semibold text-foreground">
                        ToolCallCard
                      </h3>
                      <button
                        type="button"
                        onClick={() => navigateToComponentDoc('ToolCallCard')}
                        className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Props & Docs</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <ToolCallCard
                      defaultExpanded={true}
                      toolCall={{
                        id: 'tc-demo',
                        name: 'bash',
                        args: { command: 'git status --short' },
                        result: 'M packages/react/src/index.ts\nM packages/react/package.json',
                        status: 'success',
                        durationMs: 142,
                      }}
                    />
                  </div>
                </div>

                {/* Plan View */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono font-semibold text-foreground">
                        AgentPlanView
                      </h3>
                      <button
                        type="button"
                        onClick={() => navigateToComponentDoc('AgentPlanView')}
                        className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Props & Docs</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <AgentPlanView
                      plan={{
                        id: 'sample-plan',
                        title: 'Refactor Monorepo Structure',
                        status: 'running',
                        steps: [
                          { id: '1', title: 'Analyze existing dependencies', status: 'completed' },
                          { id: '2', title: 'Extract shared Tailwind preset', status: 'in_progress' },
                          { id: '3', title: 'Deploy Storybook documentation', status: 'pending' },
                        ],
                      }}
                    />
                  </div>
                </div>

                {/* Swarm View */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono font-semibold text-foreground">
                        AgentSwarmView
                      </h3>
                      <button
                        type="button"
                        onClick={() => navigateToComponentDoc('AgentSwarmView')}
                        className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Props & Docs</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <AgentSwarmView
                      agents={[
                        {
                          id: 'a1',
                          name: 'Orchestrator',
                          role: 'Task Coordinator',
                          status: 'working',
                          currentTask: 'Delegating code review to Coder agent...',
                        },
                        {
                          id: 'a2',
                          name: 'Code Synthesizer',
                          role: 'TypeScript Specialist',
                          status: 'working',
                          currentTask: 'Writing unit test suites...',
                        },
                      ]}
                      activeAgentId="a1"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Suite 2: Messages & Streaming */}
          {(componentCategory === 'all' || componentCategory === 'chat') && (
            <section className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  2. Messages & Streaming Suite
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Message Bubble (User & Assistant) with Variant Switcher */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 lg:col-span-2 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xs font-mono font-semibold text-foreground">
                          MessageBubble & Contrast Modes
                        </h3>
                        <button
                          type="button"
                          onClick={() => navigateToComponentDoc('MessageBubble')}
                          className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <span>View Props & Docs</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Supports 4 contrast variants: <code className="text-foreground font-mono font-semibold px-1 py-0.2 rounded bg-secondary border border-border/60">solid</code> (automatic AAA foreground), <code className="text-foreground font-mono font-semibold px-1 py-0.2 rounded bg-secondary border border-border/60">subtle</code>, <code className="text-foreground font-mono font-semibold px-1 py-0.2 rounded bg-secondary border border-border/60">neutral</code>, and <code className="text-foreground font-mono font-semibold px-1 py-0.2 rounded bg-secondary border border-border/60">bordered</code>.
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-secondary p-1 rounded-lg text-xs">
                      {(['solid', 'subtle', 'neutral', 'bordered'] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setMessageVariant(v)}
                          className={`px-2.5 py-1 rounded-md font-medium capitalize transition-all ${
                            messageVariant === v
                              ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 p-4 rounded-xl bg-secondary/20 border border-border/40">
                    <MessageBubble
                      variant={messageVariant}
                      message={{
                        id: 'msg-u',
                        role: 'user',
                        content: 'How do I optimize React 19 server actions in Next.js?',
                      }}
                    />
                    <MessageBubble
                      variant={messageVariant}
                      message={{
                        id: 'msg-a',
                        role: 'assistant',
                        name: 'Claude 3.5 Sonnet',
                        model: mockModels[0],
                        latencyMs: 840,
                        tokens: { total: 420 },
                        content: 'React 19 server actions can be optimized by collocating mutations with useActionState.',
                      }}
                    />
                  </div>
                </div>

                {/* StreamingText & BranchSwitcher */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 lg:col-span-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xs font-mono font-semibold text-foreground">
                        StreamingText & BranchSwitcher
                      </h3>
                      <button
                        type="button"
                        onClick={() => navigateToComponentDoc('StreamingText')}
                        className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>StreamingText Docs</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToComponentDoc('BranchSwitcher')}
                        className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>BranchSwitcher Docs</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <BranchSwitcher
                      currentIndex={sampleBranchIndex}
                      totalBranches={4}
                      onSelectBranch={setSampleBranchIndex}
                    />
                  </div>
                  <div className="p-3.5 rounded-xl border border-border/60 bg-secondary/30 text-xs">
                    <StreamingText
                      content={`### Streaming Markdown Engine
- **Zero-flicker** re-rendering during active SSE token streams
- Integrated inline code formatting: \`import { useChat } from '@noetic-ui/react'\`
- Support for ordered/unordered task items and headers.`}
                      isStreaming={true}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Suite 3: Input & Multimodal Prompting */}
          {(componentCategory === 'all' || componentCategory === 'input') && (
            <section className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  3. Input & Multimodal Prompting Suite
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* PromptInput */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      PromptInput
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('PromptInput')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <PromptInput
                    value={sampleInputText}
                    onChange={setSampleInputText}
                    onSubmit={() => {}}
                    models={mockModels}
                    selectedModel={selectedModel}
                    onSelectModel={setSelectedModel}
                    contextItems={[
                      { id: '1', label: 'AgentOrchestrator.ts', type: 'file' },
                      { id: '2', label: 'TelemetryService', type: 'tool' },
                    ]}
                    onRemoveContextItem={() => {}}
                  />
                </div>

                {/* DragAndDropUploader */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      DragAndDropUploader
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('DragAndDropUploader')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <DragAndDropUploader
                    attachments={sampleAttachments}
                    onUploadFiles={() => {}}
                    onRemoveAttachment={(id) =>
                      setSampleAttachments((prev) => prev.filter((a) => a.id !== id))
                    }
                  />
                </div>

                {/* ContextTray Standalone */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      ContextTray
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('ContextTray')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <ContextTray
                    items={[
                      { id: '1', label: 'tsconfig.json', type: 'file', meta: 'root' },
                      { id: '2', label: 'UserPreferences', type: 'memory' },
                      { id: '3', label: 'Postgres DB', type: 'database' },
                    ]}
                    onRemoveItem={() => {}}
                  />
                </div>

                {/* ModelSelector Standalone */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      ModelSelector
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('ModelSelector')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <ModelSelector
                      models={mockModels}
                      selectedModel={selectedModel}
                      onSelectModel={setSelectedModel}
                    />
                    <span className="text-xs text-muted-foreground">
                      Selected: <strong className="text-foreground">{selectedModel.name}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Suite 4: Human-in-the-Loop & HITL Controls */}
          {(componentCategory === 'all' || componentCategory === 'hitl') && (
            <section className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <ShieldAlert className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  4. Human-in-the-Loop (HITL) Controls Suite
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Interactive Question Card */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      InteractiveQuestionCard
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('InteractiveQuestionCard')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <InteractiveQuestionCard
                    question="Which testing framework would you like configured for the package?"
                    description="Agent detected multiple options in workspace configuration."
                    options={[
                      {
                        id: 'vitest',
                        label: 'Vitest + Testing Library (Recommended)',
                        description: 'Fast, native ESM runner with zero-config TypeScript support',
                        isRecommended: true,
                      },
                      {
                        id: 'jest',
                        label: 'Jest + ts-jest',
                        description: 'Classic runner with extensive legacy plugin ecosystem',
                      },
                    ]}
                    onSubmit={() => {}}
                  />
                </div>

                {/* FeedbackActions & ActionConfirmationModal Preview */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-mono font-semibold text-foreground">
                        FeedbackActions
                      </h3>
                      <button
                        type="button"
                        onClick={() => navigateToComponentDoc('FeedbackActions')}
                        className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Props & Docs</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <FeedbackActions
                      onFeedback={() => {}}
                      onCopy={() => {}}
                      onRetry={() => {}}
                    />
                  </div>

                  <div className="pt-3 border-t border-border/40">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-mono font-semibold text-foreground">
                        ActionConfirmationModal
                      </h3>
                      <button
                        type="button"
                        onClick={() => navigateToComponentDoc('ActionConfirmationModal')}
                        className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Props & Docs</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      Safety gatekeeper modal for sensitive shell commands, file overwrites, and DB migrations.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsApprovalOpen(true)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 text-amber-950 hover:bg-amber-400 transition-colors shadow-xs"
                    >
                      Trigger Approval Modal
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Suite 5: Artifacts & Canvas */}
          {(componentCategory === 'all' || componentCategory === 'canvas') && (
            <section className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <Layers className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  5. Artifacts & Canvas Suite
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Terminal Stream */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      TerminalStream
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('TerminalStream')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <TerminalStream
                    command="pnpm test"
                    output={`PASS packages/react/src/components/reasoning/ReasoningAccordion.test.tsx\nPASS packages/react/src/components/chat/MessageBubble.test.tsx\nTests:  14 passed, 14 total\nTime:   1.24s`}
                    status="completed"
                  />
                </div>

                {/* Diff Viewer */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      DiffViewer
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('DiffViewer')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <DiffViewer diffText={mockDiff} filename="AgentOrchestrator.ts" />
                </div>

                {/* Code Block */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 lg:col-span-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      CodeBlock
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('CodeBlock')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <CodeBlock
                    filename="AgentOrchestrator.ts"
                    language="typescript"
                    code={mockArtifact.content}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Suite 6: Telemetry & Live States */}
          {(componentCategory === 'all' || componentCategory === 'telemetry') && (
            <section className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <Activity className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  6. Telemetry & Live Agent States Suite
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AgentStatusBadge States */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      AgentStatusBadge (6 Ambient States)
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('AgentStatusBadge')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(['idle', 'thinking', 'searching', 'coding', 'awaiting_approval', 'completed'] as AgentState[]).map(
                      (state) => (
                        <AgentStatusBadge key={state} state={state} />
                      )
                    )}
                  </div>
                </div>

                {/* TokenUsageMeter */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      TokenUsageMeter
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('TokenUsageMeter')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="space-y-3 pt-1">
                    <TokenUsageMeter
                      usage={{ prompt: 14200, completion: 4800, total: 19000, costUsd: 0.057 }}
                      maxTokens={128000}
                    />
                    <TokenUsageMeter
                      usage={{ prompt: 98000, completion: 24000, total: 122000, costUsd: 0.366 }}
                      maxTokens={128000}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Suite 7: Theme & Customization Suite */}
          {(componentCategory === 'all' || componentCategory === 'theme') && (
            <section className="space-y-4 pt-4 pb-12">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <Paintbrush className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  7. Theme & Customization Suite (Reusable)
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Embedded Inline ThemeColorPicker */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      ThemeColorPicker (Inline Mode)
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('ThemeColorPicker')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <ThemeColorPicker
                    mode="inline"
                    hue={primaryHue}
                    saturation={primarySat}
                    lightness={primaryLight}
                    onChangeHsl={updateThemeColor}
                    messageVariant={messageVariant}
                    onChangeMessageVariant={setMessageVariant}
                  />
                </div>

                {/* Popover Mode Trigger & Live Information */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-semibold text-foreground">
                      ThemeColorPicker (Popover Mode)
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToComponentDoc('ThemeColorPicker')}
                      className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Props & Docs</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Compact button trigger that opens a floating backdrop-blurred studio popover with live WCAG 2.1 contrast calculations, Hue/Saturation/Lightness range sliders, preset palettes, and clipboard CSS export.
                  </p>

                  <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThemeColorPicker
                        mode="popover"
                        hue={primaryHue}
                        saturation={primarySat}
                        lightness={primaryLight}
                        onChangeHsl={updateThemeColor}
                        messageVariant={messageVariant}
                        onChangeMessageVariant={setMessageVariant}
                        triggerLabel="Open Color Studio"
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      Contrast: <strong className="text-foreground">{metrics.ratio}:1</strong>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {/* Main Content Body: 3. Docs, CLI & Component API Reference View */}
      {activeView === 'docs' && (
        <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row overflow-hidden">
          {/* Docs Left Sub-Navigation Sidebar */}
          <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-border/60 p-4 md:p-6 bg-secondary/10 flex-shrink-0 space-y-4 overflow-y-auto max-h-[calc(100vh-57px)]">
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Overview & Setup
              </div>

              <button
                type="button"
                onClick={() => setDocsSection('cli')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  docsSection === 'cli'
                    ? 'bg-primary text-primary-foreground font-bold shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <Terminal className="h-4 w-4" />
                <span>CLI Tooling (<code className="font-mono text-[11px]">@noetic-ui/cli</code>)</span>
              </button>

              <button
                type="button"
                onClick={() => setDocsSection('quickstart')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  docsSection === 'quickstart'
                    ? 'bg-primary text-primary-foreground font-bold shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Quickstart & Package Setup</span>
              </button>

              <button
                type="button"
                onClick={() => setDocsSection('theme')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  docsSection === 'theme'
                    ? 'bg-primary text-primary-foreground font-bold shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <Palette className="h-4 w-4" />
                <span>Theme & Contrast Engine</span>
              </button>

              <button
                type="button"
                onClick={() => setDocsSection('messages')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  docsSection === 'messages'
                    ? 'bg-primary text-primary-foreground font-bold shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Message Contrast Modes</span>
              </button>
            </div>

            {/* Component API Explorer Section */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between px-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Component API & Props (23)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-primary/10 text-primary font-bold">
                  23
                </span>
              </div>

              {/* Search filter for components */}
              <div className="relative px-1">
                <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter components..."
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-card border border-border/60 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Categorized List of Components */}
              <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
                {filteredDocComponents.map((comp) => {
                  const isSelected = docsSection === 'components-api' && selectedDocComponent === comp.name;
                  return (
                    <button
                      key={comp.name}
                      type="button"
                      onClick={() => {
                        setSelectedDocComponent(comp.name);
                        setDocsSection('components-api');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                        isSelected
                          ? 'bg-primary text-primary-foreground font-semibold shadow-2xs'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                      }`}
                    >
                      <span className="truncate">{comp.name}</span>
                      <span className={`text-[9px] font-mono px-1 rounded ${
                        isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'text-muted-foreground/80'
                      }`}>
                        {comp.suiteId}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Docs Right Content Area */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-10">
            {/* 1. Component API Reference & Props Mapping */}
            {docsSection === 'components-api' && activeDoc && (
              <div className="space-y-8 max-w-4xl">
                {/* Header info */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                      {activeDoc.suite}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/60">
                      {activeDoc.props.length} Props
                    </span>
                  </div>

                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                    <code>{activeDoc.name}</code>
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {activeDoc.description}
                  </p>
                </div>

                {/* Quick Action Badges: CLI & Import */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-secondary/30 border border-border/60">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/40 text-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Terminal className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      <code className="font-mono text-[11px] text-foreground truncate">{activeDoc.cliCommand}</code>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(activeDoc.cliCommand, setCopiedDocCmd)}
                      className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ml-2"
                      title="Copy CLI command"
                    >
                      {copiedDocCmd ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/40 text-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Code2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      <code className="font-mono text-[11px] text-foreground truncate">{activeDoc.importStatement}</code>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(activeDoc.importStatement, setCopiedDocImport)}
                      className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ml-2"
                      title="Copy import statement"
                    >
                      {copiedDocImport ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Interactive Live Component Preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-mono font-bold text-foreground flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <span>Live Interactive Preview</span>
                    </h2>
                    <span className="text-[10px] font-mono text-muted-foreground">Active Theme: {primaryHue}° HSL</span>
                  </div>

                  <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm">
                    {renderLiveComponentPreview(activeDoc.name)}
                  </div>
                </div>

                {/* Props Table */}
                <div className="space-y-3 pt-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Table className="h-4 w-4 text-primary" />
                    <span>Props & API Reference</span>
                  </h2>

                  <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-sm">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-secondary/40 border-b border-border/60 text-muted-foreground font-mono text-[11px]">
                        <tr>
                          <th className="py-3 px-4">Prop</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Default</th>
                          <th className="py-3 px-4">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {activeDoc.props.map((prop) => (
                          <tr key={prop.name} className="hover:bg-secondary/20 transition-colors">
                            <td className="py-3 px-4 font-mono font-semibold text-foreground flex items-center gap-2">
                              <span>{prop.name}</span>
                              {prop.required && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20">
                                  required
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-mono text-primary text-[11px]">
                              <code>{prop.type}</code>
                            </td>
                            <td className="py-3 px-4 font-mono text-muted-foreground text-[11px]">
                              {prop.default ? <code>{prop.default}</code> : <span className="text-muted-foreground/40">—</span>}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground leading-relaxed">
                              {prop.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Related TypeScript Interfaces */}
                {activeDoc.types && activeDoc.types.length > 0 && (
                  <div className="space-y-3 pt-4">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <FileCode className="h-4 w-4 text-primary" />
                      <span>TypeScript Types & Interfaces</span>
                    </h2>

                    {activeDoc.types.map((typeDef) => (
                      <CodeBlock
                        key={typeDef.name}
                        filename={`${typeDef.name}.d.ts`}
                        language="typescript"
                        code={typeDef.code}
                      />
                    ))}
                  </div>
                )}

                {/* Usage Examples */}
                <div className="space-y-4 pt-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-primary" />
                    <span>Usage Example</span>
                  </h2>

                  <CodeBlock
                    filename={`${activeDoc.name}Example.tsx`}
                    language="tsx"
                    code={activeDoc.basicUsage}
                  />

                  {activeDoc.advancedUsage && (
                    <div className="space-y-2 pt-2">
                      <h3 className="text-xs font-mono font-semibold text-foreground">Advanced / Streaming Integration:</h3>
                      <CodeBlock
                        filename={`${activeDoc.name}Advanced.tsx`}
                        language="tsx"
                        code={activeDoc.advancedUsage}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. CLI Reference & Interactive Playground */}
            {docsSection === 'cli' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-semibold mb-3">
                    <Terminal className="h-3 w-3" />
                    <span>Official CLI Tooling</span>
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                    Noetic UI CLI (<code className="font-mono text-2xl font-bold">@noetic-ui/cli</code>)
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    The <code className="text-foreground font-mono font-semibold px-1 py-0.2 rounded bg-secondary border border-border/60">@noetic-ui/cli</code> package is a shadcn-inspired component distribution and scaffolding tool. It allows you to initialize projects, inspect all 23 components, and copy unbundled TypeScript source code directly into your repository with 100% source ownership.
                  </p>
                </div>

                {/* Interactive CLI Command Simulator */}
                <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                    <div>
                      <h3 className="text-xs font-mono font-bold text-foreground">
                        Interactive CLI Simulator
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        Click a command below to preview its live terminal output and behavior:
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'list', label: 'list' },
                        { id: 'init', label: 'init' },
                        { id: 'addSingle', label: 'add PromptInput' },
                        { id: 'addAll', label: 'add --all' },
                        { id: 'themePreset', label: 'theme cyan' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveCliDemo(item.id)}
                          className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-all ${
                            activeCliDemo === item.id
                              ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                              : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <TerminalStream
                    command={cliSimulations[activeCliDemo].cmd}
                    output={cliSimulations[activeCliDemo].output}
                    status="completed"
                  />
                </div>

                {/* Command 1: init */}
                <div className="space-y-3 pt-2">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-xs font-mono font-bold">1</span>
                    <span><code className="font-mono text-base">npx @noetic-ui/cli init</code></span>
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Scaffolds the Noetic UI configuration in your project. It automatically detects your framework (Next.js App/Pages Router, Vite, Remix, Astro), creates <code className="font-mono text-[11px]">noetic-ui.json</code>, sets up <code className="font-mono text-[11px]">components/noetic-ui/cn.ts</code> and <code className="font-mono text-[11px]">types.ts</code>, and injects CSS custom properties into your global stylesheet.
                  </p>
                  <CodeBlock
                    language="bash"
                    filename="Terminal"
                    code={`# Interactive initialization with prompts
npx @noetic-ui/cli init

# Skip confirmation prompts and accept defaults
npx @noetic-ui/cli init -y`}
                  />
                </div>

                {/* Command 2: list */}
                <div className="space-y-3 pt-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-xs font-mono font-bold">2</span>
                    <span><code className="font-mono text-base">npx @noetic-ui/cli list</code></span>
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Prints a categorized index of all 23 available components across the 7 architectural suites with descriptions and required peer packages:
                  </p>
                  <CodeBlock
                    language="bash"
                    filename="Terminal"
                    code={`npx @noetic-ui/cli list`}
                  />
                </div>

                {/* Command 3: add */}
                <div className="space-y-3 pt-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-xs font-mono font-bold">3</span>
                    <span><code className="font-mono text-base">npx @noetic-ui/cli add [...components]</code></span>
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Copies components directly into your codebase (<code className="font-mono text-[11px]">components/noetic-ui/</code>). It automatically resolves internal dependencies (e.g. adding <code className="font-mono text-[11px]">PromptInput</code> also copies <code className="font-mono text-[11px]">ModelSelector</code>, <code className="font-mono text-[11px]">ContextTray</code>, <code className="font-mono text-[11px]">SlashCommandMenu</code>, <code className="font-mono text-[11px]">cn.ts</code>, and <code className="font-mono text-[11px]">types.ts</code>):
                  </p>
                  <CodeBlock
                    language="bash"
                    filename="Terminal"
                    code={`# Add individual or multiple components
npx @noetic-ui/cli add PromptInput MessageBubble

# Add an entire architectural suite (e.g. reasoning, chat, input, hitl, canvas, telemetry, theme)
npx @noetic-ui/cli add --suite reasoning

# Add all 23 components into your repository
npx @noetic-ui/cli add --all

# Launch interactive autocomplete multi-select checklist
npx @noetic-ui/cli add

# Overwrite existing local components with latest upstream
npx @noetic-ui/cli add MessageBubble --overwrite`}
                  />
                </div>

                {/* Command 4: theme */}
                <div className="space-y-3 pt-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-xs font-mono font-bold">4</span>
                    <span><code className="font-mono text-base">npx @noetic-ui/cli theme [preset]</code></span>
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Interactive palette configurator that updates <code className="font-mono text-[11px]">globals.css</code> with calibrated HSL color tokens and optimal WCAG text contrast:
                  </p>
                  <CodeBlock
                    language="bash"
                    filename="Terminal"
                    code={`# Interactive palette selector
npx @noetic-ui/cli theme

# Specify a preset directly (violet, indigo, cyan, lime, emerald, amber, orange, rose, fuchsia)
npx @noetic-ui/cli theme cyan`}
                  />
                </div>

                {/* Configuration File noetic-ui.json */}
                <div className="space-y-3 pt-4 pb-12">
                  <h2 className="text-lg font-bold text-foreground">Configuration File (<code className="font-mono text-sm">noetic-ui.json</code>)</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Generated by <code className="font-mono text-[11px]">npx @noetic-ui/cli init</code> in the root of your project:
                  </p>
                  <CodeBlock
                    language="json"
                    filename="noetic-ui.json"
                    code={`{
  "baseColor": "violet",
  "css": "app/globals.css",
  "components": "components/noetic-ui",
  "aliases": {
    "components": "components/noetic-ui",
    "utils": "components/noetic-ui/cn"
  }
}`}
                  />
                </div>
              </div>
            )}

            {/* 3. Quickstart & Package Setup */}
            {docsSection === 'quickstart' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                    Quickstart & Package Setup
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Install <code className="text-foreground font-mono font-semibold px-1 py-0.2 rounded bg-secondary border border-border/60">@noetic-ui/react</code> directly from npm to consume pre-compiled components in your React 18/19 or Next.js app.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-foreground">1. Install NPM Package</h2>
                  <CodeBlock
                    language="bash"
                    filename="Terminal"
                    code={`pnpm add @noetic-ui/react framer-motion lucide-react clsx tailwind-merge`}
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-foreground">2. Import Components</h2>
                  <CodeBlock
                    language="tsx"
                    filename="AgentView.tsx"
                    code={`import {
  ChatContainer,
  MessageBubble,
  PromptInput,
  ReasoningAccordion,
  AgentStatusBadge,
} from '@noetic-ui/react';

export function MyAgentApp() {
  return (
    <div className="flex flex-col h-screen">
      <AgentStatusBadge state="thinking" />
      <ChatContainer>
        {/* Messages */}
      </ChatContainer>
      <PromptInput onSubmit={(msg) => console.log(msg)} />
    </div>
  );
}`}
                  />
                </div>
              </div>
            )}

            {/* 4. Theme & Contrast Engine */}
            {docsSection === 'theme' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                    Theme & Contrast Engine
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Noetic UI uses CSS custom properties with automatic WCAG 2.1 contrast ratio calculations. When bright primary colors like Yellow (40°) or Neon Lime (85°) are selected in Light Mode, the text automatically flips to black (<code className="font-mono">#09090b</code>) to guarantee AA & AAA compliance (10.8:1 contrast).
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-foreground">Reusable ThemeColorPicker Component</h2>
                  <CodeBlock
                    language="tsx"
                    filename="Header.tsx"
                    code={`import { ThemeColorPicker } from '@noetic-ui/react';

export function Header() {
  const [hue, setHue] = useState(265);
  const [sat, setSat] = useState(85);
  const [light, setLight] = useState(60);

  const handleUpdate = (h: number, s: number, l: number) => {
    setHue(h);
    setSat(s);
    setLight(l);
    document.documentElement.style.setProperty('--primary', \`\${h} \${s}% \${l}%\`);
  };

  return (
    <ThemeColorPicker
      hue={hue}
      saturation={sat}
      lightness={light}
      onChangeHsl={handleUpdate}
      mode="popover" // or "inline"
    />
  );
}`}
                  />
                </div>
              </div>
            )}

            {/* 5. Message Bubble Contrast Modes */}
            {docsSection === 'messages' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                    Message Bubble Contrast Modes
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    <code className="text-foreground font-mono font-semibold px-1 py-0.2 rounded bg-secondary border border-border/60">MessageBubble</code> supports 4 distinct visual variants designed to accommodate any brand visual hierarchy:
                  </p>
                </div>

                <div className="space-y-4">
                  <CodeBlock
                    language="tsx"
                    filename="Messages.tsx"
                    code={`// 1. Solid Accent (default - high visual weight, auto-contrast text)
<MessageBubble message={userMessage} variant="solid" />

// 2. Subtle Tint (soft pastel contrast with primary tint)
<MessageBubble message={userMessage} variant="subtle" />

// 3. Neutral Card (minimalist surface with border)
<MessageBubble message={userMessage} variant="neutral" />

// 4. Bordered Accent (accessible high-contrast outline)
<MessageBubble message={userMessage} variant="bordered" />`}
                  />
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* Action Confirmation Modal Preview */}
      <ActionConfirmationModal
        isOpen={isApprovalOpen}
        title="Execute Shell Command"
        description="The agent is requesting permission to execute the following terminal command on your environment:"
        actionType="bash"
        payload="pnpm run build && pnpm changeset publish"
        severity="medium"
        onApprove={() => setIsApprovalOpen(false)}
        onReject={() => setIsApprovalOpen(false)}
        onClose={() => setIsApprovalOpen(false)}
      />
    </div>
  );
}
