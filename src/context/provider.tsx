import { useState, ReactNode, useEffect } from 'react';

import { IAppearance, IExplorer, LanguageKey } from '../types';
import { ConfigContext } from './index';
import { LoginMethodType } from '../constants';
import { defaultLightTheme } from '../constants/themes';
import { handleLogoColor } from '../utils/handleLogoColor';

// Defaults shared between the initial state and resetAppearance so the two
// can't drift apart.
const DEFAULT_LOGIN_METHODS: LoginMethodType = ['wallet', 'passkey', 'google'];
const DEFAULT_LANGUAGE: LanguageKey = 'en';
const DEFAULT_EXPLORER: IExplorer = 'stellarchain';
const DEFAULT_EXCLUDE_WALLETS: string[] = [];
const DEFAULT_ORDER_WALLETS: string[] = [];
const DEFAULT_PROMPT_ON_WRONG_NETWORK = true;

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [height, setHeight] = useState(377);
  const [customLogo, setCustomLogo] = useState('');
  const [appearance, setAppearance] = useState<IAppearance>(defaultLightTheme);
  // Bumped on reset to remount the Auth tab so it rebuilds its local
  // section order / checkbox state from the defaults below.
  const [resetKey, setResetKey] = useState(0);
  const [loginMethods, setLoginMethods] =
    useState<LoginMethodType>(DEFAULT_LOGIN_METHODS);
  const [language, setLanguage] = useState<LanguageKey>(DEFAULT_LANGUAGE);
  const [explorer, setExplorer] = useState<IExplorer>(DEFAULT_EXPLORER);
  const [excludeWallets, setExcludeWallets] = useState<string[]>(
    DEFAULT_EXCLUDE_WALLETS,
  );
  const [orderWallets, setOrderWallets] =
    useState<string[]>(DEFAULT_ORDER_WALLETS);
  const [promptOnWrongNetwork, setPromptOnWrongNetwork] = useState<boolean>(
    DEFAULT_PROMPT_ON_WRONG_NETWORK,
  );

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

    // Reset the Auth and Other sections back to default too.
    setLoginMethods(DEFAULT_LOGIN_METHODS);
    setLanguage(DEFAULT_LANGUAGE);
    setExplorer(DEFAULT_EXPLORER);
    setExcludeWallets(DEFAULT_EXCLUDE_WALLETS);
    setOrderWallets(DEFAULT_ORDER_WALLETS);
    setPromptOnWrongNetwork(DEFAULT_PROMPT_ON_WRONG_NETWORK);

    // Remount Auth so its local section order / checkboxes rebuild from the
    // defaults above (its state isn't driven by loginMethods alone).
    setResetKey((k) => k + 1);
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
        resetKey,
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
        language,
        setLanguage,
        explorer,
        setExplorer,
        excludeWallets,
        setExcludeWallets,
        orderWallets,
        setOrderWallets,
        promptOnWrongNetwork,
        setPromptOnWrongNetwork,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
