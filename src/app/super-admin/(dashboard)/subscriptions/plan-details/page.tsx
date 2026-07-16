"use client";

import React from 'react';
import Link from 'next/link';
import {
    Home, ChevronRight, Check, ArrowRight,
    Rocket, HelpCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const PREVIEW_FEATURES = [
    'Up to 200 Employees',
    'All Starter Features',
    'Payroll Management',
    'Advanced Attendance',
    'Performance Management',
    'Reports & Analytics',
    'Priority Support'
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
const STEPS = [
  { id: 1, title: 'Plan Details' },
  { id: 2, title: 'Features & Limits' },
  { id: 3, title: 'Add-on Modules' },
  { id: 4, title: 'Billing & Pricing' },
  { id: 5, title: 'Review & Create' },
];

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
      <div className="flex items-center justify-between gap-2 overflow-x-auto p-4">
        {STEPS.map((step, i) => {
          const href = STEP_ROUTES[step.id] || '#';
          return (
            <React.Fragment key={step.id}>
              <Link href={href} className="flex items-center gap-2 shrink-0 group">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-bold transition-colors ${
                    step.id === current
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

// ─── Main Content ───────────────────────────────────────────────────────────
export default function PlanDetailsPage() {
    const router = useRouter();
    return (
        <div className="w-full max-w-[1600px] mx-auto pb-4 space-y-4 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">
            <PageHeading />
            <StepIndicator current={1} />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-1.5 items-start">

                {/* Left Section - Form */}
                <div className="xl:col-span-3 flex flex-col gap-1">
                    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm px-4 py-2 flex flex-col gap-[13px]">

                        <div className="border-b border-zinc-100 pb-2">
                            <h3 className="text-[13px] font-bold text-zinc-900">Plan Details</h3>
                            <p className="text-[10.5px] text-zinc-500 mt-0.5">Basic information about the subscription plan</p>
                        </div>

                        {/* Plan Name & Plan Code */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] font-bold text-zinc-900 block mb-[3px]">
                                    Plan Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Professional"
                                    defaultValue="e.g. Professional"
                                    className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500 text-zinc-700 placeholder:text-zinc-400"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-zinc-900 block mb-[3px]">
                                    Plan Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. PRO"
                                    defaultValue="e.g. PRO"
                                    className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500 text-zinc-700 placeholder:text-zinc-400"
                                />
                                <p className="text-[9.5px] text-zinc-500 mt-1">Unique code for internal reference (e.g., BASIC, PRO, ENT)</p>
                            </div>
                        </div>

                        {/* Plan Description */}
                        <div>
                            <label className="text-[11px] font-bold text-zinc-900 block mb-[3px]">
                                Plan Description <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    placeholder="Describe the plan, its benefits, and ideal use cases..."
                                    className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500 min-h-[90px] resize-none text-zinc-700 placeholder:text-zinc-400"
                                ></textarea>
                                <span className="absolute bottom-2 right-2 text-[10px] text-zinc-400 font-medium">0/500</span>
                            </div>
                        </div>

                        {/* Plan Category */}
                        <div>
                            <label className="text-[11px] font-bold text-zinc-900 block mb-1">
                                Plan Category <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                <label className="border border-zinc-200 rounded-lg p-3 flex gap-2 cursor-pointer hover:bg-zinc-50 transition-colors">
                                    <div className="mt-0.5 h-3.5 w-3.5 rounded-full border border-zinc-300 bg-white shrink-0"></div>
                                    <div>
                                        <p className="text-[11.5px] font-bold text-zinc-900">Starter</p>
                                        <p className="text-[9.5px] text-zinc-500 mt-0.5">Entry-level plans</p>
                                    </div>
                                </label>

                                <label className="border border-blue-500 bg-blue-50/50 rounded-lg p-3 flex gap-2 cursor-pointer shadow-sm transition-colors">
                                    <div className="mt-0.5 h-3.5 w-3.5 rounded-full border-[4px] border-blue-600 bg-white shrink-0"></div>
                                    <div>
                                        <p className="text-[11.5px] font-bold text-[#024efc]">Professional</p>
                                        <p className="text-[9.5px] text-blue-600/80 mt-0.5">Mid-tier plans</p>
                                    </div>
                                </label>

                                <label className="border border-zinc-200 rounded-lg p-3 flex gap-2 cursor-pointer hover:bg-zinc-50 transition-colors">
                                    <div className="mt-0.5 h-3.5 w-3.5 rounded-full border border-zinc-300 bg-white shrink-0"></div>
                                    <div>
                                        <p className="text-[11.5px] font-bold text-zinc-900">Enterprise</p>
                                        <p className="text-[9.5px] text-zinc-500 mt-0.5">Advanced plans</p>
                                    </div>
                                </label>

                                <label className="border border-zinc-200 rounded-lg p-3 flex gap-2 cursor-pointer hover:bg-zinc-50 transition-colors">
                                    <div className="mt-0.5 h-3.5 w-3.5 rounded-full border border-zinc-300 bg-white shrink-0"></div>
                                    <div>
                                        <p className="text-[11.5px] font-bold text-zinc-900">Custom</p>
                                        <p className="text-[9.5px] text-zinc-500 mt-0.5">Tailored solutions</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Target Audience */}
                        <div>
                            <label className="text-[11px] font-bold text-zinc-900 block mb-1">
                                Target Audience <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="h-4 w-4 rounded border border-zinc-300 bg-white group-hover:border-zinc-400 transition-colors"></div>
                                    <span className="text-[11.5px] font-medium text-zinc-700">Small Teams</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="h-4 w-4 rounded border border-blue-600 bg-blue-600 flex items-center justify-center transition-colors shadow-sm">
                                        <Check size={10} className="text-white" strokeWidth={3} />
                                    </div>
                                    <span className="text-[11.5px] font-medium text-zinc-900">Growing Businesses</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="h-4 w-4 rounded border border-zinc-300 bg-white group-hover:border-zinc-400 transition-colors"></div>
                                    <span className="text-[11.5px] font-medium text-zinc-700">Large Enterprises</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="h-4 w-4 rounded border border-zinc-300 bg-white group-hover:border-zinc-400 transition-colors"></div>
                                    <span className="text-[11.5px] font-medium text-zinc-700">Custom Requirements</span>
                                </label>
                            </div>
                        </div>

                        {/* Plan Badge & Display Order */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] font-bold text-zinc-900 block mb-[3px]">Plan Badge</label>
                                <div className="relative">
                                    <select className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500 text-zinc-800 appearance-none bg-white">
                                        <option>Most Popular</option>
                                        <option>Best Value</option>
                                        <option>Recommended</option>
                                    </select>
                                    <ChevronRight size={14} className="absolute right-3 top-2.5 text-zinc-400 pointer-events-none rotate-90" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-zinc-900 block mb-[3px]">
                                    Display Order <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue="2"
                                    className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500 text-zinc-800"
                                />
                                <p className="text-[9.5px] text-zinc-500 mt-1">Lower numbers appear first</p>
                            </div>
                        </div>

                        {/* Plan Status */}
                        <div className="mt-0">
                            <label className="text-[11px] font-bold text-zinc-900 block mb-1">Plan Status</label>
                            <div className="flex items-center gap-3">
                                <button className="relative inline-flex h-[20px] w-[36px] items-center rounded-full bg-emerald-500 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                                    <span className="translate-x-[18px] inline-block h-[14px] w-[14px] transform rounded-full bg-white transition-transform shadow-sm" />
                                </button>
                                <span className="text-[11.5px] font-bold text-emerald-600">Active</span>
                                <span className="text-[10px] text-zinc-500 ml-1">Inactive plans will be hidden from selection</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-1 mt-0.5">
                        <button className="flex items-center justify-center gap-1.5 rounded-lg bg-white border border-zinc-200 px-6 py-2 text-[12px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                            Cancel
                        </button>
                        <button onClick={() => router.push("/super-admin/create-new-plan-step2")} className="flex items-center gap-1.5 rounded-lg bg-[#020b22] px-6 py-2 text-[12px] font-bold text-white shadow-sm hover:bg-zinc-800 transition-colors">
                            Next: Features & Limits <ArrowRight size={14} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Right Section - Preview & Help */}
                <div className="xl:col-span-1 flex flex-col gap-1.5">

                    {/* Plan Preview */}
                    <div>
                        <h3 className="text-[13px] font-bold text-zinc-900 mb-1">Plan Preview</h3>
                        <p className="text-[10.5px] text-zinc-500 mb-2">This is how your plan will appear to users</p>

                        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm px-4 py-3 relative overflow-hidden">
                            <div className="absolute top-4 right-4">
                                <span className="bg-blue-600 text-white px-2 py-1 rounded text-[9px] font-bold shadow-sm">
                                    Most Popular
                                </span>
                            </div>

                            <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mb-4">
                                <Rocket size={20} />
                            </div>

                            <h2 className="text-[18px] font-bold text-[#024efc] mb-1">Professional</h2>
                            <p className="text-[10.5px] text-zinc-500 mb-4">Ideal for growing organizations</p>

                            <div className="mb-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[20px] font-bold text-zinc-900">₹</span>
                                    <span className="text-[32px] font-bold text-[#020b22] leading-none">150</span>
                                </div>
                                <p className="text-[10px] text-zinc-500 mt-1">Per Employee / Month</p>
                            </div>

                            <div className="space-y-2 mt-4">
                                {PREVIEW_FEATURES.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <Check size={14} className="text-blue-600 shrink-0" strokeWidth={2.5} />
                                        <span className="text-[11px] font-medium text-zinc-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Need Help Card */}
                    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-3">
                        <div className="flex items-start gap-2.5">
                            <div className="h-8 w-8 rounded-full bg-[#020b22] text-white flex items-center justify-center shrink-0">
                                <HelpCircle size={16} />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-zinc-900 mb-1">Need Help?</h4>
                                <p className="text-[10.5px] text-zinc-500 leading-relaxed">
                                    Learn how to create effective subscription plans.
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-amber-200 rounded text-[11px] font-bold text-amber-600 bg-amber-50/30 hover:bg-amber-50 transition-colors w-max">
                                View Best Practices <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}





