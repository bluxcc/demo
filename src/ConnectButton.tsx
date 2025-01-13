import { useBlux } from "blux";

const ConnectButton = () => {
  const { connect, user, disconnect } = useBlux();

  const handleClick = async () => {
    await connect();
    console.log(user());
  };

  const handleDisconnect = async () => {
    await disconnect();
    console.log(user());
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{
          background: "#0d1292",
          padding: "10px",
          border: "1px solid transparent",
          borderRadius: "12px",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Connect wallet
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
    </>
  );
};

export default ConnectButton;
