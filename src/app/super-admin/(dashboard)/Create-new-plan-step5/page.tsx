'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Home, ChevronRight, ArrowLeft, ArrowRight, Check, Pencil, Rocket,
  Sparkles, ShieldCheck, Info, Brain, Users, Wallet,
} from 'lucide-react';

// ─── Static data ────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, title: 'Plan Details' },
  { id: 2, title: 'Features & Limits' },
  { id: 3, title: 'Add-on Modules' },
  { id: 4, title: 'Billing & Pricing' },
  { id: 5, title: 'Review & Create' },
];

const PLAN_DETAILS = {
  name: 'Professional',
  code: 'PRO',
  category: 'Professional',
  displayOrder: 2,
  status: 'Active',
  description: 'Ideal for growing organizations that need advanced HR features and powerful automation.',
};

const FEATURES_LEFT = [
  { label: 'Employee Management', value: 'Included' },
  { label: 'Attendance & Leave', value: 'Included' },
  { label: 'Payroll Management', value: 'Included' },
  { label: 'Recruitment (ATS)', value: 'Included' },
];
const FEATURES_RIGHT = [
  { label: 'Performance Management', value: 'Included' },
  { label: 'Reports & Analytics', value: 'Included' },
  { label: 'Integrations', value: 'Basic' },
  { label: 'Support', value: 'Email & Chat' },
];

const ADDON_MODULES = [
  { name: 'AI & Predictive Analytics', price: '₹ 20 / Employee / Month', icon: Brain, bg: 'bg-purple-50', color: 'text-purple-600' },
  { name: 'Advanced Recruitment (ATS)', price: '₹ 15 / Employee / Month', icon: Users, bg: 'bg-blue-50', color: 'text-blue-600' },
  { name: 'Expense Management', price: '₹ 10 / Employee / Month', icon: Wallet, bg: 'bg-amber-50', color: 'text-amber-600' },
];

const BILLING_LEFT = [
  { label: 'Pricing Model', value: 'Per Employee' },
  { label: 'Billing Cycle', value: 'Monthly' },
  { label: 'Base Price (Per Employee / Month)', value: '₹ 150' },
  { label: 'Add-on Modules (Estimated)', value: '₹ 30' },
  { label: 'GST (18%)', value: '₹ 32.40' },
];
const BILLING_RIGHT = [
  { label: 'Minimum Employees', value: '10' },
  { label: 'Maximum Employees', value: '2000' },
  { label: 'Currency', value: 'INR (₹) - Indian Rupee' },
  { label: 'GST Treatment', value: 'Exclusive of GST' },
  { label: 'Advance Payment', value: '1 Month' },
  { label: 'Trial Period', value: '14 Days' },
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
      <p className="text-[13px] text-zinc-500">Review all details before creating your subscription plan</p>
    </section>
  );
}

// ─── Step indicator ─────────────────────────────────────────────────────────
const STEP_ROUTES: Record<number, string> = {
  1: '/super-admin/subscriptions/plan-details',
  2: '/super-admin/create-new-plan-step2',
  3: '/super-admin/subscriptions/add-on-modules',
  4: '/super-admin/Create-new-plan-step4',
  5: '/super-admin/Create-new-plan-step5',
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

// ─── Reusable review card shell ─────────────────────────────────────────────
function ReviewCard({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm p-3">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-[14px] font-bold text-zinc-900">{title}</h3>
          {badge && <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10.5px] font-bold text-indigo-600">{badge}</span>}
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1 text-[11.5px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors">
          <Pencil size={12} /> Edit
        </button>
      </div>
      {children}
    </div>
  );
}

// ─── Review Plan Details ────────────────────────────────────────────────────
function ReviewPlanDetails() {
  return (
    <ReviewCard title="Review Plan Details">
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
          <Rocket size={18} />
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 flex-1">
          <div>
            <p className="text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wide">Plan Name</p>
            <p className="text-[13px] font-bold text-zinc-900 mt-0.5">{PLAN_DETAILS.name}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wide">Plan Code</p>
            <p className="text-[13px] font-bold text-zinc-900 mt-0.5">{PLAN_DETAILS.code}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wide">Category</p>
            <p className="text-[13px] font-bold text-zinc-900 mt-0.5">{PLAN_DETAILS.category}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wide">Display Order</p>
            <p className="text-[13px] font-bold text-zinc-900 mt-0.5">{PLAN_DETAILS.displayOrder}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold text-zinc-400 uppercase tracking-wide">Status</p>
            <span className="inline-block mt-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">{PLAN_DETAILS.status}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-zinc-100">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">Description</p>
        <p className="text-[12px] text-zinc-600 mt-0.5">{PLAN_DETAILS.description}</p>
      </div>
    </ReviewCard>
  );
}

// ─── Review Features & Limits ───────────────────────────────────────────────
function FeatureRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-[12.5px] font-medium text-zinc-700">
        <Check size={14} className="rounded-full bg-emerald-100 text-emerald-600 p-0.5" />
        {label}
      </span>
      <span className="text-[12.5px] font-semibold text-zinc-500">{value}</span>
    </div>
  );
}

function ReviewFeaturesLimits() {
  return (
    <ReviewCard title="Review Features & Limits" badge="8 Features">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
        {FEATURES_LEFT.map((f) => <FeatureRow key={f.label} {...f} />)}
        {FEATURES_RIGHT.map((f) => <FeatureRow key={f.label} {...f} />)}
      </div>
    </ReviewCard>
  );
}

// ─── Review Add-on Modules ──────────────────────────────────────────────────
function ReviewAddonModules() {
  return (
    <ReviewCard title="Review Add-on Modules" badge="3 Selected">
      <div className="divide-y divide-zinc-100">
        {ADDON_MODULES.map((m) => (
          <div key={m.name} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${m.bg} ${m.color}`}>
              <m.icon size={15} />
            </span>
            <span className="flex-1 text-[12.5px] font-semibold text-zinc-800">{m.name}</span>
            <span className="text-[12px] text-zinc-500 whitespace-nowrap">{m.price}</span>
          </div>
        ))}
      </div>
    </ReviewCard>
  );
}

// ─── Review Billing & Pricing ───────────────────────────────────────────────
function BillingRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[12.5px] text-zinc-500">{label}</span>
      <span className={`text-[12.5px] text-right ${strong ? 'font-bold text-indigo-600 text-[14px]' : 'font-semibold text-zinc-900'}`}>{value}</span>
    </div>
  );
}

function ReviewBillingPricing() {
  return (
    <ReviewCard title="Review Billing & Pricing">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
        <div className="space-y-2.5">
          {BILLING_LEFT.map((b) => <BillingRow key={b.label} {...b} />)}
          <div className="pt-2 border-t border-zinc-100">
            <BillingRow label="Total (Per Employee / Month)" value="₹ 212.40" strong />
          </div>
        </div>
        <div className="space-y-2.5">
          {BILLING_RIGHT.map((b) => <BillingRow key={b.label} {...b} />)}
        </div>
      </div>
    </ReviewCard>
  );
}

// ─── Right rail: Plan preview ───────────────────────────────────────────────
function PlanPreviewCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm p-3">
      <p className="text-[13px] font-bold text-zinc-900">Plan Preview</p>
      <p className="text-[11.5px] text-zinc-400 mt-0.5">This is how the plan will appear to users</p>

      <div className="relative rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
        <span className="absolute -top-2.5 right-3 rounded-full bg-zinc-900 px-2.5 py-1 text-[9px] font-bold text-white whitespace-nowrap">
          Most Popular
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-100 text-indigo-600">
          <Rocket size={17} />
        </span>
        <p className="text-[14px] font-bold text-indigo-700 mt-2">Professional</p>
        <p className="text-[11.5px] text-zinc-500">Ideal for growing organizations</p>

        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-sm font-bold text-zinc-900">₹</span>
          <span className="text-2xl font-extrabold text-zinc-900">150</span>
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
  return (
    <div className="rounded-sm border border-zinc-200 bg-white shadow-sm p-3">
      <p className="text-[13px] font-bold text-zinc-900 mb-3">Pricing Summary</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">Base Price (Per Employee / Month)</span>
          <span className="font-semibold text-zinc-900">₹ 150</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">Add-on Modules (Estimated)</span>
          <span className="font-semibold text-zinc-900">₹ 30</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">GST (18%)</span>
          <span className="font-semibold text-zinc-900">₹ 32.40</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
          <span className="text-[12px] font-semibold text-zinc-700">Total (Per Employee / Month)</span>
          <span className="text-[12px] font-bold text-indigo-600">₹ 212.40</span>
        </div>
      </div>
    </div>
  );
}

// ─── Right rail: What's next ────────────────────────────────────────────────
function WhatsNextCard() {
  return (
    <div className="rounded-xl bg-[#0B1220] p-3 text-white">
      <div className="flex items-start gap-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white">
          <Sparkles size={14} />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-white">What&apos;s Next?</p>
          <p className="text-[11.5px] text-zinc-400 leading-relaxed mt-0.5">
            Once you create this plan, it will be available for selection while subscribing.
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-start gap-2 rounded-lg bg-white/5 border border-white/10 p-1">
        <Info size={13} className="mt-0.5 shrink-0 text-zinc-400" />
        <p className="text-[10px] text-zinc-400 leading-relaxed">You can edit plan details anytime from the plan settings.</p>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function CreateNewPlanStep5() {
  const router = useRouter();
  return (
    <div className="w-full max-w-[1600px] mx-auto pb-4 space-y-4 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">
      <PageHeading />
      <StepIndicator current={5} />

      <div className="grid grid-cols-1 xl:grid-cols-[2.6fr_1fr] gap-4 items-start">
        <div className="min-w-0 space-y-4">
          <ReviewPlanDetails />
          <ReviewFeaturesLimits />
          <ReviewAddonModules />
          <ReviewBillingPricing />

          {/* Footer actions */}
          <div className="flex items-center justify-between gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-colors">
              <ArrowLeft size={14} /> Back
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-[#16234A] px-6 py-2.5 text-[12.5px] font-semibold text-white shadow-sm hover:bg-[#1c2c5c] transition-colors">
              Create Plan <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="space-y-4 min-w-0 xl:sticky xl:top-[20px]">
          <PlanPreviewCard />
          <PricingSummaryCard />
          <WhatsNextCard />
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


