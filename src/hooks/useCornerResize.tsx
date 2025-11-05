import { useEffect, useState } from 'react';

export const useCornerResize = (
  initialRadius: number = 12,
  min: number = 4,
  max: number = 60,
) => {
  const [radius, setRadius] = useState(initialRadius);
  const [resizingCorner, setResizingCorner] = useState<string | null>(null);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  useEffect(() => {
    if (!resizingCorner || !startPos) return;

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      const delta = Math.sqrt(dx * dx + dy * dy);

      const isInward =
        (resizingCorner.includes('top') && dy > 0) ||
        (resizingCorner.includes('bottom') && dy < 0) ||
        (resizingCorner.includes('left') && dx > 0) ||
        (resizingCorner.includes('right') && dx < 0);

      setRadius((prev) =>
        Math.max(
          min,
          Math.min(max, prev + (isInward ? delta / 6 : -delta / 6)),
        ),
      );
      setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleUp = () => {
      setResizingCorner(null);
      setStartPos(null);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [resizingCorner, startPos, min, max]);

  const handleResizeRadius = (corner: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResizingCorner(corner);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  return { radius, handleResizeRadius };
};
