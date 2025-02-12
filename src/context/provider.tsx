import { useState, ReactNode } from "react";
import { SupportedFonts, RadiusValues } from "../constants";
import { AppearanceContext } from "./index";
import { defaultAppearance } from "../../../blux";

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
  const [appearance, setAppearance] = useState<IAppearance>(defaultAppearance);

  const updateAppearance = (property: keyof IAppearance, value: string) => {
    setAppearance((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const resetAppearance = () => {
    setAppearance(defaultAppearance);
  };

  return (
    <AppearanceContext.Provider
      value={{ appearance, updateAppearance, resetAppearance }}
    >
      {children}
    </AppearanceContext.Provider>
  );
};
