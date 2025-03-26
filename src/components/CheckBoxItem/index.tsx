import React from "react";

// import dragHandle from "/images/dragHandle.svg";
import whiteCheck from "/images/whiteCheck.svg";

type CheckBoxItemProps = {
  title: string;
  checked: boolean;
  startIcon?: React.ReactNode;
  onChange: (title: string, checked: boolean) => void;
  disabled?: boolean;
  // draggable?: boolean;
};

const CheckBoxItem = ({
  startIcon,
  title,
  onChange,
  checked,
  disabled,
}: // draggable,
CheckBoxItemProps) => {
  const toggleChecked = () => {
    onChange(title, !checked);
  };

  return (
    <div
      className="flex w-full justify-between items-center border border-lightPurple p-3 h-12 cursor-pointer"
      // draggable={draggable}
    >
      <div className="flex items-center text-sm font-manrope font-medium">
        {startIcon && <div className="mr-2">{startIcon}</div>}
        {/* {draggable && (
          <img
            className="mr-2 cursor-grab active:cursor-grabbing"
            src={dragHandle}
            alt="Draggable"
            draggable="true"
          />
        )} */}
        {title}
      </div>

      {/* Custom checkbox */}
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={!disabled ? toggleChecked : undefined}
        disabled={disabled}
      />

      <div
        onClick={!disabled ? toggleChecked : undefined}
        className={`flex size-5 border-2 border-primary items-center justify-center cursor-pointer transition duration-100 ease-in-out transform ${
          checked ? "bg-primary" : "bg-transparent"
        }`}
      >
        {checked && (
          <img
            src={whiteCheck}
            alt="check"
            className="select-none"
            draggable="false"
          />
        )}
      </div>
    </div>
  );
};

export default CheckBoxItem;
