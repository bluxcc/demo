const shouldReduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const animateResetIcon = (button: HTMLButtonElement) => {
  if (shouldReduceMotion()) return;

  button.querySelector('svg')?.animate(
    [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-360deg)' }],
    {
      duration: 550,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  );
};

export const animateShareIcon = (button: HTMLButtonElement) => {
  if (shouldReduceMotion()) return;

  button.querySelector('[data-share-arrow]')?.animate(
    [
      { transform: 'translateY(0)', opacity: 1, offset: 0 },
      { transform: 'translateY(-4px)', opacity: 0, offset: 0.42 },
      { transform: 'translateY(3px)', opacity: 0, offset: 0.43 },
      { transform: 'translateY(0)', opacity: 1, offset: 1 },
    ],
    {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  );
};
