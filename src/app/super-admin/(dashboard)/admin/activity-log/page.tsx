"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ChevronRight, Home, Check, Info, Download, ArrowLeft, ArrowRight,
    FileText, Clock, Calendar, LogIn, LayoutGrid, Eye, Settings, FileDown, LogOut,
    ShieldCheck, CalendarDays
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// ─── Static data ────────────────────────────────────────────────────────────
const ACTIVITY_LOGS = [
    {
        id: 1,
        date: '30 May 2025',
        time: '02:36 PM',
        user: 'Rahul Verma',
        role: 'Sr. Support Engineer',
        userAvatar: '/avatars/rahul.jpg',
        actionTitle: 'Login',
        actionDesc: 'Successful login',
        actionColor: 'text-emerald-500',
        actionDot: 'bg-emerald-500',
        moduleTitle: 'System',
        moduleDesc: 'Login Module',
        ipAddress: '203.110.245.25',
        location: 'Noida, India',
        details: 'User logged in using provided credentials',
        icon: <LogIn size={14} className="text-emerald-500" />,
        iconBg: 'bg-emerald-50',
        iconBorder: 'border-emerald-200'
    },
    {
        id: 2,
        date: '30 May 2025',
        time: '02:37 PM',
        user: 'Rahul Verma',
        role: 'Sr. Support Engineer',
        userAvatar: '/avatars/rahul.jpg',
        actionTitle: 'Module Accessed',
        actionDesc: 'View',
        actionColor: 'text-blue-500',
        actionDot: 'bg-blue-500',
        moduleTitle: 'Employee Master',
        moduleDesc: 'View Employees',
        ipAddress: '203.110.245.25',
        location: 'Noida, India',
        details: 'Viewed 25 employee records',
        icon: <LayoutGrid size={14} className="text-purple-500" />,
        iconBg: 'bg-purple-50',
        iconBorder: 'border-purple-200'
    },
    {
        id: 3,
        date: '30 May 2025',
        time: '02:42 PM',
        user: 'Amit Kumar',
        role: 'System Engineer',
        userAvatar: '/avatars/amit.jpg',
        actionTitle: 'Data Viewed',
        actionDesc: 'Read',
        actionColor: 'text-amber-500',
        actionDot: 'bg-amber-500',
        moduleTitle: 'Payroll',
        moduleDesc: 'Salary Components',
        ipAddress: '203.110.245.26',
        location: 'Noida, India',
        details: 'Viewed salary component configuration',
        icon: <Eye size={14} className="text-amber-500" />,
        iconBg: 'bg-amber-50',
        iconBorder: 'border-amber-200'
    },
    {
        id: 4,
        date: '30 May 2025',
        time: '03:15 PM',
        user: 'Rahul Verma',
        role: 'Sr. Support Engineer',
        userAvatar: '/avatars/rahul.jpg',
        actionTitle: 'Configuration Updated',
        actionDesc: 'Update',
        actionColor: 'text-emerald-500',
        actionDot: 'bg-emerald-500',
        moduleTitle: 'System Settings',
        moduleDesc: 'General Settings',
        ipAddress: '203.110.245.25',
        location: 'Noida, India',
        details: 'Updated date format settings',
        icon: <Settings size={14} className="text-emerald-500" />,
        iconBg: 'bg-emerald-50',
        iconBorder: 'border-emerald-200'
    },
    {
        id: 5,
        date: '30 May 2025',
        time: '04:10 PM',
        user: 'Neha Singh',
        role: 'Database Specialist',
        userAvatar: '/avatars/neha.jpg',
        actionTitle: 'Report Generated',
        actionDesc: 'Export',
        actionColor: 'text-blue-500',
        actionDot: 'bg-blue-500',
        moduleTitle: 'Reports & Analytics',
        moduleDesc: 'Leave Report',
        ipAddress: '203.110.245.27',
        location: 'Noida, India',
        details: 'Exported leave report (Excel)',
        icon: <FileDown size={14} className="text-blue-500" />,
        iconBg: 'bg-blue-50',
        iconBorder: 'border-blue-200'
    },
    {
        id: 6,
        date: '30 May 2025',
        time: '04:28 PM',
        user: 'Rahul Verma',
        role: 'Sr. Support Engineer',
        userAvatar: '/avatars/rahul.jpg',
        actionTitle: 'Logout',
        actionDesc: 'Session Ended',
        actionColor: 'text-red-500',
        actionDot: 'bg-red-500',
        moduleTitle: 'System',
        moduleDesc: 'Logout Module',
        ipAddress: '203.110.245.25',
        location: 'Noida, India',
        details: 'User logged out successfully',
        icon: <LogOut size={14} className="text-red-500" />,
        iconBg: 'bg-red-50',
        iconBorder: 'border-red-200'
    }
];

const TABS = [
    'Access Overview',
    'Access Granted',
    'Credentials & Instructions',
    'Data Access Scope',
    'Terms & Conditions',
    'Activity Log',
    'Active Access'
];

// ─── Breadcrumb + heading ───────────────────────────────────────────────────
function PageHeading() {
    return (
        <>
            <div className="flex items-center text-[10px] text-zinc-500 font-medium ">
                <Link href="/super-admin" className="hover:text-indigo-700">Home</Link>
                <ChevronRight size={12} className="mx-1" />
                <Link href="#" className="hover:text-indigo-700">Technical Access Management</Link>
                <ChevronRight size={12} className="mx-1" />
                <Link href="#" className="hover:text-indigo-700">Request Details</Link>
                <ChevronRight size={12} className="mx-1" />
                <Link href="#" className="hover:text-indigo-700">Access Details</Link>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-zinc-800">Activity Log</span>
            </div>
            <div className="flex items-start justify-between pb-1 mt-1">
                <div>
                    <h1 className="text-[16px] font-bold text-[#020b22]">Activity Log</h1>
                    <p className="text-[10px] text-zinc-500">View all activities performed during the technical access period.</p>
                </div>
            </div>
        </>
    );
}

// ─── Top Info Card ─────────────────────────────────────────────────────────
function RequestInfoCard() {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 px-3 py-2.5 flex flex-wrap items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <FileText size={16} />
                </div>
                <div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-semibold text-zinc-500">Request ID</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[12px] font-bold text-zinc-900">TAR-2025-028</span>
                        <span className="px-1 py-0.5 rounded-sm bg-emerald-50 text-emerald-600 text-[8.5px] font-bold border border-emerald-100">Active</span>
                    </div>
                    <p className="text-[9px] text-zinc-400 mt-0.5">Requested on 30 May 2025, 11:20 AM</p>
                </div>
            </div>

            <div className="h-8 w-px bg-zinc-200 hidden md:block"></div>

            <div>
                <span className="text-[9px] font-semibold text-zinc-500">Company</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="h-4 w-4 rounded bg-blue-600 flex items-center justify-center text-white text-[9px] font-bold">
                        T
                    </div>
                    <span className="text-[11px] font-bold text-zinc-900">TechVision Pvt. Ltd.</span>
                </div>
            </div>

            <div className="h-8 w-px bg-zinc-200 hidden md:block"></div>

            <div>
                <span className="text-[9px] font-semibold text-zinc-500">Purpose</span>
                <p className="text-[11px] font-bold text-zinc-900 mt-0.5">System Maintenance</p>
                <p className="text-[9px] text-zinc-400 mt-0.5">Server optimization</p>
            </div>

            <div className="h-8 w-px bg-zinc-200 hidden md:block"></div>

            <div>
                <span className="text-[9px] font-semibold text-zinc-500">Access Type</span>
                <div className="mt-0.5">
                    <span className="px-1.5 py-0.5 rounded-sm bg-purple-50 text-purple-600 text-[9px] font-bold border border-purple-100">
                        Time-Bound Access
                    </span>
                </div>
            </div>

            <div className="h-8 w-px bg-zinc-200 hidden md:block"></div>

            <div className="flex items-start gap-2">
                <div className="mt-0.5 h-6 w-6 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <CalendarDays size={12} />
                </div>
                <div>
                    <span className="text-[9px] font-semibold text-zinc-500">Access Duration</span>
                    <p className="text-[11px] font-bold text-zinc-900 mt-0.5">30 May 2025, 02:35 PM</p>
                    <p className="text-[9px] text-zinc-500">to</p>
                    <p className="text-[11px] font-bold text-zinc-900">02 Jun 2025, 06:00 PM <span className="text-zinc-500 font-normal">(3 Days)</span></p>
                </div>
            </div>
        </div>
    );
}

// ─── Tabs ──────────────────────────────────────────────────────────────────
function NavigationTabs({ activeTab }: { activeTab: string }) {
    return (
        <div className="flex items-center gap-6 border-b border-zinc-200 overflow-x-auto no-scrollbar mt-2">
            {TABS.map((tab) => (
                <button
                    key={tab}
                    className={`pb-2 text-[10.5px] font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab
                        ? 'border-indigo-600 text-indigo-700'
                        : 'border-transparent text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

// ─── Main Table Section ─────────────────────────────────────────────────────
function ActivityLogTable() {
    return (
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm flex flex-col h-full">
            <div className="px-3 py-2 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h3 className="text-[12px] font-bold text-zinc-900">Activity Log Details</h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Track all actions performed by the Crewcam technical team.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-2 py-1 border border-zinc-200 rounded-md text-[10px] font-bold text-zinc-700 bg-white hover:bg-zinc-50 transition-colors">
                        <Settings size={12} /> Filters <ChevronRight size={10} className="rotate-90 ml-1 text-zinc-400" />
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-1 border border-zinc-200 rounded-md text-[10px] font-bold text-zinc-700 bg-white hover:bg-zinc-50 transition-colors">
                        <Calendar size={12} className="text-zinc-400" /> 30 May 2025 - 02 Jun 2025 <ChevronRight size={10} className="rotate-90 ml-1 text-zinc-400" />
                    </button>
                    <button className="p-1.5 border border-zinc-200 rounded-md text-zinc-600 bg-white hover:bg-zinc-50 transition-colors">
                        <Download size={12} />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50/50">
                            <th className="px-3 py-2 text-[10px] font-bold text-zinc-700 border-b border-zinc-100">Date &amp; Time</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-zinc-700 border-b border-zinc-100">User</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-zinc-700 border-b border-zinc-100">Action Performed</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-zinc-700 border-b border-zinc-100">Module / Section</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-zinc-700 border-b border-zinc-100">IP Address</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-zinc-700 border-b border-zinc-100">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {ACTIVITY_LOGS.map((log) => (
                            <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors group">
                                <td className="px-3 py-2 align-top">
                                    <div className="flex items-start gap-2">
                                        <div className={`mt-0.5 h-6 w-6 rounded-md ${log.iconBg} border ${log.iconBorder} flex items-center justify-center shrink-0`}>
                                            {log.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10.5px] font-bold text-zinc-900">{log.date}</p>
                                            <p className="text-[9px] text-zinc-500 mt-0.5">{log.time}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-2 align-top">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-zinc-200 overflow-hidden shrink-0 border border-zinc-300">
                                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(log.user)}&background=random&color=fff&size=24`} alt={log.user} className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-[10.5px] font-bold text-zinc-900">{log.user}</p>
                                            <p className="text-[9px] text-zinc-500 mt-0.5">{log.role}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-2 align-top">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`h-1.5 w-1.5 rounded-full ${log.actionDot}`}></div>
                                        <p className="text-[10.5px] font-bold text-zinc-800">{log.actionTitle}</p>
                                    </div>
                                    <p className="text-[9px] text-zinc-600 mt-0.5 ml-3">{log.actionDesc}</p>
                                </td>
                                <td className="px-3 py-2 align-top">
                                    <p className="text-[10.5px] font-bold text-zinc-900">{log.moduleTitle}</p>
                                    <p className="text-[9px] text-zinc-500 mt-0.5">{log.moduleDesc}</p>
                                </td>
                                <td className="px-3 py-2 align-top">
                                    <p className="text-[10.5px] font-bold text-zinc-700">{log.ipAddress}</p>
                                    <p className="text-[9px] text-zinc-400 mt-0.5">{log.location}</p>
                                </td>
                                <td className="px-3 py-2 align-top">
                                    <p className="text-[9.5px] text-zinc-600 leading-snug">{log.details}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-auto px-3 py-2 border-t border-zinc-100 flex items-center justify-between bg-zinc-50 rounded-b-lg">
                <p className="text-[9.5px] text-zinc-500">Showing 1 to 6 of 32 entries</p>
                <div className="flex items-center gap-1">
                    <button className="h-6 w-6 rounded border border-zinc-200 flex items-center justify-center text-zinc-400 hover:bg-white disabled:opacity-50 bg-white" disabled>
                        <span className="text-[9px] font-bold">|&lt;</span>
                    </button>
                    <button className="h-6 w-6 rounded border border-zinc-200 flex items-center justify-center text-zinc-400 hover:bg-white disabled:opacity-50 bg-white" disabled>
                        <ChevronRight size={12} className="rotate-180" />
                    </button>
                    <button className="h-6 w-6 rounded border border-indigo-600 bg-indigo-50 flex items-center justify-center text-indigo-700 text-[10px] font-bold">1</button>
                    <button className="h-6 w-6 rounded border border-zinc-200 flex items-center justify-center text-zinc-600 text-[10px] font-medium hover:bg-white bg-white">2</button>
                    <button className="h-6 w-6 rounded border border-zinc-200 flex items-center justify-center text-zinc-600 text-[10px] font-medium hover:bg-white bg-white">3</button>
                    <span className="px-1 text-zinc-400 text-[10px]">...</span>
                    <button className="h-6 w-6 rounded border border-zinc-200 flex items-center justify-center text-zinc-600 text-[10px] font-medium hover:bg-white bg-white">6</button>
                    <button className="h-6 w-6 rounded border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-white bg-white">
                        <ChevronRight size={12} />
                    </button>
                    <button className="h-6 w-6 rounded border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-white bg-white">
                        <span className="text-[9px] font-bold">&gt;|</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Right rail ─────────────────────────────────────────────────────────────
function ActivitySummary() {
    const summaryData = [
        { label: 'Logins', value: '6', icon: <LogIn size={12} className="text-blue-500" />, bg: 'bg-blue-50', border: 'border-blue-100' },
        { label: 'Modules Accessed', value: '12', icon: <LayoutGrid size={12} className="text-purple-500" />, bg: 'bg-purple-50', border: 'border-purple-100' },
        { label: 'Data Viewed', value: '8', icon: <Eye size={12} className="text-amber-500" />, bg: 'bg-amber-50', border: 'border-amber-100' },
        { label: 'Data Updated', value: '3', icon: <Settings size={12} className="text-emerald-500" />, bg: 'bg-emerald-50', border: 'border-emerald-100' },
        { label: 'Reports Generated', value: '2', icon: <FileDown size={12} className="text-emerald-500" />, bg: 'bg-emerald-50', border: 'border-emerald-100' },
        { label: 'Logouts', value: '6', icon: <LogOut size={12} className="text-blue-500" />, bg: 'bg-blue-50', border: 'border-blue-100' },
    ];

    return (
        <div className="rounded-lg bg-white shadow-sm border border-zinc-200 p-3">
            <h4 className="text-[12px] font-bold text-zinc-900 mb-2.5">Activity Summary</h4>

            <div className="flex items-center justify-between mb-[8px] pb-[8px] border-b border-zinc-100">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500">
                        <FileText size={12} />
                    </div>
                    <span className="text-[10px] text-zinc-600 font-bold">Total Activities</span>
                </div>
                <span className="text-[12px] font-bold text-zinc-900">32</span>
            </div>

            <div className="space-y-[7px]">
                {summaryData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`h-5 w-5 rounded ${item.bg} border ${item.border} flex items-center justify-center shrink-0`}>
                                {item.icon}
                            </div>
                            <span className="text-[10px] text-zinc-600 font-medium">{item.label}</span>
                        </div>
                        <span className="text-[10.5px] font-bold text-zinc-900">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SecurityOverview() {
    return (
        <div className="rounded-lg bg-white shadow-sm border border-zinc-200 p-3">
            <h4 className="text-[12px] font-bold text-zinc-900 mb-2.5">Security Overview</h4>

            <div className="rounded-md bg-emerald-50 border border-emerald-100 p-2 flex items-start gap-2 mb-2.5">
                <ShieldCheck size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                <div>
                    <p className="text-[10px] font-bold text-emerald-800">No security threats detected</p>
                    <p className="text-[9px] text-emerald-600/80 mt-0.5 leading-snug">All activities are within approved scope.</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-600 font-medium">Suspicious Activities</span>
                    <span className="text-[10.5px] font-bold text-zinc-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-600 font-medium">Policy Violations</span>
                    <span className="text-[10.5px] font-bold text-zinc-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-600 font-medium">Failed Logins</span>
                    <span className="text-[10.5px] font-bold text-zinc-900">0</span>
                </div>
            </div>
        </div>
    );
}

function NeedFullLogsCard() {
    return (
        <div className="rounded-lg bg-white shadow-sm border border-zinc-200 p-3">
            <div className="flex items-start gap-3 mb-3">
                <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700 shrink-0">
                    <FileText size={14} />
                </div>
                <div>
                    <h4 className="text-[12px] font-bold text-zinc-900 mb-1">Need Full Logs?</h4>
                    <p className="text-[10px] text-zinc-500 leading-relaxed">
                        Download complete activity logs including system events and security logs.
                    </p>
                </div>
            </div>
            <button className="w-full flex items-center justify-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[10px] font-bold text-blue-700 hover:bg-zinc-50 transition-colors shadow-sm">
                <Download size={12} /> Download Full Logs
            </button>
        </div>
    );
}

// ─── Bottom Actions ────────────────────────────────────────────────────────
function FooterActions() {
    return (
        <div className="flex items-center justify-between pt-1">
            <button className="flex items-center gap-1.5 rounded bg-white border border-zinc-300 px-4 py-1.5 text-[11px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                <ArrowLeft size={13} /> Back to Terms &amp; Conditions
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#024efc] px-5 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-zinc-800 transition-colors">
                Next: Active Access <ArrowRight size={13} className="text-white" />
            </button>
        </div>
    );
}

// ─── Info Alert ────────────────────────────────────────────────────────────
function InfoAlert() {
    return (
        <div className="rounded-lg bg-[#fffbeb] border border-[#fde68a] p-3 flex items-start gap-2.5 shadow-sm">
            <div className="h-6 w-6 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0 border border-[#fde68a]">
                <Info size={14} strokeWidth={3} />
            </div>
            <div>
                <p className="text-[10px] text-[#b45309] font-medium leading-relaxed">
                    Activity logs are securely recorded and monitored. All logs are immutable and cannot be modified. <br />
                    These logs may be used for audit and compliance purposes.
                </p>
            </div>
        </div>
    );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function ActivityLogPage() {
    return (
        <div className="w-full max-w-[1600px] mx-auto pb-2 space-y-2 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">
            <PageHeading />

            <RequestInfoCard />

            <NavigationTabs activeTab="Activity Log" />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-2 mt-2 items-start">
                <div className="xl:col-span-3 flex flex-col gap-2">
                    <ActivityLogTable />
                    <InfoAlert />
                </div>

                <div className="xl:col-span-1 flex flex-col gap-2 w-full">
                    <ActivitySummary />
                    <SecurityOverview />
                    <NeedFullLogsCard />
                </div>

            </div>
            <FooterActions />
        </div>
    );
}
