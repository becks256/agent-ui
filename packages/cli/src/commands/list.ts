import chalk from 'chalk';
import { COMPONENT_REGISTRY } from '../registry/components';

export function listComponents() {
  console.log(chalk.bold.hex('#8b5cf6')('\n  ⚡ Agent UI — Component Registry (23 Components)\n'));

  const suites: Record<string, string[]> = {};

  Object.entries(COMPONENT_REGISTRY).forEach(([name, meta]) => {
    if (!suites[meta.suite]) {
      suites[meta.suite] = [];
    }
    suites[meta.suite].push(name);
  });

  Object.entries(suites).forEach(([suiteTitle, componentNames]) => {
    console.log(chalk.bold.cyan(`  ${suiteTitle} (${componentNames.length})`));
    componentNames.forEach((name) => {
      const meta = COMPONENT_REGISTRY[name];
      console.log(`    ${chalk.bold.green(meta.name.padEnd(26))} ${chalk.dim(meta.description)}`);
    });
    console.log('');
  });

  console.log(chalk.dim('  ─────────────────────────────────────────────────────────────────────────────'));
  console.log(`  Use ${chalk.bold.hex('#8b5cf6')('npx agent-ui add <component>')} to add a component to your project.`);
  console.log(`  Use ${chalk.bold.hex('#8b5cf6')('npx agent-ui add --all')} to copy the entire component suite.\n`);
}
