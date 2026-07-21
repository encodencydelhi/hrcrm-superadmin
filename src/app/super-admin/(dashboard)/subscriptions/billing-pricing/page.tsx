'use client';
import React, { useState } from 'react';
import { PlanProgressBar } from '@/components/layout/PlanProgressBar';
import Link from 'next/link';
import {
  Home, ChevronRight, ArrowLeft, ArrowRight, Check, Rocket,
  User, FileText, Info, Headphones, ExternalLink,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSubscriptionPlanStore } from '@/store/subscriptionPlanStore';
import toast from 'react-hot-toast';

// ─── Static data ────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, title: 'Plan Details' },
  { id: 2, title: 'Features & Limits' },
  { id: 3, title: 'Add-on Modules' },
  { id: 4, title: 'Billing & Pricing' },
  { id: 5, title: 'Review & Create' },
];

const BREADCRUMB = ['Home', 'Subscriptions', 'Subscription Plans', 'Create New Plan'];

const BILLING_CYCLES = [
  { id: 'monthly', label: 'Monthly', save: null },
  { id: 'quarterly', label: 'Quarterly', save: 'Save 10%' },
  { id: 'yearly', label: 'Yearly', save: 'Save 20%' },
];

// Preview features dynamic array generated inside component

// ─── Breadcrumb + heading ───────────────────────────────────────────────────
function PageHeading() {
  return (
    <section className="space-y-1">
      <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 flex-wrap">
        {BREADCRUMB.map((crumb, i) => (
          <React.Fragment key={crumb}>
            {i === 0 ? (
              <span className="flex items-center gap-1 text-indigo-600 font-medium hover:underline cursor-pointer">
                <Home size={12} /> {crumb}
              </span>
            ) : i === BREADCRUMB.length - 1 ? (
              <span className="text-zinc-900 font-semibold">{crumb}</span>
            ) : (
              <span className="text-indigo-600 font-medium hover:underline cursor-pointer">{crumb}</span>
            )}
            {i < BREADCRUMB.length - 1 && <ChevronRight size={12} />}
          </React.Fragment>
        ))}
      </div>
      <h1 className="text-1xl font-bold text-zinc-900 leading-tight">Create New Plan</h1>
      <p className="text-[13px] text-zinc-500">Define plan details, features, and pricing for your organization</p>
    </section>
  );
}

// ─── Step indicator ─────────────────────────────────────────────────────────
const STEP_ROUTES: Record<number, string> = {
  1: '/super-admin/coming-soon?feature=CreateNewPlanStep1',
  2: '/super-admin/create-new-plan-step2',
  3: '/super-admin/Create-new-plan-step5',
  4: '/super-admin/Create-new-plan-step4',
  5: '/super-admin/create-new-plan-step2',
};

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-2 overflow-x-auto p-3">
        {STEPS.map((step, i) => {
          const href = STEP_ROUTES[step.id] || '#';
          return (
            <React.Fragment key={step.id}>
              <Link href={href} className="flex items-center gap-2 shrink-0 group">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-bold transition-colors ${step.id === current
                    ? 'bg-[#16234A] text-white'
                    : step.id < current
                      ? 'bg-emerald-500 text-white group-hover:bg-emerald-600'
                      : 'border-2 border-zinc-200 text-zinc-400 group-hover:border-zinc-300'
                    }`}
                >
                  {step.id < current ? <Check size={15} /> : step.id}
                </span>
                <p className={`hidden sm:block text-[12.5px] font-semibold whitespace-nowrap transition-colors ${step.id === current ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600'}`}>
                  {step.title}
                </p>
              </Link>
              {i < STEPS.length - 1 && <span className="h-px flex-1 min-w-[16px] border-t-2 border-dotted border-zinc-200" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ─── Reusable field shell ───────────────────────────────────────────────────
function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-zinc-700 mb-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10.5px] text-zinc-400 mt-1">{hint}</p>}
    </div>
  );
}

const inputClass =
  'w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[12.5px] text-zinc-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-colors';

// ─── Section card shell ─────────────────────────────────────────────────────
function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm p-4">
      <h3 className="text-[15px] font-bold text-zinc-900">{title}</h3>
      {subtitle && <p className="text-[12px] text-zinc-400 mt-0.5">{subtitle}</p>}
      <div className="mt-4 space-y-5">{children}</div>
    </div>
  );
}

// ─── Pricing model selector ─────────────────────────────────────────────────
function PricingModelSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { id: 'per_employee', icon: User, title: 'Per Employee', desc: 'Charge based on number of employees' },
    { id: 'flat_fee', icon: FileText, title: 'Flat Fee', desc: 'Fixed price regardless of employee count' },
  ];
  return (
    <div>
      <label className="block text-[12px] font-semibold text-zinc-700 mb-2">Pricing Model</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`relative flex items-start gap-2 rounded-md border p-1.5 text-left transition-colors ${active ? 'border-indigo-300 bg-indigo-50/60' : 'border-zinc-200 bg-white hover:bg-zinc-50'
                }`}
            >
              {active && (
                <span className="absolute top-2 right-2.5 grid h-4 w-4 place-items-center rounded-full bg-indigo-600 text-white">
                  <Check size={11} />
                </span>
              )}
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${active ? 'bg-indigo-100 text-indigo-600' : 'bg-zinc-100 text-zinc-500'}`}>
                <opt.icon size={14} />
              </span>
              <span>
                <p className="text-[12px] font-bold text-zinc-900">{opt.title}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{opt.desc}</p>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Billing cycle toggle ───────────────────────────────────────────────────
function BillingCycleToggle({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-zinc-700 mb-2">Billing Cycle</label>
      <div className="flex flex-nowrap items-center gap-1.5">
        {BILLING_CYCLES.map((c, i) =>
          i === 0 ? (
            <button
              key={c.id}
              type="button"
              onClick={() => onChange(c.id)}
              className={`shrink-0 rounded-lg px-4 py-1.5 text-[12px] font-semibold transition-colors ${value === c.id ? 'bg-indigo-600 text-white shadow-sm' : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
                }`}
            >
              {c.label}
            </button>
          ) : (
            <button
              key={c.id}
              type="button"
              onClick={() => onChange(c.id)}
              className={`shrink-0 flex items-center gap-1 px-1.5 py-1.5 text-[12px] font-semibold whitespace-nowrap transition-colors ${value === c.id ? 'text-indigo-600' : 'text-zinc-600 hover:text-zinc-900'
                }`}
            >
              {c.label}
              {c.save && <span className="text-[10px] font-bold text-emerald-600">{c.save}</span>}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ─── Estimated price summary (inline, left column) ─────────────────────────
function EstimatedPriceSummary() {
  const store = useSubscriptionPlanStore();
  
  const addonPrices: Record<string, number> = {
    'ai-analytics': 20,
    'ats': 15,
    'lms': 15,
    'expense': 10,
    'helpdesk': 10,
  };
  
  const basePrice = store.pricePerUserMonthlyINR || 0;
  const addonsTotal = store.addOnModules?.reduce((sum, id) => sum + (addonPrices[id] || 0), 0) || 0;
  const subTotal = basePrice + addonsTotal;
  const gst = subTotal * 0.18;
  const total = subTotal + gst;

  return (
    <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-3">
      <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Estimated Price Summary</p>
      <div className="flex flex-wrap items-center gap-2.5">
        <p className="text-[11px] font-semibold text-zinc-700 whitespace-nowrap">
          Base Price (Per Employee/Month) <span className="font-bold text-zinc-900">₹ {basePrice.toFixed(2)}</span>
        </p>
        <span className="text-zinc-300 text-[14px] shrink-0">+</span>
        <p className="text-[11px] font-semibold text-zinc-700 whitespace-nowrap">
          Add-on Modules (Estimated) <span className="font-bold text-zinc-900">₹ {addonsTotal.toFixed(2)}</span>
        </p>
        <span className="text-zinc-300 text-[14px] shrink-0">+</span>
        <p className="text-[11px] font-semibold text-zinc-700 whitespace-nowrap">
          GST (18%) <span className="font-bold text-zinc-900">₹ {gst.toFixed(2)}</span>
        </p>
        <span className="text-zinc-300 text-[14px] shrink-0">=</span>
        <p className="text-[11px] font-semibold text-zinc-700 whitespace-nowrap">
          Total (Per Employee / Month) <span className="font-bold text-indigo-600 text-[13px]">₹ {total.toFixed(2)}</span>
        </p>
      </div>
      <p className="text-[10.5px] text-zinc-400 mt-1.5">
        Final amount may vary based on actual employee count and selected add-on modules.
      </p>
    </div>
  );
}

// ─── Right rail: Plan preview ───────────────────────────────────────────────
function PlanPreviewCard() {
  const store = useSubscriptionPlanStore();
  const PREVIEW_FEATURES = [
    `Up to ${store.maxUsers || 'Unlimited'} Employees`,
    ...store.features,
  ];
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm p-3">
      <p className="text-[13px] font-bold text-zinc-900">Plan Preview</p>
      <p className="text-[11.5px] text-zinc-400 mt-0.5">See how this plan will appear to users</p>

      <div className="relative mt-3 rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
        <span className="absolute -top-2.5 right-3 rounded-full bg-zinc-900 px-2.5 py-1 text-[9px] font-bold text-white whitespace-nowrap">
          {store.planBadge || 'Most Popular'}
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-100 text-indigo-600">
          <Rocket size={17} />
        </span>
        <p className="text-[14px] font-bold text-indigo-700 mt-2">{store.name || 'Plan Name'}</p>
        <p className="text-[11.5px] text-zinc-500">{store.description ? store.description.slice(0, 50) + (store.description.length > 50 ? '...' : '') : 'Ideal for growing organizations'}</p>

        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-sm font-bold text-zinc-900">₹</span>
          <span className="text-2xl font-extrabold text-zinc-900">{store.pricePerUserMonthlyINR || 0}</span>
        </div>
        <p className="text-[10.5px] text-zinc-400">Per Employee / Month</p>

        <ul className="mt-3 space-y-1">
          {PREVIEW_FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-1.5 text-[11.5px] text-zinc-600">
              <Check size={12} className="mt-0.5 shrink-0 text-indigo-500" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Right rail: Pricing summary ────────────────────────────────────────────
function PricingSummaryCard() {
  const store = useSubscriptionPlanStore();
  
  const addonPrices: Record<string, number> = {
    'ai-analytics': 20,
    'ats': 15,
    'lms': 15,
    'expense': 10,
    'helpdesk': 10,
  };
  
  const basePrice = store.pricePerUserMonthlyINR || 0;
  const addonsTotal = store.addOnModules?.reduce((sum, id) => sum + (addonPrices[id] || 0), 0) || 0;
  const subTotal = basePrice + addonsTotal;
  const gst = subTotal * 0.18;
  const total = subTotal + gst;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm p-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-bold text-zinc-900">Pricing Summary</p>
        <span className="text-[10.5px] font-semibold text-zinc-400">Monthly</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">Base Price (Per Employee)</span>
          <span className="font-semibold text-zinc-900">₹ {basePrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">Estimated Add-on Modules</span>
          <span className="font-semibold text-zinc-900">₹ {addonsTotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">GST (18%)</span>
          <span className="font-semibold text-zinc-900">₹ {gst.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
          <span className="text-[12px] font-semibold text-zinc-700">Total (Per Employee / Month)</span>
          <span className="text-[12px] font-bold text-indigo-600">₹ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Right rail: Need help ───────────────────────────────────────────────────
function NeedHelpCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm p-3">
      <div className="flex items-start gap-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-zinc-900 text-white">
          <Headphones size={14} />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-zinc-900">Need Help?</p>
          <p className="text-[11.5px] text-zinc-500 leading-relaxed mt-0.5">
            Learn how to set up pricing that works for your business.
          </p>
        </div>
      </div>
      <button className="mt-3 flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11.5px] font-semibold text-amber-700 hover:bg-amber-100 transition-colors">
        View Best Practices <ExternalLink size={12} />
      </button>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function CreateNewPlanStep4() {
  const store = useSubscriptionPlanStore();
  const [pricingModel, setPricingModel] = useState('per_employee');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (store.pricePerUserMonthlyINR < 0) {
      setError('Base Price cannot be negative');
      return;
    }
    if (store.pricePerUserMonthlyINR === 0 || store.pricePerUserMonthlyINR === undefined || isNaN(store.pricePerUserMonthlyINR)) {
      setError('Please enter a valid Base Price');
      return;
    }
    setError(null);
    router.push('/super-admin/subscriptions/review-create');
  };

  return (
    <div className="space-y-2 font-sans text-zinc-900">
      <PageHeading />
      <PlanProgressBar current={4} />

      <div className="grid grid-cols-1 xl:grid-cols-[2.6fr_1fr] items-start">
        <div className="min-w-0 space-y-2">
          <SectionCard title="Billing & Pricing" subtitle="Configure pricing, billing cycle, and tax preferences for this plan">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <PricingModelSelector value={pricingModel} onChange={setPricingModel} />
              <BillingCycleToggle value={billingCycle} onChange={setBillingCycle} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Base Price (Per Employee/Month)" required hint="This is the base price before add-on modules and taxes.">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12.5px] text-zinc-400">₹</span>
                  <input type="number" value={store.pricePerUserMonthlyINR} onChange={(e) => store.update({ pricePerUserMonthlyINR: Number(e.target.value) })} className={`${inputClass} pl-6 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`} />
                </div>
                {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
              </Field>
              <Field label="Minimum Employees" hint="Minimum number of employees required to subscribe.">
                <input type="text" defaultValue="10" className={inputClass} />
              </Field>
              <Field label="Maximum Employees" hint="Leave empty for unlimited.">
                <input type="number" value={store.maxUsers} onChange={(e) => store.update({ maxUsers: Number(e.target.value) })} className={inputClass} />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Currency">
                <select className={inputClass} defaultValue="INR">
                  <option value="INR">INR (₹) - Indian Rupee</option>
                  <option value="USD">USD ($) - US Dollar</option>
                </select>
              </Field>
              <Field label="GST Treatment" hint="Select how tax will be applied to this plan.">
                <select className={inputClass} defaultValue="exclusive">
                  <option value="exclusive">Exclusive of GST</option>
                  <option value="inclusive">Inclusive of GST</option>
                </select>
              </Field>
              <Field label="GST Rate" hint="Applicable GST rate for this plan.">
                <select className={inputClass} defaultValue="18">
                  <option value="18">18%</option>
                  <option value="12">12%</option>
                  <option value="5">5%</option>
                </select>
              </Field>
            </div>

            <div className="pt-1 border-t border-zinc-100" />

            <div>
              <p className="text-[13px] font-bold text-zinc-900 mb-1">Billing Preferences</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Advance Payment" hint="Collect payment in advance for selected duration.">
                  <select className={inputClass} defaultValue="1">
                    <option value="0">None</option>
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                  </select>
                </Field>
                <Field label="Trial Period (Optional)" hint="Free trial period for new subscribers.">
                  <div className="relative">
                    <input type="text" defaultValue="14" className={inputClass} />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-zinc-400">Days</span>
                  </div>
                </Field>
                <Field label="Invoice Currency" hint="Currency shown on invoices.">
                  <select className={inputClass} defaultValue="same">
                    <option value="same">Same as Billing Currency</option>
                    <option value="usd">USD ($)</option>
                  </select>
                </Field>
              </div>
            </div>

            <EstimatedPriceSummary />
          </SectionCard>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
            <button onClick={() => router.push("/super-admin/subscriptions/add-on-modules")} className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-5 py-1.5 text-[12px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
              <ArrowLeft size={14} /> Back
            </button>
            <button onClick={handleNext} className="flex items-center gap-1.5 rounded-lg bg-[#020b22] px-5 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-zinc-800 transition-colors">
              Next: Review & Create <ArrowRight size={14} className="text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-4 min-w-0 xl:sticky xl:top-[20px]">
          <PlanPreviewCard />
          <PricingSummaryCard />
          <NeedHelpCard />
        </div>
      </div>

      <footer className="text-center text-[11px] text-zinc-400 py-4 flex items-center justify-center gap-4 flex-wrap">
        <span>© 2025 Crewcam HRMS. All Rights Reserved.</span>
        <span className="text-indigo-600 hover:underline cursor-pointer">Privacy Policy</span>
        <span className="text-indigo-600 hover:underline cursor-pointer">Terms of Service</span>
      </footer>
    </div>
  );
}

