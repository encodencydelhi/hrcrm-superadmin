"use client";

import React from 'react';
import Link from 'next/link';
import {
    ChevronRight,
    Check,
    Building2,
    Edit2,
    Crown,
    User,
    Settings,
    LayoutGrid,
    ArrowLeft,
    ArrowRight,
    PartyPopper,
    AlertCircle,
    ShieldCheck,
    CheckCircle2,
    Building,
    Users,
    CreditCard,
    Cpu,
    UserCog,
    Activity
} from 'lucide-react';

const STEP_ROUTES: Record<number, string> = {
    1: '/super-admin/step-1',
    2: '/super-admin/step-2',
    3: '/super-admin/step-3',
    4: '/super-admin/system-configuration',
    5: '/super-admin/review-confirm',
};

function StepIndicator({ current }: { current: number }) {
    const steps = [
        { id: 1, title: 'Basic Information', subtitle: 'Completed' },
        { id: 2, title: 'Subscription & Plan', subtitle: 'Completed' },
        { id: 3, title: 'Admin & Contact', subtitle: 'Completed' },
        { id: 4, title: 'Configuration', subtitle: 'Completed' },
        { id: 5, title: 'Review & Confirm', subtitle: 'Verify and create' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 flex items-center justify-between mb-6">
            {steps.map((step, index) => {
                const isCompleted = step.id < current;
                const isActive = step.id === current;
                const stepLink = STEP_ROUTES[step.id];

                return (
                    <div key={step.id} className={`flex items-center gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                        <Link href={stepLink} className="flex items-center gap-3 group">
                            {isCompleted ? (
                                <div className="h-10 w-10 rounded-full bg-emerald-100/80 flex items-center justify-center shrink-0">
                                    <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                </div>
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-[#020b22] text-white flex items-center justify-center shrink-0 font-bold text-[14px] shadow-sm">
                                    {step.id}
                                </div>
                            )}

                            <div className="flex flex-col">
                                <span className="text-[12px] font-bold text-[#020b22]">{step.title}</span>
                                <span className="text-[11px] text-slate-500 leading-tight mt-0.5">
                                    {step.subtitle}
                                </span>
                            </div>
                        </Link>
                        {index < steps.length - 1 && (
                            <div className="flex-1 h-px bg-slate-200 mx-4 hidden lg:block"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function ReviewConfirmPage() {
    return (
        <div className="w-full max-w-[1600px] mx-auto font-sans text-zinc-900 min-h-screen bg-zinc-50/50 space-y-2">
            {/* Breadcrumbs */}
            <div className="flex items-center text-[11px] text-zinc-500 font-medium">
                <Link href="/super-admin/dashboard" className="hover:text-indigo-600">Home</Link>
                <ChevronRight size={12} className="mx-1" />
                <Link href="/super-admin/companies" className="hover:text-indigo-600">Companies</Link>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-zinc-800">Add New Company</span>
            </div>

            {/* Header */}
            <div className="pb-1">
                <h1 className="text-[16px] font-bold text-[#020b22]">Add New Company</h1>
                <p className="text-[10px] text-zinc-500 mt-0.5">Review all details and confirm to create the company</p>
            </div>

            {/* Stepper */}
            <StepIndicator current={5} />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-2 items-start mt-2">
                {/* Left Column (Main Content) */}
                <div className="xl:col-span-3 space-y-2 ">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                        {/* Card 1 – Basic Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-2 flex flex-col h-full">
                            <div className="flex items-center justify-between pb-2">
                                <div className="flex items-center gap-2 text-[#1e293b]">
                                    <Building2 className="text-[#3b82f6]" size={18} />
                                    <h2 className="text-[14px] font-bold text-[#1e293b]">Basic Information</h2>
                                </div>
                                <Link href="/super-admin/step-1" className="text-[#3b82f6] hover:text-blue-700 flex items-center gap-1 text-[12px] font-bold">
                                    <Edit2 size={12} /> Edit
                                </Link>
                            </div>
                            <div className="border-t border-slate-100 pt-2 grid grid-cols-2 gap-y-4 gap-x-8">
                                <div className="space-y-5">
                                    <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                                        <span className="text-[12px] text-slate-500 font-medium">Company Name</span>
                                        <span className="text-[12px] font-medium text-slate-700">TechVision Pvt. Ltd.</span>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                                        <span className="text-[12px] text-slate-500 font-medium">Corporate ID</span>
                                        <span className="text-[12px] font-medium text-slate-700">TECHVISION_001</span>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                                        <span className="text-[12px] text-slate-500 font-medium">Industry</span>
                                        <span className="text-[12px] font-medium text-slate-700">Information Technology</span>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                                        <span className="text-[12px] text-slate-500 font-medium">Company Size</span>
                                        <span className="text-[12px] font-medium text-slate-700">201 - 500 Employees</span>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                                        <span className="text-[12px] text-slate-500 font-medium">Website</span>
                                        <span className="text-[12px] font-medium text-slate-700 truncate">https://www.techvision.com</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[12px] text-slate-500 font-medium">GSTIN / Tax ID</span>
                                        <span className="text-[12px] font-medium text-slate-700">27AAGCT1234A1Z5</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[12px] text-slate-500 font-medium">PAN</span>
                                        <span className="text-[12px] font-medium text-slate-700">AAGCT1234A</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[12px] text-slate-500 font-medium">Registration Number</span>
                                        <span className="text-[12px] font-medium text-slate-700 truncate">U72900MH2020PTC123456</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[12px] text-slate-500 font-medium">Year of Establishment</span>
                                        <span className="text-[12px] font-medium text-slate-700">2020</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[12px] text-slate-500 font-medium">Currency</span>
                                        <span className="text-[12px] font-medium text-slate-700">INR (₹) - Indian Rupee</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 – Subscription & Plan */}
                        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-2 flex flex-col h-full">
                            <div className="flex items-center justify-between pb-2">
                                <div className="flex items-center gap-2 text-[#1e293b]">
                                    <Crown className="text-[#3b82f6]" size={18} />
                                    <h2 className="text-[14px] font-bold text-[#1e293b]">Subscription & Plan</h2>
                                </div>
                                <Link href="/super-admin/step-2" className="text-[#3b82f6] hover:text-blue-700 flex items-center gap-1 text-[12px] font-bold">
                                    <Edit2 size={12} /> Edit
                                </Link>
                            </div>
                            <div className="border-t border-slate-100 pt-4 space-y-2">
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Selected Plan</span>
                                    <span className="text-[12px] font-medium text-slate-700">Professional</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Billing</span>
                                    <span className="text-[12px] font-medium text-slate-700">₹ 150 / Employee / Month</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Employees (Estimated)</span>
                                    <span className="text-[12px] font-medium text-slate-700">100</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Add-on Modules</span>
                                    <span className="text-[12px] font-medium text-slate-700">Advanced Recruitment (₹ 15 / Employee / Month)</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Billing Cycle</span>
                                    <span className="text-[12px] font-medium text-slate-700">Monthly</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Invoice Currency</span>
                                    <span className="text-[12px] font-medium text-slate-700">INR (₹) - Indian Rupee</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">GST Treatment</span>
                                    <span className="text-[12px] font-medium text-slate-700">Exclusive of GST</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 – Admin & Contact Details */}
                        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-2 flex flex-col h-full">
                            <div className="flex items-center justify-between pb-2">
                                <div className="flex items-center gap-2 text-[#1e293b]">
                                    <User className="text-[#3b82f6]" size={18} />
                                    <h2 className="text-[14px] font-bold text-[#1e293b]">Admin & Contact Details</h2>
                                </div>
                                <Link href="/super-admin/step-3" className="text-[#3b82f6] hover:text-blue-700 flex items-center gap-1 text-[12px] font-bold">
                                    <Edit2 size={12} /> Edit
                                </Link>
                            </div>
                            <div className="border-t border-slate-100 pt-2 grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6">
                                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 items-start">
                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Admin Name</span>
                                    <span className="text-[11px] font-medium text-slate-700">Rohit Mehta</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Designation</span>
                                    <span className="text-[11px] font-medium text-slate-700">HR Manager</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Email Address</span>
                                    <span className="text-[11px] font-medium text-[#3b82f6] truncate">rohit.mehta@techvision.com</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Phone Number</span>
                                    <span className="text-[11px] font-medium text-slate-700">+91 98765 43210</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Preferred Language</span>
                                    <span className="text-[11px] font-medium text-slate-700">English</span>
                                </div>
                                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 items-start">
                                    <div className="col-span-2 text-[12px] text-[#1e293b] font-bold">Company Communication</div>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Official Email</span>
                                    <span className="text-[11px] font-medium text-[#3b82f6] truncate">info@techvision.com</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Official Phone</span>
                                    <span className="text-[11px] font-medium text-slate-700">+91 0120 456 7890</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Support Email</span>
                                    <span className="text-[11px] font-medium text-[#3b82f6] truncate">support@techvision.com</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Support Phone</span>
                                    <span className="text-[11px] font-medium text-slate-700">+91 0120 456 7891</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Company Website</span>
                                    <span className="text-[11px] font-medium text-[#3b82f6] truncate">https://www.techvision.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 – Configuration Summary */}
                        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-2 flex flex-col h-full">
                            <div className="flex items-center justify-between pb-2">
                                <div className="flex items-center gap-2 text-[#1e293b]">
                                    <Settings className="text-[#3b82f6]" size={18} />
                                    <h2 className="text-[14px] font-bold text-[#1e293b]">Configuration Summary</h2>
                                </div>
                                <Link href="/super-admin/system-configuration" className="text-[#3b82f6] hover:text-blue-700 flex items-center gap-1 text-[12px] font-bold">
                                    <Edit2 size={12} /> Edit
                                </Link>
                            </div>
                            <div className="border-t border-slate-100 pt-2 grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6">
                                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 items-start">
                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Financial Year</span>
                                    <span className="text-[11px] font-medium text-slate-700">Apr - Mar (FY 2025-26)</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Week Starts On</span>
                                    <span className="text-[11px] font-medium text-slate-700">Monday</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Timezone</span>
                                    <span className="text-[11px] font-medium text-slate-700 truncate">(GMT+05:30) Asia/Kolkata</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Date Format</span>
                                    <span className="text-[11px] font-medium text-slate-700">DD MMM YYYY</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Time Format</span>
                                    <span className="text-[11px] font-medium text-slate-700">12 Hours (01:30 PM)</span>
                                </div>
                                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 items-start">
                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Default Currency</span>
                                    <span className="text-[11px] font-medium text-slate-700">INR (₹) - Indian Rupee</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Number Format</span>
                                    <span className="text-[11px] font-medium text-slate-700">1,23,456.78</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">First Day of Month</span>
                                    <span className="text-[11px] font-medium text-slate-700">1st</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Leave Year Start Month</span>
                                    <span className="text-[11px] font-medium text-slate-700">April</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 5 – Modules & Preferences */}
                    <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-2">
                        <div className="flex items-center gap-2 text-[#020b22] border-b border-zinc-100 pb-2 mb-2">
                            <LayoutGrid size={18} />
                            <h2 className="text-[15px] font-bold">Modules & Preferences</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6">
                            {/* Col 1 */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Employee Management
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Attendance Management
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Leave Management
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Payroll Management
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                            </div>
                            {/* Col 2 */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Performance Management
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Recruitment & Onboarding
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Training & Development
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Assets Management
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                            </div>
                            {/* Col 3 */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Documents Management
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Helpdesk & Tickets
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Expense Management
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Mobile App Access
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                            </div>
                            {/* Col 4 (Additional Preferences) */}
                            <div className="space-y-4 pt-4 md:pt-0">
                                <h3 className="text-[12px] font-bold text-zinc-800 mb-3 border-b border-zinc-100 pb-1">Additional Preferences</h3>
                                <div className="flex items-center justify-between">
                                    <div className="text-[12px] text-zinc-700 font-medium">Biometric Integration</div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-[12px] text-zinc-700 font-medium">Geo Location Tracking</div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-[12px] text-zinc-700 font-medium">Email Notifications</div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-[12px] text-zinc-700 font-medium">WhatsApp Notifications</div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-[12px] text-zinc-700 font-medium">SMS Notifications</div>
                                    <span className="text-[11px] font-semibold text-emerald-600">Enabled</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between pt-2 pb-2">
                        <Link href="/super-admin/system-configuration" className="flex items-center gap-1.5 px-4 py-2 border border-zinc-200 bg-white rounded-lg text-zinc-700 text-[13px] font-semibold hover:bg-zinc-50 transition-colors shadow-sm">
                            <ArrowLeft size={16} /> Back
                        </Link>
                        <div className="flex items-center gap-3">
                            <button className="px-5 py-2 border border-zinc-200 bg-white rounded-lg text-zinc-700 text-[13px] font-semibold hover:bg-zinc-50 transition-colors shadow-sm">
                                Save as Draft
                            </button>
                            <button className="flex items-center gap-1.5 px-5 py-2 bg-[#020b22] text-white rounded-lg text-[13px] font-semibold hover:bg-slate-800 transition-colors shadow-sm">
                                Confirm & Create Company <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="xl:col-span-1 space-y-4">

                    {/* Card 1 – Onboarding Progress */}
                    <div className="bg-[#020b22] rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
                        {/* Decorative background circle */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="flex items-start justify-between relative z-10 mb-4">
                            <div>
                                <h3 className="text-[15px] font-bold mt-0.5">Onboarding Process</h3>
                                {/* <span className="text-zinc-300 text-[11px] font-medium tracking-wide">Step 5 of 5</span> */}
                                {/* <h3 className="text-[15px] font-bold mt-0.5">Review & Confirm</h3> */}
                            </div>
                            <PartyPopper className="text-yellow-400" size={24} />
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                            {/* Circular Progress */}
                            <div className="relative w-14 h-14 shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                    <path className="text-emerald-400" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[12px] font-bold text-white">100%</span>
                                </div>
                            </div>
                            <div>

                                <p className="text-[11px] text-zinc-300 leading-relaxed">Step 5 of 5</p>
                                <p className="text-[11px] text-zinc-300 leading-relaxed">Review & Confirm</p>
                                <p className="text-[11px] text-zinc-300 leading-relaxed">
                                    You've completed all the steps. Please review and confirm to create the company.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 – Company Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-5">
                        <h3 className="text-[13px] font-bold text-[#020b22] mb-4">Company Summary</h3>
                        <div className="space-y-3.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <Building size={14} />
                                    <span className="text-[12px]">Company Name</span>
                                </div>
                                <span className="text-[12px] font-semibold text-zinc-900">TechVision Pvt. Ltd.</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <ShieldCheck size={14} />
                                    <span className="text-[12px]">Plan</span>
                                </div>
                                <span className="text-[12px] font-semibold text-zinc-900">Professional</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <Users size={14} />
                                    <span className="text-[12px]">Estimated Employees</span>
                                </div>
                                <span className="text-[12px] font-semibold text-zinc-900">100</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <CreditCard size={14} />
                                    <span className="text-[12px]">Billing</span>
                                </div>
                                <span className="text-[12px] font-semibold text-zinc-900">₹ 150 / Employee / Month</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <Cpu size={14} />
                                    <span className="text-[12px]">Add-on Modules</span>
                                </div>
                                <span className="text-[12px] font-semibold text-indigo-600">1 Selected</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <UserCog size={14} />
                                    <span className="text-[12px]">Admin User</span>
                                </div>
                                <span className="text-[12px] font-semibold text-zinc-900">Rohit Mehta</span>
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <Activity size={14} />
                                    <span className="text-[12px]">Go Live Status</span>
                                </div>
                                <span className="text-[12px] font-bold text-emerald-600">Setup Pending</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 – Important Note */}
                    <div className="bg-amber-50 rounded-xl border border-amber-200/60 p-4 flex items-start gap-3">
                        <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                        <div>
                            <h4 className="text-[13px] font-bold text-amber-900">Important Note</h4>
                            <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                                Once the company is created, admin credentials will be sent to the primary admin email address.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 – Your Data is Secure */}
                    <div className="bg-sky-50/50 rounded-xl border border-sky-100 p-5">
                        <div className="flex items-center gap-2 text-[#020b22] mb-2">
                            <ShieldCheck className="text-sky-600" size={18} />
                            <h4 className="text-[13px] font-bold">Your Data is Secure</h4>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                            We follow enterprise-grade security and data protection standards to keep your data safe.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-600 shadow-sm">
                                <Check size={12} className="text-emerald-500" /> ISO 27001
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-600 shadow-sm">
                                <Check size={12} className="text-emerald-500" /> SOC 2 Type II
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-600 shadow-sm">
                                <Check size={12} className="text-emerald-500" /> GDPR Compliant
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="mt-2 border-t border-zinc-200 pt-2 pb-2 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-400">
                <div className="mb-2 md:mb-0">
                    © 2025 Crewcam HRMS. All Rights Reserved.
                </div>
                <div className="flex items-center gap-4">
                    <Link href="#" className="hover:text-zinc-600 transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-zinc-600 transition-colors">Terms of Service</Link>
                </div>
            </footer>
        </div>
    );
}
