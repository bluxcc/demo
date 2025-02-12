import { useEffect } from "react";
import { useBlux } from "blux";

const OpenModal = () => {
  const { isReady, connect, profile, isAuthenticated, user } = useBlux();

  useEffect(() => {
    connect();
  }, [user.wallet?.address]);

  useEffect(() => {
    if (isAuthenticated) {
      profile();
    }
  }, [isAuthenticated]);

  if (!isReady) return <div>Loading...</div>;

  return null;
};

export default OpenModal;
