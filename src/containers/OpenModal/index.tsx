import { useEffect } from 'react';
import { useBlux } from '@bluxcc/react';
import { useConfigContext } from '../../hooks/useConfigContext';

const OpenModal = () => {
  const { isReady, login, isAuthenticated, user, profile } = useBlux();

  const { setHeight } = useConfigContext();

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    let loginInterval: ReturnType<typeof setInterval> | undefined;

    if (isReady && !isMobile && !isAuthenticated) {
      loginInterval = setInterval(() => {
        try {
          login();
        } catch {
          // Ignore repeated requests while the login modal is opening.
        }
      }, 1000);
    }

    return () => {
      if (loginInterval) clearInterval(loginInterval);
    };
  }, [isReady, user, login, isMobile, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        profile();
      }, 2350);
    }
  }, [isAuthenticated, profile]);

  useEffect(() => {
    if (isMobile) return;

    let lastHeight = 0;
    let stableMeasurements = 0;
    let committedHeight = 0;

    setHeight(0);

    const measurementInterval = window.setInterval(() => {
      const modal = document.querySelector(
        'div[class*="bluxcc:box-border"][class*="bluxcc:relative"]',
      );

      if (modal instanceof HTMLElement && modal.offsetHeight > 0) {
        if (modal.offsetHeight === lastHeight) {
          stableMeasurements += 1;
        } else {
          lastHeight = modal.offsetHeight;
          stableMeasurements = 0;

          if (committedHeight > 0) {
            setHeight(0);
          }
        }

        if (
          stableMeasurements >= 3 &&
          lastHeight !== committedHeight
        ) {
          committedHeight = lastHeight;
          setHeight(lastHeight);
        }
      }
    }, 100);

    return () => window.clearInterval(measurementInterval);
  }, [isMobile, setHeight]);

  return isMobile ? (
    <div
      className="absolute bottom-0 w-full h-16 text-white center bg-primary"
      onClick={login}
    >
      Launch Blux
    </div>
  ) : null;
};

export default OpenModal;
