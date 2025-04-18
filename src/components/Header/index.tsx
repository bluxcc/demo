import { useState } from "react";
import Logo from "../../assets/logo";

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

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(codeBlock)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Failed to copy code:", error);
      });
  };

  return (
    <div className="w-full h-[72px] desktop:border-b border-b border-b-lightPurple between font-jetbrainsMono">
      <div className="center pl-4">
        <a href="https://blux.cc" target="_blank">
          <Logo />
        </a>
      </div>

      <div className="font-manrope desktop:flex hidden relative">
        <div className="relative w-[500px] overflow-hidden">
          <div
            className={`flex w-full px-4 items-center justify-between border-l border-l-lightPurple absolute top-0 right-0 transition-transform duration-500 ${
              isCodeOpen
                ? "translate-x-0 opacity-100 h-full"
                : "translate-x-full opacity-0"
            }`}
          >
            <button
              type="button"
              aria-label="close"
              className="bg-[#E6E6E6] center size-12"
              onClick={handleCloseCode}
            >
              <img src="/images/close.svg" alt="close" />
            </button>
            <button
              type="button"
              aria-label="copy code"
              className="bg-[#E6E6E6] center text-primary w-[140px] h-12 font-manrope-medium"
              onClick={handleCopyCode}
            >
              {copied ? (
                "Copied!"
              ) : (
                <span className="flex gap-1 whitespace-nowrap">
                  Copy Code <img src="/images/copy.svg" alt="copy" />
                </span>
              )}
            </button>
          </div>

          {/* live Code Button */}
          <div
            className={`absolute top-0 right-4 flex items-center justify-end h-full w-full ${
              isCodeOpen
                ? "translate-x-full opacity-0"
                : "-translate-x-0 opacity-100"
            }`}
          >
            <button
              type="button"
              aria-label="live code"
              className="bg-primary w-[136px] h-12 text-white center gap-2 font-manrope-medium"
              onClick={onOpenCode}
            >
              <img src="/images/code.svg" alt="code" height={24} width={24} />
              Live Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
