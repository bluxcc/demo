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
    <div className="w-full h-[72px] desktop:border-b border-b border-b-lightPurple between px-4 font-jetbrains">
      <div className="center">
        <img src={logo} alt="Logo" />
      </div>
      <div className="font-manrope desktop:flex hidden w-[37%] transition-[width] duration-700 justify-end">
        {isCodeOpen ? (
          <div className="w-full flex border-l pl-4 border-l-lightPurple items-center justify-between overflow-hidden">
            <button
              className="bg-[#E6E6E6] center size-12"
              onClick={handleCloseCode}
            >
              <img src={close} alt="close" />
            </button>
            <button
              className="bg-[#E6E6E6] center gap-1 text-primary w-[140px] h-12"
              onClick={handleCopyCode}
            >
              copy all code <img src={copy} alt="copy" />
            </button>
          </div>
        ) : (
          <div className="center">
            <button
              className="bg-primary w-[136px] h-12 text-white center gap-2"
              onClick={onOpenCode}
            >
              <img src={code} alt="code" />
              Get Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
