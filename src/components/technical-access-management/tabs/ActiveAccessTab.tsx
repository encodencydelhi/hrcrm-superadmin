"use client";
import React from "react";
import {
    ChevronRight, RefreshCcw, Clock, Pencil, PauseCircle, XCircle,
    Download, ShieldCheck, ArrowLeft, MoreVertical, Timer, Users, LogOut,
} from "lucide-react";
import TableCard, { TableCardColumn } from "@/components/table/TableCard";

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
        id: 1, name: "Rahul Verma", role: "Sr. Support Engineer", initials: "RV", avatarBg: "bg-orange-400",
        loginDate: "30 May 2025", loginTime: "02:36 PM", ip: "203.110.245.25", location: "Noida, India",
        device: "Windows 11", browser: "Chrome 125.0", duration: "1h 12m 45s", status: "Active",
    },
    {
        id: 2, name: "Neha Singh", role: "Database Specialist", initials: "NS", avatarBg: "bg-purple-400",
        loginDate: "30 May 2025", loginTime: "02:38 PM", ip: "203.110.245.27", location: "Noida, India",
        device: "Windows 11", browser: "Edge 124.0", duration: "1h 10m 20s", status: "Active",
    },
];

const sessionHistory: HistorySession[] = [
    {
        id: 1, name: "Amit Kumar", role: "System Engineer", initials: "AK", avatarBg: "bg-blue-400",
        loginDate: "29 May 2025", loginTime: "11:15 AM", logoutDate: "29 May 2025", logoutTime: "01:45 PM",
        ip: "203.110.245.26", duration: "2h 30m", status: "Completed",
    },
    {
        id: 2, name: "Rahul Verma", role: "Sr. Support Engineer", initials: "RV", avatarBg: "bg-orange-400",
        loginDate: "28 May 2025", loginTime: "04:05 PM", logoutDate: "28 May 2025", logoutTime: "06:15 PM",
        ip: "203.110.245.25", duration: "2h 10m", status: "Completed",
    },
    {
        id: 3, name: "Neha Singh", role: "Database Specialist", initials: "NS", avatarBg: "bg-purple-400",
        loginDate: "27 May 2025", loginTime: "10:20 AM", logoutDate: "27 May 2025", logoutTime: "12:40 PM",
        ip: "203.110.245.27", duration: "2h 20m", status: "Completed",
    },
    {
        id: 4, name: "Amit Kumar", role: "System Engineer", initials: "AK", avatarBg: "bg-blue-400",
        loginDate: "26 May 2025", loginTime: "03:15 PM", logoutDate: "26 May 2025", logoutTime: "05:05 PM",
        ip: "203.110.245.26", duration: "1h 50m", status: "Completed",
    },
];

const quickActions = [
    { icon: Clock, title: "Extend Access Duration", subtitle: "Request extension for this access", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Pencil, title: "Modify Access Scope", subtitle: "Update access level or permissions", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: PauseCircle, title: "Pause Access", subtitle: "Temporarily pause current access", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: XCircle, title: "Revoke Access", subtitle: "Immediately revoke all access", color: "text-red-600", bg: "bg-red-50" },
    { icon: Download, title: "Download Access Report", subtitle: "Get current access summary", color: "", bg: "bg-gray-100" },
];

const sessionPolicy = [
    { icon: Timer, label: "Idle Timeout", value: "30 minutes", valueColor: "" },
    { icon: Clock, label: "Max Session Duration", value: "8 hours", valueColor: "" },
    { icon: Users, label: "Concurrent Sessions Allowed", value: "2", valueColor: "" },
    { icon: LogOut, label: "Automatic Logout", value: "Enabled", valueColor: "text-green-600" },
];

// ------------------------------------------------------------------
// Small reusable pieces
// ------------------------------------------------------------------
const Avatar = ({ initials, bg }: { initials: string; bg: string }) => (
    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${bg} text-[10px] font-semibold text-white`}>
        {initials}
    </div>
);

const StatusPill = ({ label }: { label: string }) => (
    <span className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-[11px] font-medium text-green-600">
        <span className="h-1.5 w-1.5 rounded-lg bg-green-500" />
        {label}
    </span>
);

// ------------------------------------------------------------------
// Active Sessions table
// ------------------------------------------------------------------
function ActiveSessionsTable() {
    const columns: TableCardColumn<ActiveSession>[] = [
        {
            key: "user",
            header: "User",
            render: (s) => (
                <div className="flex items-center gap-2">
                    <Avatar initials={s.initials} bg={s.avatarBg} />
                    <div className="flex flex-col">
                        <span className="font-medium text-[12px]">{s.name}</span>
                        <span className="text-[11px] text-zinc-500">{s.role}</span>
                    </div>
                </div>
            ),
        },
        {
            key: "loginTime",
            header: "Login Time",
            render: (s) => (
                <div className="flex flex-col text-[12px]">
                    <span>{s.loginDate}</span>
                    <span className="text-[11px] text-zinc-500">{s.loginTime}</span>
                </div>
            ),
        },
        { key: "ip", header: "IP Address", render: (s) => <span className="text-[12px]">{s.ip}</span> },
        { key: "location", header: "Location", render: (s) => <span className="text-[12px]">{s.location}</span> },
        {
            key: "device",
            header: "Device / Browser",
            render: (s) => (
                <div className="flex flex-col text-[12px]">
                    <span>{s.device}</span>
                    <span className="text-[11px] text-zinc-500">{s.browser}</span>
                </div>
            ),
        },
        {
            key: "duration",
            header: "Session Duration",
            render: (s) => (
                <div className="flex items-center gap-1 text-[12px]">
                    <Clock className="h-3 w-3" />
                    {s.duration}
                </div>
            ),
        },
        { key: "status", header: "Status", render: (s) => <StatusPill label={s.status} /> },
        {
            key: "action",
            header: "Action",
            render: () => (
                <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-red-200 px-2 py-1 text-[11px] font-medium text-red-600 hover:bg-red-50">
                        Terminate
                    </button>
                    <MoreVertical className="h-4 w-4" />
                </div>
            ),
        },
    ];

    return (
        <TableCard
            title={`Current Active Sessions (${activeSessions.length})`}
            description="These are the active sessions using granted access."
            columns={columns}
            data={activeSessions}
            keyExtractor={(s) => s.id}
            headerActions={
                <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-[11px] font-medium hover:bg-gray-50 text-blue-700">
                    <RefreshCcw className="h-3 w-3" />
                    Refresh
                </button>
            }
        />
    );
}

// ------------------------------------------------------------------
// Session History table
// ------------------------------------------------------------------
function SessionHistoryTable() {
    const columns: TableCardColumn<HistorySession>[] = [
        {
            key: "user",
            header: "User",
            render: (s) => (
                <div className="flex items-center gap-2">
                    <Avatar initials={s.initials} bg={s.avatarBg} />
                    <div className="flex flex-col">
                        <span className="font-medium text-[12px]">{s.name}</span>
                        <span className="text-[11px] text-zinc-500">{s.role}</span>
                    </div>
                </div>
            ),
        },
        {
            key: "loginTime",
            header: "Login Time",
            render: (s) => (
                <div className="flex flex-col text-[12px]">
                    <span>{s.loginDate}</span>
                    <span className="text-[11px] text-zinc-500">{s.loginTime}</span>
                </div>
            ),
        },
        {
            key: "logoutTime",
            header: "Logout Time",
            render: (s) => (
                <div className="flex flex-col text-[12px]">
                    <span>{s.logoutDate}</span>
                    <span className="text-[11px] text-zinc-500">{s.logoutTime}</span>
                </div>
            ),
        },
        { key: "ip", header: "IP Address", render: (s) => <span className="text-[12px]">{s.ip}</span> },
        { key: "duration", header: "Duration", render: (s) => <span className="text-[12px]">{s.duration}</span> },
        {
            key: "status",
            header: "Status",
            render: (s) => (
                <span className="rounded-lg bg-green-50 px-2 py-1 text-[11px] font-medium text-green-600">
                    {s.status}
                </span>
            ),
        },
    ];

    return (
        <TableCard
            title="Session History (Last 7 Days)"
            description="View recently ended access sessions."
            columns={columns}
            data={sessionHistory}
            keyExtractor={(s) => s.id}
            footer={
                <button className="w-full flex items-center justify-center text-[12px] font-medium text-blue-600 hover:underline">
                    View All Session History →
                </button>
            }
        />
    );
}

export default function ActiveAccessTab() {
    return (
        <div className={`grid grid-cols-1 ${GAP} lg:grid-cols-[1fr_300px] mb-2`}>
            {/* Left column */}
            <div className={`flex flex-col ${GAP}`}>
                <ActiveSessionsTable />
                <SessionHistoryTable />

                {/* Bottom actions */}
                <div className="flex flex-col items-stretch justify-between gap-2 sm:flex-row sm:items-center">
                    <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-50">
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
                    <span className="text-sm font-semibold">Access Quick Actions</span>
                    <div className="flex flex-col">
                        {quickActions.map((action, idx) => {
                            const Icon = action.icon;
                            return (
                                <button
                                    key={action.title}
                                    className={`flex items-center justify-between ${PAD} ${
                                        idx !== quickActions.length - 1 ? "border-b border-gray-100" : ""
                                    } hover:bg-gray-50`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${action.bg}`}>
                                            <Icon className={`h-4 w-4 ${action.color}`} />
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-xs font-medium">{action.title}</span>
                                            <span className="text-[11px]">{action.subtitle}</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Security Alerts */}
                <div className={`flex flex-col ${GAP} rounded-lg border border-gray-200 bg-white ${PAD}`}>
                    <span className="text-sm font-semibold">Security Alerts</span>
                    <button className="flex items-center justify-between rounded-lg bg-green-50 px-2 py-2 hover:bg-green-100">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-green-600" />
                            <div className="flex flex-col text-left">
                                <span className="text-xs font-medium text-green-700">No security issues found</span>
                                <span className="text-[11px] text-green-600">All active sessions are secure.</span>
                            </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-green-600" />
                    </button>
                </div>

                {/* Session Policy */}
                <div className={`flex flex-col ${GAP} rounded-lg border border-gray-200 bg-white ${PAD}`}>
                    <span className="text-sm font-semibold">Session Policy</span>
                    <div className="flex flex-col gap-2">
                        {sessionPolicy.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icon className="h-3.5 w-3.5" />
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
    );
}