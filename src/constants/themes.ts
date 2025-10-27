import { IAppearance } from '../types';

export const defaultLightTheme: IAppearance = {
  logo: '/images/blux.svg',
  fontFamily: 'Manrope',
  textColor: '#000000',
  accentColor: '#0c1083',
  background: '#ffffff',
  fieldBackground: '#ffffff',
  outlineRadius: '24px',
  outlineColor: '#cdceee',
  outlineWidth: '1px',
  borderColor: '#cdceee',
  borderRadius: '24px',
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
  borderRadius: '24px',
  borderColor: '#333333',
  borderWidth: '1px',
  outlineRadius: '24px',
  outlineColor: '#333333',
  outlineWidth: '1px',
  backdropBlur: '1px',
  backdropColor: '#00000033',
  boxShadow: '0px 4px 80px 0px #00000008',
};
