import { isDarkBackground } from './randomTheme';

export const handleLogoColor = (backgroundColor: string) => {
  return isDarkBackground(backgroundColor)
    ? '/images/whiteBluxLogo.svg'
    : '/images/blux.svg';
};
