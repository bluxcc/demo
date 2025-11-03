import { useState, ReactNode } from 'react';

import { IAppearance } from '../types';
import { ConfigContext } from './index';
import { LoginMethodType } from '../constants';
import { defaultLightTheme } from '../constants/themes';

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'random'>('light');
  const [height, setHeight] = useState(377);
  const [appearance, setAppearance] = useState<IAppearance>(defaultLightTheme);
  const [loginMethods, setLoginMethods] = useState<LoginMethodType>(['wallet']);

  const updateAppearance = (
    property: keyof IAppearance,
    value: IAppearance[keyof IAppearance],
  ) => {
    setAppearance((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const resetAppearance = () => {
    setAppearance({
      ...defaultLightTheme,
      logo: '/images/blux.svg',
    });
    setTheme('light');
  };

  const updateLoginMethods = (methods: LoginMethodType) => {
    setLoginMethods(methods);
  };

  return (
    <ConfigContext.Provider
      value={{
        height,
        setHeight,
        theme,
        setTheme,
        appearance,
        loginMethods,
        setAppearance,
        resetAppearance,
        updateAppearance,
        updateLoginMethods,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
