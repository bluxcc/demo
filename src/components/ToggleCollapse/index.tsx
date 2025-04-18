import { useState, useRef, useLayoutEffect } from "react";

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

  const handleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className="w-full select-none cursor-pointer">
      <div
        className={`flex items-center justify-between`}
        onClick={handleCollapse}
      >
        <p className="text-sm font-manrope-medium">{title}</p>
        <button className="relative w-4 h-4">
          <img
            src="/images/minus.svg"
            alt="Collapse"
            className={`absolute top-0 left-0 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          <img
            src="/images/plus.svg"
            alt="Expand"
            className={`absolute top-0 left-0 transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
        </button>
      </div>

      <div
        ref={contentRef}
        className={`w-full transition-all duration-500 ease-in-out overflow-hidden`}
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ToggleCollapse;
