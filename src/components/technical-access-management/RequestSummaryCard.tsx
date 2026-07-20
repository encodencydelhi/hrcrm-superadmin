import React from 'react';
import { FileText } from 'lucide-react';
import { RequestSummaryData } from './types';

interface Props {
  data: RequestSummaryData;
}

export default function RequestSummaryCard({ data }: Props) {
  // Use custom status color if provided, otherwise default to amber (Pending)
  const statusClasses = data.requestStatusColor 
    ? data.requestStatusColor
    : "text-amber-600 bg-amber-50 border-amber-100";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
      <div className="flex items-start gap-3 w-full lg:w-auto">
        <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100 shrink-0 mt-0.5">
          <FileText size={20} className="text-blue-600" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-zinc-500 font-medium">Request ID</span>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-bold text-zinc-900">{data.requestId}</h2>
            <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded ${statusClasses}`}>
              {data.requestStatus}
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">Requested on {data.requestedOn}</p>
        </div>
      </div>

      <div className="hidden lg:block w-px h-10 bg-zinc-200"></div>

      <div className="flex flex-col w-full lg:w-auto">
        <span className="text-[10px] text-zinc-500 font-medium mb-1">Company</span>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
            {data.companyInitial}
          </div>
          <span className="text-[12px] font-bold text-zinc-900">{data.companyName}</span>
        </div>
      </div>

      <div className="hidden lg:block w-px h-10 bg-zinc-200"></div>

      <div className="flex flex-col w-full lg:w-auto">
        <span className="text-[10px] text-zinc-500 font-medium mb-1">Requested By (Crewcam)</span>
        <div className="flex items-center gap-2">
          <img src={data.requestedByAvatar} alt={data.requestedByName} className="w-6 h-6 rounded-full border border-zinc-200 object-cover" />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-zinc-900">{data.requestedByName}</span>
            <span className="text-[9px] text-zinc-500">{data.requestedByRole}</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-px h-10 bg-zinc-200"></div>

      <div className="flex flex-col w-full lg:w-auto">
        <span className="text-[10px] text-zinc-500 font-medium mb-1">Purpose</span>
        <span className="text-[12px] font-bold text-zinc-900">{data.purposeTitle}</span>
        <span className="text-[10px] text-zinc-500">{data.purposeSubtitle}</span>
      </div>

      <div className="hidden lg:block w-px h-10 bg-zinc-200"></div>

      <div className="flex flex-col w-full lg:w-auto">
        <span className="text-[10px] text-zinc-500 font-medium mb-1">Access Type</span>
        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded w-fit mb-1">
          {data.accessType}
        </span>
        <span className="text-[9px] text-zinc-500">{data.accessDuration}</span>
      </div>
    </div>
  );
}
