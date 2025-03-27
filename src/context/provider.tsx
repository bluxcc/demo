import { useState, ReactNode } from "react";
import { defaultAppearance } from "@bluxcc/react";
import { LoginMethodType, RadiusValues, SupportedFonts } from "../constants";
import { ConfigContext } from "./index";

export interface IAppearance {
  theme: "light" | "dark";
  background: string;
  accent: string;
  textColor: string;
  font: SupportedFonts;
  cornerRadius: RadiusValues;
}

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [appearance, setAppearance] = useState<IAppearance>(defaultAppearance);
  const [brandLogo, setBrandLogo] = useState("/images/blackBluxLogo.svg");
  const [loginMethods, setLoginMethods] = useState<LoginMethodType>([
    "wallet",
    "email",
    "passkey",
    "sms",
  ]);

  const updateAppearance = (
    property: keyof IAppearance,
    value: IAppearance[keyof IAppearance]
  ) => {
    setAppearance((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const resetAppearance = () => {
    setAppearance(defaultAppearance);
  };

  const updateLoginMethods = (methods: LoginMethodType) => {
    setLoginMethods(methods);
  };

  const updateBrandLogo = (logo: string) => {
    setBrandLogo(logo);
  };

  return (
    <ConfigContext.Provider
      value={{
        brandLogo,
        updateBrandLogo,
        appearance,
        loginMethods,
        updateAppearance,
        resetAppearance,
        updateLoginMethods,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
