import { BluxProvider } from "blux";

import "./style/index.css";

import Header from "./components/header";
import ConnectButton from "./components/ConnectButton";

import redo from "/images/redo.svg";
import TabsContainer from "./containers/tabsContainer";

function App() {
  return (
    <BluxProvider
      config={{
        networkPassphrase: "Test SDF Network ; September 2015",
        appName: "my example app",
      }}
    >
      <div className="flex-col h-screen w-screen">
        <Header />
        <div className="h-[calc(100vh-72px)] flex">
          <TabsContainer />
          <div className="w-full relative">
            <div className="absolute py-6 flex-col flex justify-between items-center inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
              <div />
              <div>
                <ConnectButton />
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
    </BluxProvider>
  );
}

export default App;
