'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Home, Check, Info, Send, Rocket, Wand2, SlidersHorizontal, ChevronDown, Headphones, ArrowRight, ArrowLeft, } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCompanyWizardStore, WizardPackage } from '@/store/companyWizardStore';
import api from '@/lib/axios';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Step {
    id: number;
    title: string;
    subtitle: string;
}

interface Plan {
    id: string;
    name: string;
    tagline: string;
    price: number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    nameColor: string;
    cardBg: string;
    features: string[];
    cta: string;
    ctaStyle: 'outline' | 'solid' | 'outline-amber';
    highlighted?: boolean;
    badge?: string;
}

interface AddonModule {
    id: string;
    name: string;
    price: string;
}

// ─── Static data ────────────────────────────────────────────────────────────
const STEPS: Step[] = [
    { id: 1, title: 'Basic Information', subtitle: 'Completed' },
    { id: 2, title: 'Subscription & Plan', subtitle: 'Choose plan' },
    { id: 3, title: 'Admin & Contact', subtitle: 'Primary contact details' },
    { id: 4, title: 'Configuration', subtitle: 'System preferences' },
    { id: 5, title: 'Review & Confirm', subtitle: 'Verify and create' },
];

// Visual styling keyed by package tier — the package data itself (name, price, features)
// now comes from the real `/super-admin/packages` API instead of being hardcoded here.
// Every fetched package is a real, immediately selectable plan in this wizard (there's no
// separate "contact sales" workflow), so every tier — including packages whose `tier` field
// is unset and defaults to CUSTOM in the schema — always renders a clickable "Select Plan".
const TIER_STYLE: Record<string, Omit<Plan, 'id' | 'name' | 'tagline' | 'price' | 'features'>> = {
    BASIC: {
        icon: <Send size={18} />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600',
        nameColor: 'text-zinc-900', cardBg: 'bg-emerald-50/40', cta: 'Select Plan', ctaStyle: 'outline',
    },
    PROFESSIONAL: {
        icon: <Rocket size={18} />, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
        nameColor: 'text-indigo-700', cardBg: 'bg-indigo-50/60', cta: 'Select Plan', ctaStyle: 'solid',
        highlighted: true, badge: 'Most Popular',
    },
    ENTERPRISE: {
        icon: <Wand2 size={18} />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
        nameColor: 'text-zinc-900', cardBg: 'bg-purple-50/40', cta: 'Select Plan', ctaStyle: 'outline',
    },
    CUSTOM: {
        icon: <SlidersHorizontal size={18} />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
        nameColor: 'text-zinc-900', cardBg: 'bg-amber-50/40', cta: 'Select Plan', ctaStyle: 'outline-amber',
    },
};
const DEFAULT_TIER_STYLE = TIER_STYLE.CUSTOM;

function packageToPlan(pkg: WizardPackage, billing: 'monthly' | 'yearly'): Plan {
    const style = TIER_STYLE[pkg.tier] || DEFAULT_TIER_STYLE;
    const price = billing === 'yearly' ? pkg.pricePerUserYearlyINR : pkg.pricePerUserMonthlyINR;
    return {
        id: pkg._id,
        name: pkg.name,
        tagline: `Up to ${pkg.maxUsers} employees`,
        price,
        features: pkg.features?.length ? pkg.features : ['Core HR & Employee Profile'],
        ...style,
    };
}

const ADDON_MODULES: AddonModule[] = [
    { id: 'ai-analytics', name: 'AI & Predictive Analytics', price: '₹ 20 / Employee / Month' },
    { id: 'advanced-recruitment', name: 'Advanced Recruitment', price: '₹ 15 / Employee / Month' },
    { id: 'learning-management', name: 'Learning Management', price: '₹ 15 / Employee / Month' },
    { id: 'expense-management', name: 'Expense Management', price: '₹ 10 / Employee / Month' },
    { id: 'helpdesk-tickets', name: 'Helpdesk & Tickets', price: '₹ 10 / Employee / Month' },
];

const WHATS_INCLUDED = [
    'All features in Starter Plan',
    'Payroll Management',
    'Advanced Attendance',
    'Performance Management',
    'Reports & Analytics',
    'Priority Support',
];

// ─── Small building blocks ─────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
    return <label className="text-[12.5px] font-semibold text-zinc-700">{children}</label>;
}

function SelectField({ label, options, value, onChange }: { label: string; options: string[]; value?: string; onChange?: (v: string) => void }) {
    return (
        <div className="flex flex-col gap-1.5 min-w-0">
            <FieldLabel>{label}</FieldLabel>
            <div className="relative">
                <select value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full h-9 appearance-none rounded-lg border border-zinc-200 bg-white px-3 pr-8 text-[12.5px] font-medium text-zinc-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer">
                    {options.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>
        </div>
    );
}

// ─── Breadcrumb + heading ───────────────────────────────────────────────────
function PageHeading() {
    return (
        <section className="py-1">
            <div className="flex items-center gap-1.5 text-[12px] text-zinc-500">
                <Link href="/dashboard" className="flex items-center gap-1 hover:text-indigo-700">
                    <Home size={12} /> Home
                </Link>
                <ChevronRight size={12} />
                <Link href="/dashboard/companies" className="hover:text-indigo-700">Companies</Link>
                <ChevronRight size={12} />
                <span className="text-zinc-700 font-medium">Add New Company</span>
            </div>
            <h1 className="mt-1 text-xl font-bold text-zinc-900 leading-tight">Add New Company</h1>
            <p className="text-[13px] text-zinc-500 mt-0.5">Choose subscription plan and configure billing preferences</p>
        </section>
    );
}

const STEP_ROUTES: Record<number, string> = {
    1: '/super-admin/step-1',
    2: '/super-admin/step-2',
    3: '/super-admin/step-3',
    4: '/super-admin/system-configuration',
    5: '/super-admin/review-confirm',
};

function StepIndicator({ current, maxStepReached }: { current: number; maxStepReached: number }) {
    const steps = [
        { id: 1, title: 'Basic Information', subtitle: 'Enter details' },
        { id: 2, title: 'Subscription & Plan', subtitle: 'Select package' },
        { id: 3, title: 'Admin & Contact', subtitle: 'Primary contact details' },
        { id: 4, title: 'Configuration', subtitle: 'System preferences' },
        { id: 5, title: 'Review & Confirm', subtitle: 'Verify and create' },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-3 flex items-center justify-between">
            {steps.map((step, index) => {
                const isCompleted = step.id < current;
                const isActive = step.id === current;
                const isPending = step.id > current;
                const isUnlocked = step.id <= maxStepReached;
                const stepLink = STEP_ROUTES[step.id];

                const content = (
                    <>
                        {isCompleted && (
                            <div className="h-10 w-10 rounded-full bg-emerald-100/80 flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors">
                                <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                            </div>
                        )}
                        {isActive && (
                            <div className="h-10 w-10 rounded-full bg-[#020b22] text-white flex items-center justify-center shrink-0 font-bold text-[14px] shadow-sm">
                                {step.id}
                            </div>
                        )}
                        {isPending && (
                            <div className={`h-10 w-10 rounded-full border flex items-center justify-center shrink-0 font-bold text-[14px] shadow-sm transition-colors ${isUnlocked ? 'bg-slate-100 border-slate-200 text-[#020b22] group-hover:bg-slate-200' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                                {step.id}
                            </div>
                        )}

                        <div className="flex flex-col">
                            <span className={`text-[12px] font-bold transition-colors ${isUnlocked ? 'text-[#020b22] group-hover:text-indigo-600' : 'text-slate-300'}`}>{step.title}</span>
                            <span className="text-[11px] text-slate-500 leading-tight mt-0.5">
                                {isCompleted ? 'Completed' : step.subtitle}
                            </span>
                        </div>
                    </>
                );

                return (
                    <div key={step.id} className={`flex items-center gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                        {isUnlocked ? (
                            <Link href={stepLink} className="flex items-center gap-3 group">{content}</Link>
                        ) : (
                            <div className="flex items-center gap-3 cursor-not-allowed">{content}</div>
                        )}
                        {index < steps.length - 1 && (
                            <div className="flex-1 h-px bg-slate-200 mx-4 hidden lg:block"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ─── Billing toggle ─────────────────────────────────────────────────────────
function BillingToggle({ value, onChange }: { value: 'monthly' | 'yearly'; onChange: (v: 'monthly' | 'yearly') => void }) {
    return (
        <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1">
            <button
                type="button"
                onClick={() => onChange('monthly')}
                className={`rounded-md px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${value === 'monthly' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
                    }`}
            >
                Monthly
            </button>
            <button
                type="button"
                onClick={() => onChange('yearly')}
                className={`rounded-md px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${value === 'yearly' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
                    }`}
            >
                Yearly <span className={value === 'yearly' ? 'text-emerald-400' : 'text-emerald-500'}>(Save up to 20%)</span>
            </button>
        </div>
    );
}

// ─── Plan card ──────────────────────────────────────────────────────────────
function PlanCard({ plan, selected, onSelect }: { plan: Plan; selected: boolean; onSelect: () => void }) {
    const ctaClasses =
        plan.ctaStyle === 'solid'
            ? 'bg-indigo-700 text-white hover:bg-indigo-800 border border-indigo-700'
            : plan.ctaStyle === 'outline-amber'
                ? 'bg-white text-amber-600 border border-amber-300 hover:bg-amber-50'
                : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50';

    return (
        <div
            onClick={onSelect}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
            className={`relative flex flex-col rounded-xl border p-2 cursor-pointer transition-shadow ${plan.badge ? 'pt-5' : ''} ${plan.cardBg} ${selected ? 'border-indigo-400 ring-2 ring-indigo-300 shadow-md' : plan.highlighted ? 'border-indigo-300 ring-1 ring-indigo-200' : 'border-zinc-200 hover:border-indigo-200'
                }`}
        >
            {plan.badge && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-zinc-900 px-2.5 py-1 text-[9px] font-bold text-white whitespace-nowrap">
                    {plan.badge}
                </span>
            )}

            <div className="flex items-center gap-2.5">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl ${plan.iconBg} ${plan.iconColor}`}>
                    {plan.icon}
                </span>
                <div className="min-w-0 flex-1">
                    <h3 className={`text-[12px] font-bold leading-tight ${plan.nameColor}`}>{plan.name}</h3>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">{plan.tagline}</p>
                </div>
            </div>

            <div className="mt-1.5 flex items-baseline gap-1">
                <span className="text-[14px] font-bold text-zinc-900">₹</span>
                <span className="text-xl font-extrabold text-zinc-900">{plan.price}</span>
            </div>
            <p className="text-[10.5px] text-zinc-400">Per Employee / Month</p>

            <ul className="mt-2 space-y-1 flex-1">
                {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[11px] text-zinc-600">
                        <Check size={12} className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-indigo-500' : 'text-emerald-500'}`} />
                        {f}
                    </li>
                ))}
            </ul>

            <button
                type="button"
                onClick={onSelect}
                className={`mt-2 w-full rounded-lg py-1.5 text-[12px] font-semibold transition-colors ${ctaClasses}`}
            >
                {plan.cta}
            </button>
        </div>
    );
}

// ─── Add-on module checkbox card ───────────────────────────────────────────
function AddonCard({ addon, checked, onToggle }: { addon: AddonModule; checked: boolean; onToggle: () => void }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`relative flex flex-col gap-1 rounded-sm border p-1 text-left transition-colors ${checked ? 'border-indigo-400 bg-indigo-50/40' : 'border-zinc-200 bg-white hover:bg-zinc-50'
                }`}
        >
            <Info size={13} className="absolute top-2 right-2 text-zinc-300 shrink-0" />

            <div className="flex items-start gap-2 pr-2">
                <span
                    className={`mt-0.5 grid h-3 w-3 shrink-0 place-items-center rounded border ${checked ? 'bg-indigo-700 border-indigo-700' : 'border-zinc-300 bg-white'
                        }`}
                >
                    {checked && <Check size={11} className="text-white" />}
                </span>
                <p className="text-[10px] font-semibold text-zinc-800 leading-snug">{addon.name}</p>
            </div>
            <p className="text-[10px] text-zinc-400">{addon.price}</p>
        </button>
    );
}

// ─── Combined Subscription + Add-ons + Billing card ────────────────────────
function SubscriptionAndBillingCard({
    plans,
    loadingPlans,
    selectedPlanId,
    setSelectedPlanId,
    billing,
    setBilling,
    selectedAddons,
    toggleAddon,
}: {
    plans: Plan[];
    loadingPlans: boolean;
    selectedPlanId: string;
    setSelectedPlanId: (id: string) => void;
    billing: 'monthly' | 'yearly';
    setBilling: (v: 'monthly' | 'yearly') => void;
    selectedAddons: string[];
    toggleAddon: (id: string) => void;
}) {
    const w = useCompanyWizardStore();
    const router = useRouter();
    return (
        <Card className="rounded-sm border-zinc-200/80 shadow-sm">
            <CardContent className="p-3 space-y-3">
                {/* Select Subscription Plan */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                        <h3 className="text-[14px] font-bold text-zinc-900">Select Subscription Plan</h3>
                        <p className="text-[11.5px] text-zinc-400 text-justify">Choose the most suitable plan for your organization</p>
                    </div>
                    <BillingToggle value={billing} onChange={setBilling} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    {loadingPlans ? (
                        <p className="text-[12px] text-zinc-400 col-span-full py-4 text-center">Loading packages…</p>
                    ) : plans.length === 0 ? (
                        <p className="text-[12px] text-zinc-400 col-span-full py-4 text-center">No active packages found. Create one under Packages first.</p>
                    ) : plans.map((plan) => (
                        <PlanCard key={plan.id} plan={plan} selected={selectedPlanId === plan.id} onSelect={() => setSelectedPlanId(plan.id)} />
                    ))}
                </div>

                {/* Add-on Modules */}
                <div className="space-y-2">
                    <div>
                        <h3 className="text-[13px] font-bold text-zinc-900">Add-on Modules (Optional)</h3>
                        <p className="text-[11.5px] text-zinc-400 text-justify">Extend your plan with powerful add-ons</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2">
                        {ADDON_MODULES.map((addon) => (
                            <AddonCard key={addon.id} addon={addon} checked={selectedAddons.includes(addon.id)} onToggle={() => toggleAddon(addon.id)} />
                        ))}
                    </div>
                </div>

                {/* Billing Preferences */}
                <div className="space-y-2">
                    <div>
                        <h3 className="text-[13px] font-bold text-zinc-900">Billing Preferences</h3>
                        <p className="text-[11.5px] text-zinc-400 text-justify">Configure billing cycle and payment terms</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
                        <SelectField label="Billing Cycle" options={['Monthly', 'Quarterly', 'Annually']} value={billing === 'yearly' ? 'Annually' : 'Monthly'} onChange={() => {}} />
                        <SelectField label="Advance Payment" options={['1 Month', '2 Months', '3 Months', 'None']} value={w.advancePayment} onChange={(v) => w.update({ advancePayment: v })} />
                        <SelectField label="Invoice Currency" options={['INR (₹) - Indian Rupee', 'USD ($) - US Dollar', 'EUR (€) - Euro', 'GBP (£) - British Pound']} value={w.invoiceCurrency} onChange={(v) => w.update({ invoiceCurrency: v })} />
                        <SelectField label="GST Treatment" options={['Exclusive of GST', 'Inclusive of GST', 'Not Applicable']} value={w.gstTreatment} onChange={(v) => w.update({ gstTreatment: v })} />
                    </div>
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between gap-2">
                    <button type="button" onClick={() => router.push('/super-admin/step-1')} className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2 text-[12px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors">
                        <ArrowLeft size={14} /> Back
                    </button>
                    <button type="submit" disabled={!selectedPlanId} className="flex items-center gap-1.5 rounded-md bg-indigo-700 px-5 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-indigo-800 transition-colors disabled:opacity-50">
                        Save &amp; Next <ChevronRight size={14} />
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}

// ─── Right rail ─────────────────────────────────────────────────────────────
function addonPricePerEmployee(addon: AddonModule): number {
    const match = addon.price.match(/[\d,]+/);
    return match ? Number(match[0].replace(/,/g, '')) : 0;
}

function SubscriptionSummary({ plan, addons, employees, onEmployeesChange }: { plan: Plan; addons: AddonModule[]; employees: number; onEmployeesChange: (n: number) => void }) {
    const planAmount = plan.price * employees;
    const addonAmount = addons.reduce((sum, a) => sum + addonPricePerEmployee(a), 0) * employees;
    const total = planAmount + addonAmount;

    return (
        <div className="rounded-sm bg-white shadow-sm border border-zinc-200/80 p-3">
            <p className="text-[13px] font-semibold text-zinc-500">Subscription Summary</p>

            <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-600">Selected Plan</span>
                {plan.badge && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-500">{plan.badge}</span>
                )}
            </div>

            <p className="text-md font-bold text-blue-600">{plan.name}</p>
            <p className="text-md font-bold text-amber-500">₹ {plan.price}</p>
            <p className="text-[10.5px] text-zinc-600">Per Employee / Month</p>

            <div className="mt-2 space-y-2 border-t border-zinc-200 pt-2">
                <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-600">Employees (Estimated)</span>
                    <input
                        type="number"
                        min={1}
                        value={employees}
                        onChange={(e) => onEmployeesChange(Math.max(1, Number(e.target.value) || 1))}
                        className="w-16 h-6 text-right rounded border border-zinc-200 px-1.5 text-[11px] font-semibold text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>
                <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-zinc-600">Plan Amount</span>
                    <span className="font-semibold text-zinc-900">₹ {planAmount.toLocaleString('en-IN')} / Month</span>
                </div>
                <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-zinc-600">Add-on Modules</span>
                    <span className="font-semibold text-zinc-900">₹ {addonAmount.toLocaleString('en-IN')} / Month</span>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-zinc-200 pt-2">
                <span className="text-[11px] font-semibold text-zinc-700">Total (Estimated)</span>
                <span className="text-[10px] font-bold text-blue-700">₹ {total.toLocaleString('en-IN')} / Month</span>
            </div>

            <div className="mt-1 flex gap-1.5 rounded-lg bg-zinc-50 p-1">
                <Info size={12} className="mt-0.5 shrink-0 text-zinc-400" />
                <p className="text-[10px] text-zinc-400 leading-snug">Final amount may vary based on actual employee count.</p>
            </div>
        </div>
    );
}

function WhatsIncludedCard() {
    return (
        <Card className="rounded-sm border-zinc-200/80 shadow-sm">
            <CardContent className="p-2">
                <p className="text-[12px] font-semibold text-zinc-800 mb-2">What&apos;s Included</p>
                <ul className="space-y-1">
                    {WHATS_INCLUDED.map((item) => (
                        <li key={item} className="flex items-center gap-1.5 text-[10px] text-zinc-600">
                            <Check size={13} className="text-emerald-500 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

function NeedHelpChoosingCard() {
    return (
        <div className="rounded-md bg-[#0B1324] p-3 text-white">
            <div className="flex items-start gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                    <Headphones size={16} />
                </span>
                <div>
                    <p className="text-[12px] font-semibold text-white">Need Help Choosing?</p>
                    <p className="text-[11px] text-zinc-400 leading-snug mt-0.5 text-justify">
                        Our experts are here to help you choose the perfect plan.
                    </p>
                </div>
            </div>
            <button className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-md border border-yellow-400 px-3 py-1.5 text-[11px] font-semibold text-amber-400 hover:bg-white/5 hover:text-amber-300 transition-colors">
                Schedule a Demo <ArrowRight size={13} />
            </button>
        </div>
    );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function SubscriptionPlanStep() {
    const router = useRouter();
    const w = useCompanyWizardStore();
    const [currentStep] = useState(2);
    const [rawPackages, setRawPackages] = useState<WizardPackage[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [selectedPlanId, setSelectedPlanId] = useState(w.selectedPackage?._id || '');
    const [billing, setBilling] = useState<'monthly' | 'yearly'>(w.billingCycle === 'YEARLY' ? 'yearly' : 'monthly');
    const [selectedAddons, setSelectedAddons] = useState<string[]>(w.addonModules);
    const [employees, setEmployees] = useState(w.estimatedEmployees);

    useEffect(() => {
        if (w.maxStepReached < 2) router.replace(STEP_ROUTES[w.maxStepReached] || '/super-admin/step-1');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        api.get('/super-admin/packages').then((res) => {
            const active = (res.data || []).filter((p: any) => p.isActive !== false);
            setRawPackages(active);
            if (!selectedPlanId && active.length) setSelectedPlanId(active[0]._id);
        }).catch((e) => console.error('Failed to load packages:', e)).finally(() => setLoadingPlans(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const plans = rawPackages.map((p) => packageToPlan(p, billing));
    const selectedPlan = plans.find((p) => p.id === selectedPlanId);
    const selectedAddonObjs = ADDON_MODULES.filter((a) => selectedAddons.includes(a.id));

    const toggleAddon = (id: string) => {
        setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const pkg = rawPackages.find((p) => p._id === selectedPlanId);
        if (!pkg) return;
        w.update({
            selectedPackage: pkg,
            billingCycle: billing === 'yearly' ? 'YEARLY' : 'MONTHLY',
            addonModules: selectedAddons,
            estimatedEmployees: employees,
        });
        w.unlockStep(3);
        router.push('/super-admin/step-3');
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
            <main className="mx-auto max-w-[1600px]  space-y-2">
                <PageHeading />
                <StepIndicator current={currentStep} maxStepReached={w.maxStepReached} />

                <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[3.3fr_0.9fr] gap-4 items-start">
                    <div className="space-y-3 min-w-0">
                        <SubscriptionAndBillingCard
                            plans={plans}
                            loadingPlans={loadingPlans}
                            selectedPlanId={selectedPlanId}
                            setSelectedPlanId={setSelectedPlanId}
                            billing={billing}
                            setBilling={setBilling}
                            selectedAddons={selectedAddons}
                            toggleAddon={toggleAddon}
                        />
                    </div>

                    <div className="space-y-3 min-w-0 xl:sticky xl:top-4 xl:max-w-[300px] xl:justify-self-end w-full">
                        {selectedPlan && <SubscriptionSummary plan={selectedPlan} addons={selectedAddonObjs} employees={employees} onEmployeesChange={setEmployees} />}
                        <WhatsIncludedCard />
                        <NeedHelpChoosingCard />
                    </div>
                </form>
            </main>
        </div>
    );
}