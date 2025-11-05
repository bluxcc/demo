import React, { useState } from 'react';

// import settings from "/images/settings.svg";

type Tab = {
  label: string;
  activeImg: JSX.Element;
  inActiveImg: JSX.Element;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(1);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  return (
    <div className="flex h-full">
      <div className="flex !w-[81px] font-manrope-medium pt-4 pb-[17px] border-r border-lightPurple dark:border-darkBorder justify-center items-start text-primary dark:bg-darkBg dark:text-white">
        <div
          className="flex flex-col items-center"
          role="tablist"
          aria-label="Tabs"
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            const isHovered = hoveredTab === index;

            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-label={tab.label}
                aria-selected={activeTab === index}
                tabIndex={activeTab === index ? 0 : -1}
                onClick={() => setActiveTab(index)}
                className="py-2 px-4 flex flex-col gap-1 items-center font-normal text-[13px]"
              >
                <div
                  className="relative w-16 h-8 center"
                  onMouseEnter={() => setHoveredTab(index)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-colors duration-300
                      ${
                        isActive
                          ? 'bg-[#FFCDCD] dark:bg-primary'
                          : isHovered
                            ? 'bg-[#E4E4E4] dark:bg-darkGray'
                            : 'bg-transparent'
                      }
                    `}
                  />
                  <div className="relative z-10 w-6 h-6 transition-all duration-150">
                    {isActive || isHovered ? tab.activeImg : tab.inActiveImg}
                  </div>
                </div>

                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="w-[294px] mobile:w-full text-primary p-4 mobile:border-r-hidden border-r border-lightPurple dark:border-darkBorder overflow-y-auto dark:bg-darkBg dark:text-white"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
