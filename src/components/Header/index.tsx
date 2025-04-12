import logo from "/images/logo.svg";
import close from "/images/close.svg";
import copy from "/images/copy.svg";
import code from "/images/code.svg";
import { useState } from "react";

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
    <div className="w-full h-[72px] desktop:border-b border-b border-b-lightPurple between font-jetbrains">
      <div className="center pl-4">
        <a href="https://blux.cc" target="_blank">
          <img src={logo} alt="Logo" width="186" height="40" />
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
              <img src={close} alt="close" />
            </button>
            <button
              type="button"
              aria-label="copy code"
              className="bg-[#E6E6E6] center text-primary w-[140px] h-12 font-medium"
              onClick={handleCopyCode}
            >
              {copied ? (
                "Copied!"
              ) : (
                <span className="flex gap-1 whitespace-nowrap">
                  Copy Code <img src={copy} alt="copy" />
                </span>
              )}
            </button>
          </div>

          {/* Get Code Button */}
          <div
            className={`absolute top-0 right-4 flex items-center justify-end h-full w-full ${
              isCodeOpen
                ? "translate-x-full opacity-0"
                : "-translate-x-0 opacity-100"
            }`}
          >
            <button
              type="button"
              aria-label="get code"
              className="bg-primary w-[136px] h-12 text-white center gap-2 font-medium"
              onClick={onOpenCode}
            >
              <img src={code} alt="code" />
              Get Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
