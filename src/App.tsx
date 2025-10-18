import { useState } from "react";
import { BluxProvider, networks } from "@bluxcc/react";
import { Highlight, themes } from "prism-react-renderer";

import redo from "/images/redo.svg";
import Header from "./components/Header";
import OpenModal from "./containers/OpenModal";
import TabsContainer from "./containers/tabsContainer";
import { useConfigContext } from "./hooks/useConfigContext";

import "./style/index.css";

function App() {
  const { appearance, resetAppearance, loginMethods } = useConfigContext();
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const handleOpenCode = () => setIsCodeOpen(!isCodeOpen);

  const handleCloseCode = () => setIsCodeOpen(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 770;
  const codeBlock = `import { BluxProvider, useBlux, networks } from "@bluxcc/react";

const LoginButton = () => {
  const { login } = useBlux();
  return <button onClick={login}>Login</button>;
};

const App = () => {
  return (
    <BluxProvider
      config={{
        appName: "Blux Demo",
        networks: [networks.mainnet, networks.testnet],
        defaultNetwork: networks.testnet,
        appearance: {
          background: "${appearance.background}",
          accentColor: "${appearance.accentColor}",
          fieldBackground: "${appearance.fieldBackground}",
          textColor: "${appearance.textColor}",
          borderRadius: "${appearance.borderRadius}",
          borderWidth: "${appearance.borderWidth}",
          borderColor: "${appearance.borderColor}",
          font: "${appearance.font}",
          logo: "${appearance.logo}"
        },
        loginMethods: ${JSON.stringify(loginMethods, null, 2)}
      }}
    >
      <LoginButton />
    </BluxProvider>
  );
};

export default App;`;

  return (
    <div className="flex-col w-screen h-screen overflow-hidden">
      <Header
        isCodeOpen={isCodeOpen}
        onOpenCode={handleOpenCode}
        codeBlock={codeBlock}
        handleCloseCode={handleCloseCode}
      />
      <div className="h-[calc(100vh-72px)] w-full flex transition-all duration-300 mobile:relative ">
        <div className="font-jetbrainsMono mobile:w-full">
          <TabsContainer />

          {isMobile && (
            <BluxProvider
              config={{
                appearance,
                appName: "Blux Demo",
                isPersistent: true,
                loginMethods: loginMethods,
                networks: [networks.testnet, networks.mainnet],
              }}
            >
              <OpenModal />
            </BluxProvider>
          )}
        </div>
        <div
          className={`${isCodeOpen && "desktop:mr-[470px]"
            } relative h-full overflow-hidden mobile:hidden w-full transition-all duration-500`}
        >
          <div className="absolute py-6 flex flex-col justify-between items-center inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div />
            <div className="relative w-full center">
              <BluxProvider
                config={{
                  appearance,
                  isPersistent: true,
                  appName: "Blux Demo",
                  loginMethods: loginMethods,
                  networks: [networks.testnet, networks.mainnet],
                }}
              >
                <OpenModal />
              </BluxProvider>
            </div>
            <div>
              <button
                aria-label="reset"
                type="button"
                onClick={resetAppearance}
                className="inline-flex bg-white mobile:hidden font-manrope-medium gap-2 justify-center items-center text-primary border-[#CDCEEE] border h-12 w-[120px]"
              >
                <img src={redo} alt="redo" width={20} height={20} />
                Reset
              </button>
            </div>
          </div>
        </div>
        <div
          className={`h-full fixed !w-[470px] border-l p-4 border-lightPurple transition-all duration-500 mobile:hidden tablet:hidden ${isCodeOpen
              ? "right-0 opacity-100 !bg-white"
              : "right-[-470px] opacity-0"
            }`}
        >
          <div className="border border-lightPurple">
            <Highlight language="tsx" code={codeBlock} theme={themes.vsLight}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} p-4 text-sm font-mono leading-relaxed overflow-auto h-[calc(100dvh-100px)]`}
                  style={{
                    ...style,
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
                        className="flex-shrink-0 w-8 pr-4 text-right text-gray-500 select-none"
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
