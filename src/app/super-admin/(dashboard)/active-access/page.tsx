"use client";

import React from "react";
import {
  ChevronRight,
  FileText,
  Building2,
  Target,
  Zap,
  Calendar,
  RefreshCcw,
  Clock,
  ShieldX,
  Pencil,
  PauseCircle,
  XCircle,
  Download,
  ShieldCheck,
  ArrowLeft,
  MoreVertical,
  Timer,
  Hourglass,
  Users,
  LogOut,
} from "lucide-react";

import TechnicalAccessLayout from '@/components/technical-access-management/TechnicalAccessLayout';
import { RequestSummaryData } from '@/components/technical-access-management/types';
// ------------------------------------------------------------------
// Spacing constant — used consistently across the page (gap-2 / p-2)
// ------------------------------------------------------------------
const GAP = "gap-2";
const PAD = "p-2";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface ActiveSession {
  id: number;
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  loginDate: string;
  loginTime: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
  duration: string;
  status: "Active";
}

interface HistorySession {
  id: number;
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  loginDate: string;
  loginTime: string;
  logoutDate: string;
  logoutTime: string;
  ip: string;
  duration: string;
  status: "Completed";
}

// ------------------------------------------------------------------
// Data
// ------------------------------------------------------------------
const activeSessions: ActiveSession[] = [
  {
    id: 1,
    name: "Rahul Verma",
    role: "Sr. Support Engineer",
    initials: "RV",
    avatarBg: "bg-orange-400",
    loginDate: "30 May 2025",
    loginTime: "02:36 PM",
    ip: "203.110.245.25",
    location: "Noida, India",
    device: "Windows 11",
    browser: "Chrome 125.0",
    duration: "1h 12m 45s",
    status: "Active",
  },
  {
    id: 2,
    name: "Neha Singh",
    role: "Database Specialist",
    initials: "NS",
    avatarBg: "bg-purple-400",
    loginDate: "30 May 2025",
    loginTime: "02:38 PM",
    ip: "203.110.245.27",
    location: "Noida, India",
    device: "Windows 11",
    browser: "Edge 124.0",
    duration: "1h 10m 20s",
    status: "Active",
  },
];

const sessionHistory: HistorySession[] = [
  {
    id: 1,
    name: "Amit Kumar",
    role: "System Engineer",
    initials: "AK",
    avatarBg: "bg-blue-400",
    loginDate: "29 May 2025",
    loginTime: "11:15 AM",
    logoutDate: "29 May 2025",
    logoutTime: "01:45 PM",
    ip: "203.110.245.26",
    duration: "2h 30m",
    status: "Completed",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Sr. Support Engineer",
    initials: "RV",
    avatarBg: "bg-orange-400",
    loginDate: "28 May 2025",
    loginTime: "04:05 PM",
    logoutDate: "28 May 2025",
    logoutTime: "06:15 PM",
    ip: "203.110.245.25",
    duration: "2h 10m",
    status: "Completed",
  },
  {
    id: 3,
    name: "Neha Singh",
    role: "Database Specialist",
    initials: "NS",
    avatarBg: "bg-purple-400",
    loginDate: "27 May 2025",
    loginTime: "10:20 AM",
    logoutDate: "27 May 2025",
    logoutTime: "12:40 PM",
    ip: "203.110.245.27",
    duration: "2h 20m",
    status: "Completed",
  },
  {
    id: 4,
    name: "Amit Kumar",
    role: "System Engineer",
    initials: "AK",
    avatarBg: "bg-blue-400",
    loginDate: "26 May 2025",
    loginTime: "03:15 PM",
    logoutDate: "26 May 2025",
    logoutTime: "05:05 PM",
    ip: "203.110.245.26",
    duration: "1h 50m",
    status: "Completed",
  },
];

const breadcrumbs = [
  "Home",
  "Technical Access Management",
  "Request Details",
  "Access Details",
  "Active Access",
];

const quickActions = [
  {
    icon: Clock,
    title: "Extend Access Duration",
    subtitle: "Request extension for this access",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Pencil,
    title: "Modify Access Scope",
    subtitle: "Update access level or permissions",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: PauseCircle,
    title: "Pause Access",
    subtitle: "Temporarily pause current access",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: XCircle,
    title: "Revoke Access",
    subtitle: "Immediately revoke all access",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: Download,
    title: "Download Access Report",
    subtitle: "Get current access summary",
    color: "",
    bg: "bg-gray-100",
  },
];

const sessionPolicy = [
  { icon: Timer, label: "Idle Timeout", value: "30 minutes", valueColor: "" },
  { icon: Clock, label: "Max Session Duration", value: "8 hours", valueColor: "" },
  { icon: Users, label: "Concurrent Sessions Allowed", value: "2", valueColor: "" },
  { icon: LogOut, label: "Automatic Logout", value: "Enabled", valueColor: "text-green-600" },
];

const tabs = [
  "Access Overview",
  "Access Granted",
  "Credentials & Instructions",
  "Data Access Scope",
  "Terms & Conditions",
  "Activity Log",
  "Active Access",
];

// ------------------------------------------------------------------
// Small reusable pieces
// ------------------------------------------------------------------
const Avatar = ({ initials, bg }: { initials: string; bg: string }) => (
  <div
    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${bg} text-[10px] font-semibold text-white`}
  >
    {initials}
  </div>
);

const StatusPill = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-[11px] font-medium text-green-600">
    <span className="h-1.5 w-1.5 rounded-lg bg-green-500" />
    {label}
  </span>
);

const ActiveAccessPage = () => {
  const requestData: RequestSummaryData = {
    requestId: 'TAR-2025-028',
    requestStatus: 'Active',
    requestStatusColor: 'text-green-600 bg-green-50 border-green-100',
    requestedOn: '30 May 2025, 11:20 AM',
    companyInitial: 'T',
    companyName: 'TechVision Pvt. Ltd.',
    requestedByAvatar: 'https://i.pravatar.cc/150?u=rahul',
    requestedByName: 'Rahul Verma',
    requestedByRole: 'Sr. Support Engineer',
    purposeTitle: 'System Maintenance',
    purposeSubtitle: 'Server optimization',
    accessType: 'Time-Bound Access',
    accessDuration: '30 May 2025, 02:35 PM to 02 Jun 2025, 06:00 PM (3 Days)',
  };

  const breadcrumbsList = [
    { label: 'Home' },
    { label: 'Technical Access Management' },
    { label: 'Request Details' },
    { label: 'Access Details' },
    { label: 'Active Access', isActive: true },
  ];

  const headerButtons = (
    <button className="flex items-center gap-2 self-start rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50">
      <ShieldX className="h-4 w-4" />
      Revoke All Access
    </button>
  );

  return (
    <TechnicalAccessLayout
      breadcrumbs={breadcrumbsList}
      title="Active Access"
      subtitle="Monitor and manage the current active access granted to the technical team."
      headerButtons={headerButtons}
      requestData={requestData}
      tabs={tabs}
      activeTab="Active Access"
    >
      {/* Content grid */}
      <div className={`grid grid-cols-1 ${GAP} lg:grid-cols-[1fr_300px] mb-2`}>
        {/* Left column */}
        <div className={`flex flex-col ${GAP}`}>
          {/* Current Active Sessions */}
          <div className={`flex flex-col ${GAP} rounded-lg border border-gray-200 bg-white ${PAD}`}>
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold ">
                  Current Active Sessions ({activeSessions.length})
                </span>
                <span className="text-[11px] ">
                  These are the active sessions using granted access.
                </span>
              </div>
              <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-[11px] font-medium  hover:bg-gray-50 text-blue-700">
                <RefreshCcw className="h-3 w-3" />
                Refresh
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] ">
                    <th className={`${PAD} font-medium`}>User</th>
                    <th className={`${PAD} font-medium`}>Login Time</th>
                    <th className={`${PAD} font-medium`}>IP Address</th>
                    <th className={`${PAD} font-medium`}>Location</th>
                    <th className={`${PAD} font-medium`}>Device / Browser</th>
                    <th className={`${PAD} font-medium`}>Session Duration</th>
                    <th className={`${PAD} font-medium`}>Status</th>
                    <th className={`${PAD} font-medium`}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSessions.map((s) => (
                    <tr key={s.id} className="border-b border-gray-100 last:border-0">
                      <td className={PAD}>
                        <div className="flex items-center gap-2">
                          <Avatar initials={s.initials} bg={s.avatarBg} />
                          <div className="flex flex-col">
                            <span className="font-medium ">{s.name}</span>
                            <span className="text-[11px] ">{s.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className={PAD}>
                        <div className="flex flex-col">
                          <span>{s.loginDate}</span>
                          <span className="text-[11px] ">{s.loginTime}</span>
                        </div>
                      </td>
                      <td className={`${PAD} `}>{s.ip}</td>
                      <td className={`${PAD} `}>{s.location}</td>
                      <td className={PAD}>
                        <div className="flex flex-col">
                          <span>{s.device}</span>
                          <span className="text-[11px] ">{s.browser}</span>
                        </div>
                      </td>
                      <td className={PAD}>
                        <div className="flex items-center gap-1 ">
                          <Clock className="h-3 w-3 " />
                          {s.duration}
                        </div>
                      </td>
                      <td className={PAD}>
                        <StatusPill label={s.status} />
                      </td>
                      <td className={PAD}>
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg border border-red-200 px-2 py-1 text-[11px] font-medium text-red-600 hover:bg-red-50">
                            Terminate
                          </button>
                          <MoreVertical className="h-4 w-4 " />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Session History */}
          <div className={`flex flex-col ${GAP} rounded-lg border border-gray-200 bg-white ${PAD}`}>
            <div className="flex flex-col">
              <span className="text-sm font-semibold ">
                Session History (Last 7 Days)
              </span>
              <span className="text-[11px] ">
                View recently ended access sessions.
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] ">
                    <th className={`${PAD} font-medium`}>User</th>
                    <th className={`${PAD} font-medium`}>Login Time</th>
                    <th className={`${PAD} font-medium`}>Logout Time</th>
                    <th className={`${PAD} font-medium`}>IP Address</th>
                    <th className={`${PAD} font-medium`}>Duration</th>
                    <th className={`${PAD} font-medium`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionHistory.map((s) => (
                    <tr key={s.id} className="border-b border-gray-100 last:border-0">
                      <td className={PAD}>
                        <div className="flex items-center gap-2">
                          <Avatar initials={s.initials} bg={s.avatarBg} />
                          <div className="flex flex-col">
                            <span className="font-medium ">{s.name}</span>
                            <span className="text-[11px] ">{s.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className={PAD}>
                        <div className="flex flex-col">
                          <span>{s.loginDate}</span>
                          <span className="text-[11px] ">{s.loginTime}</span>
                        </div>
                      </td>
                      <td className={PAD}>
                        <div className="flex flex-col">
                          <span>{s.logoutDate}</span>
                          <span className="text-[11px] ">{s.logoutTime}</span>
                        </div>
                      </td>
                      <td className={`${PAD} `}>{s.ip}</td>
                      <td className={`${PAD} `}>{s.duration}</td>
                      <td className={PAD}>
                        <span className="rounded-lg bg-green-50 px-2 py-1 text-[11px] font-medium text-green-600">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="justify-center items-center text-xs font-medium text-center text-blue-600 hover:underline w-full flex ">
              View All Session History →
            </button>
          </div>

          {/* Bottom actions */}
          <div className="flex flex-col items-stretch justify-between gap-2 sm:flex-row sm:items-center">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium  hover:bg-gray-50">
              <ArrowLeft className="h-4 w-4" />
              Back to Activity Log
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50">
              <Download className="h-4 w-4" />
              Export Active Sessions
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className={`flex flex-col ${GAP}`}>
          {/* Quick Actions */}
          <div className={`flex flex-col ${GAP} rounded-lg border border-gray-200 bg-white ${PAD}`}>
            <span className="text-sm font-semibold ">Access Quick Actions</span>
            <div className="flex flex-col">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.title}
                    className={`flex items-center justify-between ${PAD} ${idx !== quickActions.length - 1 ? "border-b border-gray-100" : ""
                      } hover:bg-gray-50`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${action.bg}`}>
                        <Icon className={`h-4 w-4 ${action.color}`} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-medium ">{action.title}</span>
                        <span className="text-[11px] ">{action.subtitle}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 " />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Security Alerts */}
          <div className={`flex flex-col ${GAP} rounded-lg border border-gray-200 bg-white ${PAD}`}>
            <span className="text-sm font-semibold ">Security Alerts</span>
            <button className="flex items-center justify-between rounded-lg bg-green-50 px-2 py-2 hover:bg-green-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-green-700">
                    No security issues found
                  </span>
                  <span className="text-[11px] text-green-600">
                    All active sessions are secure.
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-green-600" />
            </button>
          </div>

          {/* Session Policy */}
          <div className={`flex flex-col ${GAP} rounded-lg border border-gray-200 bg-white ${PAD}`}>
            <span className="text-sm font-semibold ">Session Policy</span>
            <div className="flex flex-col gap-2">
              {sessionPolicy.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 ">
                      <Icon className="h-3.5 w-3.5 " />
                      <span className="text-xs">{item.label}</span>
                    </div>
                    <span className={`text-xs font-medium ${item.valueColor}`}>{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </TechnicalAccessLayout>
  );
};

export default ActiveAccessPage;