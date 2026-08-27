import { cac } from 'cac';
import { listComponents } from './commands/list';
import { initProject } from './commands/init';
import { addComponents } from './commands/add';
import { setTheme } from './commands/theme';

const cli = cac('agent-ui');

// 1. List Command
cli
  .command('list', 'List all available Agent UI components across all 7 architectural suites')
  .action(() => {
    listComponents();
  });

// 2. Init Command
cli
  .command('init', 'Initialize Agent UI configuration, utility helpers, types, and CSS variables')
  .option('-y, --yes', 'Skip prompts and use default configuration')
  .option('--cwd <cwd>', 'Working directory')
  .action(async (options) => {
    await initProject(options);
  });

// 3. Add Command
cli
  .command('add [...components]', 'Add one or more Agent UI components to your project')
  .option('-a, --all', 'Add all available components')
  .option('-s, --suite <suite>', 'Add all components in a specific suite (e.g. reasoning, chat, hitl)')
  .option('-o, --overwrite', 'Overwrite existing component files')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--cwd <cwd>', 'Working directory')
  .action(async (components, options) => {
    await addComponents(components, options);
  });

// 4. Theme Command
cli
  .command('theme [preset]', 'Configure the primary color theme and WCAG contrast in globals.css')
  .option('--cwd <cwd>', 'Working directory')
  .action(async (preset, options) => {
    await setTheme({ ...options, preset });
  });

cli.help();
cli.version('0.1.0');

cli.parse();
