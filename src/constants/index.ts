export const COLORS = {
  background: ["#ffffff", "#EFEFEF", "#E5FBFF", "#FFE5E5"] as const,
  accent: ["#0C1083", "#FFB500", "#009900", "#DE1C2E"] as const,
  bgField: ["#ffffff", "#E0E0E0", "#CCF7FF", "#FFCCCC"] as const,
  text: ["#0D1292", "#000000", "#04062F", "#260000"] as const,
  border: ["#CDCEEE", "#ffffff", "#A9A9A9", "#000000"] as const,
};

export const CornerButtons: { name: string; radius: RadiusValues }[] = [
  {
    name: "none",
    radius: "none",
  },
  {
    name: "sm",
    radius: "sm",
  },
  {
    name: "md",
    radius: "md",
  },
  {
    name: "lg",
    radius: "lg",
  },
  {
    name: "full",
    radius: "full",
  },
];

export const Fonts: { name: string; value: SupportedFonts }[] = [
  { name: "Manrope", value: "Manrope" },
  { name: "Inter", value: "Inter" },
  { name: "JetBrains", value: "JetBrains Mono" },
  { name: "Lora", value: "Lora" },
];

export type LoginMethodType = Array<
  | "wallet"
  | "email"
  | "sms"
  | "google"
  | "twitter"
  | "discord"
  | "github"
  | "passkey"
>;

export type SupportedFonts = "Manrope" | "Inter" | "JetBrains Mono" | "Lora";

export type ColorType = "background" | "accent" | "bgField" | "text" | "border";
// export type BackgroundColor = (typeof COLORS.background)[number]["name"];
// export type AccentColor = (typeof COLORS.accent)[number]["name"];
// export type TextColor = (typeof COLORS.text)[number]["name"];
// export const CUSTOM_GRADIENT =
//   "conic-gradient(from 180deg at 50% 50%, #0D1292 0deg, #FFCDCD 180deg, #53E5FF 360deg)";
export type RadiusValues = "sm" | "md" | "lg" | "none" | "full";
