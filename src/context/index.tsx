import { createContext } from "react";
import { IAppearance } from "./provider";

interface IAppearanceContext {
  appearance: IAppearance;
  updateAppearance: (
    property: keyof IAppearance,
    value: IAppearance[keyof IAppearance]
  ) => void;
  resetAppearance: () => void;
}

export const AppearanceContext = createContext<IAppearanceContext | undefined>(
  undefined
);
