import { useEffect, useRef, useState } from 'react';
import { BluxProvider, networks, useBlux } from '@bluxcc/react';
import { Highlight, themes } from 'prism-react-renderer';

import { centers, corners, WC_URI } from './constants';
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
import { Reset, Share, Swap } from './assets/Icons';
import { useOutlineResize } from './hooks/useOutlineResize';
import { handleSpin } from './utils/handleSpinSvg';
import { animateResetIcon, animateShareIcon } from './utils/animateActionIcon';

function App() {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [isShareConfirmationVisible, setIsShareConfirmationVisible] =
    useState(false);
  const shareConfirmationTimeout = useRef<number | null>(null);
  const handleOpenCode = () => setIsCodeOpen(!isCodeOpen);
  const {
    appearance,
    resetAppearance,
    setAppearance,
    loginMethods,
    theme,
    height,
    language,
    explorer,
    excludeWallets,
    orderWallets,
    promptOnWrongNetwork,
    shareUrl,
  } = useConfigContext();
  const { isReady } = useBlux();
  const isInitialThemeRender = useRef(true);

  const handleCloseCode = () => setIsCodeOpen(false);
  const isMobile = useIsMobile(770);

  useEffect(() => {
    if (isInitialThemeRender.current) {
      isInitialThemeRender.current = false;
      return;
    }

    setAppearance((prev) => ({
      ...prev,
      ...(theme === 'light' ? defaultLightTheme : defaultDarkTheme),
      logo: prev.logo,
    }));
  }, [theme, setAppearance]);

  const handleRandomize = () => {
    setAppearance(
      theme === 'dark'
        ? {
            ...defaultDarkTheme,
            ...generateRandomTheme(appearance.logo, 'dark'),
          }
        : {
            ...defaultLightTheme,
            ...generateRandomTheme(appearance.logo, 'light'),
          },
    );
  };

  const handleShare = async (event: React.MouseEvent<HTMLButtonElement>) => {
    animateShareIcon(event.currentTarget);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsShareConfirmationVisible(true);

      if (shareConfirmationTimeout.current) {
        window.clearTimeout(shareConfirmationTimeout.current);
      }
      shareConfirmationTimeout.current = window.setTimeout(() => {
        setIsShareConfirmationVisible(false);
      }, 2500);
    } catch (error) {
      console.error('Failed to copy share link:', error);
    }
  };

  useEffect(
    () => () => {
      if (shareConfirmationTimeout.current) {
        window.clearTimeout(shareConfirmationTimeout.current);
      }
    },
    [],
  );

  const codeBlock = generateCodeBlock(appearance, loginMethods, {
    language,
    explorer,
    excludeWallets,
    orderWallets,
    promptOnWrongNetwork,
  });
  const { radius, handleResizeRadius } = useCornerResize(32, 0, 40);
  const { width, handleResizeOutlineWidth } = useOutlineResize(
    Number.parseFloat(appearance.outlineWidth ?? '1'),
    0,
    6,
  );

  useEffect(() => {
    setAppearance((prev) => ({
      ...prev,
      outlineRadius: `${radius}px`,
      outlineWidth: `${width}px`,
    }));
  }, [radius, width, setAppearance]);

  const bluxConfig = {
    appearance,
    defaultNetwork: networks.mainnet,
    appId: import.meta.env.VITE_BLUX_APP_ID,
    appName: 'Blux Demo',
    loginMethods: loginMethods,
    networks: [networks.mainnet],
    lang: language,
    explorer,
    excludeWallets,
    orderWallets,
    promptOnWrongNetwork,
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
          } relative h-full overflow-hidden mobile:hidden w-full transition-[margin] duration-[600ms] ease-in-out`}
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
                      aria-hidden={height === 0}
                      className={`pointer-events-none relative z-[10000000] transition-[height,opacity] duration-300 ${
                        height === 0 ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{
                        height: `${height + 40}px`,
                        width: '400px',
                      }}
                    >
                      {corners.map(({ pos, classes }) => (
                        <div
                          key={pos}
                          onMouseDown={(e) => handleResizeRadius(pos, e)}
                          className={`pointer-events-auto absolute h-14 w-9 select-none ${classes}`}
                        />
                      ))}
                      {centers.map(({ pos, classes }) => (
                        <div
                          key={pos}
                          onMouseDown={(e) => handleResizeOutlineWidth(pos, e)}
                          className={`pointer-events-auto absolute h-7 w-[200px] select-none ${classes}`}
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
            <div className="relative flex gap-2">
              {isShareConfirmationVisible && (
                <div
                  role="status"
                  aria-live="polite"
                  className="absolute px-3 py-2 text-xs -translate-x-1/2 bg-white border shadow-sm bottom-14 left-1/2 whitespace-nowrap border-lightPurple font-manrope-medium text-primary dark:border-darkBorder dark:bg-darkBg dark:text-white"
                >
                  Custom Blux configuration link — copied to your clipboard
                </div>
              )}

              <button
                aria-label="reset"
                type="button"
                onClick={(event) => {
                  animateResetIcon(event.currentTarget);
                  resetAppearance();
                }}
                className="inline-flex text-sm bg-white dark:bg-darkBg dark:border-darkBorder dark:text-white mobile:hidden font-manrope-medium gap-2 justify-center items-center text-primary border-[#CDCEEE] hover:border-primary transition-all duration-300 border h-12 pl-2 pr-4"
              >
                <div>
                  <Reset fill={theme === 'dark' ? 'white' : '#0C1083'} />
                </div>
                Reset
              </button>

              <button
                aria-label="randomize"
                type="button"
                onClick={(e) => {
                  handleSpin(e, { rotate: 180 });
                  handleRandomize();
                }}
                className="inline-flex text-sm bg-white dark:bg-darkBg dark:border-darkBorder dark:text-white mobile:hidden font-manrope-medium gap-2 justify-center items-center text-primary border-[#CDCEEE] hover:border-primary transition-all duration-300 border h-12 pl-2 pr-4"
              >
                <Swap fill={theme === 'dark' ? 'white' : '#0C1083'} /> Randomize
              </button>

              <button
                aria-label="share customization"
                type="button"
                onClick={handleShare}
                className="inline-flex h-12 items-center justify-center gap-2 border border-[#CDCEEE] bg-white pl-2 pr-4 text-sm text-primary transition-all duration-300 hover:border-primary mobile:hidden font-manrope-medium dark:border-darkBorder dark:bg-darkBg dark:text-white"
              >
                <Share fill={theme === 'dark' ? 'white' : '#0C1083'} /> Share
              </button>
            </div>
          </div>
        </div>
        <div
          className={`h-full fixed !w-[470px] ${
            theme === 'dark'
              ? 'bg-darkBg text-white border-darkBorder'
              : 'bg-white text-black border-lightPurple'
          } right-0 border-l p-4 transition-transform duration-[600ms] ease-in-out mobile:hidden tablet:hidden ${
            isCodeOpen ? 'translate-x-0' : 'translate-x-full'
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
