import { useEffect, useState } from 'react';

export const useOutlineResize = (
  initialWidth: number = 1,
  min: number = 0,
  max: number = 6,
) => {
  const [width, setWidth] = useState(initialWidth);
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  useEffect(() => {
    if (!activeHandle || !startPos) return;

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      let delta = 0;

      if (activeHandle.includes('center')) {
        switch (activeHandle) {
          case 'top-center':
            delta = -dy / 10;
            break;
          case 'bottom-center':
            delta = dy / 10;
            break;
          case 'left-center':
            delta = -dx / 10;
            break;
          case 'right-center':
            delta = dx / 10;
            break;
        }
      } else {
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inward =
          (activeHandle.includes('top') && dy > 0) ||
          (activeHandle.includes('bottom') && dy < 0) ||
          (activeHandle.includes('left') && dx > 0) ||
          (activeHandle.includes('right') && dx < 0);

        delta = inward ? dist / 8 : -dist / 8;
      }

      setWidth((prev) => Math.max(min, Math.min(max, prev + delta)));
      setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleUp = () => {
      setActiveHandle(null);
      setStartPos(null);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [activeHandle, startPos, min, max]);

  const handleResizeOutlineWidth = (pos: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveHandle(pos);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  return { width, handleResizeOutlineWidth };
};
