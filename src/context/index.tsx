import { createContext } from "react";

import { IAppearance } from "../types";
import { LoginMethodType } from "../constants";

interface IConfigContext {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  appearance: IAppearance;
  loginMethods: LoginMethodType;
  updateAppearance: (
    property: keyof IAppearance,
    value: IAppearance[keyof IAppearance],
  ) => void;
  resetAppearance: () => void;
  updateLoginMethods: (methods: LoginMethodType) => void;
}

export const ConfigContext = createContext<IConfigContext | undefined>(
  undefined,
);
