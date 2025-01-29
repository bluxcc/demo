export const COLORS = {
  background: [
    { name: "white", color: "#ffffff" },
    { name: "lightGray", color: "#d1d5db" },
    { name: "gray", color: "#9ca3af" },
    { name: "darkGray", color: "#4b5563" },
    { name: "black", color: "#000000" },
    { name: "custom", color: "custom" },
  ] as const,

  accent: [
    { name: "red", color: "#ef4444" },
    { name: "blue", color: "#3b82f6" },
    { name: "green", color: "#10b981" },
    { name: "purple", color: "#8b5cf6" },
    { name: "orange", color: "#f97316" },
    { name: "custom", color: "custom" },
  ] as const,

  text: [
    { name: "white", color: "#ffffff" },
    { name: "gray", color: "#9ca3af" },
    { name: "black", color: "#000000" },
    { name: "custom", color: "custom" },
  ] as const,
};

export const CornerButtons = [
  {
    name: "none",
    radios: "none",
  },
  {
    name: "1",
    radios: "sm",
  },
  {
    name: "2",
    radios: "md",
  },
  {
    name: "3",
    radios: "lg",
  },
  {
    name: "4",
    radios: "full",
  },
];

export type ColorType = "background" | "accent" | "text";
export type BackgroundColor = (typeof COLORS.background)[number]["name"];
export type AccentColor = (typeof COLORS.accent)[number]["name"];
export type TextColor = (typeof COLORS.text)[number]["name"];
export const CUSTOM_GRADIENT =
  "conic-gradient(from 180deg at 50% 50%, #0D1292 0deg, #53E5FF 100.8deg, #FFFFFF 243deg, #0D1292 360deg)";
export type RadiosValues = "sm" | "md" | "lg" | "none" | "full";
