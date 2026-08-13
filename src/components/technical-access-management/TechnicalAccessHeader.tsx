import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  buttons?: React.ReactNode;
}

export default function TechnicalAccessHeader({ title, subtitle, buttons }: Props) {
  return (
    <div className="flex items-start justify-between pb-1">
      <div>
        <h1 className="text-[16px] font-bold text-[#020b22]">{title}</h1>
        <p className="text-[10px] text-zinc-500">{subtitle}</p>
      </div>
      {buttons && (
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {buttons}
        </div>
      )}
    </div>
  );
}
