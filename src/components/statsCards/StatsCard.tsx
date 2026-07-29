import React from 'react';
import { Card, CardContent } from '../ui/card';


export function StatsCard({ icon, accent, label, value, sub, subColor }: { icon: React.ReactNode; accent: string; label: string; value: React.ReactNode; sub?: string; subColor?: string }) {
  return (
    <Card className="border-slate-200 shadow-sm rounded-xl">
      <CardContent className="p-3 flex items-start gap-2.5">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}1a`, color: accent }}>
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 leading-none">{value}</h3>
          <p className="text-[10px] text-slate-500 mt-1.5 truncate">{label}</p>
          {sub && <p className="text-[9px] font-medium mt-1" style={{ color: subColor || '#94a3b8' }}>{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
