import { useEffect } from "react";
import { useBlux } from "@bluxcc/react";

const OpenModal = () => {
  const { isReady, login, isAuthenticated, user, profile } = useBlux();

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (isReady && !isMobile) {
      setInterval(() => {
        try {
          login();
        } catch { }
      }, 1000);
    }
  }, [isReady, user, login, isMobile]);

  useEffect(() => {
    if (isAuthenticated) {
      profile();
    }
  }, [isAuthenticated, profile]);

  if (!isReady) return <div>Loading...</div>;

  return isMobile ? (
    <div
      className="absolute center bottom-0 h-16 w-full bg-primary text-white"
      onClick={login}
    >
      Launch Blux
    </div>
  ) : null;
};

export default OpenModal;
