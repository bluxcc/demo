import { useEffect } from 'react';
import Logo from '../../assets/Logo';
import { useConfigContext } from '../../hooks/useConfigContext';

const NotFound = () => {
  const { isDarkMode } = useConfigContext();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = '404 Not Found – Blux Demo';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-white dark:bg-darkBg dark:text-white">
      <div className="w-full h-[72px] border-b border-b-lightPurple dark:border-b-darkBorder between font-jetbrainsMono">
        <div className="pl-4 center">
          <a
            href="https://blux.cc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Blux website (opens in a new tab)"
          >
            <Logo fill={isDarkMode ? 'white' : '#0D1292'} />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 text-center">
        <p className="text-6xl font-jetbrainsMono text-primary dark:text-white">
          404
        </p>
        <h1 className="text-2xl font-manrope-medium text-primary dark:text-white">
          Not found
        </h1>
        <p className="max-w-md text-sm text-primary/70 font-manrope dark:text-white/70">
          This share link doesn't exist.
        </p>
        <a
          href="/"
          className="mt-2 inline-flex h-12 items-center justify-center border border-[#CDCEEE] bg-white px-5 text-sm text-primary transition-all duration-300 hover:border-primary font-manrope-medium dark:border-darkBorder dark:bg-darkFieldGray dark:text-white"
        >
          Back to demo
        </a>
      </div>
    </div>
  );
};

export default NotFound;
