import { useBlux } from "blux";
import { useEffect, useState } from "react";
import { shortenAddress } from "./utils/shortenAddress";

const ConnectButton = () => {
  const { connect, user, disconnect } = useBlux();
  const [userAddress, setUserAddress] = useState("");
  const { address } = user();

  useEffect(() => {
    setUserAddress(address);
    console.log(address);
  }, [address]);

  const handleClick = async () => {
    await connect();
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
      }}
    >
      <button
        onClick={handleClick}
        style={{
          background: "#0d1292",
          padding: "10px 16px",
          border: "1px solid transparent",
          borderRadius: "12px",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          margin: "0 10px",
        }}
      >
        {userAddress ? shortenAddress(userAddress, 4) : "Connect wallet"}
      </button>
      <button
        onClick={handleDisconnect}
        style={{
          background: "#878787",
          padding: "10px",
          border: "1px solid transparent",
          borderRadius: "12px",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        disconnect wallet
      </button>
    </div>
  );
};

export default ConnectButton;
