import { useState, useRef, useLayoutEffect } from 'react';
import { InfoIcon, Minus, Plus } from '../../assets/Icons';
import { useConfigContext } from '../../hooks/useConfigContext';

type ToggleCollapseProps = {
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  info?: string;
};

const ToggleCollapse = ({
  title,
  children,
  defaultOpen = true,
  info,
}: ToggleCollapseProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const { theme } = useConfigContext();

  const handleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className="w-full select-none">
      <div
        className="flex items-center justify-between"
        onClick={handleCollapse}
        id="bluxcc-button"
      >
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-manrope-medium">{title}</p>

          {info && (
            <div className="relative flex items-center group">
              <InfoIcon fill={theme === 'dark' ? 'white' : '#0C1083'} />

              <div
                className="
            pointer-events-none
            absolute left-[16px] top-full z-50 mt-2
            w-[220px]
            -translate-x-[100px]
            rounded-md
            border border-lightPurple dark:border-darkBorder
            bg-white dark:bg-darkGray
            px-3 py-2
            text-xs
            leading-relaxed
            text-[#4D4D4D] dark:text-white
            opacity-0
            shadow-sm
            transition-opacity
            duration-150
            group-hover:opacity-100
          "
              >
                {info}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center">
          {isOpen ? (
            <Minus fill={theme === 'dark' ? 'white' : '#0C1083'} />
          ) : (
            <Plus fill={theme === 'dark' ? 'white' : '#0C1083'} />
          )}
        </div>
      </div>

      <div
        ref={contentRef}
        className={`w-full transition-all duration-500 ease-in-out overflow-hidden`}
        style={{
          maxHeight: isOpen ? `${height}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ToggleCollapse;
