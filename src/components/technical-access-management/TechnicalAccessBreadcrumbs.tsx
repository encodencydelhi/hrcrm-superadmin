import React from 'react';
import { BreadcrumbItem } from './types';
import { ChevronRight } from 'lucide-react';

interface Props {
  items: BreadcrumbItem[];
}

export default function TechnicalAccessBreadcrumbs({ items }: Props) {
  return (
    <div className="flex flex-wrap items-center text-[10px] text-zinc-500 font-medium">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <span className={item.isActive || isLast ? "text-zinc-800" : ""}>
              {item.label}
            </span>
            {!isLast && <ChevronRight size={12} className="mx-1 shrink-0" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
