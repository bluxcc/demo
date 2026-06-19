import { ReactNode, useEffect, useRef, useState } from 'react';
import { DropDown } from '../../assets/Icons';
import { useConfigContext } from '../../hooks/useConfigContext';

type Option = {
  name: string;
  value: string;
};

type MultiSelectProps = {
  name: string;
  startItem?: ReactNode;
  values: Option[];
  selected: string[];
  placeholder?: string;
  // When true, shows the selection order next to each picked item.
  showOrder?: boolean;
  onChange: (selected: string[]) => void;
};

const MultiSelect = ({
  name,
  startItem,
  values,
  selected,
  placeholder = 'None',
  showOrder,
  onChange,
}: MultiSelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { theme } = useConfigContext();
  const ref = useRef<HTMLDivElement>(null);

  const toggleValue = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      // Append so the array keeps the order items were picked in.
      onChange([...selected, value]);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsSelectOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const label =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? (values.find((v) => v.value === selected[0])?.name ?? placeholder)
        : `${selected.length} selected`;

  return (
    <div
      ref={ref}
      className="flex items-center justify-between w-full select-none"
    >
      <p className="capitalize text-xs text-[#0C1083B2] dark:text-white/70">
        {name}
      </p>

      <div
        id="bluxcc-button"
        className="flex items-center justify-between border border-lightPurple dark:border-darkBorder w-full h-9 p-2 max-w-[138px] relative cursor-pointer"
        onClick={() => setIsSelectOpen((prev) => !prev)}
      >
        <div className="flex items-center min-w-0 gap-2">
          {startItem && <div className="!size-5">{startItem}</div>}
          <span className="text-sm font-medium truncate font-manrope-medium">
            {label}
          </span>
        </div>

        <DropDown fill={theme === 'dark' ? 'white' : '#CDCEEE'} />

        {isSelectOpen && (
          <div className="absolute top-10 left-[-1px] right-[-1px] w-[calc(100%+2px)] z-10 max-h-[180px] overflow-y-auto bg-white dark:bg-darkBg dark:text-white border border-lightPurple dark:border-darkBorder">
            {values.map((item, idx) => {
              const isSelected = selected.includes(item.value);
              const order = selected.indexOf(item.value);
              return (
                <div
                  key={idx}
                  className="group w-full h-7 flex items-center justify-start gap-2 px-2 py-1 hover:bg-[#E6E6E6]"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleValue(item.value);
                  }}
                >
                  <div className="flex items-center justify-center size-5">
                    <img
                      src="/images/blueCheck.svg"
                      alt="check"
                      height={20}
                      width={20}
                      className={`transition-opacity duration-150 ${
                        isSelected ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                  <span className="text-sm font-manrope">{item.name}</span>
                  {showOrder && isSelected && (
                    <span className="ml-auto text-xs text-[#0C1083B2] dark:text-white/50">
                      {order + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
