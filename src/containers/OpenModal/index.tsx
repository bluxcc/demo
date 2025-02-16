import { useEffect } from "react";
import { useBlux } from "blux";

const OpenModal = () => {
  const { isReady, connect, isAuthenticated, user, signTransaction } =
    useBlux();

  useEffect(() => {
    connect();
  }, [user.wallet?.address]);

  useEffect(() => {
    if (isAuthenticated) {
      signTransaction();
    }
  }, [isAuthenticated]);

  if (!isReady) return <div>Loading...</div>;

  return null;
};

export default OpenModal;
