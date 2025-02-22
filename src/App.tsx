import { BluxProvider } from "blux";

import "./style/index.css";

import Header from "./components/Header";
import OpenModal from "./containers/OpenModal";

import redo from "/images/redo.svg";
import TabsContainer from "./containers/tabsContainer";
import { useAppearance } from "./hooks/useAppearanceContext";

function App() {
  const { appearance, resetAppearance } = useAppearance();

  return (
    <div className="flex-col h-screen w-screen">
      <Header />
      <div className="h-[calc(100vh-72px)] flex">
        <div className="font-jetbrains">
          <TabsContainer />
        </div>
        <div className="w-full relative h-full overflow-hidden">
          <div className="absolute py-6 flex-col flex justify-between items-center inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div />
            <div className="relative w-full center">
              <BluxProvider
                isDemo
                appearance={appearance}
                config={{
                  network: "testnet",
                  networkPassphrase: "Test SDF Network ; September 2015",
                  appName: "demo",
                }}
              >
                <OpenModal />
              </BluxProvider>
            </div>
            <div>
              <button
                onClick={resetAppearance}
                className="inline-flex font-jetbrains gap-2 justify-center items-center text-primary border-primary border-2 border-dashed h-12 w-[120px] "
              >
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
