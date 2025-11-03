import { createContext } from 'react';

import { IAppearance } from '../types';
import { LoginMethodType } from '../constants';

interface IConfigContext {
  theme: 'dark' | 'light' | 'random';
  setTheme: (theme: 'dark' | 'light' | 'random') => void;
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
}

export const ConfigContext = createContext<IConfigContext | undefined>(
  undefined,
);
