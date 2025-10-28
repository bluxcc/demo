import React, { useState } from 'react';

interface InputProps {
  label: string;
  value: number;
  maxValue?: number;
  minValue?: number;
  defaultValue: number;
  onChange: (item: number) => void;
  startIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  minValue = 0,
  maxValue,
  defaultValue,
  onChange,
  startIcon,
}) => {
  const [internalValue, setInternalValue] = useState<number>(
    defaultValue ?? minValue,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(e.target.value);

    // enforce limits manually
    if (newValue < minValue) newValue = minValue;
    if (maxValue !== undefined && newValue > maxValue) newValue = maxValue;

    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="capitalize text-xs text-[#0C1083B2]">{label}</div>
      <div className="border border-lightPurple w-full h-9 p-2 max-w-[138px] flex items-center gap-1 font-manrope-medium text-sm">
        {startIcon && (
          <div className="flex-shrink-0 w-5 h-5 mr-1">{startIcon}</div>
        )}
        <input
          autoComplete="off"
          min={minValue}
          max={maxValue}
          type="number"
          value={value ?? internalValue}
          placeholder={defaultValue?.toString()}
          className="flex-1 mr-1 font-medium bg-transparent border-none outline-none w-[40%] placeholder:text-primary text-primary"
          onChange={handleChange}
        />
        <div className="flex-shrink-0">px</div>
      </div>
    </div>
  );
};

export default Input;
