import { useState, useRef, useLayoutEffect } from 'react';
import { Minus, Plus } from '../../assets/Icons';
import { useConfigContext } from '../../hooks/useConfigContext';

type ToggleCollapseProps = {
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const ToggleCollapse = ({
  title,
  children,
  defaultOpen = true,
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
        className={`flex items-center justify-between`}
        onClick={handleCollapse}
        id="bluxcc-button"
      >
        <p className="text-sm font-manrope-medium">{title}</p>
        <div className="relative w-4 h-4">
          <div
            className={`absolute top-0 left-0 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Minus fill={theme === 'dark' ? 'white' : '#0C1083'} />
          </div>
          <div
            className={`absolute top-0 left-0 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Plus fill={theme === 'dark' ? 'white' : '#0C1083'} />
          </div>
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
