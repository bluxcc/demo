import { createContext } from "react";
import { IAppearance } from "./provider";

interface AppearanceContextValue {
  appearance: IAppearance;
  updateAppearance: (
    property: keyof IAppearance,
    value: IAppearance[keyof IAppearance]
  ) => void;
  resetAppearance: () => void;
}

export const AppearanceContext = createContext<
  AppearanceContextValue | undefined
>(undefined);
