import { IAppearance } from '../types';

const randomFrom = <T,>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomPx = (min: number, max: number) =>
  `${Math.floor(Math.random() * (max - min + 1) + min)}px`;

const randomFont = () =>
  randomFrom(['Manrope', 'JetbrainsMono', 'Playfair', 'ComicNeue']);

const randomHex = (min: number, max: number) => {
  const r = Math.floor(Math.random() * (max - min) + min);
  const g = Math.floor(Math.random() * (max - min) + min);
  const b = Math.floor(Math.random() * (max - min) + min);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const isDarkBackground = (hex: string): boolean => {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
};

const getContrastColor = (hex: string) =>
  isDarkBackground(hex) ? '#ffffff' : '#111111';

export const generateRandomTheme = (
  logo: string,
  baseTheme: 'light' | 'dark' = 'light',
): IAppearance => {
  const isDark = baseTheme === 'dark';

  const background = isDark ? randomHex(10, 60) : randomHex(220, 255);
  const fieldBackground = isDark ? randomHex(20, 70) : randomHex(240, 255);
  const accentColor = randomHex(isDark ? 120 : 80, isDark ? 255 : 200);
  const borderColor = isDark ? randomHex(60, 100) : randomHex(180, 230);
  const outlineColor = accentColor;
  const textColor = getContrastColor(background);
  const backdropColor = `${borderColor}33`;

  return {
    logo: logo,
    fontFamily: randomFont(),
    textColor,
    accentColor,
    background,
    fieldBackground,
    outlineRadius: randomPx(8, 32),
    outlineColor,
    outlineWidth: randomPx(1, 4),
    borderColor,
    borderRadius: randomPx(8, 48),
    borderWidth: randomPx(1, 4),
    boxShadow: `0px ${randomPx(0, 10)} ${randomPx(10, 80)} 0px ${accentColor}33`,
    backdropBlur: `${Math.floor(Math.random() * 5)}px`,
    backdropColor,
  };
};
