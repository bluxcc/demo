import { useState } from "react";
import { BluxProvider, networks } from "@bluxcc/react";
import { Highlight, themes } from "prism-react-renderer";

import redo from "/images/redo.svg";
import Header from "./components/Header";
import OpenModal from "./containers/OpenModal";
import TabsContainer from "./containers/tabsContainer";
import { useAppearance } from "./hooks/useAppearanceContext";

import "./style/index.css";

function App() {
  const { appearance, resetAppearance } = useAppearance();
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  const handleOpenCode = () => setIsCodeOpen(!isCodeOpen);
  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeBlock);
  };
  const handleCloseCode = () => setIsCodeOpen(false);

  const codeBlock = `import { BluxProvider, useBlux, networks } from "@bluxcc/react";

const App = () => {
  const { connect } = useBlux();

  return (
    <BluxProvider
      config={{
        appName: "Blux Demo",
        networks: [networks.mainnet],
        appearance: {
          theme: "${appearance.theme}",
          background: "${appearance.background}",
          accent: "${appearance.accent}",
          textColor: "${appearance.textColor}",
          font: "${appearance.font}",
          cornerRadius: "${appearance.cornerRadius}",
          cover: "${appearance.cover}"
        }
      }}
    >
      <button onClick={connect}>Connect Wallet</button>
    </BluxProvider>
  );
};

export default App;`;

  return (
    <div className="flex-col h-screen w-screen overflow-hidden">
      <Header
        isCodeOpen={isCodeOpen}
        onOpenCode={handleOpenCode}
        handleCopyCode={handleCopyCode}
        handleCloseCode={handleCloseCode}
      />
      <div className="h-[calc(100vh-72px)] w-full flex transition-all duration-300 mobile:relative ">
        <div className="font-jetbrains mobile:w-full ">
          <TabsContainer />
          <div className="mobile:block hidden">
            <BluxProvider
              isDemo
              config={{
                appearance,
                appName: "demo",
                networks: [networks.mainnet],
                loginMethods: ["wallet", "email", "passkey"],
              }}
            >
              <OpenModal />
            </BluxProvider>
          </div>
        </div>
        <div
          className={`${
            isCodeOpen && "desktop:mr-[26vw]"
          } relative h-full overflow-hidden mobile:hidden w-full transition-all duration-500`}
        >
          <div className="absolute py-6 flex flex-col justify-between items-center inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div />
            <div className="relative w-full center">
              <BluxProvider
                isDemo
                config={{
                  appearance,
                  appName: "demo",
                  networks: [networks.mainnet],
                  loginMethods: ["wallet", "email", "passkey"],
                }}
              >
                <OpenModal />
              </BluxProvider>
            </div>
            <div>
              <button
                onClick={resetAppearance}
                className="inline-flex mobile:hidden font-jetbrains gap-2 justify-center items-center text-primary border-primary border-2 border-dashed h-12 w-[120px]"
              >
                <img src={redo} alt="redo" />
                Reset
              </button>
            </div>
          </div>
        </div>
        <div
          className={`h-full fixed !w-[500px] border-l border-lightPurple transition-all duration-500 overflow-hidden mobile:hidden tablet:hidden ${
            isCodeOpen
              ? "right-0 opacity-100 !bg-white"
              : "right-[-500px] opacity-0"
          }`}
        >
          <div className="border  border-lightPurple m-4">
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
                      {...getLineProps({ line })}
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
                          <span key={key} {...getTokenProps({ token })} />
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
