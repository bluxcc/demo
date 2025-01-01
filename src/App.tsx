import { BluxProvider } from "blux";
import ConnectButton from "./ConnectButton";
import "../../kit/dist/index.esm.css";

function App() {
  return (
    <BluxProvider
      config={{
        appName: "gello",
        networkPassphrase: "maiaan",
      }}
    >
      <p>hey</p>
      <ConnectButton />
    </BluxProvider>
  );
}

export default App;
