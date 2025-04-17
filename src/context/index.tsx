import { createContext } from "react";
import { IAppearance } from "@bluxcc/react";
import { LoginMethodType } from "../constants";

interface IConfigContext {
  appearance: IAppearance;
  loginMethods: LoginMethodType;
  updateAppearance: (
    property: keyof IAppearance,
    value: IAppearance[keyof IAppearance]
  ) => void;
  resetAppearance: () => void;
  updateLoginMethods: (methods: LoginMethodType) => void;
}

export const ConfigContext = createContext<IConfigContext | undefined>(
  undefined
);
