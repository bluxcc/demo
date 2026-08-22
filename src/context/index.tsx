import { createContext } from 'react';

import { IAppearance, IExplorer, LanguageKey, ThemeName } from '../types';
import { LoginMethodType } from '../constants';

interface IConfigContext {
  theme: ThemeName;
  isDarkMode: boolean;
  setTheme: (theme: ThemeName) => void;
  customLogo: string;
  setCustomLogo: (logo: string) => void;
  height: number;
  setHeight: (height: number) => void;
  resetKey: number;
  shareUrl: string;
  appearance: IAppearance;
  loginMethods: LoginMethodType;
  updateAppearance: (
    property: keyof IAppearance,
    value: IAppearance[keyof IAppearance],
  ) => void;
  resetAppearance: () => void;
  setAppearance: React.Dispatch<React.SetStateAction<IAppearance>>;
  updateLoginMethods: (methods: LoginMethodType) => void;
  language: LanguageKey;
  setLanguage: (language: LanguageKey) => void;
  explorer: IExplorer;
  setExplorer: (explorer: IExplorer) => void;
  excludeWallets: string[];
  setExcludeWallets: (wallets: string[]) => void;
  orderWallets: string[];
  setOrderWallets: (wallets: string[]) => void;
  promptOnWrongNetwork: boolean;
  setPromptOnWrongNetwork: (value: boolean) => void;
}

export const ConfigContext = createContext<IConfigContext | undefined>(
  undefined,
);
