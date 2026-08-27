import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import prompts from 'prompts';
import { readConfig, DEFAULT_CONFIG, detectPackageManager, getInstallCommand } from '../utils/config';
import { COMPONENT_REGISTRY } from '../registry/components';
import { COMPONENT_TEMPLATES } from '../registry/templates';

export interface AddOptions {
  all?: boolean;
  suite?: string;
  overwrite?: boolean;
  yes?: boolean;
  cwd?: string;
}

export async function addComponents(components: string[] = [], options: AddOptions = {}) {
  const cwd = options.cwd || process.cwd();
  const config = (await readConfig(cwd)) || DEFAULT_CONFIG;
  const targetPath = config.components || config.aliases?.components || 'components/agent-ui';
  const targetDir = path.resolve(cwd, targetPath);

  let selectedComponents: string[] = [...components];

  // 1. Handle --all flag
  if (options.all) {
    selectedComponents = Object.keys(COMPONENT_REGISTRY);
  } else if (options.suite) {
    const suiteFilter = options.suite.toLowerCase();
    selectedComponents = Object.keys(COMPONENT_REGISTRY).filter((name) => {
      const meta = COMPONENT_REGISTRY[name];
      return meta.suiteId.toLowerCase() === suiteFilter || meta.suite.toLowerCase().includes(suiteFilter);
    });

    if (selectedComponents.length === 0) {
      console.log(chalk.red(`\n  ✖ No components found for suite "${options.suite}".`));
      console.log(`  Valid suites: reasoning, chat, input, hitl, canvas, telemetry, theme\n`);
      return;
    }
  } else if (selectedComponents.length === 0) {
    // 2. Interactive multi-select prompt
    const choices = Object.entries(COMPONENT_REGISTRY).map(([name, meta]) => ({
      title: `${name.padEnd(26)} ${chalk.dim(`[${meta.suite.split('.')[1]?.trim() || meta.suite}]`)}`,
      value: name,
      selected: false,
    }));

    const response = await prompts({
      type: 'autocompleteMultiselect',
      name: 'components',
      message: 'Select the Noetic UI components you want to add:',
      choices,
      hint: '- Space to select. Return to submit',
      instructions: false,
    });

    if (!response.components || response.components.length === 0) {
      console.log(chalk.yellow('\n  No components selected.\n'));
      return;
    }

    selectedComponents = response.components;
  }

  // 3. Validate requested components
  const validComponents: string[] = [];
  const invalidComponents: string[] = [];

  for (const name of selectedComponents) {
    const matched = Object.keys(COMPONENT_REGISTRY).find(
      (k) => k.toLowerCase() === name.toLowerCase()
    );
    if (matched) {
      validComponents.push(matched);
    } else {
      invalidComponents.push(name);
    }
  }

  if (invalidComponents.length > 0) {
    console.log(chalk.yellow(`\n  ⚠ Unknown components: ${invalidComponents.join(', ')}`));
    console.log(`  Run ${chalk.bold('npx agent-ui list')} to see all available components.\n`);
  }

  if (validComponents.length === 0) return;

  // 4. Resolve full dependency graph (internal components, types, cn)
  const componentsToWrite = new Set<string>();
  const externalDependencies = new Set<string>();

  // Always ensure utils and types exist
  componentsToWrite.add('cn');
  componentsToWrite.add('types');

  function resolveDependencies(name: string) {
    if (componentsToWrite.has(name)) return;
    componentsToWrite.add(name);

    const meta = COMPONENT_REGISTRY[name];
    if (meta) {
      meta.dependencies.forEach((dep) => externalDependencies.add(dep));
      meta.internalDependencies.forEach((depName) => {
        if (COMPONENT_REGISTRY[depName]) {
          resolveDependencies(depName);
        }
      });
    }
  }

  validComponents.forEach((name) => resolveDependencies(name));

  console.log(chalk.bold.hex('#8b5cf6')(`\n  ⚡ Adding ${componentsToWrite.size} files to ${targetPath}...\n`));

  await fs.ensureDir(targetDir);

  // 5. Write component files to target directory
  for (const compKey of componentsToWrite) {
    const template = COMPONENT_TEMPLATES[compKey];
    if (!template) continue;

    const destPath = path.resolve(targetDir, template.filename);
    const fileExists = await fs.pathExists(destPath);

    if (fileExists && !options.overwrite) {
      console.log(`  ${chalk.dim('ℹ')} Skipped ${chalk.bold(template.filename)} (already exists, use --overwrite to replace)`);
      continue;
    }

    await fs.writeFile(destPath, template.content, 'utf8');
    console.log(`  ${chalk.green('✔')} Added ${chalk.bold(path.relative(cwd, destPath))}`);
  }

  // 6. Report peer dependencies
  const pkgManager = detectPackageManager(cwd);
  const installCmd = getInstallCommand(pkgManager, Array.from(externalDependencies));

  console.log(chalk.bold.green(`\n  ✨ Successfully installed ${validComponents.length} component(s)!`));
  if (externalDependencies.size > 0) {
    console.log(`\n  Required peer packages:`);
    console.log(`  ${chalk.bold.hex('#8b5cf6')(installCmd)}\n`);
  }
}
