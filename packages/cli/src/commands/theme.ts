import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import prompts from "prompts";
import { readConfig, DEFAULT_CONFIG, detectCssPath } from "../utils/config";

export const THEME_PRESETS = [
  { name: "Violet", hue: 265, sat: 85, light: 60 },
  { name: "Electric Indigo", hue: 235, sat: 85, light: 60 },
  { name: "Cyber Cyan", hue: 195, sat: 90, light: 50 },
  { name: "Neon Lime", hue: 85, sat: 85, light: 55 },
  { name: "Emerald Matrix", hue: 155, sat: 80, light: 45 },
  { name: "Amber Gold", hue: 40, sat: 95, light: 52 },
  { name: "Sunset Orange", hue: 25, sat: 90, light: 55 },
  { name: "Crimson Rose", hue: 350, sat: 85, light: 58 },
  { name: "Neon Fuchsia", hue: 305, sat: 85, light: 60 },
];

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export async function setTheme(
  options: { cwd?: string; preset?: string } = {},
) {
  const cwd = options.cwd || process.cwd();
  const config = (await readConfig(cwd)) || DEFAULT_CONFIG;
  const cssPath = config.css || detectCssPath(cwd) || "app/globals.css";
  const fullCssPath = path.resolve(cwd, cssPath);

  let selectedHue = 265;
  let selectedSat = 85;
  let selectedLight = 60;
  let presetName = "Custom";

  if (options.preset) {
    const matched = THEME_PRESETS.find(
      (p) => p.name.toLowerCase() === options.preset?.toLowerCase(),
    );
    if (matched) {
      selectedHue = matched.hue;
      selectedSat = matched.sat;
      selectedLight = matched.light;
      presetName = matched.name;
    }
  } else {
    const response = await prompts([
      {
        type: "select",
        name: "preset",
        message: "Select a theme palette preset for Agent UI:",
        choices: [
          ...THEME_PRESETS.map((p) => ({
            title: `${p.name.padEnd(18)} (HSL: ${p.hue}°, ${p.sat}%, ${p.light}%)`,
            value: p,
          })),
          { title: "Custom HSL...", value: "custom" },
        ],
        initial: 0,
      },
    ]);

    if (!response.preset) {
      console.log(chalk.yellow("\n  Theme configuration cancelled.\n"));
      return;
    }

    if (response.preset === "custom") {
      const customResponse = await prompts([
        {
          type: "number",
          name: "hue",
          message: "Enter Hue (0 - 360):",
          initial: 265,
          min: 0,
          max: 360,
        },
        {
          type: "number",
          name: "sat",
          message: "Enter Saturation (0 - 100%):",
          initial: 85,
          min: 0,
          max: 100,
        },
        {
          type: "number",
          name: "light",
          message: "Enter Lightness (15 - 85%):",
          initial: 60,
          min: 15,
          max: 85,
        },
      ]);
      selectedHue = customResponse.hue ?? 265;
      selectedSat = customResponse.sat ?? 85;
      selectedLight = customResponse.light ?? 60;
    } else {
      selectedHue = response.preset.hue;
      selectedSat = response.preset.sat;
      selectedLight = response.preset.light;
      presetName = response.preset.name;
    }
  }

  // Calculate contrast metrics
  const [r, g, b] = hslToRgb(selectedHue, selectedSat, selectedLight);
  const lum = getLuminance(r, g, b);
  const isLight = (lum + 0.05) / 0.05 > 1.05 / (lum + 0.05);
  const fgHsl = isLight ? "240 10% 3.9%" : "0 0% 100%";

  const newCssBlock = `
@layer base {
  :root {
    --primary: ${selectedHue} ${selectedSat}% ${selectedLight}%;
    --primary-hue: ${selectedHue};
    --primary-sat: ${selectedSat}%;
    --primary-light: ${selectedLight}%;
    --primary-foreground: ${fgHsl};
    --agent-thought: ${selectedHue} ${selectedSat}% ${selectedLight}%;
  }

  .dark {
    --primary: ${selectedHue} ${selectedSat}% ${Math.min(selectedLight + 5, 80)}%;
    --primary-hue: ${selectedHue};
    --primary-sat: ${selectedSat}%;
    --primary-light: ${Math.min(selectedLight + 5, 80)}%;
    --primary-foreground: 0 0% 100%;
    --agent-thought: ${selectedHue} ${selectedSat}% ${Math.min(selectedLight + 5, 80)}%;
  }
}
`;

  if (fs.existsSync(fullCssPath)) {
    let existing = await fs.readFile(fullCssPath, "utf8");
    if (existing.includes("--primary-hue")) {
      // Replace existing :root block or append
      existing = existing.replace(
        /--primary-hue:\s*\d+;/g,
        `--primary-hue: ${selectedHue};`,
      );
      existing = existing.replace(
        /--primary-sat:\s*\d+%;/g,
        `--primary-sat: ${selectedSat}%;`,
      );
      existing = existing.replace(
        /--primary-light:\s*\d+%;/g,
        `--primary-light: ${selectedLight}%;`,
      );
      existing = existing.replace(
        /--primary-foreground:\s*[^;]+;/g,
        `--primary-foreground: ${fgHsl};`,
      );
      await fs.writeFile(fullCssPath, existing, "utf8");
    } else {
      await fs.appendFile(fullCssPath, newCssBlock, "utf8");
    }
  } else {
    await fs.ensureDir(path.dirname(fullCssPath));
    await fs.writeFile(fullCssPath, newCssBlock, "utf8");
  }

  console.log(
    chalk.bold.green(
      `\n  ✨ Set theme to ${chalk.bold(presetName)} (HSL: ${selectedHue}°, ${selectedSat}%, ${selectedLight}%)`,
    ),
  );
  console.log(`  Updated CSS custom properties in ${chalk.bold(cssPath)}\n`);
}
