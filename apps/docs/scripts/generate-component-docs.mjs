import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, '../../../packages/react/src/components');
const outputFile = path.resolve(__dirname, '../src/data/component-docs.ts');

function findMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  }
  return results;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { meta: {}, body: content };

  const frontmatterStr = match[1];
  const body = content.slice(match[0].length).trim();
  const meta = {};

  let currentKey = null;
  let isArray = false;

  const lines = frontmatterStr.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('- ') && currentKey && isArray) {
      meta[currentKey].push(trimmed.slice(2).trim());
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();

      if (val === '') {
        currentKey = key;
        isArray = true;
        meta[key] = [];
      } else {
        isArray = false;
        currentKey = key;
        // remove surrounding quotes if present
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          try {
            val = JSON.parse(val);
          } catch {
            val = val.slice(1, -1);
          }
        }
        meta[key] = val;
      }
    }
  }

  return { meta, body };
}

function parseMarkdownDoc(filePath) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { meta, body } = parseFrontmatter(rawContent);

  const sections = {};
  const sectionRegex = /^##\s+([^\r\n]+)/gm;
  const headings = [];
  let match;

  while ((match = sectionRegex.exec(body)) !== null) {
    headings.push({ title: match[1].trim(), index: match.index, length: match[0].length });
  }

  for (let i = 0; i < headings.length; i++) {
    const current = headings[i];
    const startIndex = current.index + current.length;
    const endIndex = i + 1 < headings.length ? headings[i + 1].index : body.length;
    const sectionContent = body.slice(startIndex, endIndex).trim();
    sections[current.title.toLowerCase()] = sectionContent;
  }

  // Parse Props table
  const props = [];
  const propsContent = sections['props'] || '';
  if (propsContent) {
    const lines = propsContent.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('|'));
    for (const line of lines) {
      const columns = line.split('|').map((c) => c.trim()).slice(1, -1);
      if (columns.length < 4) continue;
      // Skip header and separator rows
      if (columns[0].toLowerCase() === 'prop' || columns[0].includes('---')) continue;

      const propName = columns[0].replace(/`/g, '').trim();
      const propType = columns[1].replace(/`/g, '').trim();
      let propDefault = columns[2] ? columns[2].replace(/`/g, '').trim() : '';
      if (propDefault === '—' || propDefault === '-' || propDefault === 'none') {
        propDefault = undefined;
      }
      const reqCol = columns[3] ? columns[3].toLowerCase() : '';
      const isRequired = reqCol === 'yes' || reqCol === 'true' || reqCol === 'req' || reqCol === 'required';
      const description = columns[4] ? columns[4].replace(/\\\|/g, '|').trim() : '';

      props.push({
        name: propName,
        type: propType,
        ...(propDefault !== undefined ? { default: propDefault } : {}),
        ...(isRequired ? { required: true } : {}),
        description,
      });
    }
  }

  // Parse Types
  const types = [];
  const typesContent = sections['types'] || '';
  if (typesContent) {
    const typeBlocks = typesContent.split(/###\s+/);
    for (const block of typeBlocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;
      const firstLineBreak = trimmed.indexOf('\n');
      const typeName = firstLineBreak > -1 ? trimmed.slice(0, firstLineBreak).trim() : 'Type';
      const codeMatch = trimmed.match(/```(?:typescript|ts)?\r?\n([\s\S]*?)\r?\n```/);
      if (codeMatch) {
        types.push({
          name: typeName,
          code: codeMatch[1].trim(),
        });
      }
    }
  }

  // Parse Basic Usage
  let basicUsage = '';
  const basicUsageContent = sections['basic usage'] || '';
  if (basicUsageContent) {
    const codeMatch = basicUsageContent.match(/```(?:tsx|jsx|typescript|ts|html|bash)?\r?\n([\s\S]*?)\r?\n```/);
    if (codeMatch) {
      basicUsage = codeMatch[1].trim();
    } else {
      basicUsage = basicUsageContent;
    }
  }

  // Parse Advanced Usage
  let advancedUsage = undefined;
  const advUsageContent = sections['advanced usage'] || '';
  if (advUsageContent) {
    const codeMatch = advUsageContent.match(/```(?:tsx|jsx|typescript|ts|html|bash)?\r?\n([\s\S]*?)\r?\n```/);
    if (codeMatch) {
      advancedUsage = codeMatch[1].trim();
    } else {
      advancedUsage = advUsageContent;
    }
  }

  return {
    name: meta.name || path.basename(filePath, '.md'),
    suite: meta.suite || '',
    suiteId: meta.suiteId || 'reasoning',
    description: meta.description || '',
    cliCommand: meta.cliCommand || `npx @noetic-ui/cli add ${meta.name}`,
    importStatement: meta.importStatement || `import { ${meta.name} } from '@noetic-ui/react';`,
    peerDependencies: meta.peerDependencies || [],
    internalDependencies: meta.internalDependencies || [],
    props,
    ...(types.length > 0 ? { types } : {}),
    basicUsage,
    ...(advancedUsage ? { advancedUsage } : {}),
  };
}

export function generateComponentDocs() {
  const mdFiles = findMarkdownFiles(componentsDir);
  console.log(`🔍 Discovered ${mdFiles.length} component README markdown files...`);

  const componentDocs = {};

  for (const file of mdFiles) {
    const doc = parseMarkdownDoc(file);
    componentDocs[doc.name] = doc;
  }

  const generatedCode = `// AUTO-GENERATED FILE — DO NOT EDIT DIRECTLY.
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
  suiteId: 'reasoning' | 'chat' | 'input' | 'hitl' | 'canvas' | 'telemetry' | 'theme';
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

export const COMPONENT_DOCS: Record<string, ComponentDoc> = ${JSON.stringify(componentDocs, null, 2)};
`;

  fs.writeFileSync(outputFile, generatedCode, 'utf-8');
  console.log(`✔ Successfully generated ${outputFile} from ${Object.keys(componentDocs).length} component READMEs!`);
}

// Run when executed directly
generateComponentDocs();
