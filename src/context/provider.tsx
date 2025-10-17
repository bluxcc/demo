import { useState, ReactNode } from "react";

import { ConfigContext } from "./index";
import { LoginMethodType } from "../constants";
import { IAppearance } from "../types";
import { defaultDarkTheme, defaultLightTheme } from "../constants/themes";

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [appearance, setAppearance] = useState<IAppearance>({
    ...defaultLightTheme,
    logo: "/images/blux.svg",
  });

  const [loginMethods, setLoginMethods] = useState<LoginMethodType>([
    "wallet",
    // "email",
    // "passkey",
    // "sms",
  ]);

  const [theme, setTheme] = useState<"light" | "dark">("light");

  const updateAppearance = (
    property: keyof IAppearance,
    value: IAppearance[keyof IAppearance],
  ) => {
    if (theme === "dark") {
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
        theme,
        setTheme,
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
