import React from 'react';

interface Props {
  actions?: React.ReactNode;
}

export default function TechnicalAccessFooter({ actions }: Props) {
  if (!actions) return null;
  return (
    <div className="flex flex-wrap items-center justify-between mt-2 pt-2 pb-2 gap-4">
      {actions}
    </div>
  );
}
