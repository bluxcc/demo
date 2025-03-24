import logo from "/images/logo.svg";
// import barChart from "/images/barChart.svg";

type HeaderProps = {
  onOpenCode: () => void;
};

const Header = ({ onOpenCode }: HeaderProps) => {
  return (
    <div className="w-full h-[72px] desktop:border-b border-b border-b-lightPurple between px-4 font-jetbrains">
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div className="inline-flex gap-2">
        {/* <button className="center border border-primary w-10 h-10">
          <img src={barChart} alt="barChart" />
        </button> */}
        <button
          className="bg-primary w-[120px] h-10 text-white desktop:block hidden"
          onClick={onOpenCode}
        >
          Code
        </button>
      </div>
    </div>
  );
};

export default Header;
