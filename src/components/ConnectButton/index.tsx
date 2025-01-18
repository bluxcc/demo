import { useBlux } from "blux";
import { useEffect, useState } from "react";
import { shortenAddress } from "../../utils/shortenAddress";

const ConnectButton = () => {
  const { connect, user, disconnect } = useBlux();
  const [userAddress, setUserAddress] = useState("");
  const { address } = user();

  useEffect(() => {
    setUserAddress(address);
    console.log(address);
  }, [address]);

  const handleClick = async () => {
    console.log("aaaa");
    connect();
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-primary text-white font-medium text-lg py-2 px-4 mx-2"
      >
        {userAddress ? shortenAddress(userAddress, 4) : "Connect wallet"}
      </button>
      <button
        onClick={handleDisconnect}
        className="bg-slate-300 text-slate-800 font-medium text-lg py-2 px-4 mx-2"
      >
        Disconnect
      </button>
    </>
  );
};

export default ConnectButton;
