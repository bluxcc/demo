import logo from "/images/logo.svg";
import close from "/images/close.svg";
import copy from "/images/copy.svg";
import code from "/images/code.svg";

type HeaderProps = {
  onOpenCode: () => void;
  isCodeOpen: boolean;
  handleCopyCode: () => void;
  handleCloseCode: () => void;
};

const Header = ({
  onOpenCode,
  isCodeOpen,
  handleCopyCode,
  handleCloseCode,
}: HeaderProps) => {
  return (
    <div className="w-full h-[72px] desktop:border-b border-b border-b-lightPurple between font-jetbrains">
      <div className="center pl-4">
        <img src={logo} alt="Logo" />
      </div>

      <div className="font-manrope desktop:flex hidden relative">
        {/* Container for smooth left-to-right animation */}
        <div className="relative w-[500px] overflow-hidden">
          {/* Code Open State */}
          <div
            className={`flex w-full px-4 items-center justify-between border-l border-l-lightPurple absolute top-0 left-0 transition-transform duration-500 ${
              isCodeOpen
                ? "translate-x-0 opacity-100 h-full"
                : "-translate-x-full opacity-0"
            }`}
          >
            <button
              className="bg-[#E6E6E6] center size-12 transition-all duration-500"
              onClick={handleCloseCode}
            >
              <img src={close} alt="close" />
            </button>
            <button
              className="bg-[#E6E6E6] center gap-1 text-primary w-[140px] h-12 transition-all duration-500 font-medium"
              onClick={handleCopyCode}
            >
              Copy Code <img src={copy} alt="copy" />
            </button>
          </div>

          {/* Get Code Button */}
          <div
            className={`absolute top-0 right-4 flex items-center justify-end transition-transform duration-500 h-full w-full ${
              isCodeOpen
                ? "translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <button
              className="bg-primary w-[136px] h-12 text-white center gap-2 transition-all duration-500 font-medium"
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
