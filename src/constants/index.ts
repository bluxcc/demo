export const COLORS = {
  background: [
    { name: "white", color: "#ffffff" },
    { name: "lightGray", color: "#E4E4E4" },
    { name: "gray", color: "#A9A9A9" },
    { name: "darkGray", color: "#6C6C6C" },
    { name: "charcoalGray", color: "#363636" },
    { name: "custom", color: "custom" },
  ] as const,

  accent: [
    { name: "pink", color: "#FFCDCD" },
    { name: "orange", color: "#FFA23F" },
    { name: "red", color: "#FF4D3E" },
    { name: "lightBlue", color: "#53E5FF" },
    { name: "blue", color: "#3E72FF" },
    { name: "custom", color: "custom" },
  ] as const,

  text: [
    { name: "white", color: "#ffffff" },
    { name: "darkBlue", color: "#0D1292" },
    { name: "black", color: "#000000" },
    { name: "custom", color: "custom" },
  ] as const,
};

export const CornerButtons: { name: string; radius: RadiusValues }[] = [
  {
    name: "none",
    radius: "none",
  },
  {
    name: "1",
    radius: "sm",
  },
  {
    name: "2",
    radius: "md",
  },
  {
    name: "3",
    radius: "lg",
  },
  {
    name: "4",
    radius: "full",
  },
];

export const Fonts: { name: string; value: SupportedFonts }[] = [
  { name: "Manrope", value: "Manrope" },
  { name: "Inter", value: "Inter" },
  { name: "JetBrains", value: "JetBrains Mono" },
  { name: "Lora", value: "Lora" },
];

export type SupportedFonts = "Manrope" | "Inter" | "JetBrains Mono" | "Lora";

export type ColorType = "background" | "accent" | "text";
export type BackgroundColor = (typeof COLORS.background)[number]["name"];
export type AccentColor = (typeof COLORS.accent)[number]["name"];
export type TextColor = (typeof COLORS.text)[number]["name"];
export const CUSTOM_GRADIENT =
  "conic-gradient(from 180deg at 50% 50%, #0D1292 0deg, #53E5FF 100.8deg, #FFFFFF 243deg, #0D1292 360deg)";
export type RadiusValues = "sm" | "md" | "lg" | "none" | "full";
