import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import prompts from 'prompts';
import {
  DEFAULT_CONFIG,
  detectCssPath,
  detectPackageManager,
  getInstallCommand,
  writeConfig,
  CSS_COLOR_VARIABLES,
  type AgentUiConfig,
} from '../utils/config';
import { COMPONENT_TEMPLATES } from '../registry/templates';

export interface InitOptions {
  yes?: boolean;
  cwd?: string;
}

export async function initProject(options: InitOptions = {}) {
  const cwd = options.cwd || process.cwd();
  console.log(chalk.bold.hex('#8b5cf6')('\n  ⚡ Initializing Agent UI in your project...\n'));

  const detectedCss = detectCssPath(cwd) || 'app/globals.css';

  let config: AgentUiConfig = {
    ...DEFAULT_CONFIG,
    css: detectedCss,
  };

  if (!options.yes) {
    const response = await prompts([
      {
        type: 'text',
        name: 'cssPath',
        message: 'Where is your global CSS file located?',
        initial: detectedCss,
      },
      {
        type: 'text',
        name: 'componentsPath',
        message: 'Where should Agent UI components be installed?',
        initial: 'components/agent-ui',
      },
      {
        type: 'select',
        name: 'baseColor',
        message: 'Which default primary color would you like to initialize?',
        choices: [
          { title: 'Violet (265°)', value: 'violet' },
          { title: 'Electric Indigo (235°)', value: 'indigo' },
          { title: 'Cyber Cyan (195°)', value: 'cyan' },
          { title: 'Neon Lime (85°)', value: 'lime' },
          { title: 'Emerald Matrix (155°)', value: 'emerald' },
          { title: 'Amber Gold (40°)', value: 'amber' },
        ],
        initial: 0,
      },
    ]);

    if (!response.cssPath) {
      console.log(chalk.yellow('\n  Initialization cancelled.\n'));
      return;
    }

    config.css = response.cssPath;
    config.components = response.componentsPath;
    config.aliases.components = response.componentsPath;
    config.aliases.utils = `${response.componentsPath}/cn`;
    config.baseColor = response.baseColor;
  }

  // 1. Write agent-ui.json configuration
  await writeConfig(cwd, config);
  console.log(`  ${chalk.green('✔')} Created ${chalk.bold('agent-ui.json')}`);

  // 2. Ensure target components directory exists
  const targetCompDir = path.resolve(cwd, config.components);
  await fs.ensureDir(targetCompDir);
  console.log(`  ${chalk.green('✔')} Created components directory at ${chalk.bold(config.components)}`);

  // 3. Create cn utility helper in target components folder
  const cnFilePath = path.resolve(targetCompDir, 'cn.ts');
  if (!fs.existsSync(cnFilePath)) {
    await fs.writeFile(cnFilePath, COMPONENT_TEMPLATES['cn'].content, 'utf8');
    console.log(`  ${chalk.green('✔')} Created utility helper at ${chalk.bold(path.relative(cwd, cnFilePath))}`);
  }

  // 4. Create shared types in target components folder
  const typesFilePath = path.resolve(targetCompDir, 'types.ts');
  if (!fs.existsSync(typesFilePath)) {
    await fs.writeFile(typesFilePath, COMPONENT_TEMPLATES['types'].content, 'utf8');
    console.log(`  ${chalk.green('✔')} Created shared agent types at ${chalk.bold(path.relative(cwd, typesFilePath))}`);
  }

  // 5. Inject CSS custom properties into global CSS file
  const fullCssPath = path.resolve(cwd, config.css);
  if (fs.existsSync(fullCssPath)) {
    const existingCss = await fs.readFile(fullCssPath, 'utf8');
    if (!existingCss.includes('--primary-hue') && !existingCss.includes('--agent-thought')) {
      await fs.appendFile(fullCssPath, CSS_COLOR_VARIABLES, 'utf8');
      console.log(`  ${chalk.green('✔')} Added Agent UI color tokens to ${chalk.bold(config.css)}`);
    } else {
      console.log(`  ${chalk.dim('ℹ')} CSS color tokens already present in ${chalk.bold(config.css)}`);
    }
  } else {
    await fs.ensureDir(path.dirname(fullCssPath));
    await fs.writeFile(fullCssPath, CSS_COLOR_VARIABLES, 'utf8');
    console.log(`  ${chalk.green('✔')} Created ${chalk.bold(config.css)} with Agent UI color tokens`);
  }

  // 6. Detect package manager and print dependencies command
  const pkgManager = detectPackageManager(cwd);
  const peerDeps = ['lucide-react', 'framer-motion', 'clsx', 'tailwind-merge'];
  const installCmd = getInstallCommand(pkgManager, peerDeps);

  console.log(chalk.bold.green('\n  ✨ Agent UI initialized successfully!'));
  console.log('\n  Next steps:');
  console.log(`  1. Install required peer dependencies:`);
  console.log(`     ${chalk.bold.hex('#8b5cf6')(installCmd)}`);
  console.log(`  2. Add components to your project:`);
  console.log(`     ${chalk.bold.hex('#8b5cf6')('npx agent-ui add <component>')}`);
  console.log(`     ${chalk.bold.hex('#8b5cf6')('npx agent-ui add --all')}\n`);
}
