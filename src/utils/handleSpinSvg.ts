const rotationMap = new WeakMap<HTMLElement, number>();

export const handleSpin = (
  e: React.MouseEvent<HTMLButtonElement>,
  {
    rotate = 180,
    duration = 500,
  }: {
    rotate?: number;
    duration?: number;
  } = {},
) => {
  const el = e.currentTarget.querySelector('svg');
  if (!el) return;

  const current = rotationMap.get(el) || 0;
  const next = current + rotate;

  rotationMap.set(el, next);

  el.style.transition = `transform ${duration}ms ease-in-out`;
  el.style.transform = `rotate(${next}deg)`;
};
