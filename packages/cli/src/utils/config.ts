import fs from 'fs-extra';
import path from 'path';

export interface AgentUiConfig {
  baseColor: string;
  css: string;
  components: string;
  aliases: {
    components: string;
    utils: string;
  };
}

export const DEFAULT_CONFIG: AgentUiConfig = {
  baseColor: 'violet',
  css: 'app/globals.css',
  components: 'components/agent-ui',
  aliases: {
    components: 'components/agent-ui',
    utils: 'components/agent-ui/cn',
  },
};

export const CSS_COLOR_VARIABLES = `
@layer base {
  :root {
    --primary: 265 85% 60%;
    --primary-hue: 265;
    --primary-sat: 85%;
    --primary-light: 60%;
    --primary-foreground: 0 0% 100%;
    --agent-thought: 265 85% 60%;

    --background: 240 5% 97.5%;
    --card: 0 0% 100%;
    --popover: 0 0% 100%;
    --secondary: 240 4.8% 93.5%;
    --border: 240 5.9% 88%;
  }

  .dark {
    --primary: 265 85% 65%;
    --primary-hue: 265;
    --primary-sat: 85%;
    --primary-light: 65%;
    --primary-foreground: 0 0% 100%;
    --agent-thought: 265 85% 65%;

    --card: 240 5% 10%;
    --popover: 240 6% 12.5%;
    --secondary: 240 4% 16.5%;
    --border: 240 4% 20%;
  }
}
`;

export function detectCssPath(cwd: string): string | null {
  const candidatePaths = [
    'src/app/globals.css',
    'app/globals.css',
    'src/styles/globals.css',
    'styles/globals.css',
    'src/index.css',
    'src/main.css',
    'src/styles.css',
    'src/App.css',
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(path.resolve(cwd, p))) {
      return p;
    }
  }
  return null;
}

export function detectPackageManager(cwd: string): 'pnpm' | 'npm' | 'yarn' | 'bun' {
  if (fs.existsSync(path.resolve(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.resolve(cwd, 'bun.lockb')) || fs.existsSync(path.resolve(cwd, 'bun.lock'))) return 'bun';
  if (fs.existsSync(path.resolve(cwd, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

export function getInstallCommand(pkgManager: 'pnpm' | 'npm' | 'yarn' | 'bun', pkgs: string[]): string {
  if (pkgs.length === 0) return '';
  switch (pkgManager) {
    case 'pnpm':
      return `pnpm add ${pkgs.join(' ')}`;
    case 'yarn':
      return `yarn add ${pkgs.join(' ')}`;
    case 'bun':
      return `bun add ${pkgs.join(' ')}`;
    case 'npm':
    default:
      return `npm i ${pkgs.join(' ')}`;
  }
}

export async function readConfig(cwd: string): Promise<AgentUiConfig | null> {
  const configPath = path.resolve(cwd, 'agent-ui.json');
  if (await fs.pathExists(configPath)) {
    return fs.readJson(configPath);
  }
  return null;
}

export async function writeConfig(cwd: string, config: AgentUiConfig): Promise<void> {
  const configPath = path.resolve(cwd, 'agent-ui.json');
  await fs.writeJson(configPath, config, { spaces: 2 });
}
