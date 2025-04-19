import React from "react";
import CheckBox from "../CheckBox";

// import dragHandle from "/images/dragHandle.svg";

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
      <div className="flex items-center text-sm font-manrope-medium">
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
      <CheckBox
        checked={checked}
        onChange={toggleChecked}
        disabled={disabled}
      />
    </div>
  );
};

export default CheckBoxItem;
