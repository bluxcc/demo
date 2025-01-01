import { useBlux } from "blux";

const ConnectButton = () => {
  const { connect } = useBlux();

  const onClick = () => {
    connect();
  };

  return (
    <div>
      <button type="button" onClick={onClick}>
        Click to Connect
      </button>
    </div>
  );
};

export default ConnectButton;
