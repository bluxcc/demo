import { useBlux } from "blux";

const ConnectButton = () => {
  const { connect } = useBlux();

  const handleClick = async () => {
    await connect();
  };

  return (
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
  );
};

export default ConnectButton;
