'use client';
import React, { useMemo, useState } from 'react';
import {
    Calendar, ArrowLeft, ArrowRight, CheckCircle2, Circle, PlayCircle,
    Info, AlertTriangle, Users, UserCheck, Wallet, MinusCircle,
    Landmark, ShieldCheck, Receipt, FileCheck2, LifeBuoy, Phone,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import api from '@/lib/axios';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OnboardingStep {
    key: string;
    label: string;
    status: 'completed' | 'active' | 'pending';
}

interface PayrollComponent {
    key: string;
    label: string;
    included: boolean;
}

interface ComplianceItem {
    key: string;
    label: string;
    icon: any;
    iconColor: string;
    bg: string;
    enabled: boolean;
    hasInfo?: boolean;
}

// ---------------------------------------------------------------------------
// Static config
// ---------------------------------------------------------------------------

const STEPS: OnboardingStep[] = [
    { key: 'company', label: 'Company Created', status: 'completed' },
    { key: 'admins', label: 'Invite Admin Users', status: 'completed' },
    { key: 'employees', label: 'Import Employees', status: 'completed' },
    { key: 'modules', label: 'Configure Modules', status: 'completed' },
    { key: 'payroll', label: 'Run Payroll Setup', status: 'active' },
    { key: 'golive', label: 'Go Live', status: 'pending' },
];

const INITIAL_COMPONENTS: PayrollComponent[] = [
    { key: 'basic', label: 'Basic Salary', included: true },
    { key: 'hra', label: 'HRA', included: true },
    { key: 'special-allowance', label: 'Special Allowance', included: true },
    { key: 'conveyance', label: 'Conveyance Allowance', included: true },
    { key: 'medical', label: 'Medical Allowance', included: false },
    { key: 'bonus', label: 'Bonus', included: false },
    { key: 'pf-employee', label: 'PF (Employee)', included: true },
    { key: 'pf-employer', label: 'PF (Employer)', included: true },
    { key: 'esi-employee', label: 'ESI (Employee)', included: true },
    { key: 'esi-employer', label: 'ESI (Employer)', included: true },
    { key: 'professional-tax', label: 'Professional Tax', included: true },
    { key: 'tds', label: 'TDS', included: true },
    { key: 'other-deductions', label: 'Other Deductions', included: false },
];

const INITIAL_COMPLIANCE: ComplianceItem[] = [
    { key: 'pf', label: 'Provident Fund (PF)', icon: Landmark, iconColor: 'text-violet-500', bg: 'bg-violet-50', enabled: true, hasInfo: true },
    { key: 'esi', label: "ESI (Employees' State Insurance)", icon: ShieldCheck, iconColor: 'text-blue-500', bg: 'bg-blue-50', enabled: true },
    { key: 'professional-tax', label: 'Professional Tax', icon: Receipt, iconColor: 'text-emerald-500', bg: 'bg-emerald-50', enabled: true },
    { key: 'tds', label: 'TDS (Tax Deducted at Source)', icon: FileCheck2, iconColor: 'text-amber-500', bg: 'bg-amber-50', enabled: true },
    { key: 'lwf', label: 'LWF (Labour Welfare Fund)', icon: Landmark, iconColor: 'text-sky-500', bg: 'bg-sky-50', enabled: false },
    { key: 'gratuity', label: 'Gratuity', icon: ShieldCheck, iconColor: 'text-pink-500', bg: 'bg-pink-50', enabled: false },
    { key: 'bonus-act', label: 'Bonus Act', icon: Receipt, iconColor: 'text-rose-500', bg: 'bg-rose-50', enabled: false },
];

const TEST_RUN_STATS = {
    totalEmployees: 100,
    employeesProcessed: 98,
    grossPay: '25,45,000',
    deductions: '4,12,500',
    netPay: '21,32,500',
};

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-zinc-300'
                }`}
        >
            <span
                className="inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform"
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
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${isCompleted
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

function FormField({
    label, required, children, hint,
}: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
    return (
        <div>
            <label className="block text-[11.5px] font-semibold text-zinc-700 mb-1">
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
            {children}
            {hint && <p className="text-[10px] text-zinc-400 mt-1">{hint}</p>}
        </div>
    );
}

const inputClass = 'w-full h-9 px-2.5 border border-zinc-200 rounded-md text-[12px] font-medium text-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300';

// ---------------------------------------------------------------------------

export default function RunPayrollSetupPage() {
    const searchParams = useSearchParams();
    const companyId = searchParams?.get('companyId');
    const [components, setComponents] = useState<PayrollComponent[]>(INITIAL_COMPONENTS);
    const [compliance, setCompliance] = useState<ComplianceItem[]>(INITIAL_COMPLIANCE);
    const [isRunningTest, setIsRunningTest] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!companyId) return;
        api.get(`/super-admin/tenants/${companyId}`)
            .then(res => {
                const tenant = res.data;
                if (tenant.payrollSetup) {
                    if (tenant.payrollSetup.form) setForm(tenant.payrollSetup.form);
                    if (tenant.payrollSetup.components && tenant.payrollSetup.components.length > 0) {
                        setComponents(prev => prev.map(c => {
                            const saved = tenant.payrollSetup.components.find((sc: any) => sc.key === c.key);
                            return saved ? { ...c, included: saved.included } : c;
                        }));
                    }
                    if (tenant.payrollSetup.compliance && tenant.payrollSetup.compliance.length > 0) {
                        setCompliance(prev => prev.map(c => {
                            const saved = tenant.payrollSetup.compliance.find((sc: any) => sc.key === c.key);
                            return saved ? { ...c, enabled: saved.enabled } : c;
                        }));
                    }
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [companyId]);

    const [form, setForm] = useState({
        payrollFrequency: 'Monthly',
        processingDate: '28',
        payDate: '5',
        financialYear: 'Apr 2025 - Mar 2026',
        currency: 'INR (₹) - Indian Rupee',
        salaryStructure: 'Default Structure',
        workingDays: '26',
        weekStartDay: 'Monday',
        cutoffDay: 'Last Working Day',
        effectiveFrom: '2025-04-01',
    });

    const updateForm = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

    const toggleComponent = (key: string) =>
        setComponents((prev) => prev.map((c) => (c.key === key ? { ...c, included: !c.included } : c)));

    const toggleCompliance = (key: string) =>
        setCompliance((prev) => prev.map((c) => (c.key === key ? { ...c, enabled: !c.enabled } : c)));

    const complianceEnabledCount = useMemo(() => compliance.filter((c) => c.enabled).length, [compliance]);

    const handleRunTestPayroll = async () => {
        setIsRunningTest(true);
        try {
            // await api.post('/onboarding/payroll/test-run', { form, components });
            await new Promise((r) => setTimeout(r, 800));
        } finally {
            setIsRunningTest(false);
        }
    };

    const handleContinue = async () => {
        setIsSaving(true);
        try {
            const componentsPayload = components.map(c => ({ key: c.key, included: c.included }));
            const compliancePayload = compliance.map(c => ({ key: c.key, enabled: c.enabled }));
            await api.put(`/super-admin/tenants/${companyId}`, {
                payrollSetup: { form, components: componentsPayload, compliance: compliancePayload },
                lifecycleStatus: 'QA_VERIFICATION'
            });
            router.push(`/super-admin/go-live?companyId=${companyId}`);
        } finally {
            setIsSaving(false);
        }
    };

    // Circle progress geometry — Step 5 of 6 ≈ 83%
    const progressPercent = 83;
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progressPercent / 100);

    const effectiveFromDisplay = useMemo(() => {
        const d = new Date(form.effectiveFrom);
        if (isNaN(d.getTime())) return form.effectiveFrom;
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }, [form.effectiveFrom]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-sm font-medium">Loading details...</div>;
    }

    return (
        <div className="flex flex-col gap-2 animate-in fade-in duration-300 p-2 w-full font-sans text-zinc-800 bg-[#f8f9fc] min-h-screen">

            {/* BREADCRUMB */}
            <div className="text-[12px] text-zinc-500 font-medium mb-0.5">
                <span>Home</span> <span className="mx-1 text-zinc-300">›</span>
                <span>Companies</span> <span className="mx-1 text-zinc-300">›</span>
                <span>TechVision Pvt. Ltd.</span> <span className="mx-1 text-zinc-300">›</span>
                <span>Onboarding</span> <span className="mx-1 text-zinc-300">›</span>
                <span className="text-indigo-600 font-semibold">Run Payroll Setup</span>
            </div>

            {/* PAGE HEADER */}
            <div className="mb-1">
                <h1 className="text-xl font-bold text-zinc-900 mb-0.5">Run Payroll Setup</h1>
                <p className="text-[12px] text-zinc-500">Configure payroll settings and run initial payroll to ensure everything is ready.</p>
            </div>

            {/* STEP TRACKER */}
            <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                <div className="flex items-center gap-2">
                    {STEPS.map((step, idx) => (
                        <React.Fragment key={step.key}>
                            <StepBadge step={step} index={idx} />
                            {idx < STEPS.length - 1 && (
                                <div className={`h-px flex-1 min-w-[20px] ${step.status === 'completed' ? 'bg-emerald-300' : 'bg-zinc-200'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mt-1">

                <div className="lg:col-span-9 flex flex-col gap-2">

                    {/* PAYROLL CONFIGURATION + COMPONENTS */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-start">

                        {/* Payroll Configuration */}
                        <div className="lg:col-span-8 bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                            <h2 className="text-[13px] font-bold text-zinc-800">Payroll Configuration</h2>
                            <p className="text-[11px] text-zinc-500 mb-3">Set up your payroll preferences and default settings.</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-3">
                                <FormField label="Payroll Frequency" required hint="Repeats">
                                    <select
                                        value={form.payrollFrequency}
                                        onChange={(e) => updateForm('payrollFrequency', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option>Weekly</option>
                                        <option>Bi-Weekly</option>
                                        <option>Monthly</option>
                                    </select>
                                </FormField>

                                <FormField label="Processing Date" required hint="Date to process payroll">
                                    <input
                                        type="text"
                                        value={form.processingDate}
                                        onChange={(e) => updateForm('processingDate', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>

                                <FormField label="Pay Date" required hint="Employee salary credit date">
                                    <input
                                        type="text"
                                        value={form.payDate}
                                        onChange={(e) => updateForm('payDate', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>

                                <FormField label="Financial Year" required hint="Select financial year">
                                    <select
                                        value={form.financialYear}
                                        onChange={(e) => updateForm('financialYear', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option>Apr 2025 - Mar 2026</option>
                                        <option>Apr 2024 - Mar 2025</option>
                                    </select>
                                </FormField>

                                <FormField label="Currency" required hint="Default currency">
                                    <select
                                        value={form.currency}
                                        onChange={(e) => updateForm('currency', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option>INR (₹) - Indian Rupee</option>
                                        <option>USD ($) - US Dollar</option>
                                    </select>
                                </FormField>

                                <FormField label="Salary Structure" required hint="Default salary structure for company">
                                    <select
                                        value={form.salaryStructure}
                                        onChange={(e) => updateForm('salaryStructure', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option>Default Structure</option>
                                        <option>Custom Structure</option>
                                    </select>
                                </FormField>

                                <FormField label="Working Days in Month" hint="Total working days">
                                    <input
                                        type="text"
                                        value={form.workingDays}
                                        onChange={(e) => updateForm('workingDays', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>

                                <FormField label="Week Start Day" hint="Default week start day">
                                    <select
                                        value={form.weekStartDay}
                                        onChange={(e) => updateForm('weekStartDay', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option>Sunday</option>
                                        <option>Monday</option>
                                    </select>
                                </FormField>

                                <FormField label="Cut-off Day" hint="Payroll cut-off for attendance">
                                    <select
                                        value={form.cutoffDay}
                                        onChange={(e) => updateForm('cutoffDay', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option>Last Working Day</option>
                                        <option>25th of the Month</option>
                                    </select>
                                </FormField>

                                <FormField label="Effective From" required hint="Payroll configuration effective date">
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={form.effectiveFrom}
                                            onChange={(e) => updateForm('effectiveFrom', e.target.value)}
                                            className={`${inputClass} pr-8`}
                                        />
                                        <Calendar className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </FormField>
                            </div>
                        </div>

                        {/* Payroll Components */}
                        <div className="lg:col-span-4 bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                            <h2 className="text-[13px] font-bold text-zinc-800">Payroll Components</h2>
                            <p className="text-[11px] text-zinc-500 mb-3">Select salary components to include in payroll.</p>

                            <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-1.5 px-0.5">
                                <span>Component</span>
                                <span>Include</span>
                            </div>
                            <div className="flex flex-col divide-y divide-zinc-50">
                                {components.map((c) => (
                                    <div key={c.key} className="flex items-center justify-between py-1.5">
                                        <span className="text-[11.5px] font-medium text-zinc-700">{c.label}</span>
                                        <Toggle checked={c.included} onChange={() => toggleComponent(c.key)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COMPLIANCE SETTINGS */}
                    <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                        <h2 className="text-[13px] font-bold text-zinc-800">Compliance Settings (India)</h2>
                        <p className="text-[11px] text-zinc-500 mb-3">Enable statutory compliance applicable to your company.</p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                            {compliance.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                    <div
                                        key={item.key}
                                        className="flex items-center justify-between gap-2 border border-zinc-100 rounded-md px-2.5 py-2"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className={`w-7 h-7 rounded-md ${item.bg} flex items-center justify-center shrink-0 ${item.iconColor}`}>
                                                <ItemIcon className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[11px] font-semibold text-zinc-700 truncate flex items-center gap-1">
                                                {item.label}
                                                {item.hasInfo && <Info className="w-3 h-3 text-zinc-300 shrink-0" />}
                                            </span>
                                        </div>
                                        <Toggle checked={item.enabled} onChange={() => toggleCompliance(item.key)} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* PAYROLL PREVIEW (TEST RUN) */}
                    <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h2 className="text-[13px] font-bold text-zinc-800">Payroll Preview (Test Run)</h2>
                                <p className="text-[11px] text-zinc-500">Run a test payroll to validate your configuration.</p>
                            </div>
                            <button
                                onClick={handleRunTestPayroll}
                                disabled={isRunningTest}
                                className="flex items-center gap-1.5 h-9 px-3 border border-zinc-200 rounded-md text-[12px] font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors shrink-0 disabled:opacity-60"
                            >
                                <PlayCircle className="w-3.5 h-3.5" /> {isRunningTest ? 'Running...' : 'Run Test Payroll'}
                            </button>
                        </div>

                        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-md px-3 py-2 mb-3">
                            <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <p className="text-[11px] text-blue-700 font-medium">This is a test run. No actual salary will be processed.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
                            {[
                                { label: 'Total Employees', value: TEST_RUN_STATS.totalEmployees, icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                                { label: 'Employees Processed', value: TEST_RUN_STATS.employeesProcessed, icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
                                { label: 'Gross Pay (₹)', value: TEST_RUN_STATS.grossPay, icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                { label: 'Deductions (₹)', value: TEST_RUN_STATS.deductions, icon: MinusCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
                                { label: 'Net Pay (₹)', value: TEST_RUN_STATS.netPay, icon: Receipt, color: 'text-teal-500', bg: 'bg-teal-50' },
                            ].map((stat, idx) => {
                                const StatIcon = stat.icon;
                                return (
                                    <div key={idx} className="border border-zinc-100 rounded-md p-2.5">
                                        <div className="flex items-center gap-1.5 mb-1.5">
                                            <div className={`w-6 h-6 rounded-md ${stat.bg} flex items-center justify-center shrink-0 ${stat.color}`}>
                                                <StatIcon className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[10px] text-zinc-500 font-medium leading-tight">{stat.label}</span>
                                        </div>
                                        <p className="text-[14px] font-bold text-zinc-900">{stat.value}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between gap-2 bg-amber-50 border border-amber-100 rounded-md px-3 py-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                <p className="text-[11px] text-amber-800 font-medium truncate">
                                    2 employees are missing salary structure. Please assign salary structure before running payroll.
                                </p>
                            </div>
                            <button className="h-7 px-3 bg-white border border-amber-200 rounded-md text-[11px] font-semibold text-amber-700 hover:bg-amber-100 transition-colors shrink-0">
                                View Employees
                            </button>
                        </div>
                    </div>

                    {/* FOOTER NAV */}
                    <div className="flex items-center justify-between mt-1">
                        <button onClick={() => router.push(`/super-admin/configure-modules`)} className="flex items-center gap-1.5 h-9 px-3 bg-white border border-zinc-200 rounded-md text-[12px] font-semibold hover:bg-zinc-50 transition-colors shadow-sm text-zinc-700">
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Previous Step
                        </button>
                        <div className="flex items-center gap-2">
                            <button className="h-9 px-3 bg-white border border-zinc-200 rounded-md text-[12px] font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm">
                                Save & Preview Payroll
                            </button>
                            <button
                                onClick={handleContinue}
                                disabled={isSaving}
                                className="flex items-center gap-1.5 h-9 px-4 bg-zinc-900 rounded-md text-[12px] font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm disabled:opacity-60"
                            >
                                {isSaving ? 'Saving...' : 'Continue'} <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
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
                                <p className="text-[11px] font-semibold text-zinc-800">Step 5 of 6</p>
                                <p className="text-[11px] font-bold text-indigo-700">Run Payroll Setup</p>
                                <p className="text-[10.5px] text-zinc-400 mt-1">Configure payroll settings for your company.</p>
                            </div>
                        </div>
                    </div>

                    {/* Onboarding Steps */}
                    <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                        <h2 className="text-[12px] font-bold text-zinc-800 mb-2.5">Onboarding Steps</h2>
                        <div className="flex flex-col gap-2">
                            {STEPS.map((step, idx) => {
                                const isCompleted = step.status === 'completed';
                                const isActive = step.status === 'active';
                                return (
                                    <div key={step.key} className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold ${isCompleted
                                                    ? 'bg-emerald-500 text-white'
                                                    : isActive
                                                        ? 'bg-indigo-700 text-white'
                                                        : 'bg-zinc-100 text-zinc-400'
                                                    }`}
                                            >
                                                {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : idx + 1}
                                            </div>
                                            <span className="text-[11.5px] font-medium text-zinc-700 truncate">{step.label}</span>
                                        </div>
                                        <span
                                            className={`text-[10px] font-semibold shrink-0 ${isCompleted ? 'text-emerald-600' : isActive ? 'text-indigo-600' : 'text-zinc-400'
                                                }`}
                                        >
                                            {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Pending'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Payroll Summary */}
                    <div className="bg-white border border-zinc-200 shadow-sm rounded-md p-3">
                        <h2 className="text-[12px] font-bold text-zinc-800 mb-2.5">Payroll Summary</h2>
                        <div className="flex flex-col gap-1.5 text-[11px]">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500">Payroll Frequency</span>
                                <span className="font-semibold text-zinc-800">{form.payrollFrequency}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500">Processing Date</span>
                                <span className="font-semibold text-zinc-800">{form.processingDate}th</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500">Pay Date</span>
                                <span className="font-semibold text-zinc-800">{form.payDate}th</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500">Financial Year</span>
                                <span className="font-semibold text-zinc-800 text-right">{form.financialYear}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500">Salary Structure</span>
                                <span className="font-semibold text-zinc-800">{form.salaryStructure}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500">Compliance</span>
                                <span className="font-semibold text-zinc-800">{complianceEnabledCount} / 10 Enabled</span>
                            </div>
                        </div>
                    </div>

                    {/* Need Help */}
                    <div className="bg-zinc-900 rounded-md p-3.5 flex flex-col gap-2.5">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                                <LifeBuoy className="w-4.5 h-4.5 text-amber-400" />
                            </div>
                            <p className="text-[12px] font-bold text-white">Need Help?</p>
                        </div>
                        <p className="text-[11px] text-zinc-300 leading-snug">
                            Our payroll experts are here to help you with the setup.
                        </p>
                        <button className="flex items-center justify-center gap-1.5 h-8 px-3 bg-amber-400 rounded-md text-[11.5px] font-bold text-zinc-900 hover:bg-amber-300 transition-colors">
                            <Phone className="w-3.5 h-3.5" /> Schedule a Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}