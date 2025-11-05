import { useState } from 'react';
import Logo from '../../assets/Logo';
import { useConfigContext } from '../../hooks/useConfigContext';
import { Close, Code, Copy } from '../../assets/Icons';

type HeaderProps = {
  onOpenCode: () => void;
  isCodeOpen: boolean;
  codeBlock: string;
  handleCloseCode: () => void;
};

const Header = ({
  onOpenCode,
  isCodeOpen,
  codeBlock,
  handleCloseCode,
}: HeaderProps) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useConfigContext();

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(codeBlock)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((error) => console.error('Failed to copy code:', error));
  };

  return (
    <div className="w-full h-[72px] desktop:border-b border-b border-b-lightPurple dark:border-b-darkBorder between font-jetbrainsMono dark:bg-darkBg dark:text-white">
      <div className="pl-4 center">
        <a
          href="https://blux.cc"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Blux website (opens in a new tab)"
        >
          <Logo fill={theme === 'dark' ? 'white' : '#0D1292'} />
        </a>
      </div>

      <div className="relative hidden font-manrope desktop:flex">
        <div className="relative w-[470px] overflow-hidden">
          <div
            className={`flex w-full px-4 items-center justify-between border-l border-l-lightPurple dark:border-l-darkBorder absolute top-0 right-0 transition-transform duration-500 ${
              isCodeOpen
                ? 'translate-x-0 opacity-100 h-full'
                : 'translate-x-full opacity-0'
            }`}
          >
            <button
              type="button"
              aria-label="close"
              className="bg-[#E6E6E6] dark:bg-darkFieldGray dark:text-white center size-12"
              onClick={handleCloseCode}
            >
              <Close fill={theme === 'dark' ? 'white' : '#090B5D'} />
            </button>
            <button
              type="button"
              aria-label="copy code"
              className="bg-[#E6E6E6] dark:bg-darkFieldGray dark:text-white center text-primary w-[140px] h-12 font-manrope-medium"
              onClick={handleCopyCode}
            >
              {copied ? (
                'Copied!'
              ) : (
                <span className="flex gap-1 whitespace-nowrap">
                  Copy Code{' '}
                  <Copy fill={theme === 'dark' ? 'white' : '#0C1083'} />
                </span>
              )}
            </button>
          </div>

          {/* When code panel is closed */}
          <div
            className={`absolute top-0 right-4 flex items-center justify-end h-full w-full gap-3 transition-transform duration-500 ease-in-out ${
              isCodeOpen
                ? 'translate-x-full opacity-0'
                : 'translate-x-0 opacity-100'
            }`}
          >
            {/* Docs Button */}
            <a
              aria-label="docs"
              className="hover:bg-[#F2F2F2] dark:text-white dark:hover:bg-darkFieldGray transition-all duration-500 px-4 h-12 text-primary center gap-2 font-manrope-medium"
              href="https://docs.blux.cc/"
              target="_blank"
            >
              Documentation
            </a>

            {/* Live Code Button */}
            <button
              type="button"
              aria-label="live code"
              className="bg-primary w-[136px] dark:bg-darkFieldGray hover:bg-primaryDark transition-all duration-500 h-12 text-white center gap-2 font-manrope-medium"
              onClick={onOpenCode}
            >
              <Code /> Live Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
