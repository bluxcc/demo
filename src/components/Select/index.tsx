import { ReactNode } from "react";

type OptionItemProps = {
  type: "select" | "input" | "colorPicker";
  name: string;
  onClick?: () => void;
  children?: ReactNode;
  startItem: ReactNode;
  value?: string;
};

const OptionItem = ({
  name,
  onClick,
  children,
  startItem,
  value,
  type,
}: OptionItemProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      <p className="capitalize text-xs text-[#0C1083B2]">{name}</p>
      <div
        className="flex items-center justify-between border border-lightPurple w-full h-9 p-2 max-w-[138px] cursor-pointer relative"
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <div className="!size-5"> {startItem}</div>
          {type !== "input" && (
            <span className={`text-sm font-manrope`}>{value}</span>
          )}
          {children}
        </div>
        {type !== "input" ? (
          <img
            src="/images/dropDown.svg"
            width={16}
            height={16}
            alt="dropdown icon"
          />
        ) : null}
      </div>
    </div>
  );
};

export default OptionItem;
