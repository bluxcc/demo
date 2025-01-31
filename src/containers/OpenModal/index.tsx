import { useEffect, useState } from "react";
import { useBlux } from "blux";

const OpenModal = () => {
  const { user, isAuthenticated, isReady, openDemo, disconnect } = useBlux();
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    openDemo();
  }, []);

  useEffect(() => {
    if (user?.wallet?.address) {
      setUserAddress(user.wallet.address);
    }
  }, [user?.wallet?.address]);

  const handleDisconnect = async () => {
    await disconnect();
  };

  if (!isReady) return <div>Loading...</div>;
  if (isAuthenticated) {
    return (
      <button
        className="center bg-primary h-12 p-4 text-white"
        onClick={handleDisconnect}
      >
        {userAddress}
      </button>
    );
  }
  return null;
};

export default OpenModal;
