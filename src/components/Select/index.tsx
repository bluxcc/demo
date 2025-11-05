import { ReactNode, useEffect, useRef, useState } from 'react';
import { DropDown } from '../../assets/Icons';
import { useConfigContext } from '../../hooks/useConfigContext';

type SelectProps = {
  name: string;
  startItem: ReactNode;
  values: {
    name: string;
    value: string;
  }[];
  defaultValue?: { name: string; value: string };
  onChange?: (selected: { name: string; value: string }) => void;
};

const fontClasses: Record<string, string> = {
  ComicNeue: 'font-comicNeue',
  JetbrainsMono: 'font-jetbrainsMono',
  Playfair: 'font-playfair',
  Manrope: 'font-manrope',
};

const Select = ({
  name,
  startItem,
  values,
  onChange,
  defaultValue,
}: SelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selected, setSelected] = useState(
    () => values.find((v) => v.value === defaultValue?.value) || values[0],
  );

  const { theme } = useConfigContext();

  useEffect(() => {
    if (defaultValue && defaultValue.value !== selected.value) {
      const newSelected = values.find((v) => v.value === defaultValue.value);
      if (newSelected) setSelected(newSelected);
    }
  }, [defaultValue, values, selected]);

  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: { name: string; value: string }) => {
    setSelected(option);
    setIsSelectOpen(false);
    onChange?.(option);
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
        className="flex items-center justify-between border border-lightPurple dark:border-darkBorder w-full h-9 p-2 max-w-[138px] relative"
        onClick={() => setIsSelectOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <div className="!size-5">{startItem}</div>
          <span
            className={`text-sm font-medium ${
              name === 'Font'
                ? `${fontClasses[selected.value]}`
                : 'font-manrope-medium'
            }`}
          >
            {selected.name}
          </span>
        </div>

        <DropDown fill={theme === 'dark' ? 'white' : '#CDCEEE'} />

        {isSelectOpen && (
          <div className="absolute top-10 left-[-1px] right-[-1px] w-[calc(100%+2px)] z-10 bg-white dark:bg-darkBg dark:text-white border border-lightPurple dark:border-darkBorder">
            {values.map((item, idx) => {
              const isSelected = selected.value === item.value;
              return (
                <div
                  key={idx}
                  className="group w-full h-7 flex items-center justify-start gap-2 px-2 py-1 hover:bg-[#E6E6E6]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item);
                  }}
                >
                  <div className="flex items-center justify-center size-5">
                    {(isSelected || isSelectOpen) && (
                      <img
                        src="/images/blueCheck.svg"
                        alt="check"
                        height={20}
                        width={20}
                        className={`transition-opacity duration-150 ${
                          isSelected ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      name === 'Font' ? fontClasses[item.value] : 'font-manrope'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;

{
  /* <Select
            name="outline width"
            values={[
              { name: '1px', value: '1px' },
              { name: '1.5px', value: '1.5px' },
              { name: '2px', value: '2px' },
            ]}
            defaultValue={{
              name: appearance.outlineWidth || '1px',
              value: appearance.outlineWidth.toLowerCase() || '1px',
            }}
            onChange={(item) => {
              updateAppearance('outlineWidth', item.value);
            }}
            startItem={
            }
          /> */
}
