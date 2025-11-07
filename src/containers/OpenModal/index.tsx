import { useEffect } from 'react';
import { useBlux } from '@bluxcc/react';
import { useConfigContext } from '../../hooks/useConfigContext';

const OpenModal = () => {
  const { isReady, login, isAuthenticated, user, profile } = useBlux();

  const { setHeight } = useConfigContext();

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    let i: any;

    if (isReady && !isMobile && !isAuthenticated) {
      i = setInterval(() => {
        try {
          login();
        } catch {}
      }, 1000);
    }

    return () => {
      clearInterval(i);
    };
  }, [isReady, user, login, isMobile, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        profile();
      }, 2350);
    }
  }, [isAuthenticated, profile]);

  setTimeout(() => {
    const modal = document.querySelector(
      'div[class*="bluxcc:box-border"][class*="bluxcc:relative"]',
    );

    if (modal instanceof HTMLElement) {
      setHeight(modal.offsetHeight);
    } else {
      setHeight(377);
    }
  }, 400);

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
