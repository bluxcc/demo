import { useState } from "react";
import { BluxProvider } from "blux";

import { Highlight, themes } from "prism-react-renderer";

import "./style/index.css";

import Header from "./components/Header";
import OpenModal from "./containers/OpenModal";

import redo from "/images/redo.svg";
import TabsContainer from "./containers/tabsContainer";
import { useAppearance } from "./hooks/useAppearanceContext";

function App() {
  const { appearance, resetAppearance } = useAppearance();
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  const handleOpenCode = () => setIsCodeOpen(!isCodeOpen);

  const codeBlock = `import { BluxProvider, useBlux } from "@bluxcc/react";

const App = () => {
  const { connect } = useBlux();
  return (
    <BluxProvider
      config={{
        "appName": "app",
        "network": "testnet",
        "networkPassphrase": "Test SDF Network ; September 2015"
      }}
      appearance={${JSON.stringify(appearance, null, 8)
        .replace(/^{/, "{ ")
        .replace(/}$/, "      }")}}
    >
      <button onClick={connect}>Connect Wallet</button>
    </BluxProvider>
  );
};

export default App;`;

  return (
    <div className="flex-col h-screen w-screen">
      <Header onOpenCode={handleOpenCode} />
      <div className="h-[calc(100vh-72px)] flex  transition-all duration-300">
        <div className="font-jetbrains">
          <TabsContainer />
        </div>
        <div className="w-full relative h-full overflow-hidden">
          <div className="absolute py-6 flex flex-col justify-between items-center inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div />
            <div className="relative w-full center">
              <BluxProvider
                isDemo
                appearance={appearance}
                config={{
                  appName: "demo",
                  network: "testnet",
                  networkPassphrase: "Test SDF Network ; September 2015",
                }}
              >
                <OpenModal />
              </BluxProvider>
            </div>
            <div>
              <button
                onClick={resetAppearance}
                className="inline-flex font-jetbrains gap-2 justify-center items-center text-primary border-primary border-2 border-dashed h-12 w-[120px]"
              >
                <img src={redo} alt="redo" />
                Reset
              </button>
            </div>
          </div>
        </div>
        <div
          className={`h-full border-l border-lightPurple transition-all duration-300 overflow-hidden ${
            isCodeOpen ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        >
          <div className="border border-lightPurple m-4">
            <Highlight language="tsx" code={codeBlock} theme={themes.vsLight}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} p-4 text-sm font-mono leading-relaxed`}
                  style={{
                    ...style,
                    overflowX: "hidden",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {tokens.map((line, i) => (
                    <div
                      key={i}
                      {...getLineProps({ line, key: i })}
                      className="flex items-start"
                    >
                      <span
                        className="text-gray-500 select-none w-8 text-right pr-4 flex-shrink-0"
                        style={{ minWidth: "2rem" }}
                      >
                        {i + 1}
                      </span>
                      <span className="break-all">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
