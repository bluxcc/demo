import React, { useState } from "react";

import dragHandle from "/images/dragHandle.svg";
import whiteCheck from "/images/whiteCheck.svg";

type CheckBoxItemProps = {
  startIcon?: React.ReactNode;
  title: string;
  draggable?: boolean;
  initialChecked?: boolean;
  onChange?: (title: string, checked: boolean) => void;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, title: string) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
};

const CheckBoxItem = ({
  startIcon,
  title,
  draggable,
  initialChecked = false,
  onChange,
  onDragStart,
  onDragOver,
  onDrop,
}: CheckBoxItemProps) => {
  const [checked, setChecked] = useState(initialChecked);

  const toggleChecked = () => {
    setChecked((prev) => {
      const newState = !prev;
      onChange?.(title, newState);
      return newState;
    });
  };

  return (
    <div
      className="flex w-full justify-between items-center border border-lightPurple p-3 h-12 cursor-pointer"
      draggable={draggable}
      onDragStart={(e) => draggable && onDragStart?.(e, title)}
      onDragOver={(e) => draggable && onDragOver?.(e)}
      onDrop={(e) => draggable && onDrop?.(e)}
    >
      <div className="flex items-center text-sm font-manrope font-medium">
        {startIcon && <div className="mr-2">{startIcon}</div>}
        {draggable && (
          <img
            className="mr-2 cursor-grab active:cursor-grabbing"
            src={dragHandle}
            alt="Draggable"
            draggable="true"
            onDragStart={(e) => onDragStart?.(e, title)}
          />
        )}
        {title}
      </div>

      {/* Custom checkbox */}
      <input type="checkbox" className="hidden" checked={checked} readOnly />

      <div
        onClick={toggleChecked}
        className={`flex size-5 border-2 border-primary items-center justify-center cursor-pointer transition duration-100 ease-in-out transform ${
          checked ? "bg-primary" : "bg-transparent"
        }`}
      >
        {checked && <img src={whiteCheck} alt="check" />}
      </div>
    </div>
  );
};

export default CheckBoxItem;
