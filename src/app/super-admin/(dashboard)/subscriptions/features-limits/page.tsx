'use client';
import React, { useState } from 'react';
import { PlanProgressBar } from '@/components/layout/PlanProgressBar';
import Link from 'next/link';
import {
  Home, ChevronRight, ChevronDown, ArrowLeft, ArrowRight, Check, Rocket,
  Maximize2, Minimize2, Lightbulb,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSubscriptionPlanStore } from '@/store/subscriptionPlanStore';

// ─── Static data ────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, title: 'Plan Details' },
  { id: 2, title: 'Features & Limits' },
  { id: 3, title: 'Add-on Modules' },
  { id: 4, title: 'Billing & Pricing' },
  { id: 5, title: 'Review & Create' },
];

interface CoreFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
}

const CORE_FEATURES: CoreFeature[] = [
  { id: 'employee-mgmt', name: 'Employee Management', description: 'Manage employee profiles, documents and lifecycle', included: true },
  { id: 'attendance-leave', name: 'Attendance & Leave', description: 'Track attendance, manage leaves and holidays', included: true },
  { id: 'payroll', name: 'Payroll Management', description: 'Process payroll, manage salary components and payslips', included: true },
  { id: 'ats', name: 'Recruitment (ATS)', description: 'Post jobs, manage applicants and hiring workflows', included: true },
  { id: 'pms', name: 'Performance Management', description: 'Set goals, reviews, and performance appraisals', included: true },
  { id: 'reports', name: 'Reports & Analytics', description: 'Advanced reports and data analytics', included: true },
];

const SELECT_ROWS: { id: string; name: string; description: string; options: string[]; value: string }[] = [
  { id: 'integrations', name: 'Integrations', description: 'Third-party integrations and automation', options: ['None', 'Basic', 'Advanced'], value: 'Basic' },
  { id: 'mobile', name: 'Mobile App Access', description: 'Access system via mobile applications', options: ['Admins Only', 'All Users'], value: 'All Users' },
  { id: 'support', name: 'Support', description: 'Customer support and assistance', options: ['Email Only', 'Email & Chat', 'Priority 24/7'], value: 'Email & Chat' },
];

const PREVIEW_FEATURES = [
  'Up to 200 Employees',
  'All Starter Features',
  'Payroll Management',
  'Advanced Attendance',
  'Performance Management',
  'Reports & Analytics',
  'Priority Support',
];

// ─── Breadcrumb + heading ───────────────────────────────────────────────────
const BREADCRUMB = ['Home', 'Subscriptions', 'Subscription Plans', 'Create New Plan'];

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
      <h1 className="text-2xl font-bold text-zinc-900 leading-tight">Create New Plan</h1>
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
      <div className="flex items-center justify-between gap-2 overflow-x-auto p-4">
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

// ─── Toggle switch ──────────────────────────────────────────────────────────
function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-zinc-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

// ─── Features & Limits card ─────────────────────────────────────────────────
function FeaturesLimitsCard() {
  const [tab, setTab] = useState<'core' | 'usage'>('core');
  const store = useSubscriptionPlanStore();
  const [selects, setSelects] = useState(SELECT_ROWS);
  const router = useRouter();
  const toggleFeature = (id: string) => {
    store.toggleFeature(id);
  };
  const setSelectValue = (id: string, value: string) => {
    setSelects((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="p-3 space-y-3">
        <div>
          <h2 className="text-[15px] font-bold text-zinc-900">Features &amp; Limits</h2>
          <p className="text-[12px] text-zinc-500 mt-0.5">Configure what&apos;s included in this plan and set usage limits</p>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1">
            <button
              onClick={() => setTab('core')}
              className={`rounded-md px-4 py-1.5 text-[12.5px] font-semibold transition-colors ${tab === 'core' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              Core Features
            </button>
            <button
              onClick={() => setTab('usage')}
              className={`rounded-md px-4 py-1.5 text-[12.5px] font-semibold transition-colors ${tab === 'usage' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              Usage Limits
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-5 py-1.5 text-[12px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
              <Maximize2 size={12} /> Expand All
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-5 py-1.5 text-[12px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
              <Minimize2 size={12} /> Collapse All
            </button>
          </div>
        </div>

        {tab === 'core' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wide border-b border-zinc-100">
                  <th className="pb-2 pr-4 font-semibold">Feature</th>
                  <th className="pb-2 text-center font-semibold w-32">Included</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {CORE_FEATURES.map((f) => (
                  <tr key={f.id} className="text-[12.5px]">
                    <td className="py-2 pr-4">
                      <div className="flex items-start gap-2">
                        <ChevronRight size={13} className="mt-1 text-zinc-300 shrink-0" />
                        <div>
                          <p className="font-bold text-zinc-900">{f.name}</p>
                          <p className="text-[11.5px] text-zinc-400 mt-0.5">{f.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex justify-center">
                        <ToggleSwitch checked={store.features.includes(f.id)} onChange={() => toggleFeature(f.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
                {selects.map((s) => (
                  <tr key={s.id} className="text-[12.5px]">
                    <td className="py-2 pr-4">
                      <div className="flex items-start gap-2">
                        <ChevronRight size={13} className="mt-1 text-zinc-300 shrink-0" />
                        <div>
                          <p className="font-bold text-zinc-900">{s.name}</p>
                          <p className="text-[11.5px] text-zinc-400 mt-0.5">{s.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex justify-center">
                        <div className="relative w-32">
                          <select
                            value={s.value}
                            onChange={(e) => setSelectValue(s.id, e.target.value)}
                            className="w-full appearance-none rounded-lg border border-zinc-200 bg-white py-1.5 pl-3 pr-7 text-[12px] font-medium text-zinc-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 cursor-pointer"
                          >
                            {s.options.map((opt) => <option key={opt}>{opt}</option>)}
                          </select>
                          <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-200 p-8 text-center text-[12.5px] text-zinc-400">
            Usage limits (branches, storage, API calls, etc.) go here.
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
          <button onClick={() => router.push("/super-admin/subscriptions/plan-details")} className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-5 py-1.5 text-[12px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
            <ArrowLeft size={14} /> Back
          </button>
          <button onClick={() => router.push("/super-admin/subscriptions/add-on-modules")} className="flex items-center gap-1.5 rounded-lg bg-[#020b22] px-5 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-zinc-800 transition-colors">
            Next: Add-on Modules <ArrowRight size={14} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Right rail: Plan preview ───────────────────────────────────────────────
function PlanPreviewCard() {
  const store = useSubscriptionPlanStore();
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

// ─── Right rail: Need help ───────────────────────────────────────────────────
function NeedHelpCard() {
  return (
    <div className="rounded-xl bg-[#0B1220] p-4 text-white">
      <div className="flex items-start gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white">
          <Lightbulb size={16} />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-white">Need Help?</p>
          <p className="text-[11.5px] text-zinc-400 leading-relaxed mt-0.5">
            Learn how to create effective subscription plans.
          </p>
        </div>
      </div>
      <button className="mt-3.5 w-full flex items-center justify-center gap-1.5 rounded-lg border border-amber-400 px-3 py-2 text-[11.5px] font-semibold text-amber-400 hover:bg-white/5 hover:text-amber-300 transition-colors">
        View Best Practices <ArrowRight size={13} />
      </button>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function CreateNewPlanStep2() {
  return (
    <div className="space-y-4 font-sans text-zinc-900">
      <PageHeading />
      <PlanProgressBar current={2} />

      <div className="grid grid-cols-1 xl:grid-cols-[2.6fr_1fr] gap-4 items-start">
        <div className="min-w-0">
          <FeaturesLimitsCard />
        </div>
        <div className="space-y-4 min-w-0 xl:sticky xl:top-[20px]">
          <PlanPreviewCard />
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

