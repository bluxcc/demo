import { BluxProvider } from "blux";

import "./style/index.css";
// import "../../blux/dist/index.esm.css";

import Header from "./components/header";
import ConnectButton from "./components/ConnectButton";

import redo from "/images/redo.svg";
import TabsContainer from "./containers/tabsContainer";

function App() {
  return (
    <div className="flex-col h-screen w-screen">
      <Header />
      <div className="h-[calc(100vh-72px)] flex">
        <TabsContainer />
        <div className="w-full relative h-full overflow-hidden">
          <div className="absolute py-6 flex-col flex justify-between items-center inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div />
            <div className="relative w-full center">
              <BluxProvider
                config={{
                  networkPassphrase: "Test SDF Network ; September 2015",
                  appName: "my example app",
                }}
              >
                <ConnectButton />
              </BluxProvider>
            </div>
            <div className="">
              <button className="inline-flex gap-2 justify-center items-center text-primary border-primary border-2 border-dashed h-12 w-[120px] ">
                <img src={redo} alt="redo" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
