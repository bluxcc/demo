import { useState, ReactNode } from "react";
import { SupportedFonts, RadiusValues } from "../constants";

import { AppearanceContext } from "./index";

export interface IAppearance {
  theme: "light" | "dark";
  background: string;
  accent: string;
  textColor: string;
  font: SupportedFonts;
  cornerRadius: RadiusValues;
  cover: string;
}

export const AppearanceProvider = ({ children }: { children: ReactNode }) => {
  const [appearance, setAppearance] = useState<IAppearance>({
    theme: "light",
    background: "white",
    accent: "#0D1292",
    textColor: "black",
    font: "Inter",
    cornerRadius: "lg",
    cover: "",
  });

  const updateAppearance = (property: keyof IAppearance, value: string) => {
    setAppearance((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  return (
    <AppearanceContext.Provider value={{ appearance, updateAppearance }}>
      {children}
    </AppearanceContext.Provider>
  );
};
