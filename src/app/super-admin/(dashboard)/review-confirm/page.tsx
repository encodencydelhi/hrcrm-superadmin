"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCompanyWizardStore } from '@/store/companyWizardStore';
import { generateTempPassword } from '@/lib/generatePassword';
import api from '@/lib/axios';
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
    XCircle,
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

const MODULE_LABELS: Record<string, string> = {
    employee: 'Employee Management', attendance: 'Attendance Management', leave: 'Leave Management',
    payroll: 'Payroll Management', performance: 'Performance Management', recruitment: 'Recruitment & Onboarding',
    training: 'Training & Development', assets: 'Assets Management', documents: 'Documents Management',
    helpdesk: 'Helpdesk & Tickets', expense: 'Expense Management', mobile: 'Mobile App Access',
};

const ADDON_LABELS: Record<string, { name: string; priceINR: number }> = {
    'ai-analytics': { name: 'AI & Predictive Analytics', priceINR: 20 },
    'advanced-recruitment': { name: 'Advanced Recruitment', priceINR: 15 },
    'learning-management': { name: 'Learning Management', priceINR: 15 },
    'expense-management': { name: 'Expense Management', priceINR: 10 },
    'helpdesk-tickets': { name: 'Helpdesk & Tickets', priceINR: 10 },
};

export default function ReviewConfirmPage() {
    const router = useRouter();
    const w = useCompanyWizardStore();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [draftSaved, setDraftSaved] = useState(false);

    useEffect(() => {
        if (w.maxStepReached < 5) router.replace(STEP_ROUTES[w.maxStepReached] || '/super-admin/step-1');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [adminFirstName, ...adminLastNameParts] = w.adminFullName.trim().split(' ');
    const adminLastName = adminLastNameParts.join(' ') || adminFirstName || 'Admin';

    const pkg = w.selectedPackage;
    const planPricePerUser = pkg ? (w.billingCycle === 'YEARLY' ? pkg.pricePerUserYearlyINR : pkg.pricePerUserMonthlyINR) : 0;
    const subscriptionAmount = pkg ? planPricePerUser * w.estimatedEmployees : 0;

    const isEditing = !!w.editingTenantId;

    const handleConfirm = async () => {
        if (!pkg) {
            setError('No subscription package selected — go back to Step 2.');
            return;
        }
        setError('');
        setSubmitting(true);
        const payload: Record<string, any> = {
            name: w.name,
            packageId: pkg._id,
            adminFirstName: adminFirstName || 'Admin',
            adminLastName,
            adminEmail: w.adminEmail,
            adminDesignation: w.adminDesignation,
            adminPhone: w.adminPhone,
            country: w.country,
            tradeName: w.tradeName,
            industry: w.industry,
            website: w.website,
            email: w.email,
            phone: w.phone,
            addressLine1: w.addressLine1,
            addressLine2: w.addressLine2,
            city: w.city,
            state: w.state,
            postalCode: w.postalCode,
            timezone: w.timezone,
            baseCurrency: w.baseCurrency,
            financialYearStartMonth: w.financialYearStartMonth,
            panNumber: w.panNumber,
            gstin: w.gstin,
            cin: w.cin,
            logoUrl: w.logoUrl,
            billingCycle: w.billingCycle,
            subscriptionAmount,
            subscriptionCurrency: 'INR',
            estimatedEmployees: w.estimatedEmployees,
            corporateId: w.corporateId,
            companySize: w.companySize,
            description: w.description,
            incorporationDate: w.incorporationYear ? `${w.incorporationYear}-01-01` : undefined,
            alternateEmail: w.alternateEmail,
            whatsappNumber: w.whatsappNumber,
            preferredLanguage: w.preferredLanguage,
            supportEmail: w.supportEmail,
            supportPhone: w.supportPhone,
            linkedInUrl: w.linkedInUrl,
            selectedModules: Object.keys(w.selectedModules).filter((k) => w.selectedModules[k]),
            addonModules: w.addonModules,
            documents: {
                incorporationCertUrl: w.incorporationCertUrl,
                gstCertUrl: w.gstCertUrl,
                panCardUrl: w.panCardUrl,
                otherDocumentUrl: w.otherDocumentUrl,
            },
            notificationPreferences: w.notificationPreferences,
            weekStartsOn: w.weekStartsOn,
            dateFormat: w.dateFormat,
            timeFormat: w.timeFormat,
            numberFormat: w.numberFormat,
            leaveYearStartMonth: w.leaveYearStartMonth,
        };

        try {
            if (isEditing) {
                await api.put(`/super-admin/tenants/${w.editingTenantId}`, payload);
                w.reset();
                router.push('/super-admin/companies');
                return;
            }

            const res = await api.post('/super-admin/tenants', { ...payload, adminPassword: generateTempPassword() });
            const created = res.data;
            w.reset();
            const params = new URLSearchParams({
                companyId: created._id,
                name: payload.name,
                corporateId: payload.corporateId,
                industry: payload.industry,
                companySize: payload.companySize,
                adminName: `${payload.adminFirstName} ${payload.adminLastName}`,
                adminEmail: payload.adminEmail,
                adminDesignation: payload.adminDesignation,
                planName: pkg.name,
                pricePerUser: String(planPricePerUser),
                estimatedEmployees: String(payload.estimatedEmployees),
                modulesEnabled: String(payload.selectedModules.length),
                modulesTotal: String(Object.keys(w.selectedModules).length),
                credentialsEmailSent: String(!!created.credentialsEmailSent),
            });
            router.push(`/super-admin/company-created-successfully?${params.toString()}`);
        } catch (e: any) {
            setError(e?.response?.data?.message || `Something went wrong while ${isEditing ? 'saving changes' : 'creating the company'}. Please review the details and try again.`);
            setSubmitting(false);
        }
    };

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
                <h1 className="text-[16px] font-bold text-[#020b22]">{isEditing ? 'Edit Company' : 'Add New Company'}</h1>
                <p className="text-[10px] text-zinc-500 mt-0.5">Review all details and confirm to {isEditing ? 'save changes' : 'create the company'}</p>
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
                                        <span className="text-[12px] font-medium text-slate-700">{w.name || '—'}</span>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                                        <span className="text-[12px] text-slate-500 font-medium">Corporate ID</span>
                                        <span className="text-[12px] font-medium text-slate-700">{w.corporateId || '—'}</span>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                                        <span className="text-[12px] text-slate-500 font-medium">Industry</span>
                                        <span className="text-[12px] font-medium text-slate-700">{w.industry || '—'}</span>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                                        <span className="text-[12px] text-slate-500 font-medium">Company Size</span>
                                        <span className="text-[12px] font-medium text-slate-700">{w.companySize || '—'}</span>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                                        <span className="text-[12px] text-slate-500 font-medium">Website</span>
                                        <span className="text-[12px] font-medium text-slate-700 break-all">{w.website || '—'}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[12px] text-slate-500 font-medium">GSTIN / Tax ID</span>
                                        <span className="text-[12px] font-medium text-slate-700">{w.gstin || '—'}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[12px] text-slate-500 font-medium">PAN</span>
                                        <span className="text-[12px] font-medium text-slate-700">{w.panNumber || '—'}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[12px] text-slate-500 font-medium">Registration Number</span>
                                        <span className="text-[12px] font-medium text-slate-700 truncate">{w.cin || '—'}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[12px] text-slate-500 font-medium">Year of Establishment</span>
                                        <span className="text-[12px] font-medium text-slate-700">{w.incorporationYear || '—'}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[12px] text-slate-500 font-medium">Currency</span>
                                        <span className="text-[12px] font-medium text-slate-700">{w.baseCurrency}</span>
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
                                    <span className="text-[12px] font-medium text-slate-700">{pkg?.name || '—'}</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Billing</span>
                                    <span className="text-[12px] font-medium text-slate-700">{pkg ? `₹ ${planPricePerUser} / Employee / Month` : '—'}</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Employees (Estimated)</span>
                                    <span className="text-[12px] font-medium text-slate-700">{w.estimatedEmployees}</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Add-on Modules</span>
                                    <span className="text-[12px] font-medium text-slate-700">
                                        {w.addonModules.length
                                            ? w.addonModules.map((id) => ADDON_LABELS[id]?.name || id).join(', ')
                                            : 'None'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Billing Cycle</span>
                                    <span className="text-[12px] font-medium text-slate-700">{w.billingCycle === 'YEARLY' ? 'Yearly' : 'Monthly'}</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">Invoice Currency</span>
                                    <span className="text-[12px] font-medium text-slate-700">{w.invoiceCurrency}</span>
                                </div>
                                <div className="grid grid-cols-[180px_1fr] items-start gap-2">
                                    <span className="text-[12px] text-slate-500 font-medium">GST Treatment</span>
                                    <span className="text-[12px] font-medium text-slate-700">{w.gstTreatment}</span>
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
                                    <span className="text-[11px] font-medium text-slate-700">{w.adminFullName || '—'}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Designation</span>
                                    <span className="text-[11px] font-medium text-slate-700">{w.adminDesignation || '—'}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Email Address</span>
                                    <span className="text-[11px] font-medium text-[#3b82f6] break-all">{w.adminEmail || '—'}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Phone Number</span>
                                    <span className="text-[11px] font-medium text-slate-700">{w.adminPhone ? `+91 ${w.adminPhone}` : '—'}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Preferred Language</span>
                                    <span className="text-[11px] font-medium text-slate-700">{w.preferredLanguage}</span>
                                </div>
                                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 items-start">
                                    <div className="col-span-2 text-[12px] text-[#1e293b] font-bold">Company Communication</div>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Official Email</span>
                                    <span className="text-[11px] font-medium text-[#3b82f6] break-all">{w.email || '—'}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Official Phone</span>
                                    <span className="text-[11px] font-medium text-slate-700">{w.phone ? `+91 ${w.phone}` : '—'}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Support Email</span>
                                    <span className="text-[11px] font-medium text-[#3b82f6] break-all">{w.supportEmail || '—'}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Support Phone</span>
                                    <span className="text-[11px] font-medium text-slate-700">{w.supportPhone ? `+91 ${w.supportPhone}` : '—'}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Company Website</span>
                                    <span className="text-[11px] font-medium text-[#3b82f6] break-all">{w.website || '—'}</span>
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
                                    <span className="text-[11px] font-medium text-slate-700">Apr - Mar (FY {new Date().getFullYear()}-{String(new Date().getFullYear() + 1).slice(2)})</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Week Starts On</span>
                                    <span className="text-[11px] font-medium text-slate-700">{w.weekStartsOn}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Timezone</span>
                                    <span className="text-[11px] font-medium text-slate-700 truncate">{w.timezone}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Date Format</span>
                                    <span className="text-[11px] font-medium text-slate-700">{w.dateFormat}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Time Format</span>
                                    <span className="text-[11px] font-medium text-slate-700">{w.timeFormat}</span>
                                </div>
                                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 items-start">
                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Default Currency</span>
                                    <span className="text-[11px] font-medium text-slate-700">{w.baseCurrency}</span>

                                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Number Format</span>
                                    <span className="text-[11px] font-medium text-slate-700">{w.numberFormat}</span>

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
                            {[0, 1, 2].map((col) => {
                                const entries = Object.entries(w.selectedModules);
                                const chunkSize = Math.ceil(entries.length / 3) || 1;
                                const chunk = entries.slice(col * chunkSize, (col + 1) * chunkSize);
                                return (
                                    <div key={col} className="space-y-4">
                                        {chunk.map(([id, enabled]) => (
                                            <div key={id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 font-medium">
                                                    {enabled ? <CheckCircle2 size={14} className="text-emerald-500" /> : <XCircle className="text-zinc-300" size={14} />} {MODULE_LABELS[id] || id}
                                                </div>
                                                <span className={`text-[11px] font-semibold ${enabled ? 'text-emerald-600' : 'text-zinc-400'}`}>{enabled ? 'Enabled' : 'Disabled'}</span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                            {/* Col 4 (Additional Preferences) */}
                            <div className="space-y-4 pt-4 md:pt-0">
                                <h3 className="text-[12px] font-bold text-zinc-800 mb-3 border-b border-zinc-100 pb-1">Additional Preferences</h3>
                                {([
                                    ['Biometric Integration', w.notificationPreferences.biometric],
                                    ['Single Sign-On (SSO)', w.notificationPreferences.sso],
                                    ['Geo Location Tracking', w.notificationPreferences.geoTracking],
                                    ['Email Notifications', w.notificationPreferences.email],
                                    ['WhatsApp Notifications', w.notificationPreferences.whatsapp],
                                    ['SMS Notifications', w.notificationPreferences.sms],
                                ] as [string, boolean][]).map(([label, enabled]) => (
                                    <div key={label} className="flex items-center justify-between">
                                        <div className="text-[12px] text-zinc-700 font-medium">{label}</div>
                                        <span className={`text-[11px] font-semibold ${enabled ? 'text-emerald-600' : 'text-zinc-400'}`}>{enabled ? 'Enabled' : 'Disabled'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-[12px] text-rose-700 font-medium">{error}</div>
                    )}

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between pt-2 pb-2">
                        <button type="button" onClick={() => router.push('/super-admin/system-configuration')} className="flex items-center gap-1.5 px-4 py-2 border border-zinc-200 bg-white rounded-lg text-zinc-700 text-[13px] font-semibold hover:bg-zinc-50 transition-colors shadow-sm">
                            <ArrowLeft size={16} /> Back
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => { setDraftSaved(true); setTimeout(() => setDraftSaved(false), 2000); }}
                                className="px-5 py-2 border border-zinc-200 bg-white rounded-lg text-zinc-700 text-[13px] font-semibold hover:bg-zinc-50 transition-colors shadow-sm"
                            >
                                {draftSaved ? 'Saved ✓' : 'Save as Draft'}
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                disabled={submitting}
                                className="flex items-center gap-1.5 px-5 py-2 bg-[#020b22] text-white rounded-lg text-[13px] font-semibold hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
                            >
                                {submitting ? (isEditing ? 'Saving…' : 'Creating…') : (isEditing ? 'Save Changes' : 'Confirm & Create Company')} <ArrowRight size={16} />
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
                                <span className="text-[12px] font-semibold text-zinc-900">{w.name || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <ShieldCheck size={14} />
                                    <span className="text-[12px]">Plan</span>
                                </div>
                                <span className="text-[12px] font-semibold text-zinc-900">{pkg?.name || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <Users size={14} />
                                    <span className="text-[12px]">Employees (Estimated)</span>
                                </div>
                                <span className="text-[12px] font-semibold text-zinc-900">{w.estimatedEmployees}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <CreditCard size={14} />
                                    <span className="text-[12px]">Billing</span>
                                </div>
                                <span className="text-[12px] font-semibold text-zinc-900">{pkg ? `₹ ${planPricePerUser} / Employee / Month` : '—'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <Cpu size={14} />
                                    <span className="text-[12px]">Add-on Modules</span>
                                </div>
                                <span className="text-[12px] font-semibold text-indigo-600">{w.addonModules.length ? `${w.addonModules.length} Selected` : 'None'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <UserCog size={14} />
                                    <span className="text-[12px]">Admin User</span>
                                </div>
                                <span className="text-[12px] font-semibold text-zinc-900">{w.adminFullName || '—'}</span>
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
                        <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
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
