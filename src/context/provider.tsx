import { useState, ReactNode, useEffect, useLayoutEffect, useCallback } from 'react';

import { IAppearance, IExplorer, LanguageKey, ThemeName } from '../types';
import { ConfigContext } from './index';
import { DEFAULT_LOGIN_METHODS, LoginMethodType } from '../constants';
import { getThemeAppearance } from '../constants/themes';
import { handleLogoColor } from '../utils/handleLogoColor';
import {
  createSharePath,
  DEFAULT_CUSTOM_PATH,
  isShortLinkPath,
  localHrefFromDemoUrl,
  readShareableConfig,
  readShareableConfigFromHref,
  readShareId,
  ShareableConfig,
  toCanonicalDemoUrl,
} from '../utils/shareConfig';
import { fetchDemoAppearance } from '../utils/demoAppearanceApi';
import NotFound from '../components/NotFound';
import ResolvingShare from '../components/ResolvingShare';

// Defaults shared between the initial state and resetAppearance so the two
// can't drift apart.
const DEFAULT_LANGUAGE: LanguageKey = 'en';
const DEFAULT_EXPLORER: IExplorer = 'stellarchain';
const DEFAULT_EXCLUDE_WALLETS: string[] = [];
const DEFAULT_ORDER_WALLETS: string[] = [];
const DEFAULT_PROMPT_ON_WRONG_NETWORK = true;
const getSystemTheme = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

type RouteStatus = 'ready' | 'resolving' | 'not-found';

const initialRouteStatus = (): RouteStatus => {
  const { pathname } = window.location;
  if (!isShortLinkPath(pathname)) return 'ready';
  return readShareId(pathname) ? 'resolving' : 'not-found';
};

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [systemTheme] = useState(getSystemTheme);
  const [incomingShareId] = useState(() =>
    readShareId(window.location.pathname),
  );
  const [routeStatus, setRouteStatus] = useState<RouteStatus>(initialRouteStatus);
  const [sharedConfig] = useState(() =>
    incomingShareId
      ? null
      : readShareableConfig(window.location.pathname, window.location.search),
  );
  const [theme, setTheme] = useState<ThemeName>(
    sharedConfig?.theme ?? systemTheme,
  );
  const [themeExplicit, setThemeExplicit] = useState(
    sharedConfig?.themeExplicit ?? false,
  );
  const isDarkMode = theme === 'dark' || theme === 'retro';
  const [height, setHeight] = useState(0);
  const [customLogo, setCustomLogo] = useState(sharedConfig?.customLogo ?? '');
  const [appearance, setAppearance] = useState<IAppearance>(
    sharedConfig?.appearance ??
      getThemeAppearance(systemTheme),
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
  const shareUrl = toCanonicalDemoUrl(sharePath);

  const applySharedConfig = useCallback((config: ShareableConfig) => {
    setTheme(config.theme);
    setThemeExplicit(config.themeExplicit);
    setCustomLogo(config.customLogo);
    setAppearance(config.appearance);
    setLoginMethods(config.loginMethods);
    setLanguage(config.language);
    setExplorer(config.explorer);
    setExcludeWallets(config.excludeWallets);
    setOrderWallets(config.orderWallets);
    setPromptOnWrongNetwork(config.promptOnWrongNetwork);
  }, []);

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
    setAppearance({ ...getThemeAppearance(systemTheme) });
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
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (!customLogo) {
      setAppearance((prev) => ({
        ...prev,
        logo: handleLogoColor(prev.background),
      }));
    }
  }, [customLogo, appearance.background]);

  useEffect(() => {
    if (!incomingShareId) return;

    let cancelled = false;

    const resolveShareLink = async () => {
      try {
        const result = await fetchDemoAppearance(incomingShareId);
        if (cancelled) return;
        if (!result) {
          setRouteStatus('not-found');
          return;
        }

        const href = localHrefFromDemoUrl(result.url);
        if (!href) {
          setRouteStatus('not-found');
          return;
        }

        const config = readShareableConfigFromHref(href);
        if (config) applySharedConfig(config);
        window.history.replaceState(null, '', href);
        setRouteStatus('ready');
      } catch {
        if (!cancelled) setRouteStatus('not-found');
      }
    };

    void resolveShareLink();
    return () => {
      cancelled = true;
    };
  }, [incomingShareId, applySharedConfig]);

  useEffect(() => {
    if (routeStatus !== 'ready') return;

    const timeout = window.setTimeout(() => {
      window.history.replaceState(null, '', sharePath);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [sharePath, routeStatus]);

  const updateLoginMethods = (methods: LoginMethodType) => {
    setLoginMethods(methods);
  };

  const selectTheme = (selectedTheme: ThemeName) => {
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
        isDarkMode,
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
      {routeStatus === 'resolving' ? (
        <ResolvingShare />
      ) : routeStatus === 'not-found' ? (
        <NotFound />
      ) : (
        children
      )}
    </ConfigContext.Provider>
  );
};
