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

const DEFAULT_APPEARANCE: IAppearance = {
  theme: "light",
  background: "white",
  accent: "#3E72FF",
  textColor: "black",
  font: "Inter",
  cornerRadius: "lg",
  cover: "",
};

export const AppearanceProvider = ({ children }: { children: ReactNode }) => {
  const [appearance, setAppearance] = useState<IAppearance>(DEFAULT_APPEARANCE);

  const updateAppearance = (property: keyof IAppearance, value: string) => {
    setAppearance((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const resetAppearance = () => {
    setAppearance(DEFAULT_APPEARANCE);
  };

  return (
    <AppearanceContext.Provider
      value={{ appearance, updateAppearance, resetAppearance }}
    >
      {children}
    </AppearanceContext.Provider>
  );
};
