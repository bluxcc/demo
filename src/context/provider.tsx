import { useState, ReactNode, useEffect } from 'react';

import { IAppearance } from '../types';
import { ConfigContext } from './index';
import { LoginMethodType } from '../constants';
import { defaultLightTheme } from '../constants/themes';
import { handleLogoColor } from '../utils/handleLogoColor';

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [height, setHeight] = useState(377);
  const [customLogo, setCustomLogo] = useState('');
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
    setCustomLogo('');
  };

  useEffect(() => {
    if (!customLogo) {
      setAppearance((prev) => ({
        ...prev,
        logo: handleLogoColor(prev.background),
      }));
    }
  }, [customLogo, appearance.background]);

  const updateLoginMethods = (methods: LoginMethodType) => {
    setLoginMethods(methods);
  };

  return (
    <ConfigContext.Provider
      value={{
        height,
        setHeight,
        customLogo,
        setCustomLogo,
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
