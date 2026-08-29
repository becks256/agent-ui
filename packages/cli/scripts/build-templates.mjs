import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reactSrcDir = path.resolve(__dirname, "../../react/src");
const outputFilePath = path.resolve(__dirname, "../src/registry/templates.ts");

const componentFiles = [
  // Utilities & Types
  { key: "cn", relPath: "utils/cn.ts", targetFilename: "cn.ts" },
  { key: "types", relPath: "types/index.ts", targetFilename: "types.ts" },

  // 1. Reasoning & Tools
  {
    key: "ReasoningAccordion",
    relPath: "components/reasoning/ReasoningAccordion.tsx",
    targetFilename: "ReasoningAccordion.tsx",
  },
  {
    key: "ToolCallCard",
    relPath: "components/reasoning/ToolCallCard.tsx",
    targetFilename: "ToolCallCard.tsx",
  },
  {
    key: "AgentPlanView",
    relPath: "components/reasoning/AgentPlanView.tsx",
    targetFilename: "AgentPlanView.tsx",
  },
  {
    key: "AgentSwarmView",
    relPath: "components/reasoning/AgentSwarmView.tsx",
    targetFilename: "AgentSwarmView.tsx",
  },

  // 2. Messages & Streaming
  {
    key: "MessageBubble",
    relPath: "components/chat/MessageBubble.tsx",
    targetFilename: "MessageBubble.tsx",
  },
  {
    key: "StreamingText",
    relPath: "components/chat/StreamingText.tsx",
    targetFilename: "StreamingText.tsx",
  },
  {
    key: "BranchSwitcher",
    relPath: "components/chat/BranchSwitcher.tsx",
    targetFilename: "BranchSwitcher.tsx",
  },
  {
    key: "ChatContainer",
    relPath: "components/chat/ChatContainer.tsx",
    targetFilename: "ChatContainer.tsx",
  },

  // 3. Input & Prompting
  {
    key: "PromptInput",
    relPath: "components/input/PromptInput.tsx",
    targetFilename: "PromptInput.tsx",
  },
  {
    key: "DragAndDropUploader",
    relPath: "components/input/DragAndDropUploader.tsx",
    targetFilename: "DragAndDropUploader.tsx",
  },
  {
    key: "ContextTray",
    relPath: "components/input/ContextTray.tsx",
    targetFilename: "ContextTray.tsx",
  },
  {
    key: "SlashCommandMenu",
    relPath: "components/input/SlashCommandMenu.tsx",
    targetFilename: "SlashCommandMenu.tsx",
  },
  {
    key: "ModelSelector",
    relPath: "components/input/ModelSelector.tsx",
    targetFilename: "ModelSelector.tsx",
  },

  // 4. HITL
  {
    key: "ActionConfirmationModal",
    relPath: "components/hitl/ActionConfirmationModal.tsx",
    targetFilename: "ActionConfirmationModal.tsx",
  },
  {
    key: "InteractiveQuestionCard",
    relPath: "components/hitl/InteractiveQuestionCard.tsx",
    targetFilename: "InteractiveQuestionCard.tsx",
  },
  {
    key: "FeedbackActions",
    relPath: "components/hitl/FeedbackActions.tsx",
    targetFilename: "FeedbackActions.tsx",
  },

  // 5. Canvas & Artifacts
  {
    key: "ArtifactWorkspace",
    relPath: "components/artifacts/ArtifactWorkspace.tsx",
    targetFilename: "ArtifactWorkspace.tsx",
  },
  {
    key: "CodeBlock",
    relPath: "components/artifacts/CodeBlock.tsx",
    targetFilename: "CodeBlock.tsx",
  },
  {
    key: "DiffViewer",
    relPath: "components/artifacts/DiffViewer.tsx",
    targetFilename: "DiffViewer.tsx",
  },
  {
    key: "TerminalStream",
    relPath: "components/artifacts/TerminalStream.tsx",
    targetFilename: "TerminalStream.tsx",
  },

  // 6. Telemetry & States
  {
    key: "AgentStatusBadge",
    relPath: "components/telemetry/AgentStatusBadge.tsx",
    targetFilename: "AgentStatusBadge.tsx",
  },
  {
    key: "TokenUsageMeter",
    relPath: "components/telemetry/TokenUsageMeter.tsx",
    targetFilename: "TokenUsageMeter.tsx",
  },

  // 7. Theme & Customization
  {
    key: "ThemeColorPicker",
    relPath: "components/theme/ThemeColorPicker.tsx",
    targetFilename: "ThemeColorPicker.tsx",
  },
];

let out = `// Auto-generated templates from @noetic-ui/react source\n\n`;
out += `export interface TemplateFile {\n  filename: string;\n  content: string;\n}\n\n`;
out += `export const COMPONENT_TEMPLATES: Record<string, TemplateFile> = {\n`;

for (const comp of componentFiles) {
  const fullPath = path.resolve(reactSrcDir, comp.relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  let content = fs.readFileSync(fullPath, "utf8");

  // Normalize relative imports for standalone component usage
  content = content
    .replace(/from '\.\.\/\.\.\/utils\/cn'/g, "from './cn'")
    .replace(/from '\.\.\/\.\.\/types'/g, "from './types'")
    .replace(/from '\.\.\/reasoning\//g, "from './")
    .replace(/from '\.\.\/chat\//g, "from './")
    .replace(/from '\.\.\/input\//g, "from './")
    .replace(/from '\.\.\/hitl\//g, "from './")
    .replace(/from '\.\.\/artifacts\//g, "from './")
    .replace(/from '\.\.\/telemetry\//g, "from './")
    .replace(/from '\.\.\/theme\//g, "from './");

  out += `  ${JSON.stringify(comp.key)}: {\n`;
  out += `    filename: ${JSON.stringify(comp.targetFilename)},\n`;
  out += `    content: ${JSON.stringify(content)},\n`;
  out += `  },\n`;
}

out += `};\n`;

fs.ensureDirSync(path.dirname(outputFilePath));
fs.writeFileSync(outputFilePath, out, "utf8");
console.log(
  `✔ Successfully generated templates for ${componentFiles.length} files at ${outputFilePath}`,
);
