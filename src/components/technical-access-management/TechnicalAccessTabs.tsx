import React from 'react';

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

export default function TechnicalAccessTabs({ tabs, activeTab, onTabChange }: Props) {
  return (
    <div className="flex items-center gap-6 border-b border-zinc-200 px-2 mt-3 overflow-x-auto custom-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange?.(tab)}
            className={`whitespace-nowrap pb-2 text-[12px] transition-colors border-b-2 ${
              isActive
                ? "font-bold text-blue-700 border-blue-700"
                : "font-semibold text-zinc-500 hover:text-zinc-700 border-transparent"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
