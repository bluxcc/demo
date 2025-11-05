export const COLORS = {
  light: {
    background: ['#ffffff', '#F2F2F7', '#E5FBFF', '#FFE5E5'] as const,
    accentColor: ['#007AFF', '#FFD60A', '#34C759', '#FF3B30'] as const,
    fieldBackground: ['#ffffff', '#E5E5EC', '#E4F0E6', '#FFE5E5'] as const,
    textColor: ['#000000', '#011122', '#011907', '#260000'] as const,
    borderColor: ['#F2F2F7', '#CDCEEE', '#D5DDD6', '#A9A9A9'] as const,
    outlineColor: ['#B0C8E8', '#D9C178', '#B8D5C6', '#E0B6B6'] as const,
  },
  dark: {
    background: ['#000000', '#100930', '#441213', '#093018'] as const,
    accentColor: ['#0A84FF', '#FFD60A', '#30D158', '#FF375F'] as const,
    fieldBackground: ['#000000', '#050115', '#2C0707', '#02160A'] as const,
    textColor: ['#FFFFFF', '#EFEBFF', '#FFEAEB', '#DEFFE6'] as const,
    borderColor: ['#333333', '#2E1D74', '#572424', '#10552C'] as const,
    outlineColor: ['#3A4A66', '#4A3F6B', '#3C4B42', '#4A3C3C'] as const,
  },
  random: {
    background: ['#FFFFFF', '#FFF9F2', '#E5FBFF', '#FFF2F2'] as const,
    accentColor: ['#007AFF', '#FFD60A', '#34C759', '#FF3B30'] as const,
    fieldBackground: ['#F7F7FA', '#FFF6D6', '#EAF9F0', '#FFEDEE'] as const,
    textColor: ['#0B1220', '#3A2F00', '#042A1E', '#2A0A0A'] as const,
    borderColor: ['#E6E9F2', '#FFE9A8', '#CFEFE0', '#FFD6D6'] as const,
    outlineColor: ['#007AFF', '#FFB800', '#2FA94C', '#D32B20'] as const,
  },
};

export const Fonts: { name: string; value: string }[] = [
  { name: 'Manrope', value: 'Manrope' },
  { name: 'ComicNeue', value: 'ComicNeue' },
  { name: 'JetBrains', value: 'JetBrains Mono' },
  { name: 'Playfair', value: 'Playfair' },
];

export type LoginMethodType = Array<
  | 'wallet'
  | 'email'
  | 'sms'
  | 'google'
  | 'twitter'
  | 'discord'
  | 'github'
  | 'passkey'
>;

export type ColorType =
  | 'background'
  | 'accentColor'
  | 'fieldBackground'
  | 'textColor'
  | 'borderColor'
  | 'outlineColor';

// export const CUSTOM_GRADIENT =
//   "conic-gradient(from 180deg at 50% 50%, #0D1292 0deg, #FFCDCD 180deg, #53E5FF 360deg)";
export type RadiusValues = 'sm' | 'md' | 'lg' | 'none' | 'full';

export const WC_URI = import.meta.env.DEV
  ? 'http://localhost:3000'
  : 'https://demo.blux.cc';

export const corners = [
  {
    pos: 'top-left',
    classes: '-top-0 -left-0 cursor-nwse-resize',
    borders: { top: true, left: true },
  },
  {
    pos: 'top-right',
    classes: '-top-0 -right-0 cursor-nesw-resize',
    borders: { top: true, right: true },
  },
  {
    pos: 'bottom-left',
    classes: '-bottom-0 -left-0 cursor-nesw-resize',
    borders: { bottom: true, left: true },
  },
  {
    pos: 'bottom-right',
    classes: `-bottom-0 -right-0 cursor-nwse-resize`,
    borders: { bottom: true, right: true },
  },
];
