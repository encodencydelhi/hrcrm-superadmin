import React from 'react';
import { ChevronRight, Download, Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';

interface SettingsSplitLayoutProps {
  pageTitle: string;
  pageSubtitle: string;
  breadcrumbSteps: string[];
  formTitle: string;
  formSubtitle: string;
  listTitle: string;
  listSubtitle: string;
  onExport?: () => void;
  onAddNew?: () => void;
  children: [React.ReactNode, React.ReactNode]; // [FormContent, ListContent]
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
}

export function SettingsSplitLayout({
  pageTitle,
  pageSubtitle,
  breadcrumbSteps,
  formTitle,
  formSubtitle,
  listTitle,
  listSubtitle,
  onExport,
  onAddNew,
  children,
  searchTerm,
  onSearchChange,
}: SettingsSplitLayoutProps) {
  const [formContent, listContent] = children;

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-4 space-y-2 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 mb-0.5">
        {breadcrumbSteps.map((step, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight size={12} />}
            <span className={idx === breadcrumbSteps.length - 1 ? "text-zinc-700 font-medium" : "hover:text-indigo-700 cursor-pointer"}>
              {step}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Header section */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 leading-tight">{pageTitle}</h1>
          <p className="text-[13px] text-zinc-500 mt-0.5">{pageSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          {onExport && (
            <button
              onClick={onExport}
              className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2 text-[12.5px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors"
            >
              <Download size={14} /> Export
            </button>
          )}
          {onAddNew && (
            <button
              onClick={onAddNew}
              className="flex items-center gap-1.5 rounded-md bg-[#0f172a] px-4 py-2 text-[12.5px] font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
            >
              <Plus size={14} /> Add New {pageTitle.replace(' Management', '')}
            </button>
          )}
        </div>
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-2 items-start">
        {/* Left Form Panel */}
        <div className="bg-white rounded-sm border border-zinc-200/80 shadow-sm p-3 h-full flex flex-col">
          <div className="mb-2">
            <h2 className="text-sm font-bold text-zinc-900">{formTitle}</h2>
            <p className="text-[11px] text-zinc-500">{formSubtitle}</p>
          </div>
          <div className="flex-1">
            {formContent}
          </div>
        </div>

        {/* Right List Panel */}
        <div className="bg-white rounded-sm border border-zinc-200/80 shadow-sm p-3 h-full flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <h2 className="text-sm font-bold text-zinc-900">{listTitle}</h2>
              <p className="text-[11px] text-zinc-500">{listSubtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm || ''}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="h-8 w-48 rounded-lg border border-zinc-200 bg-white pl-8 pr-3 text-[12px] text-zinc-700 placeholder:text-zinc-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <button className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-[12px] font-medium text-zinc-600 hover:bg-zinc-50">
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>
          <div className="flex-1">
            {listContent}
          </div>
        </div>
      </div>
    </div>
  );
}


