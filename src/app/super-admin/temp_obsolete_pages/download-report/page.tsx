"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
    ChevronRight, Info, Download, ArrowLeft, FileText,
    LogIn, LayoutGrid, Eye, Settings, FileDown, LogOut,
    CalendarDays, Users, ChevronDown, Filter, RotateCcw, ArrowRight
} from 'lucide-react';

const TABS = ['Access Overview', 'Access Granted', 'Credentials & Instructions', 'Data Access Scope', 'Terms & Conditions', 'Activity Log', 'Active Access', 'Download Report'];

const ACTIVITY_LOGS = [
    { id: 1, date: '30 May 2025', time: '02:36 PM', user: 'Rahul Verma', role: 'Sr. Support Engineer', avatarUrl: 'https://ui-avatars.com/api/?name=RV&background=ff6b00&color=fff&size=24', actionTitle: 'Login', actionColor: 'text-emerald-500', actionDot: 'bg-emerald-500', moduleTitle: 'System', moduleDesc: 'Login Module', ipAddress: '203.110.245.25', details: 'User logged in using provided credentials', icon: <LogIn size={12} className="text-emerald-500" />, iconBg: 'bg-emerald-50', iconBorder: 'border-emerald-200' },
    { id: 2, date: '30 May 2025', time: '02:37 PM', user: 'Rahul Verma', role: 'Sr. Support Engineer', avatarUrl: 'https://ui-avatars.com/api/?name=RV&background=ff6b00&color=fff&size=24', actionTitle: 'Module Accessed', actionColor: 'text-blue-500', actionDot: 'bg-blue-500', moduleTitle: 'Employee Master', moduleDesc: 'View Employees', ipAddress: '203.110.245.25', details: 'Viewed 25 employee records', icon: <LayoutGrid size={12} className="text-purple-500" />, iconBg: 'bg-purple-50', iconBorder: 'border-purple-200' },
    { id: 3, date: '30 May 2025', time: '02:42 PM', user: 'Amit Kumar', role: 'System Engineer', avatarUrl: 'https://ui-avatars.com/api/?name=AK&background=cccccc&color=000&size=24', actionTitle: 'Data Viewed', actionColor: 'text-amber-500', actionDot: 'bg-amber-500', moduleTitle: 'Payroll', moduleDesc: 'Salary Components', ipAddress: '203.110.245.26', details: 'Viewed salary component configuration', icon: <Eye size={12} className="text-amber-500" />, iconBg: 'bg-amber-50', iconBorder: 'border-amber-200' },
    { id: 4, date: '30 May 2025', time: '03:15 PM', user: 'Rahul Verma', role: 'Sr. Support Engineer', avatarUrl: 'https://ui-avatars.com/api/?name=RV&background=ff6b00&color=fff&size=24', actionTitle: 'Configuration Updated', actionColor: 'text-emerald-500', actionDot: 'bg-emerald-500', moduleTitle: 'System Settings', moduleDesc: 'General Settings', ipAddress: '203.110.245.25', details: 'Updated date format settings', icon: <Settings size={12} className="text-emerald-500" />, iconBg: 'bg-emerald-50', iconBorder: 'border-emerald-200' },
    { id: 5, date: '30 May 2025', time: '04:10 PM', user: 'Neha Singh', role: 'Database Specialist', avatarUrl: 'https://ui-avatars.com/api/?name=NS&background=ffff99&color=000&size=24', actionTitle: 'Report Generated', actionColor: 'text-blue-500', actionDot: 'bg-blue-500', moduleTitle: 'Reports & Analytics', moduleDesc: 'Leave Report', ipAddress: '203.110.245.27', details: 'Exported leave report (Excel)', icon: <FileDown size={12} className="text-blue-500" />, iconBg: 'bg-blue-50', iconBorder: 'border-blue-200' },
    { id: 6, date: '30 May 2025', time: '04:28 PM', user: 'Rahul Verma', role: 'Sr. Support Engineer', avatarUrl: 'https://ui-avatars.com/api/?name=RV&background=ff6b00&color=fff&size=24', actionTitle: 'Logout', actionColor: 'text-red-500', actionDot: 'bg-red-500', moduleTitle: 'System', moduleDesc: 'Logout Module', ipAddress: '203.110.245.25', details: 'User logged out successfully', icon: <LogOut size={12} className="text-red-500" />, iconBg: 'bg-red-50', iconBorder: 'border-red-200' },
];

const STATS = [
    { label: 'Total Activities', value: '32', icon: <FileText size={14} className="text-blue-500" />, bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Users Involved', value: '3', icon: <Users size={14} className="text-purple-500" />, bg: 'bg-purple-50', border: 'border-purple-100' },
    { label: 'Modules Accessed', value: '12', icon: <LayoutGrid size={14} className="text-amber-500" />, bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Data Records Viewed', value: '1,248', icon: <Eye size={14} className="text-emerald-500" />, bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Data Records Updated', value: '45', icon: <Settings size={14} className="text-orange-500" />, bg: 'bg-orange-50', border: 'border-orange-100' },
    { label: 'Data Downloads', value: '5', icon: <Download size={14} className="text-indigo-500" />, bg: 'bg-indigo-50', border: 'border-indigo-100' },
];

function SelectField({ label, options }: { label: string; options: string[] }) {
    return (
        <div className="flex flex-col gap-1 min-w-0">
            <label className="text-[9px] font-semibold text-zinc-500">{label}</label>
            <div className="relative">
                <select className="w-full h-7 appearance-none rounded border border-zinc-200 bg-white px-2 pr-6 text-[10px] font-medium text-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer">
                    {options.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={10} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>
        </div>
    );
}

export default function DownloadReportPage() {
    return (
        <div className="w-full max-w-[1600px] pb-2 mx-auto space-y-2 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">

            {/* Breadcrumb */}
            <div className="flex items-center text-[10px] text-zinc-500 font-medium">
                <Link href="/super-admin" className="hover:text-indigo-700">Home</Link>
                <ChevronRight size={12} className="mx-1" />
                <Link href="#" className="hover:text-indigo-700">Technical Access Management</Link>
                <ChevronRight size={12} className="mx-1" />
                <Link href="#" className="hover:text-indigo-700">Request Details</Link>
                <ChevronRight size={12} className="mx-1" />
                <Link href="#" className="hover:text-indigo-700">Access Details</Link>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-zinc-800">Download Access Report</span>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between pb-1 mt-1">
                <div>
                    <h1 className="text-[16px] font-bold text-[#020b22]">Download Access Report</h1>
                    <p className="text-[10px] text-zinc-500">Generate and download a detailed report of all activities performed during the access period.</p>
                </div>
                <button className="flex items-center gap-1.5 border border-zinc-300 bg-white text-zinc-700 text-[10px] font-bold px-3 py-1.5 rounded shadow-sm hover:bg-zinc-50 transition-colors shrink-0">
                    <ArrowLeft size={12} /> Back to Active Access
                </button>
            </div>

            {/* Request Info */}
            <div className="bg-white rounded-lg shadow-sm border border-zinc-200 px-3 py-2.5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0"><FileText size={16} /></div>
                    <div>
                        <span className="text-[9px] font-semibold text-zinc-500">Request ID</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[12px] font-bold text-zinc-900">TAR-2025-028</span>
                            <span className="px-1 py-0.5 rounded-sm bg-emerald-50 text-emerald-600 text-[8.5px] font-bold border border-emerald-100">Active</span>
                        </div>
                        <p className="text-[9px] text-zinc-400 mt-0.5">Requested on 30 May 2025, 11:20 AM</p>
                    </div>
                </div>
                <div className="h-8 w-px bg-zinc-200 hidden md:block" />
                <div>
                    <span className="text-[9px] font-semibold text-zinc-500">Company</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="h-4 w-4 rounded bg-blue-600 flex items-center justify-center text-white text-[9px] font-bold">T</div>
                        <span className="text-[11px] font-bold text-zinc-900">TechVision Pvt. Ltd.</span>
                    </div>
                </div>
                <div className="h-8 w-px bg-zinc-200 hidden md:block" />
                <div>
                    <span className="text-[9px] font-semibold text-zinc-500">Purpose</span>
                    <p className="text-[11px] font-bold text-zinc-900 mt-0.5">System Maintenance</p>
                    <p className="text-[9px] text-zinc-400 mt-0.5">Server optimization</p>
                </div>
                <div className="h-8 w-px bg-zinc-200 hidden md:block" />
                <div>
                    <span className="text-[9px] font-semibold text-zinc-500">Access Type</span>
                    <div className="mt-0.5">
                        <span className="px-1.5 py-0.5 rounded-sm bg-purple-50 text-purple-600 text-[9px] font-bold border border-purple-100">Time-Bound Access</span>
                    </div>
                </div>
                <div className="h-8 w-px bg-zinc-200 hidden md:block" />
                <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-6 w-6 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0"><CalendarDays size={12} /></div>
                    <div>
                        <span className="text-[9px] font-semibold text-zinc-500">Access Duration</span>
                        <p className="text-[11px] font-bold text-zinc-900 mt-0.5">30 May 2025, 02:35 PM</p>
                        <p className="text-[9px] text-zinc-500">to</p>
                        <p className="text-[11px] font-bold text-zinc-900">02 Jun 2025, 06:00 PM <span className="text-zinc-500 font-normal">(3 Days)</span></p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-zinc-200 overflow-x-auto mt-2">
                {TABS.map(tab => (
                    <button key={tab} className={`pb-2 text-[10.5px] font-bold whitespace-nowrap border-b-2 transition-colors ${tab === 'Download Report' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-zinc-600 hover:text-zinc-900'}`}>
                        {tab}
                    </button>
                ))}
            </div>
            {/* Filters */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm px-3 py-2.5">
                <div className="flex flex-wrap items-end gap-7">
                    {/* Date Range with calendar icon */}
                    <div className="flex flex-col gap-1 min-w-[160px]">
                        <label className="text-[9px] font-semibold text-zinc-500">Date Range</label>
                        <div className="flex items-center gap-1.5 h-7 px-2 rounded border border-zinc-200 bg-white text-[10px] font-medium text-zinc-700 cursor-pointer">
                            <CalendarDays size={11} className="text-zinc-400 shrink-0" />
                            <span>30 May 2025 - 02 Jun 2025</span>
                        </div>
                    </div>
                    <SelectField label="Activity Type" options={['All Activities', 'Login', 'Data Viewed', 'Report Generated']} />
                    <SelectField label="User" options={['All Users', 'Rahul Verma', 'Amit Kumar', 'Neha Singh']} />
                    <SelectField label="Module / Section" options={['All Modules', 'System', 'Payroll', 'Employee Master']} />
                    <SelectField label="Status" options={['All Statuses', 'Success', 'Failed']} />
                    <div className="ml-auto flex items-end gap-1.5">
                        <button className="h-7 flex items-center gap-1 border border-zinc-200 bg-white text-zinc-600 text-[10px] font-bold px-3 rounded hover:bg-zinc-50 transition-colors">
                            Reset
                        </button>
                        <button className="h-7 flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-bold px-3 rounded hover:bg-indigo-700 transition-colors">
                            <Filter size={10} /> Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-2 mt-2 items-start">
                {/* Left col */}
                <div className="xl:col-span-3 flex flex-col gap-2">



                    {/* Stats */}
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                        {STATS.map((s, i) => (
                            <div key={i} className="bg-white rounded-lg border border-zinc-200 shadow-sm px-2.5 py-2.5">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <div className={`h-6 w-6 rounded-full ${s.bg} border ${s.border} flex items-center justify-center shrink-0`}>{s.icon}</div>
                                    <p className="text-[9px] text-zinc-500 font-medium leading-tight">{s.label}</p>
                                </div>
                                <p className="text-[16px] font-extrabold text-zinc-900 leading-tight">{s.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm flex flex-col">
                        <div className="px-3 py-2 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <h3 className="text-[12px] font-bold text-zinc-900">Access Activity Report</h3>
                                <p className="text-[10px] text-zinc-500 mt-0.5">Detailed log of all activities performed during the selected period.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-2 py-1 border border-zinc-200 rounded text-[10px] font-bold text-[#374a8b] bg-white hover:bg-zinc-50 transition-colors">
                                    <LayoutGrid size={11} /> Columns
                                </button>
                                <button className="flex items-center gap-1.5 px-2 py-1 border border-zinc-200 rounded text-[10px] font-bold text-[#374a8b] bg-white hover:bg-zinc-50 transition-colors">
                                    <Download size={11} /> Download CSV
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50/50">
                                        {['Date & Time', 'User', 'Activity Type', 'Module / Section', 'Details', 'IP Address', 'Status'].map(h => (
                                            <th key={h} className="px-2 py-2 text-[10px] font-bold text-zinc-700 border-b border-zinc-100">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {ACTIVITY_LOGS.map(log => (
                                        <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                                            <td className="px-2 py-[7px] align-top">
                                                <div className="flex items-start gap-2">
                                                    <div className={`mt-0.5 h-6 w-6 rounded-md ${log.iconBg} border ${log.iconBorder} flex items-center justify-center shrink-0`}>{log.icon}</div>
                                                    <div>
                                                        <p className="text-[10.5px] font-bold text-zinc-900">{log.date}</p>
                                                        <p className="text-[9px] text-zinc-500">{log.time}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-[7px] align-top">
                                                <div className="flex items-center gap-2">
                                                    <img src={log.avatarUrl} alt={log.user} className="h-6 w-6 rounded-full object-cover border border-zinc-200 shrink-0" />
                                                    <div>
                                                        <p className="text-[10.5px] font-bold text-zinc-900">{log.user}</p>
                                                        <p className="text-[9px] text-zinc-500">{log.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-[7px] align-top">
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`h-1.5 w-1.5 rounded-full ${log.actionDot}`} />
                                                    <p className="text-[10.5px] font-bold text-zinc-800">{log.actionTitle}</p>
                                                </div>
                                            </td>
                                            <td className="px-2 py-[7px] align-top">
                                                <p className="text-[10.5px] font-bold text-zinc-900">{log.moduleTitle}</p>
                                                <p className="text-[9px] text-zinc-500">{log.moduleDesc}</p>
                                            </td>
                                            <td className="px-2 py-[7px] align-top"><p className="text-[9.5px] text-zinc-600 leading-snug">{log.details}</p></td>
                                            <td className="px-2 py-[7px] align-top"><p className="text-[10.5px] font-bold text-zinc-700">{log.ipAddress}</p></td>
                                            <td className="px-2 py-[7px] align-top">
                                                <span className="px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-100">Success</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-3 py-2 border-t border-zinc-100 flex items-center justify-between bg-zinc-50 rounded-b-lg">
                            <p className="text-[9.5px] text-zinc-500">Showing 1 to 6 of 32 entries</p>
                            <div className="flex items-center gap-1">
                                {['|<', '<'].map(b => <button key={b} className="h-6 w-6 rounded border border-zinc-200 flex items-center justify-center text-[9px] font-bold text-zinc-400 bg-white hover:bg-zinc-50">{b}</button>)}
                                {['1', '2', '3', '...', '6'].map(b => <button key={b} className={`h-6 w-6 rounded border flex items-center justify-center text-[10px] font-medium ${b === '1' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' : 'border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50'}`}>{b}</button>)}
                                {['>', '>|'].map(b => <button key={b} className="h-6 w-6 rounded border border-zinc-200 flex items-center justify-center text-[9px] font-bold text-zinc-600 bg-white hover:bg-zinc-50">{b}</button>)}
                            </div>
                        </div>
                    </div>

                    {/* Info Alert */}
                    <div className="rounded-lg bg-[#fffbeb] border border-[#fde68a] p-3 flex items-start gap-2.5 shadow-sm">
                        <div className="h-6 w-6 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0 border border-[#fde68a]">
                            <Info size={14} strokeWidth={3} />
                        </div>
                        <p className="text-[10px] text-[#b45309] font-medium leading-relaxed">
                            The downloaded report contains confidential information. Please handle it securely and do not share with unauthorized persons.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-1">
                        <button className="flex items-center gap-1.5 rounded bg-white border border-zinc-300 px-4 py-1.5 text-[11px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                            <ArrowLeft size={13} /> Back to Active Access
                        </button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="xl:col-span-1 flex flex-col gap-2 w-full">

                    {/* About Report */}
                    <div className="rounded-lg bg-white shadow-sm border border-zinc-200 p-3">
                        <h4 className="text-[12px] font-bold text-zinc-900 mb-2.5">About This Report</h4>
                        <p className="text-[9.5px] text-zinc-500 mb-2.5 leading-relaxed">This report includes all activities performed during the technical access period.</p>
                        <div className="space-y-[7px]">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] text-zinc-500 font-medium shrink-0">Generated On</span>
                                <span className="text-[10px] font-bold text-zinc-900">02 Jun 2025, 06:15 PM</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] text-zinc-500 font-medium shrink-0">Generated By</span>
                                <div className="flex items-center gap-1.5">
                                    <img src="https://ui-avatars.com/api/?name=Anjali+Sharma&background=random&color=fff&size=20" alt="Anjali" className="h-5 w-5 rounded-full border border-zinc-200 object-cover" />
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-zinc-900 leading-tight">Anjali Sharma</p>
                                        <p className="text-[9px] text-zinc-500 leading-tight">HR Manager</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] text-zinc-500 font-medium shrink-0">Report Type</span>
                                <span className="text-[10px] font-bold text-zinc-900 text-right">Detailed Activity Report</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] text-zinc-500 font-medium shrink-0">Time Zone</span>
                                <span className="text-[10px] font-bold text-zinc-900">IST (UTC +05:30)</span>
                            </div>
                        </div>
                    </div>

                    {/* Report Insights */}
                    <div className="rounded-lg bg-white shadow-sm border border-zinc-200 p-3">
                        <h4 className="text-[12px] font-bold text-zinc-900 mb-2.5">Report Insights</h4>
                        <ul className="space-y-1.5">
                            {[
                                'Most active user: Rahul Verma',
                                'Most accessed module: Payroll',
                                'Total data records viewed: 1,248',
                                'Total data records updated: 45',
                                'Total reports generated: 2',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-[10px] text-zinc-600">
                                    <div className="h-4 w-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="mt-3 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                            View Full Insights <ArrowRight size={10} />
                        </button>
                    </div>

                    {/* Export Options */}
                    <div className="rounded-lg bg-white shadow-sm border border-zinc-200 p-3">
                        <h4 className="text-[12px] font-bold text-zinc-900 mb-1">Export Options</h4>
                        <p className="text-[10px] text-zinc-500 mb-2.5">Choose your preferred format to download the report.</p>
                        <div className="flex flex-col gap-2">
                            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors">
                                <div className="h-6 w-6 rounded bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                                    <FileText size={12} className="text-red-500" />
                                </div>
                                <span className="text-[10.5px] font-bold text-zinc-800">Download PDF</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors">
                                <div className="h-6 w-6 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                                    <FileText size={12} className="text-emerald-600" />
                                </div>
                                <span className="text-[10.5px] font-bold text-zinc-800">Download Excel</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors">
                                <div className="h-6 w-6 rounded bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                                    <FileText size={12} className="text-blue-600" />
                                </div>
                                <span className="text-[10.5px] font-bold text-zinc-800">Download CSV</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
