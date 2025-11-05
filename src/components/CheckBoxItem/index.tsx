import React from 'react';
import CheckBox from '../CheckBox';

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
      onClick={toggleChecked}
      id="bluxcc-button"
      className="flex items-center justify-between w-full h-12 p-3 border border-lightPurple dark:border-darkBorder"
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
