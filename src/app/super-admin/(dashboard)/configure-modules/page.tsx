'use client';
import React, { useMemo, useState } from 'react';
import {
    Users, CalendarClock, Plane, Wallet, LineChart, UserPlus2,
    FolderOpen, Headset, Monitor, GraduationCap, Receipt, Timer,
    Briefcase, PieChart, Smartphone, Fingerprint, MapPin, Mail,
    MessageSquare, MessageCircle, Bell, CheckCircle2, ArrowLeft,
    ArrowRight, LifeBuoy,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ModuleItem {
    key: string;
    name: string;
    description: string;
    icon: any;
    iconColor: string;
    enabled: boolean;
    available: boolean; // false => toggle is disabled ("Not Available")
}

interface PreferenceItem {
    key: string;
    label: string;
    icon: any;
    enabled: boolean;
}

interface OnboardingStep {
    key: string;
    label: string;
    status: 'completed' | 'active' | 'pending';
}

// ---------------------------------------------------------------------------
// Static config (swap for API data — see notes at bottom)
// ---------------------------------------------------------------------------

const STEPS: OnboardingStep[] = [
    { key: 'company', label: 'Company Created', status: 'completed' },
    { key: 'admins', label: 'Invite Admin Users', status: 'completed' },
    { key: 'employees', label: 'Import Employees', status: 'completed' },
    { key: 'modules', label: 'Configure Modules', status: 'active' },
    { key: 'payroll', label: 'Run Payroll Setup', status: 'pending' },
    { key: 'golive', label: 'Go Live', status: 'pending' },
];

const INITIAL_MODULES: ModuleItem[] = [
    { key: 'employee-mgmt', name: 'Employee Management', description: 'Manage employee profiles, documents and records', icon: Users, iconColor: 'text-indigo-500', enabled: true, available: true },
    { key: 'attendance-mgmt', name: 'Attendance Management', description: 'Track attendance, shifts and work hours', icon: CalendarClock, iconColor: 'text-blue-500', enabled: true, available: true },
    { key: 'leave-mgmt', name: 'Leave Management', description: 'Manage leave requests, policies and approvals', icon: Plane, iconColor: 'text-sky-500', enabled: true, available: true },

    { key: 'payroll-mgmt', name: 'Payroll Management', description: 'Run payroll, manage salary and compliances', icon: Wallet, iconColor: 'text-emerald-500', enabled: true, available: true },
    { key: 'performance-mgmt', name: 'Performance Management', description: 'Set goals, reviews and appraisals', icon: LineChart, iconColor: 'text-purple-500', enabled: true, available: true },
    { key: 'recruitment', name: 'Recruitment & Onboarding', description: 'Manage hiring, onboarding and applicants', icon: UserPlus2, iconColor: 'text-indigo-500', enabled: true, available: true },

    { key: 'document-mgmt', name: 'Document Management', description: 'Centralize company documents', icon: FolderOpen, iconColor: 'text-amber-500', enabled: true, available: true },
    { key: 'helpdesk', name: 'Helpdesk & Tickets', description: 'Raise, track and resolve support tickets', icon: Headset, iconColor: 'text-blue-500', enabled: true, available: true },
    { key: 'assets-mgmt', name: 'Assets Management', description: 'Track and manage company assets', icon: Monitor, iconColor: 'text-teal-500', enabled: false, available: true },

    { key: 'training-lms', name: 'Training & LMS', description: 'Employee training and e-learning', icon: GraduationCap, iconColor: 'text-fuchsia-500', enabled: false, available: true },
    { key: 'expense-mgmt', name: 'Expense Management', description: 'Manage expense claims and reports', icon: Receipt, iconColor: 'text-green-500', enabled: true, available: true },
    { key: 'timesheet-mgmt', name: 'Timesheet Management', description: 'Track timesheets and billable hours', icon: Timer, iconColor: 'text-cyan-500', enabled: false, available: true },

    { key: 'travel-mgmt', name: 'Travel Management', description: 'Manage travel requests and expenses', icon: Briefcase, iconColor: 'text-rose-500', enabled: false, available: true },
    { key: 'business-intelligence', name: 'Business Intelligence', description: 'Analytics, dashboards and reports', icon: PieChart, iconColor: 'text-indigo-500', enabled: true, available: true },
    { key: 'mobile-app', name: 'Mobile App Access', description: 'Allow mobile app access for employees', icon: Smartphone, iconColor: 'text-violet-500', enabled: true, available: true },
];

const INITIAL_PREFERENCES: PreferenceItem[] = [
    { key: 'biometric', label: 'Biometric Integration', icon: Fingerprint, enabled: true },
    { key: 'geo-tracking', label: 'Geo Location Tracking', icon: MapPin, enabled: true },
    { key: 'email-notif', label: 'Email Notifications', icon: Mail, enabled: true },
    { key: 'whatsapp-notif', label: 'WhatsApp Notifications', icon: MessageCircle, enabled: true },
    { key: 'sms-notif', label: 'SMS Notifications', icon: MessageSquare, enabled: false },
    { key: 'push-notif', label: 'Push Notifications', icon: Bell, enabled: true },
];

const PLAN_INFO = {
    plan: 'Professional',
    estimatedEmployees: 100,
    addOnModules: 2,
    billing: '₹150 / Employee / Month',
};

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function Toggle({ checked, disabled, onChange }: { checked: boolean; disabled?: boolean; onChange: () => void }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={onChange}
            className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                disabled ? 'bg-zinc-200 cursor-not-allowed' : checked ? 'bg-emerald-500' : 'bg-zinc-300'
            }`}
        >
            <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                    checked ? 'translate-x-4.5' : 'translate-x-1'
                }`}
                style={{ transform: checked ? 'translateX(18px)' : 'translateX(2px)' }}
            />
        </button>
    );
}

function StepBadge({ step, index }: { step: OnboardingStep; index: number }) {
    const isCompleted = step.status === 'completed';
    const isActive = step.status === 'active';
    return (
        <div className="flex items-center gap-2 min-w-0">
            <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                    isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isActive
                        ? 'bg-indigo-700 text-white'
                        : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                }`}
            >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
            </div>
            <div className="leading-tight min-w-0">
                <p className={`text-[11.5px] font-semibold truncate ${isActive ? 'text-indigo-700' : 'text-zinc-700'}`}>
                    {step.label}
                </p>
                <p className={`text-[10px] ${isCompleted ? 'text-emerald-600' : isActive ? 'text-indigo-500' : 'text-zinc-400'}`}>
                    {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Pending'}
                </p>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------

export default function ConfigureModulesPage() {
    const [modules, setModules] = useState<ModuleItem[]>(INITIAL_MODULES);
    const [preferences, setPreferences] = useState<PreferenceItem[]>(INITIAL_PREFERENCES);
    const [isSaving, setIsSaving] = useState(false);

    const toggleModule = (key: string) => {
        setModules((prev) => prev.map((m) => (m.key === key && m.available ? { ...m, enabled: !m.enabled } : m)));
    };

    const togglePreference = (key: string) => {
        setPreferences((prev) => prev.map((p) => (p.key === key ? { ...p, enabled: !p.enabled } : p)));
    };

    const selectAll = () => setModules((prev) => prev.map((m) => (m.available ? { ...m, enabled: true } : m)));
    const deselectAll = () => setModules((prev) => prev.map((m) => (m.available ? { ...m, enabled: false } : m)));

    const { enabledCount, disabledCount, notAvailableCount, totalCount, progressPercent } = useMemo(() => {
        const total = modules.length;
        const enabled = modules.filter((m) => m.enabled && m.available).length;
        const notAvailable = modules.filter((m) => !m.available).length;
        const disabled = total - enabled - notAvailable;
        return {
            enabledCount: enabled,
            disabledCount: disabled,
            notAvailableCount: notAvailable,
            totalCount: total,
            progressPercent: 66, // step 4 of 6
        };
    }, [modules]);

    const handleSaveAndContinue = async () => {
        setIsSaving(true);
        try {
            // await api.post('/onboarding/modules', { modules, preferences });
            await new Promise((r) => setTimeout(r, 600));
        } finally {
            setIsSaving(false);
        }
    };

    // Circle progress geometry
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progressPercent / 100);

    return (
        <div className="flex flex-col gap-2 animate-in fade-in duration-300 p-2 w-full font-sans text-zinc-800 bg-[#f8f9fc] min-h-screen">

            {/* BREADCRUMB */}
            <div className="text-[12px] text-zinc-500 font-medium mb-0.5">
                <span>Home</span> <span className="mx-1 text-zinc-300">›</span>
                <span>Companies</span> <span className="mx-1 text-zinc-300">›</span>
                <span>TechVision Pvt. Ltd.</span> <span className="mx-1 text-zinc-300">›</span>
                <span>Onboarding</span> <span className="mx-1 text-zinc-300">›</span>
                <span className="text-indigo-600 font-semibold">Configure Modules</span>
            </div>

            {/* PAGE HEADER */}
            <div className="mb-1">
                <h1 className="text-xl font-bold text-zinc-900 mb-0.5">Configure Modules</h1>
                <p className="text-[12px] text-zinc-500">Enable and configure modules based on your plan and requirements.</p>
            </div>

            {/* STEP TRACKER */}
            <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                <div className="flex items-center gap-2 overflow-x-auto">
                    {STEPS.map((step, idx) => (
                        <React.Fragment key={step.key}>
                            <StepBadge step={step} index={idx} />
                            {idx < STEPS.length - 1 && (
                                <div className={`h-px flex-1 min-w-[24px] ${STEPS[idx + 1].status !== 'pending' || step.status === 'completed' ? 'bg-emerald-300' : 'bg-zinc-200'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mt-1">

                <div className="lg:col-span-9 flex flex-col gap-2">
                    {/* MODULE CONFIGURATION */}
                    <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h2 className="text-[13px] font-bold text-zinc-800">Module Configuration</h2>
                                <p className="text-[11px] text-zinc-500">Enable or disable modules based on your plan and requirements.</p>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-semibold shrink-0">
                                <button onClick={selectAll} className="text-indigo-600 hover:text-indigo-700">Select All</button>
                                <span className="text-zinc-300">|</span>
                                <button onClick={deselectAll} className="text-zinc-500 hover:text-zinc-700">Deselect All</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
                            {modules.map((mod) => {
                                const ModIcon = mod.icon;
                                return (
                                    <div
                                        key={mod.key}
                                        className={`flex items-start justify-between gap-2 p-2 rounded-md border ${
                                            mod.available ? 'border-zinc-100' : 'border-zinc-100 opacity-60'
                                        }`}
                                    >
                                        <div className="flex items-start gap-2.5 min-w-0">
                                            <div className={`w-8 h-8 rounded-md bg-zinc-50 flex items-center justify-center shrink-0 ${mod.iconColor}`}>
                                                <ModIcon className="w-4 h-4" />
                                            </div>
                                            <div className="leading-tight min-w-0">
                                                <p className="text-[11.5px] font-bold text-zinc-800 truncate">{mod.name}</p>
                                                <p className="text-[10.5px] text-zinc-400 leading-snug">{mod.description}</p>
                                            </div>
                                        </div>
                                        <Toggle
                                            checked={mod.enabled}
                                            disabled={!mod.available}
                                            onChange={() => toggleModule(mod.key)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ADDITIONAL PREFERENCES */}
                    <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                        <h2 className="text-[13px] font-bold text-zinc-800">Additional Preferences</h2>
                        <p className="text-[11px] text-zinc-500 mb-3">Set other preferences for the organization.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
                            {preferences.map((pref) => {
                                const PrefIcon = pref.icon;
                                return (
                                    <div key={pref.key} className="flex items-center justify-between gap-2 p-1">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <PrefIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                            <span className="text-[11.5px] font-medium text-zinc-700 truncate">{pref.label}</span>
                                        </div>
                                        <Toggle checked={pref.enabled} onChange={() => togglePreference(pref.key)} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* FOOTER NAV */}
                    <div className="flex items-center justify-between mt-1">
                        <button className="flex items-center gap-1.5 h-9 px-3 bg-white border border-zinc-200 rounded-md text-[12px] font-semibold hover:bg-zinc-50 transition-colors shadow-sm text-zinc-700">
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Previous Step
                        </button>
                        <button
                            onClick={handleSaveAndContinue}
                            disabled={isSaving}
                            className="flex items-center gap-1.5 h-9 px-4 bg-indigo-700 rounded-md text-[12px] font-semibold text-white hover:bg-indigo-800 transition-colors shadow-sm disabled:opacity-60"
                        >
                            {isSaving ? 'Saving...' : 'Save & Continue'} <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="lg:col-span-3 flex flex-col gap-2">
                    {/* Onboarding Progress */}
                    <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                        <h2 className="text-[12px] font-bold text-zinc-800 mb-3">Onboarding Progress</h2>
                        <div className="flex flex-col items-center">
                            <div className="relative w-20 h-20">
                                <svg viewBox="0 0 72 72" className="w-20 h-20 -rotate-90">
                                    <circle cx="36" cy="36" r={radius} fill="none" stroke="#e4e4e7" strokeWidth="6" />
                                    <circle
                                        cx="36" cy="36" r={radius} fill="none"
                                        stroke="#10b981" strokeWidth="6" strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashOffset}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[13px] font-bold text-zinc-900">{progressPercent}%</span>
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-[11px] font-semibold text-zinc-800">Step 4 of 6</p>
                                <p className="text-[11px] font-bold text-indigo-700">Configure Modules</p>
                                <p className="text-[10.5px] text-zinc-400 mt-1">Select and configure modules for your company.</p>
                            </div>
                        </div>
                    </div>

                    {/* Modules Summary */}
                    <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                        <h2 className="text-[12px] font-bold text-zinc-800 mb-1">Modules Summary</h2>
                        <p className="text-[11px] font-semibold text-zinc-600 mb-2.5">
                            {enabledCount} of {totalCount} Modules Enabled
                        </p>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="flex items-center gap-1.5 text-zinc-700 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Enabled
                                </span>
                                <span className="font-bold text-zinc-800">{enabledCount}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="flex items-center gap-1.5 text-zinc-700 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Disabled
                                </span>
                                <span className="font-bold text-zinc-800">{disabledCount}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="flex items-center gap-1.5 text-zinc-700 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-zinc-300" /> Not Available
                                </span>
                                <span className="font-bold text-zinc-800">{notAvailableCount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Plan Information */}
                    <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                        <h2 className="text-[12px] font-bold text-zinc-800 mb-2.5">Plan Information</h2>
                        <div className="flex flex-col gap-1.5 text-[11px]">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500">Plan</span>
                                <span className="font-semibold text-zinc-800">{PLAN_INFO.plan}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500">Employees (Estimated)</span>
                                <span className="font-semibold text-zinc-800">{PLAN_INFO.estimatedEmployees}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500">Add-on Modules</span>
                                <span className="font-semibold text-zinc-800">{PLAN_INFO.addOnModules}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500">Billing</span>
                                <span className="font-semibold text-zinc-800">{PLAN_INFO.billing}</span>
                            </div>
                        </div>
                    </div>

                    {/* Need Help */}
                    <div className="bg-zinc-900 rounded-md p-3.5 flex flex-col gap-2.5">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                                <LifeBuoy className="w-4.5 h-4.5 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-white">Need Help?</p>
                            </div>
                        </div>
                        <p className="text-[11px] text-zinc-300 leading-snug">
                            Our implementation team is here to help you set up the right modules.
                        </p>
                        <button className="flex items-center justify-center gap-1.5 h-8 px-3 bg-amber-400 rounded-md text-[11.5px] font-bold text-zinc-900 hover:bg-amber-300 transition-colors">
                            Schedule a Demo <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}