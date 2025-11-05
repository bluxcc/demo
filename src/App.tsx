import { useEffect, useState } from 'react';
import { BluxProvider, networks, useBlux } from '@bluxcc/react';
import { Highlight, themes } from 'prism-react-renderer';

import reset from '/images/reset.svg';
import swap from '/images/swap.svg';
import { corners, WC_URI } from './constants';
import Header from './components/Header';
import OpenModal from './containers/OpenModal';
import TabsContainer from './containers/tabsContainer';
import { generateCodeBlock } from './utils/generateCodeBlock';
import { useConfigContext } from './hooks/useConfigContext';
import { defaultDarkTheme, defaultLightTheme } from './constants/themes';

import './style/index.css';
import { generateRandomTheme } from './utils/randomTheme';
import { useIsMobile } from './hooks/useIsMobile';
import { useCornerResize } from './hooks/useCornerResize';
import { Loading } from './assets/Loading';
import { Reset, Swap } from './assets/Icons';

function App() {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const handleOpenCode = () => setIsCodeOpen(!isCodeOpen);
  const {
    appearance,
    resetAppearance,
    setAppearance,
    setTheme,
    loginMethods,
    theme,
    height,
  } = useConfigContext();
  const { isReady } = useBlux();

  const handleCloseCode = () => setIsCodeOpen(false);
  const isMobile = useIsMobile(770);

  useEffect(() => {
    setAppearance(
      theme === 'light'
        ? defaultLightTheme
        : theme === 'dark'
          ? defaultDarkTheme
          : generateRandomTheme(),
    );
  }, [theme, trigger, setAppearance]);

  const handleSpin = (
    e: React.MouseEvent<HTMLButtonElement>,
    duration = 500,
  ) => {
    const img = e.currentTarget.querySelector('img');
    if (!img) return;

    img.classList.add('animate-spin');
    setTimeout(() => img.classList.remove('animate-spin'), duration);
  };

  const codeBlock = generateCodeBlock(appearance, loginMethods);
  const { radius, handleMouseDown } = useCornerResize(12, 4, 60);

  useEffect(() => {
    setAppearance((prev) => ({
      ...prev,
      outlineRadius: `${radius}px`,
    }));
  }, [radius, setAppearance]);

  const bluxConfig = {
    appearance,
    appName: 'Blux Demo',
    loginMethods: loginMethods,
    networks: [networks.mainnet],
    promptOnWrongNetwork: false,
    walletConnect: {
      url: WC_URI,
      description: 'Blux',
      icons: ['/images/blux.svg'],
      projectId: import.meta.env.VITE_WC_ID,
    },
  };

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
            <BluxProvider config={bluxConfig}>
              {isReady ? (
                <OpenModal />
              ) : (
                <div className="flex items-center justify-center">
                  <Loading />
                </div>
              )}
            </BluxProvider>
          )}
        </div>
        <div
          className={`${
            isCodeOpen && 'desktop:mr-[470px]'
          } relative h-full overflow-hidden mobile:hidden w-full transition-all duration-500`}
        >
          <div
            style={{
              backgroundImage: `radial-gradient(${theme === 'dark' ? '#333333' : '#e5e7eb'} 1px,transparent 1px)`,
            }}
            className="absolute py-6 flex flex-col justify-between items-center inset-0 h-full w-full bg-white dark:bg-darkGray dark:text-white [background-size:16px_16px]"
          >
            <div />
            <div className="relative w-full center">
              <BluxProvider config={{ ...bluxConfig, isPersistent: true }}>
                {isReady ? (
                  <>
                    <OpenModal />
                    <div
                      className="relative transition-[height] duration-300"
                      style={{
                        height: `${height + 40}px`,
                        width: '400px',
                      }}
                    >
                      {corners.map(({ pos, classes }) => (
                        <div
                          key={pos}
                          onMouseDown={(e) => handleMouseDown(pos, e)}
                          className={`absolute size-10 select-none  z-[9999999] ${classes}`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center">
                    <Loading />
                  </div>
                )}
              </BluxProvider>
            </div>
            <div className="space-x-2">
              <button
                aria-label="reset"
                type="button"
                onClick={() => {
                  resetAppearance();
                }}
                className="inline-flex text-sm bg-white dark:bg-darkBg dark:border-darkBorder dark:text-white mobile:hidden font-manrope-medium gap-2 justify-center items-center text-primary border-[#CDCEEE] hover:border-primary transition-all duration-300 border h-12 pl-2 pr-4"
              >
                <Reset fill={theme === 'dark' ? 'white' : '#0C1083'} /> Reset
              </button>

              <button
                aria-label="randomize"
                type="button"
                onClick={(e) => {
                  handleSpin(e);
                  if (theme === 'random') setTrigger((t) => t + 1);
                  else setTheme('random');
                }}
                className="inline-flex text-sm bg-white dark:bg-darkBg dark:border-darkBorder dark:text-white mobile:hidden font-manrope-medium gap-2 justify-center items-center text-primary border-[#CDCEEE] hover:border-primary transition-all duration-300 border h-12 pl-2 pr-4"
              >
                <Swap fill={theme === 'dark' ? 'white' : '#0C1083'} /> Randomize
              </button>
            </div>
          </div>
        </div>
        <div
          className={`h-full fixed !w-[470px] dark:bg-darkBg dark:text-white bg-white border-l p-4 border-lightPurple dark:border-darkBorder transition-all duration-500 mobile:hidden tablet:hidden ${
            isCodeOpen ? 'right-0 opacity-100 ' : 'right-[-470px] opacity-0'
          }`}
        >
          <div className="border border-lightPurple dark:border-darkBorder">
            <Highlight
              language="tsx"
              code={codeBlock}
              theme={theme === 'dark' ? themes.vsDark : themes.vsLight}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} p-4 text-sm font-mono leading-relaxed overflow-auto h-[calc(100dvh-100px)]`}
                  style={{
                    ...style,
                    whiteSpace: 'pre-wrap',
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
                        style={{ minWidth: '2rem' }}
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
