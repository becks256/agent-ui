---
name: ThemeColorPicker
suite: 7. Theme & Customization
suiteId: theme
description: "Dynamic HSL color & contrast studio with automated WCAG 2.1 AAA text contrast calculations, preset palettes, bubble modes, and CSS export."
cliCommand: npx @noetic-ui/cli add ThemeColorPicker
importStatement: "import { ThemeColorPicker } from '@noetic-ui/react';"
peerDependencies:
  - lucide-react
internalDependencies:
  - cn.ts
---

# ThemeColorPicker

Dynamic HSL color & contrast studio with automated WCAG 2.1 AAA text contrast calculations, preset palettes, bubble modes, and CSS export.

## Props

| Prop                     | Type                                                | Default   | Required    | Description                                          |
| :----------------------- | :-------------------------------------------------- | :-------- | :---------- | :--------------------------------------------------- |
| `hue`                    | `number`                                            | `265`     | No          | Primary color hue value in degrees (0 - 360).        |
| `saturation`             | `number`                                            | `85`      | No          | Primary color saturation percentage (0 - 100).       |
| `lightness`              | `number`                                            | `60`      | No          | Primary color lightness percentage (0 - 100).        |
| `onChangeHsl`            | `(hue: number, sat: number, light: number) => void` | —         | No          | Callback when hue, saturation, or lightness changes. |
| `mode`                   | `'popover'                                          | 'inline'` | `'popover'` | No                                                   | Render as a compact button popover or an expanded inline panel. |
| `messageVariant`         | `'solid'                                            | 'subtle'  | 'neutral'   | 'bordered'`                                          | `'solid'`                                                       | No  | Currently active message bubble variant.         |
| `onChangeMessageVariant` | `(variant: 'solid'                                  | 'subtle'  | 'neutral'   | 'bordered') => void`                                 | —                                                               | No  | Callback when message bubble variant is changed. |
| `triggerLabel`           | `string`                                            | `'Theme'` | No          | Button text in popover mode.                         |

## Basic Usage

```tsx
<ThemeColorPicker
  mode="popover"
  hue={265}
  saturation={85}
  lightness={60}
  onChangeHsl={(h, s, l) => updateTheme(h, s, l)}
/>
```
