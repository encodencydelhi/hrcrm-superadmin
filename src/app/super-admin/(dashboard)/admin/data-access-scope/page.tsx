"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ChevronRight, Home, Check, Info, Download, ArrowLeft, ArrowRight,
    FileText, Clock, Calendar, LogIn, LayoutGrid, Eye, Settings, FileDown, LogOut,
    ShieldCheck, CalendarDays, X, Users, ClipboardList, Wallet, FileCode,
    BarChart3, Save, Database, Server, Terminal, Lock
} from 'lucide-react';

// ─── Static data ────────────────────────────────────────────────────────────
const MODULES_SCOPE = [
    {
        id: 1,
        title: 'Employee Master',
        icon: <Users size={14} className="text-blue-500" />,
        permissions: { view: true, create: false, edit: false, delete: false, export: true },
        level: 'Read Only',
        levelColor: 'text-blue-600 bg-blue-50',
    },
    {
        id: 2,
        title: 'Attendance',
        icon: <Clock size={14} className="text-blue-500" />,
        permissions: { view: true, create: true, edit: true, delete: false, export: true },
        level: 'Read & Limited',
        levelColor: 'text-amber-600 bg-amber-50',
    },
    {
        id: 3,
        title: 'Leave Management',
        icon: <CalendarDays size={14} className="text-blue-500" />,
        permissions: { view: true, create: true, edit: true, delete: false, export: true },
        level: 'Read & Limited',
        levelColor: 'text-amber-600 bg-amber-50',
    },
    {
        id: 4,
        title: 'Payroll',
        icon: <Wallet size={14} className="text-blue-500" />,
        permissions: { view: true, create: false, edit: false, delete: false, export: true },
        level: 'Read Only',
        levelColor: 'text-blue-600 bg-blue-50',
    },
    {
        id: 5,
        title: 'Documents',
        icon: <FileCode size={14} className="text-blue-500" />,
        permissions: { view: true, create: true, edit: true, delete: false, export: true },
        level: 'Read & Limited',
        levelColor: 'text-amber-600 bg-amber-50',
    },
    {
        id: 6,
        title: 'Reports & Analytics',
        icon: <BarChart3 size={14} className="text-blue-500" />,
        permissions: { view: true, create: false, edit: false, delete: false, export: true },
        level: 'Read Only',
        levelColor: 'text-blue-600 bg-blue-50',
    },
    {
        id: 7,
        title: 'System Settings',
        icon: <Settings size={14} className="text-blue-500" />,
        permissions: { view: false, create: false, edit: false, delete: false, export: false },
        level: 'No Access',
        levelColor: 'text-red-600 bg-red-50',
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
                <span className="text-zinc-800">Data Access Scope</span>
            </div>
            <div className="flex items-start justify-between pb-0 mt-0.5">
                <div>
                    <h1 className="text-[16px] font-bold text-[#020b22]">Data Access Scope</h1>
                    <p className="text-[10px] text-zinc-500">Define which modules, data and operations Crewcam technical team is allowed to access.</p>
                </div>
            </div>
        </>
    );
}

// ─── Top Info Card ─────────────────────────────────────────────────────────
function RequestInfoCard() {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 px-3 py-2 flex flex-wrap items-center justify-between gap-4 mt-1.5">
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

// ─── Module Access Scope ─────────────────────────────────────────────────────
function ModuleAccessScope() {
    const PermissionIcon = ({ granted }: { granted: boolean }) => {
        if (granted) return <div className="flex justify-center"><Check size={14} className="text-emerald-500 bg-emerald-50 rounded-full p-0.5 border border-emerald-200" /></div>;
        return <div className="flex justify-center"><X size={14} className="text-red-500 bg-red-50 rounded-full p-0.5 border border-red-200" /></div>;
    };

    return (
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm flex flex-col p-3 h-full">
            <h3 className="text-[12px] font-bold text-zinc-900">Module Access Scope</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5 mb-3">Select modules and features the technical team can access</p>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white border-b border-zinc-100">
                            <th className="py-2 text-[10px] font-bold text-zinc-900 w-[140px]">Module / Feature</th>
                            <th className="py-2 text-[10px] font-bold text-zinc-900 text-center">View</th>
                            <th className="py-2 text-[10px] font-bold text-zinc-900 text-center">Create</th>
                            <th className="py-2 text-[10px] font-bold text-zinc-900 text-center">Edit</th>
                            <th className="py-2 text-[10px] font-bold text-zinc-900 text-center">Delete</th>
                            <th className="py-2 text-[10px] font-bold text-zinc-900 text-center">Export</th>
                            <th className="py-2 text-[10px] font-bold text-zinc-900 text-right">Access Level</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {MODULES_SCOPE.map((mod) => (
                            <tr key={mod.id} className="hover:bg-zinc-50/50 transition-colors">
                                <td className="py-1.5">
                                    <div className="flex items-center gap-2">
                                        {mod.icon}
                                        <span className="text-[10.5px] font-medium text-zinc-700">{mod.title}</span>
                                    </div>
                                </td>
                                <td className="py-1.5"><PermissionIcon granted={mod.permissions.view} /></td>
                                <td className="py-1.5"><PermissionIcon granted={mod.permissions.create} /></td>
                                <td className="py-1.5"><PermissionIcon granted={mod.permissions.edit} /></td>
                                <td className="py-1.5"><PermissionIcon granted={mod.permissions.delete} /></td>
                                <td className="py-1.5"><PermissionIcon granted={mod.permissions.export} /></td>
                                <td className="py-1.5 text-right">
                                    <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${mod.levelColor}`}>
                                        {mod.level}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-3 rounded-lg bg-blue-50 border border-blue-100 p-2.5 flex items-start gap-2 shadow-sm">
                <div className="text-blue-600 mt-0.5 shrink-0">
                    <Info size={14} />
                </div>
                <p className="text-[10px] text-zinc-700 leading-relaxed">
                    Access levels are configured as per the minimum required permissions principle.<br />
                    Any access beyond the defined scope requires fresh approval from company HR.
                </p>
            </div>
        </div>
    );
}

// ─── Data Filters & Restrictions ─────────────────────────────────────────────
function DataFilters() {
    return (
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-3 h-full flex flex-col">
            <h3 className="text-[12px] font-bold text-zinc-900">Data Filters &amp; Restrictions</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5 mb-3">Limit access to specific data only</p>

            <div className="space-y-2 flex-1">
                <div>
                    <label className="text-[10px] font-bold text-zinc-700 mb-1 block">Employee Data</label>
                    <div className="relative">
                        <select className="w-full appearance-none border border-zinc-200 rounded-md py-1.5 pl-2.5 pr-6 text-[10px] text-zinc-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option>All Active Employees</option>
                        </select>
                        <ChevronRight size={12} className="absolute right-2 top-1.5 text-zinc-400 rotate-90 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-zinc-700 mb-1 block">Department</label>
                    <div className="relative">
                        <select className="w-full appearance-none border border-zinc-200 rounded-md py-1.5 pl-2.5 pr-6 text-[10px] text-zinc-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option>All Departments</option>
                        </select>
                        <ChevronRight size={12} className="absolute right-2 top-1.5 text-zinc-400 rotate-90 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-zinc-700 mb-1 block">Location</label>
                    <div className="relative">
                        <select className="w-full appearance-none border border-zinc-200 rounded-md py-1.5 pl-2.5 pr-6 text-[10px] text-zinc-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option>Noida Office</option>
                        </select>
                        <ChevronRight size={12} className="absolute right-2 top-1.5 text-zinc-400 rotate-90 pointer-events-none" />
                    </div>
                </div>

                <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-zinc-100">
                    <div>
                        <span className="text-[10.5px] font-bold text-zinc-900 block">Data Masking</span>
                        <p className="text-[9px] text-zinc-500">Mask sensitive personal data (PAN, Bank, Salary etc.)</p>
                    </div>
                    {/* Toggle switch (off) */}
                    <div className="w-6 h-3.5 bg-zinc-200 rounded-full relative cursor-pointer">
                        <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                    <div>
                        <span className="text-[10.5px] font-bold text-zinc-900 block">Download Restriction</span>
                        <p className="text-[9px] text-zinc-500">Allow data export/download</p>
                    </div>
                    {/* Toggle switch (on) */}
                    <div className="w-6 h-3.5 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                    </div>
                </div>
            </div>

            <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-2.5 flex items-start gap-2 shadow-sm">
                <div className="text-amber-600 mt-0.5 shrink-0">
                    <AlertTriangleIcon />
                </div>
                <p className="text-[10px] text-zinc-700 leading-relaxed font-medium">
                    Sensitive information must be handled as per company data privacy policy.
                </p>
            </div>
        </div>
    );
}

function AlertTriangleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    )
}


// ─── Access Summary & Right Column ──────────────────────────────────────────
function RightColumn() {
    return (
        <div className="flex flex-col gap-2 h-full">
            {/* Access Summary */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-3">
                <h3 className="text-[12px] font-bold text-zinc-900 mb-3">Access Summary</h3>
                <div className="space-y-[6px] border-b border-zinc-100 pb-2 mb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <LayoutGrid size={12} className="text-blue-500" />
                            <span className="text-[10.5px] font-medium text-zinc-700">Total Modules</span>
                        </div>
                        <span className="text-[10.5px] font-bold text-zinc-900">7</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Check size={12} className="text-emerald-500 bg-emerald-50 rounded p-[1px]" />
                            <span className="text-[10.5px] font-medium text-zinc-700">Accessible Modules</span>
                        </div>
                        <span className="text-[10.5px] font-bold text-zinc-900">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Eye size={12} className="text-blue-500" />
                            <span className="text-[10.5px] font-medium text-zinc-700">Read Only Modules</span>
                        </div>
                        <span className="text-[10.5px] font-bold text-zinc-900">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Settings size={12} className="text-amber-500" />
                            <span className="text-[10.5px] font-medium text-zinc-700">Read &amp; Limited Modules</span>
                        </div>
                        <span className="text-[10.5px] font-bold text-zinc-900">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <X size={12} className="text-red-500 bg-red-50 rounded p-[1px]" />
                            <span className="text-[10.5px] font-medium text-zinc-700">No Access Modules</span>
                        </div>
                        <span className="text-[10.5px] font-bold text-zinc-900">1</span>
                    </div>
                </div>

                <div className="space-y-[6px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Database size={12} className="text-zinc-500" />
                            <span className="text-[10.5px] font-medium text-zinc-700">Data Scope</span>
                        </div>
                        <span className="text-[10px] text-zinc-900">All Active Employees</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Lock size={12} className="text-zinc-500" />
                            <span className="text-[10.5px] font-medium text-zinc-700">Access Level</span>
                        </div>
                        <span className="text-[10px] text-zinc-900">Read &amp; Limited Access</span>
                    </div>
                </div>
            </div>

            {/* Data Categories Accessible */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-3 flex-1">
                <h3 className="text-[12px] font-bold text-zinc-900 mb-2">Data Categories Accessible</h3>
                <div className="space-y-[4px]">
                    {[
                        { title: 'Employee Basic Information', icon: <Check size={12} className="text-emerald-500" /> },
                        { title: 'Attendance & Leave Records', icon: <Check size={12} className="text-emerald-500" /> },
                        { title: 'Document Files & Attachments', icon: <Check size={12} className="text-emerald-500" /> },
                        { title: 'System Configuration (Limited)', icon: <Check size={12} className="text-emerald-500" /> },
                        { title: 'Reports & Dashboards', icon: <Check size={12} className="text-emerald-500" /> },
                        { title: 'Payroll & Salary Details (Restricted)', icon: <X size={12} className="text-red-500" />, strike: true }
                    ].map((cat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div className="shrink-0">{cat.icon}</div>
                            <span className={`text-[10px] font-medium ${cat.strike ? 'text-zinc-500 line-through' : 'text-zinc-700'}`}>
                                {cat.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Note */}
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-2.5 flex items-start gap-2 shadow-sm">
                <div className="text-blue-600 mt-0.5 shrink-0">
                    <Info size={14} />
                </div>
                <div className="text-[10px] text-zinc-700">
                    <span className="font-bold text-blue-800">Note</span>
                    <p className="mt-0.5 leading-snug">
                        Crewcam team will only access the data specified above for the mentioned purpose and duration. Any deviation will lead to immediate access revocation.
                    </p>
                </div>
            </div>
        </div>
    );
}

// ─── Database & System Access ────────────────────────────────────────────────
function DatabaseAccess() {
    return (
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-3">
            <h3 className="text-[12px] font-bold text-zinc-900">Database &amp; System Access</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5 mb-2">Technical and database access details</p>

            <div className="grid grid-cols-4 gap-4 pb-2">
                <div>
                    <span className="text-[10px] font-bold text-zinc-900 block mb-0.5">Access Method</span>
                    <span className="text-[11px] font-bold text-zinc-800">Secure VPN</span>
                </div>
                <div>
                    <span className="text-[10px] font-bold text-zinc-900 block mb-0.5">Database Access</span>
                    <span className="text-[11px] font-bold text-zinc-800">Read Only</span>
                </div>
                <div>
                    <span className="text-[10px] font-bold text-zinc-900 block mb-0.5">Server Access</span>
                    <span className="text-[11px] font-bold text-zinc-800">Limited (App Server Only)</span>
                </div>
                <div>
                    <span className="text-[10px] font-bold text-zinc-900 block mb-0.5">Command Line Access</span>
                    <span className="text-[11px] font-bold text-zinc-800">Not Allowed</span>
                </div>
            </div>

            <div className="mt-0.5 rounded border border-zinc-100 bg-zinc-50/50 p-2 flex items-center gap-2">
                <Info size={12} className="text-blue-600 shrink-0" />
                <span className="text-[10px] font-medium text-zinc-700">All database access is read-only. No data modification commands are permitted.</span>
            </div>
        </div>
    );
}

// ─── Bottom Actions ────────────────────────────────────────────────────────
function FooterActions() {
    return (
        <div className="flex items-center justify-between pt-1 mt-2">
            <button className="flex items-center gap-1.5 rounded bg-white border border-zinc-300 px-4 py-1.5 text-[11px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                <ArrowLeft size={13} /> Back to Access Details
            </button>
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded bg-white border border-zinc-300 px-4 py-1.5 text-[11px] font-bold text-blue-600 shadow-sm hover:bg-blue-50 transition-colors">
                    <Save size={13} /> Save as Draft
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#024efc] px-5 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-blue-700 transition-colors">
                    Next: Terms &amp; Conditions <ArrowRight size={13} className="text-white" />
                </button>
            </div>
        </div>
    );
}


// ─── Page ───────────────────────────────────────────────────────────────────
export default function DataAccessScopePage() {
    return (
        <div className="w-full max-w-[1600px] mx-auto pb-2 space-y-2 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">
            <PageHeading />

            <RequestInfoCard />

            <NavigationTabs activeTab="Data Access Scope" />

            <div className="grid grid-cols-12 gap-2 mt-2 items-start">
                <div className="col-span-12 xl:col-span-9 flex flex-col gap-2">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 flex-1">
                        <div className="xl:col-span-7">
                            <ModuleAccessScope />
                        </div>
                        <div className="xl:col-span-5">
                            <DataFilters />
                        </div>
                    </div>
                    <DatabaseAccess />
                </div>
                
                <div className="col-span-12 xl:col-span-3 h-full">
                    <RightColumn />
                </div>
            </div>

            <FooterActions />
        </div>
    );
}
