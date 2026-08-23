import { LoginMethodType } from '../constants';
import { getThemeAppearance } from '../constants/themes';
import { IAppearance, IExplorer, LanguageKey, ThemeName } from '../types';

export type ShareableConfig = {
  version: 1;
  theme: ThemeName;
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
  t?: 'd' | 'x' | 'm';
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
export const DEMO_APPEARANCE_HOST = 'demo.blux.cc';
export const DEMO_APPEARANCE_ORIGIN = `https://${DEMO_APPEARANCE_HOST}`;
export const SHARE_ID_LENGTH = 9;

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
const SHARE_ID_PATTERN = new RegExp(`^[0-9a-z]{${SHARE_ID_LENGTH}}$`);
const SHORT_LINK_ID_PATH = new RegExp(`^/i/([0-9a-z]{${SHARE_ID_LENGTH}})/?$`);

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

export const isShareId = (id: string) => SHARE_ID_PATTERN.test(id);

export const isShortLinkPath = (pathname: string) =>
  pathname === '/i' || pathname.startsWith('/i/');

export const readShareId = (pathname: string): string | null => {
  const match = pathname.match(SHORT_LINK_ID_PATH);
  return match?.[1] ?? null;
};

export const toCanonicalDemoUrl = (sharePath: string) => {
  const path = sharePath.startsWith('/') ? sharePath : `/${sharePath}`;
  if (path === '/') return DEMO_APPEARANCE_ORIGIN;
  return `${DEMO_APPEARANCE_ORIGIN}${path}`;
};

export const localHrefFromDemoUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.toLowerCase() !== DEMO_APPEARANCE_HOST) return null;
    if (parsed.pathname !== '/' && parsed.pathname !== '') return null;
    return parsed.search ? `/${parsed.search}` : DEFAULT_CUSTOM_PATH;
  } catch {
    return null;
  }
};

export const localShareLink = (shortUrl: string): string | null => {
  try {
    const parsed = new URL(shortUrl);
    if (parsed.hostname.toLowerCase() !== DEMO_APPEARANCE_HOST) return null;
    const id = readShareId(parsed.pathname);
    if (!id) return null;
    return new URL(`/i/${id}`, window.location.origin).toString();
  } catch {
    return null;
  }
};

export const createSharePath = (
  config: ShareableConfig,
  systemTheme: 'light' | 'dark' = 'light',
) => {
  const defaultAppearance = getThemeAppearance(config.theme);
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
    ...(config.theme !== 'light' && {
      t: ({ dark: 'd', retro: 'x', modern: 'm' } as const)[config.theme],
    }),
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

  // Query string so POST /demos will accept the canonical demo.blux.cc URL.
  return onlyUsesSystemDefaults
    ? DEFAULT_CUSTOM_PATH
    : `/?s=${toBase64Url(JSON.stringify(compact))}`;
};

const encodedStateFromLocation = (pathname: string, search: string) => {
  const query = new URLSearchParams(
    search.startsWith('?') ? search.slice(1) : search,
  );
  const fromQuery = query.get('s');
  if (fromQuery) return fromQuery;

  const match = pathname.match(/\/custom(?:\/([^/]+))?\/?$/);
  return match?.[1] || null;
};

const parseCompactConfig = (encodedState: string): ShareableConfig | null => {
  try {
    const compact = JSON.parse(fromBase64Url(encodedState)) as CompactConfig;

    if (
      compact.v !== 1 ||
      (compact.t !== undefined && !['d', 'x', 'm'].includes(compact.t))
    ) {
      return null;
    }

    const theme: ThemeName =
      compact.t === 'd'
        ? 'dark'
        : compact.t === 'x'
          ? 'retro'
          : compact.t === 'm'
            ? 'modern'
            : 'light';
    const appearance: IAppearance = { ...getThemeAppearance(theme) };

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
      themeExplicit: compact.q === 1,
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

export const readShareableConfig = (
  pathname: string,
  search = '',
): ShareableConfig | null => {
  const encodedState = encodedStateFromLocation(pathname, search);
  if (!encodedState) return null;
  return parseCompactConfig(encodedState);
};

export const readShareableConfigFromHref = (
  href: string,
): ShareableConfig | null => {
  try {
    const url = new URL(href, DEMO_APPEARANCE_ORIGIN);
    return readShareableConfig(url.pathname, url.search);
  } catch {
    return null;
  }
};
