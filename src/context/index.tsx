import { createContext } from 'react';

import { IAppearance, IExplorer, LanguageKey } from '../types';
import { LoginMethodType } from '../constants';

interface IConfigContext {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  customLogo: string;
  setCustomLogo: (logo: string) => void;
  height: number;
  setHeight: (height: number) => void;
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
