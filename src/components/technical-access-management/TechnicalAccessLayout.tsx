import React from 'react';
import { TechnicalAccessLayoutProps } from './types';
import TechnicalAccessBreadcrumbs from './TechnicalAccessBreadcrumbs';
import TechnicalAccessHeader from './TechnicalAccessHeader';
import RequestSummaryCard from './RequestSummaryCard';
import TechnicalAccessTabs from './TechnicalAccessTabs';
import TechnicalAccessFooter from './TechnicalAccessFooter';

export default function TechnicalAccessLayout({
  breadcrumbs,
  title,
  subtitle,
  headerButtons,
  requestData,
  tabs,
  activeTab,
  onTabChange,
  children,
  footerActions,
}: TechnicalAccessLayoutProps) {
  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-2 font-sans text-zinc-900 min-h-screen bg-[#F8FAFC] md:bg-zinc-50/50 p-2 md:p-0">
      <TechnicalAccessBreadcrumbs items={breadcrumbs} />
      
      <TechnicalAccessHeader 
        title={title} 
        subtitle={subtitle} 
        buttons={headerButtons} 
      />
      
      <RequestSummaryCard data={requestData} />
      
      {tabs.length > 0 && (
        <TechnicalAccessTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
        />
      )}
      
      <div className="mt-4">
        {children}
      </div>

      <TechnicalAccessFooter actions={footerActions} />
    </div>
  );
}
