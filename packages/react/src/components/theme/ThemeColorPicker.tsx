import React, { useState } from "react";
import { Palette, Copy, Check, MessageSquare } from "lucide-react";
import { cn } from "../../utils/cn";

export interface ThemeColorPreset {
  name: string;
  hue: number;
  sat?: number;
  light?: number;
  hex?: string;
}

export const defaultColorPresets: ThemeColorPreset[] = [
  { name: "Violet", hue: 265, sat: 85, light: 60, hex: "#8b5cf6" },
  { name: "Electric Indigo", hue: 235, sat: 85, light: 60, hex: "#6366f1" },
  { name: "Cyber Cyan", hue: 195, sat: 90, light: 50, hex: "#0ea5e9" },
  { name: "Neon Lime", hue: 85, sat: 85, light: 55, hex: "#84cc16" },
  { name: "Emerald Matrix", hue: 155, sat: 80, light: 45, hex: "#10b981" },
  { name: "Amber Gold", hue: 40, sat: 95, light: 52, hex: "#f59e0b" },
  { name: "Sunset Orange", hue: 25, sat: 90, light: 55, hex: "#f97316" },
  { name: "Crimson Rose", hue: 350, sat: 85, light: 58, hex: "#f43f5e" },
  { name: "Neon Fuchsia", hue: 305, sat: 85, light: 60, hex: "#d946ef" },
];

// Helper: HSL to sRGB
export function hslToRgb(
  h: number,
  s: number,
  l: number,
): [number, number, number] {
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

// Helper: WCAG 2.1 relative luminance
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Helper: Calculate contrast metrics
export function getContrastMetrics(h: number, s: number, l: number) {
  const [r, g, b] = hslToRgb(h, s, l);
  const lum = getLuminance(r, g, b);
  const contrastWithBlack = (lum + 0.05) / 0.05;
  const contrastWithWhite = 1.05 / (lum + 0.05);
  const isLightBackground = contrastWithBlack > contrastWithWhite;
  const ratio = Math.max(contrastWithBlack, contrastWithWhite).toFixed(1);
  const foregroundHsl = isLightBackground ? "240 10% 3.9%" : "0 0% 100%";
  const foregroundHex = isLightBackground ? "#09090b" : "#ffffff";

  return {
    luminance: lum,
    contrastWithBlack,
    contrastWithWhite,
    isLightBackground,
    ratio,
    foregroundHsl,
    foregroundHex,
  };
}

export interface ThemeColorPickerProps {
  hue: number;
  saturation?: number;
  lightness?: number;
  onChangeHue?: (hue: number) => void;
  onChangeSaturation?: (saturation: number) => void;
  onChangeLightness?: (lightness: number) => void;
  onChangeHsl?: (hue: number, saturation: number, lightness: number) => void;
  presets?: ThemeColorPreset[];
  showSaturation?: boolean;
  showLightness?: boolean;
  showPresets?: boolean;
  showContrastPreview?: boolean;
  showCopyCss?: boolean;
  mode?: "popover" | "inline";
  messageVariant?: "solid" | "subtle" | "neutral" | "bordered";
  onChangeMessageVariant?: (
    variant: "solid" | "subtle" | "neutral" | "bordered",
  ) => void;
  title?: string;
  triggerLabel?: string;
  className?: string;
  popoverClassName?: string;
}

export const ThemeColorPicker: React.FC<ThemeColorPickerProps> = ({
  hue,
  saturation = 85,
  lightness = 60,
  onChangeHue,
  onChangeSaturation,
  onChangeLightness,
  onChangeHsl,
  presets = defaultColorPresets,
  showSaturation = true,
  showLightness = true,
  showPresets = true,
  showContrastPreview = true,
  showCopyCss = true,
  mode = "popover",
  messageVariant,
  onChangeMessageVariant,
  title = "Theme & Contrast Studio",
  triggerLabel,
  className,
  popoverClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const metrics = getContrastMetrics(hue, saturation, lightness);

  const handleUpdate = (newH: number, newS: number, newL: number) => {
    if (onChangeHsl) {
      onChangeHsl(newH, newS, newL);
    }
    if (newH !== hue && onChangeHue) onChangeHue(newH);
    if (newS !== saturation && onChangeSaturation) onChangeSaturation(newS);
    if (newL !== lightness && onChangeLightness) onChangeLightness(newL);
  };

  const handleCopyCss = () => {
    const cssCode = `:root {\n  --primary-hue: ${hue};\n  --primary-sat: ${saturation}%;\n  --primary-light: ${lightness}%;\n  --primary: ${hue} ${saturation}% ${lightness}%;\n  --primary-foreground: ${metrics.foregroundHsl};\n}`;
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pickerPanel = (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-popover/95 backdrop-blur-xl shadow-2xl p-4 space-y-4 text-foreground select-none",
        mode === "popover" ? "w-84 sm:w-96" : "w-full",
        popoverClassName,
      )}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold text-foreground">{title}</span>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
          HSL({hue}°, {saturation}%, {lightness}%)
        </span>
      </div>

      {/* Smart Contrast & Live Sample Preview */}
      {showContrastPreview && (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/50 border border-border/60 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="px-2 py-1 rounded-md text-[11px] font-bold shadow-xs transition-colors"
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                color: metrics.foregroundHex,
              }}
            >
              Sample Button
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-muted-foreground">Contrast:</span>
            <span className="font-bold text-foreground">{metrics.ratio}:1</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold shadow-2xs">
              {metrics.isLightBackground ? "Black text" : "White text"}
            </span>
          </div>
        </div>
      )}

      {/* Message Bubble Contrast Style Selector */}
      {onChangeMessageVariant && messageVariant && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3 text-primary" />
              Message Bubble Contrast Mode
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {messageVariant}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 p-1 bg-secondary/60 rounded-xl border border-border/60 text-[10px]">
            {(
              [
                { id: "solid", label: "Solid" },
                { id: "subtle", label: "Subtle" },
                { id: "neutral", label: "Neutral" },
                { id: "bordered", label: "Bordered" },
              ] as const
            ).map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => onChangeMessageVariant(v.id)}
                className={`py-1 rounded-lg font-medium transition-all ${
                  messageVariant === v.id
                    ? "bg-primary text-primary-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 1. Hue Slider (0° - 360°) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-medium text-foreground">Hue</span>
          <span className="font-mono text-foreground font-bold">{hue}°</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) =>
            handleUpdate(Number(e.target.value), saturation, lightness)
          }
          className="hue-slider w-full"
          title="Hue Slider (0° - 360°)"
        />
      </div>

      {/* 2. Saturation Slider (0% - 100%) */}
      {showSaturation && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-foreground">Saturation</span>
            <span className="font-mono text-foreground font-bold">
              {saturation}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={(e) =>
              handleUpdate(hue, Number(e.target.value), lightness)
            }
            className="sat-slider w-full"
            title="Saturation Slider (0% - 100%)"
            style={{
              background: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`,
            }}
          />
        </div>
      )}

      {/* 3. Lightness Slider (15% - 85%) */}
      {showLightness && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-foreground">Lightness</span>
            <span className="font-mono text-foreground font-bold">
              {lightness}%
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="85"
            value={lightness}
            onChange={(e) =>
              handleUpdate(hue, saturation, Number(e.target.value))
            }
            className="light-slider w-full"
            title="Lightness Slider (15% - 85%)"
            style={{
              background: `linear-gradient(to right, hsl(${hue}, ${saturation}%, 15%), hsl(${hue}, ${saturation}%, 50%), hsl(${hue}, ${saturation}%, 85%))`,
            }}
          />
        </div>
      )}

      {/* Color Preset Swatches */}
      {showPresets && presets.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Preset Palettes
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {presets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() =>
                  handleUpdate(
                    preset.hue,
                    preset.sat ?? saturation,
                    preset.light ?? lightness,
                  )
                }
                className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-[11px] transition-all ${
                  hue === preset.hue &&
                  saturation === (preset.sat ?? saturation) &&
                  lightness === (preset.light ?? lightness)
                    ? "border-primary bg-primary/10 font-bold text-foreground"
                    : "border-border/60 hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className="h-3.5 w-3.5 rounded-full border border-background shadow-xs flex-shrink-0"
                  style={{
                    backgroundColor:
                      preset.hex ||
                      `hsl(${preset.hue}, ${preset.sat || 85}%, ${preset.light || 60}%)`,
                  }}
                />
                <span className="truncate">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Copy CSS Variables Footer */}
      {showCopyCss && (
        <div className="pt-2 border-t border-border/40 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[200px]">
            --primary: {hue} {saturation}% {lightness}%;
          </span>
          <button
            type="button"
            onClick={handleCopyCss}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-500" />
                <span className="text-[11px] text-emerald-500 font-medium">
                  Copied
                </span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span className="text-[11px]">Copy CSS</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );

  if (mode === "inline") {
    return <div className={cn("w-full", className)}>{pickerPanel}</div>;
  }

  return (
    <div className={cn("relative inline-block text-left", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-secondary/70 hover:bg-secondary border border-border/60 text-xs font-medium text-foreground transition-all shadow-2xs"
        title="Customize Theme & Color Contrast"
      >
        <div
          className="h-3.5 w-3.5 rounded-full border border-background shadow-xs transition-colors flex-shrink-0"
          style={{
            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
          }}
        />
        <span className="hidden sm:inline font-mono text-[11px]">
          {triggerLabel || `${hue}° / ${lightness}%`}
        </span>
        <Palette className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {/* Popover Floating Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50">
            {pickerPanel}
          </div>
        </>
      )}
    </div>
  );
};
