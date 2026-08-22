import { IAppearance, ThemeName } from '../types';

export const defaultLightTheme: IAppearance = {
  logo: '/images/blux.svg',
  fontFamily: 'Manrope',
  textColor: '#000000',
  accentColor: '#0c1083',
  background: '#ffffff',
  fieldBackground: '#ffffff',
  outlineRadius: '32px',
  outlineColor: '#cdceee',
  outlineWidth: '1px',
  borderColor: '#cdceee',
  borderRadius: '32px',
  borderWidth: '1px',
  backdropBlur: '1px',
  backdropColor: '#00000033',
  boxShadow: '0px 4px 80px 0px #00000008',
};

export const defaultDarkTheme: IAppearance = {
  logo: '/images/whiteBluxLogo.svg',
  fontFamily: 'Manrope',
  textColor: '#ffffff',
  accentColor: '#ffffff',
  background: '#000000',
  fieldBackground: '#1a1a1a',
  borderRadius: '32px',
  borderColor: '#333333',
  borderWidth: '1px',
  outlineRadius: '32px',
  outlineColor: '#333333',
  outlineWidth: '1px',
  backdropBlur: '1px',
  backdropColor: '#00000033',
  boxShadow: '0px 4px 80px 0px #00000008',
};

export const defaultRetroTheme: IAppearance = {
  logo: '/images/whiteBluxLogo.svg',
  fontFamily: 'JetbrainsMono',
  textColor: '#e6ffff',
  accentColor: '#00f0ff',
  background: '#090d24',
  fieldBackground: '#111a3a',
  outlineRadius: '10px',
  outlineColor: '#7c3aed',
  outlineWidth: '3px',
  borderColor: '#ff2bd6',
  borderRadius: '6px',
  borderWidth: '2px',
  backdropBlur: '8px',
  backdropColor: '#02040fcc',
  boxShadow: '10px 10px 0px 0px #00b8d4',
};

export const defaultModernTheme: IAppearance = {
  logo: '/images/blux.svg',
  fontFamily: 'Space Grotesk',
  textColor: '#101828',
  accentColor: '#635bff',
  background: '#f7f8fc',
  fieldBackground: '#ffffff',
  outlineRadius: '28px',
  outlineColor: '#e4e7ec',
  outlineWidth: '1px',
  borderColor: '#d0d5dd',
  borderRadius: '18px',
  borderWidth: '1px',
  backdropBlur: '18px',
  backdropColor: '#10182829',
  boxShadow: '0px 28px 80px -24px #10182866',
};

const themeAppearances: Record<ThemeName, IAppearance> = {
  light: defaultLightTheme,
  dark: defaultDarkTheme,
  retro: defaultRetroTheme,
  modern: defaultModernTheme,
};

export const getThemeAppearance = (theme: ThemeName) =>
  themeAppearances[theme];
