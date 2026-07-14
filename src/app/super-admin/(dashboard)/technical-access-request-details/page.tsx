"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  ChevronDown
} from "lucide-react";

import TechnicalAccessLayout from '@/components/technical-access-management/TechnicalAccessLayout';
import { RequestSummaryData } from '@/components/technical-access-management/types';

import RequestOverviewTab from '@/components/technical-access-management/tabs/RequestOverviewTab';
import AccessDetailsTab from '@/components/technical-access-management/tabs/AccessDetailsTab';
import AccessGrantedTab from '@/components/technical-access-management/tabs/AccessGrantedTab';
import ActiveAccessTab from '@/components/technical-access-management/tabs/ActiveAccessTab';
import SessionTimeoutTab from "@/components/technical-access-management/tabs/SessionTimeoutTab";
import DataAccessScopeTab from "@/components/technical-access-management/tabs/DataAccessScopeTab";
import CredentialsAndInstructionsTab from "@/components/technical-access-management/tabs/CredentialsAndInstructionsTab";
import TermsAndConditionsTab from '@/components/technical-access-management/tabs/TermsAndConditionsTab';
import ActivityLogTab from '@/components/technical-access-management/tabs/ActivityLogTab';
import DownloadReportTab from '@/components/technical-access-management/tabs/DownloadReportTab';
import RevokeModifyAccessTab from '@/components/technical-access-management/tabs/RevokeModifyAccessTab';

/* -------------------------------------------------------------------------- */
/*  Spacing constants — kept tight everywhere per design spec                 */
/* -------------------------------------------------------------------------- */

const GAP = "gap-2";

/* -------------------------------------------------------------------------- */
/*  Types & data                                                              */
/* -------------------------------------------------------------------------- */

const tabs = [
  "Request Overview",
  "Access Details",
  "Access Granted",
  "Active Access",
  "Session Timeout",
  "Data Access Scope",
  "Approvals",
  "Activity Log",
  "Credentials & Instructions",
  "Terms & Conditions",
  "Download Report",
  "Revoke / Modify Access",
  "Notifications"
];

/* -------------------------------------------------------------------------- */
/*  Main Page                                                                 */
/* -------------------------------------------------------------------------- */

const TechnicalAccessRequestDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("Request Overview");

  const requestData: RequestSummaryData = {
    requestId: "TAR-2025-028",
    requestStatus: "Pending",
    requestStatusColor: "text-orange-600 bg-orange-100",
    requestedOn: "30 May 2025, 11:20 AM",
    companyInitial: "T",
    companyName: "TechVision Pvt. Ltd.",
    requestedByAvatar: "https://i.pravatar.cc/64?img=12",
    requestedByName: "Rahul Verma",
    requestedByRole: "Sr. Support Engineer",
    purposeTitle: "System Maintenance",
    purposeSubtitle: "Server optimization",
    accessType: "Time-Bound Access",
    accessDuration: "Duration: 31 May - 02 Jun 2025 (3 Days)",
  };

  let breadcrumbs = [
    { label: "Home" },
    { label: "Technical Access Management" },
    { label: "Request Details", isActive: true },
  ];

  if (["Active Access", "Terms & Conditions", "Activity Log", "Download Report", "Revoke / Modify Access", "Data Access Scope", "Approvals", "Credentials & Instructions"].includes(activeTab)) {
    breadcrumbs = [
      { label: "Home" },
      { label: "Technical Access Management" },
      { label: "Request Details" },
      { label: "Access Details" },
      { label: activeTab, isActive: true },
    ];
  } else if (activeTab !== "Request Overview") {
    breadcrumbs = [
      { label: "Home" },
      { label: "Technical Access Management" },
      { label: "Request Details" },
      { label: activeTab, isActive: true },
    ];
  }

  let headerButtons = (
    <>
      <button className={`flex items-center ${GAP} rounded-lg border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium  hover:bg-gray-50`}>
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Requests
      </button>
      <button className={`flex items-center ${GAP} rounded-lg border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium  hover:bg-gray-50`}>
        <Download className="h-3.5 w-3.5" />
        Download
      </button>
      <button className={`flex items-center ${GAP} rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-medium text-white hover:bg-blue-700`}>
        More Actions
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    </>
  );

  let title = "Technical Access Request Details";
  let subtitle = "View request information, approval status and access configuration";

  if (activeTab === "Download Report") {
    title = "Download Access Report";
    subtitle = "Generate and download a detailed report of all activities performed during the access period.";
    headerButtons = (
      <button
        onClick={() => setActiveTab("Active Access")}
        className="flex items-center gap-1.5 border border-zinc-300 bg-white text-zinc-700 text-[10px] font-bold px-3 py-1.5 rounded shadow-sm hover:bg-zinc-50 transition-colors shrink-0"
      >
        <ArrowLeft size={12} /> Back to Active Access
      </button>
    );
  } else if (activeTab === "Revoke / Modify Access") {
    title = "Revoke / Modify Access";
    subtitle = "Revoke all access or modify the scope and permissions of the granted access.";
    headerButtons = (
      <button
        onClick={() => setActiveTab("Active Access")}
        className="flex items-center gap-1.5 border border-zinc-300 bg-white text-zinc-700 text-[10px] font-bold px-3 py-1.5 rounded shadow-sm hover:bg-zinc-50 transition-colors shrink-0"
      >
        <ArrowLeft size={12} /> Back to Active Access
      </button>
    );
  } else if (activeTab === "Terms & Conditions") {
    title = "Terms & Conditions";
    subtitle = "Please review and accept the terms and conditions before accessing the requested data.";
    headerButtons = (
      <div className="flex gap-2">
        <button className={`flex items-center ${GAP} rounded-lg border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium  hover:bg-gray-50`}>
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Data Access Scope
        </button>
      </div>
    );
  } else if (activeTab === "Active Access") {
    title = "Active Access";
    subtitle = "Monitor and manage the current active access granted to the technical team.";
    headerButtons = (
      <button className="flex items-center gap-2 self-start rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-x"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-3 7-3s5 2 7 3a1 1 0 0 1 1 1v7z" /><path d="m9 9 6 6" /><path d="m15 9-6 6" /></svg>
        Revoke All Access
      </button>
    );
  } else if (activeTab === "Activity Log") {
    title = "Activity Log";
    subtitle = "Comprehensive log of all activities and access events for this request.";
    headerButtons = (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("Download Report")}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 rounded text-[10px] font-bold text-zinc-700 bg-white hover:bg-zinc-50 transition-colors"
        >
          <Download size={12} /> Export CSV
        </button>
      </div>
    );
  } else if (activeTab === "Access Details") {
    title = "Access Details";
    subtitle = "Configure access level, data scope and permissions for the technical team";
  } else if (activeTab === "Access Granted") {
    title = "Access Granted Successfully";
    subtitle = "Technical access has been configured and granted.";
  } else if (activeTab === "Session Timeout") {
    title = "Session Timeout Options";
    subtitle = "Configure session duration and automatic timeout policies";
  } else if (activeTab === "Data Access Scope") {
    title = "Data Access Scope";
    subtitle = "Define boundaries and data limitations for this access";
  } else if (activeTab === "Approvals") {
    title = "Approvals";
    subtitle = "Manage approval workflows for this technical access request";
  } else if (activeTab === "Credentials & Instructions") {
    title = "Credentials & Instructions";
    subtitle = "Provide technical team with temporary credentials and access guidelines";
  } else if (activeTab === "Notifications") {
    title = "Notifications";
    subtitle = "Configure alert preferences and notification rules";
  }

  return (
    <TechnicalAccessLayout
      breadcrumbs={breadcrumbs}
      title={title}
      subtitle={subtitle}
      headerButtons={headerButtons}
      requestData={requestData}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <div className="w-full">
        {activeTab === 'Request Overview' && <RequestOverviewTab />}
        {activeTab === 'Access Details' && <AccessDetailsTab />}
        {activeTab === 'Access Granted' && <AccessGrantedTab />}
        {activeTab === 'Active Access' && <ActiveAccessTab />}
        {activeTab === 'Session Timeout' && <SessionTimeoutTab />}
        {activeTab === 'Terms & Conditions' && <TermsAndConditionsTab />}
        {activeTab === 'Activity Log' && <ActivityLogTab />}
        {activeTab === 'Download Report' && <DownloadReportTab />}
        {activeTab === 'Revoke / Modify Access' && <RevokeModifyAccessTab />}
        {activeTab === 'Data Access Scope' && <DataAccessScopeTab />}
        {activeTab === 'Credentials & Instructions' && <CredentialsAndInstructionsTab />}

        {/* Placeholder for others */}
        {!['Request Overview', 'Access Details', 'Access Granted', 'Active Access', 'Session Timeout', 'Terms & Conditions', 'Activity Log', 'Download Report', 'Revoke / Modify Access', 'Data Access Scope', 'Credentials & Instructions'].includes(activeTab) && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg text-center text-gray-500 text-sm mt-4">
            Content for <span className="font-semibold text-gray-700">{activeTab}</span> is currently under construction.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-gray-100 pt-4 text-[10px] sm:flex-row">
        <p>© 2025 Crewcam HRMS. All Rights Reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </TechnicalAccessLayout>
  );
};

export default TechnicalAccessRequestDetailsPage;