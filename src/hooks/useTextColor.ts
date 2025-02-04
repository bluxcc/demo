import { useMemo } from 'react';

export function useTextColor(bgColor: string): string {
  return useMemo(() => {
    if (!/^#[0-9A-F]{6}$/i.test(bgColor)) return '#000000';

    const r = parseInt(bgColor.substring(1, 3), 16) / 255;
    const g = parseInt(bgColor.substring(3, 5), 16) / 255;
    const b = parseInt(bgColor.substring(5, 7), 16) / 255;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance < 0.5 ? '#ffffff' : '#000000';
  }, [bgColor]);
}
