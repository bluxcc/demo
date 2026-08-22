import { LoginMethodType } from '../constants';
import { defaultDarkTheme, defaultLightTheme } from '../constants/themes';
import { IAppearance, IExplorer, LanguageKey } from '../types';

export type ShareableConfig = {
  version: 1;
  theme: 'light' | 'dark';
  themeExplicit: boolean;
  customLogo: string;
  appearance: IAppearance;
  loginMethods: LoginMethodType;
  language: LanguageKey;
  explorer: IExplorer;
  excludeWallets: string[];
  orderWallets: string[];
  promptOnWrongNetwork: boolean;
};

type CompactConfig = {
  v: 1;
  t?: 'd';
  q?: 1;
  a?: Array<[number, string]>;
  b?: string;
  w?: string;
  c?: string;
  m?: LoginMethodType;
  l?: LanguageKey;
  e?: IExplorer;
  x?: string[];
  o?: string[];
  p?: 0;
};

export const DEFAULT_CUSTOM_PATH = '/';
const CUSTOM_ROUTE = '/custom';
const DEFAULT_LOGIN_METHODS: LoginMethodType = [
  'wallet',
  'email',
  'passkey',
  'google',
];
const APPEARANCE_KEYS: Array<keyof IAppearance> = [
  'background',
  'fieldBackground',
  'accentColor',
  'textColor',
  'fontFamily',
  'outlineWidth',
  'outlineColor',
  'outlineRadius',
  'borderRadius',
  'borderColor',
  'borderWidth',
  'logo',
  'backdropBlur',
  'backdropColor',
  'boxShadow',
];

const toBase64Url = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
};

const fromBase64Url = (value: string) => {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return new TextDecoder().decode(bytes);
};

const arraysMatch = (first: unknown[], second: unknown[]) =>
  first.length === second.length &&
  first.every((value, index) => value === second[index]);

export const createSharePath = (
  config: ShareableConfig,
  systemTheme: 'light' | 'dark' = 'light',
) => {
  // TODO: Persist configurations in the backend and replace the encoded state
  // with a short, human-friendly `/custom/:slug` route once the API is ready.
  const defaultAppearance =
    config.theme === 'dark' ? defaultDarkTheme : defaultLightTheme;
  const appearanceChanges = APPEARANCE_KEYS.flatMap((key, index) => {
    if (key === 'logo' && config.customLogo) return [];
    if (key === 'borderWidth') return [];
    if (key === 'outlineWidth') return [];
    const value = config.appearance[key];
    return value !== defaultAppearance[key] && typeof value === 'string'
      ? ([[index, value]] as Array<[number, string]>)
      : [];
  });
  const compact: CompactConfig = {
    v: 1,
    ...(config.theme === 'dark' && { t: 'd' as const }),
    ...(config.themeExplicit && { q: 1 as const }),
    ...(appearanceChanges.length > 0 && { a: appearanceChanges }),
    ...(config.appearance.borderWidth !== defaultAppearance.borderWidth && {
      b: config.appearance.borderWidth,
    }),
    ...(config.appearance.outlineWidth !== defaultAppearance.outlineWidth && {
      w: config.appearance.outlineWidth,
    }),
    ...(config.customLogo && { c: config.customLogo }),
    ...(!arraysMatch(config.loginMethods, DEFAULT_LOGIN_METHODS) && {
      m: config.loginMethods,
    }),
    ...(config.language !== 'en' && { l: config.language }),
    ...(config.explorer !== 'stellarchain' && { e: config.explorer }),
    ...(config.excludeWallets.length > 0 && { x: config.excludeWallets }),
    ...(config.orderWallets.length > 0 && { o: config.orderWallets }),
    ...(!config.promptOnWrongNetwork && { p: 0 as const }),
  };

  const onlyUsesSystemDefaults =
    Object.keys(compact).every((key) => key === 'v' || key === 't') &&
    config.theme === systemTheme &&
    !config.themeExplicit;

  return onlyUsesSystemDefaults
    ? DEFAULT_CUSTOM_PATH
    : `${CUSTOM_ROUTE}/${toBase64Url(JSON.stringify(compact))}`;
};

export const readShareableConfig = (
  pathname: string,
): ShareableConfig | null => {
  const match = pathname.match(/\/custom(?:\/([^/]+))?\/?$/);
  const encodedState = match?.[1];

  if (!match || !encodedState) return null;

  try {
    const compact = JSON.parse(fromBase64Url(encodedState)) as CompactConfig;

    if (compact.v !== 1 || (compact.t !== undefined && compact.t !== 'd')) {
      return null;
    }

    const theme = compact.t === 'd' ? 'dark' : 'light';
    const appearance: IAppearance = {
      ...(theme === 'dark' ? defaultDarkTheme : defaultLightTheme),
    };

    compact.a?.forEach(([index, value]) => {
      const key = APPEARANCE_KEYS[index];
      if (key && typeof value === 'string') appearance[key] = value;
    });
    if (typeof compact.b === 'string') appearance.borderWidth = compact.b;
    if (typeof compact.w === 'string') appearance.outlineWidth = compact.w;
    if (compact.c) appearance.logo = compact.c;

    return {
      version: 1,
      theme,
      themeExplicit: true,
      customLogo: compact.c ?? '',
      appearance,
      loginMethods: Array.isArray(compact.m)
        ? compact.m
        : DEFAULT_LOGIN_METHODS,
      language: compact.l ?? 'en',
      explorer: compact.e ?? 'stellarchain',
      excludeWallets: Array.isArray(compact.x) ? compact.x : [],
      orderWallets: Array.isArray(compact.o) ? compact.o : [],
      promptOnWrongNetwork: compact.p !== 0,
    };
  } catch {
    return null;
  }
};
