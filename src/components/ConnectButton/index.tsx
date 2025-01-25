import { useEffect, useState } from "react";
import { useBlux } from "blux";

const ConnectButton = () => {
  const { user, isAuthenticated, isReady, openDemo, disconnect } = useBlux();
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    openDemo();
    if (isAuthenticated) {
      setTimeout(() => {
        disconnect();
      }, 100);

      setTimeout(() => {
        openDemo();
      }, 300);
    }
  }, [disconnect, isAuthenticated]);

  useEffect(() => {
    if (user?.wallet?.address) {
      setUserAddress(user.wallet.address);
    }
  }, [user?.wallet?.address]);

  if (!isReady) return <div>Loading...</div>;
  if (isAuthenticated) {
    return <div>Connected: {userAddress}</div>;
  }
  return null;
};

export default ConnectButton;
