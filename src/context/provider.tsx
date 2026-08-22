import { useState, ReactNode, useEffect, useLayoutEffect } from 'react';

import { IAppearance, IExplorer, LanguageKey } from '../types';
import { ConfigContext } from './index';
import { LoginMethodType } from '../constants';
import { defaultDarkTheme, defaultLightTheme } from '../constants/themes';
import { handleLogoColor } from '../utils/handleLogoColor';
import {
  createSharePath,
  DEFAULT_CUSTOM_PATH,
  readShareableConfig,
} from '../utils/shareConfig';

// Defaults shared between the initial state and resetAppearance so the two
// can't drift apart.
const DEFAULT_LOGIN_METHODS: LoginMethodType = [
  'wallet',
  'email',
  'passkey',
  'google',
];
const DEFAULT_LANGUAGE: LanguageKey = 'en';
const DEFAULT_EXPLORER: IExplorer = 'stellarchain';
const DEFAULT_EXCLUDE_WALLETS: string[] = [];
const DEFAULT_ORDER_WALLETS: string[] = [];
const DEFAULT_PROMPT_ON_WRONG_NETWORK = true;
const getSystemTheme = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [systemTheme] = useState(getSystemTheme);
  const [sharedConfig] = useState(() =>
    readShareableConfig(window.location.pathname),
  );
  const [theme, setTheme] = useState<'light' | 'dark'>(
    sharedConfig?.theme ?? systemTheme,
  );
  const [themeExplicit, setThemeExplicit] = useState(
    sharedConfig?.themeExplicit ?? false,
  );
  const [height, setHeight] = useState(0);
  const [customLogo, setCustomLogo] = useState(sharedConfig?.customLogo ?? '');
  const [appearance, setAppearance] = useState<IAppearance>(
    sharedConfig?.appearance ??
      (systemTheme === 'dark' ? defaultDarkTheme : defaultLightTheme),
  );
  // Bumped on reset to remount the Auth tab so it rebuilds its local
  // section order / checkbox state from the defaults below.
  const [resetKey, setResetKey] = useState(0);
  const [loginMethods, setLoginMethods] =
    useState<LoginMethodType>(
      sharedConfig?.loginMethods ?? DEFAULT_LOGIN_METHODS,
    );
  const [language, setLanguage] = useState<LanguageKey>(
    sharedConfig?.language ?? DEFAULT_LANGUAGE,
  );
  const [explorer, setExplorer] = useState<IExplorer>(
    sharedConfig?.explorer ?? DEFAULT_EXPLORER,
  );
  const [excludeWallets, setExcludeWallets] = useState<string[]>(
    sharedConfig?.excludeWallets ?? DEFAULT_EXCLUDE_WALLETS,
  );
  const [orderWallets, setOrderWallets] =
    useState<string[]>(sharedConfig?.orderWallets ?? DEFAULT_ORDER_WALLETS);
  const [promptOnWrongNetwork, setPromptOnWrongNetwork] = useState<boolean>(
    sharedConfig?.promptOnWrongNetwork ?? DEFAULT_PROMPT_ON_WRONG_NETWORK,
  );
  const sharePath = createSharePath(
    {
      version: 1,
      theme,
      themeExplicit,
      customLogo,
      appearance,
      loginMethods,
      language,
      explorer,
      excludeWallets,
      orderWallets,
      promptOnWrongNetwork,
    },
    systemTheme,
  );
  const shareUrl = new URL(sharePath, window.location.origin).toString();

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
    window.history.replaceState(null, '', DEFAULT_CUSTOM_PATH);
    setAppearance(
      systemTheme === 'dark' ? { ...defaultDarkTheme } : { ...defaultLightTheme },
    );
    setTheme(systemTheme);
    setThemeExplicit(false);
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

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (!customLogo) {
      setAppearance((prev) => ({
        ...prev,
        logo: handleLogoColor(prev.background),
      }));
    }
  }, [customLogo, appearance.background]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.history.replaceState(null, '', sharePath);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [
    sharePath,
  ]);

  const updateLoginMethods = (methods: LoginMethodType) => {
    setLoginMethods(methods);
  };

  const selectTheme = (selectedTheme: 'light' | 'dark') => {
    setTheme(selectedTheme);
    setThemeExplicit(true);
  };

  return (
    <ConfigContext.Provider
      value={{
        height,
        setHeight,
        resetKey,
        shareUrl,
        customLogo,
        setCustomLogo,
        theme,
        setTheme: selectTheme,
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
