import { useState, ReactNode } from "react";
import { defaultDarkTheme, defaultLightTheme } from "@bluxcc/react";
import { LoginMethodType, SupportedFonts } from "../constants";
import { ConfigContext } from "./index";

export interface IAppearance {
  theme: "light" | "dark";
  background: string;
  bgField: string;
  accent: string;
  textColor: string;
  font: SupportedFonts | string;
  cornerRadius: string;
  borderColor: string;
  borderWidth: string;
  logo: React.ImgHTMLAttributes<HTMLImageElement>["src"];
}

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [appearance, setAppearance] = useState<IAppearance>({
    ...defaultLightTheme,
    logo: "/images/blux.svg",
  });

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
    if (property === "theme") {
      if (value === "dark") {
        setAppearance({
          ...defaultDarkTheme,
          logo: "/images/whiteBluxLogo.svg",
        });
        return;
      } else if (value === "light") {
        setAppearance({
          ...defaultLightTheme,
          logo: "/images/blux.svg",
        });
        return;
      }
    }

    // For other properties, update normally
    setAppearance((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const resetAppearance = () => {
    setAppearance({
      ...defaultLightTheme,
      logo: "/images/blux.svg",
    });
  };

  const updateLoginMethods = (methods: LoginMethodType) => {
    setLoginMethods(methods);
  };

  return (
    <ConfigContext.Provider
      value={{
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
