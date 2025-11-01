import { IAppearance } from '../types';

const randomFrom = <T,>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomPx = (min: number, max: number) =>
  `${Math.floor(Math.random() * (max - min + 1) + min)}px`;

const randomFont = () => {
  const fonts = ['Manrope', 'JetbrainsMono', 'Playfair', 'ComicNeue'];
  return randomFrom(fonts);
};

const randomHex = (min: number, max: number) => {
  const r = Math.floor(Math.random() * (max - min) + min);
  const g = Math.floor(Math.random() * (max - min) + min);
  const b = Math.floor(Math.random() * (max - min) + min);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const getContrastColor = (hex: string) => {
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#111111' : '#ffffff';
};

export const generateRandomTheme = (): IAppearance => {
  const isDark = Math.random() < 0.5;

  const background = isDark ? randomHex(10, 60) : randomHex(220, 255);
  const fieldBackground = isDark ? randomHex(20, 70) : randomHex(240, 255);
  const accentColor = randomHex(isDark ? 120 : 80, isDark ? 255 : 200);
  const borderColor = isDark ? randomHex(60, 100) : randomHex(180, 230);
  const outlineColor = accentColor;
  const textColor = getContrastColor(background);
  const backdropColor = `${borderColor}33`;

  return {
    logo: '',
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
