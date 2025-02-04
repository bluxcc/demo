import { createContext } from "react";
import { IAppearance } from "./provider";

export const AppearanceContext = createContext<
  | {
      appearance: IAppearance;
      updateAppearance: (property: keyof IAppearance, value: string) => void;
    }
  | undefined
>(undefined);
