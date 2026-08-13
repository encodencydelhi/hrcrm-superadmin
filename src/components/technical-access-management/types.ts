import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface RequestSummaryData {
  requestId: string;
  requestStatus: string; // e.g. "Pending", "Active"
  requestStatusColor?: string; // Optional custom color for the status pill
  requestedOn: string;
  companyInitial: string;
  companyName: string;
  requestedByAvatar: string;
  requestedByName: string;
  requestedByRole: string;
  purposeTitle: string;
  purposeSubtitle: string;
  accessType: string;
  accessDuration: string;
}

export interface TechnicalAccessLayoutProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  headerButtons?: React.ReactNode;
  requestData: RequestSummaryData;
  tabs: string[];
  activeTab: string;
  onTabChange?: (tab: string) => void;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
}
