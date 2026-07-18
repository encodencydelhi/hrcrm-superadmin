"use client";

import React from 'react';
import { PlanProgressBar } from '@/components/layout/PlanProgressBar';
import Link from 'next/link';
import {
    ChevronRight, Check, ArrowRight,
    Rocket, HelpCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSubscriptionPlanStore } from '@/store/subscriptionPlanStore';

const PREVIEW_FEATURES = [
    'Up to 200 Employees',
    'All Starter Features',
    'Payroll Management',
    'Advanced Attendance',
    'Performance Management',
    'Reports & Analytics',
    'Priority Support'
];

// ─── Breadcrumb + Heading ───────────────────────────────────────────────────
function PageHeading() {
    return (
        <>
            <div className="flex items-center text-[10px] text-zinc-500 font-medium">
                <Link href="/super-admin" className="hover:text-indigo-700">Home</Link>
                <ChevronRight size={12} className="mx-1" />
                <Link href="#" className="hover:text-indigo-700">Subscriptions</Link>
                <ChevronRight size={12} className="mx-1" />
                <Link href="#" className="hover:text-indigo-700">Subscription Plans</Link>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-zinc-800">Create New Plan</span>
            </div>
            <div className="flex items-start justify-between pb-1 mt-1">
                <div>
                    <h1 className="text-[16px] font-bold text-[#020b22]">Create New Plan</h1>
                    <p className="text-[10px] text-zinc-500">Define plan details, features, and pricing for your organization</p>
                </div>
            </div>
        </>
    );
}

// ─── Main Content ───────────────────────────────────────────────────────────
export default function PlanDetailsPage() {
    const router = useRouter();
    const store = useSubscriptionPlanStore();
    return (
        <div className="w-full max-w-[1600px] mx-auto pb-4 space-y-1.5 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">
            <PageHeading />
            <PlanProgressBar current={1} />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-1.5 mt-3 items-start">

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
                                    value={store.name}
                                    onChange={(e) => store.update({ name: e.target.value })}
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
                                    value={store.planCode}
                                    onChange={(e) => store.update({ planCode: e.target.value })}
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
                                    value={store.description}
                                    onChange={(e) => store.update({ description: e.target.value })}
                                    maxLength={500}
                                    className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500 min-h-[90px] resize-none text-zinc-700 placeholder:text-zinc-400"
                                ></textarea>
                                <span className="absolute bottom-2 right-2 text-[10px] text-zinc-400 font-medium">{store.description.length}/500</span>
                            </div>
                        </div>

                        {/* Plan Category */}
                        <div>
                            <label className="text-[11px] font-bold text-zinc-900 block mb-1">
                                Plan Category <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                {['Starter', 'Professional', 'Enterprise', 'Custom'].map((t) => (
                                    <label key={t} onClick={() => store.update({ tier: t })} className={`border ${store.tier === t ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-zinc-200 hover:bg-zinc-50'} rounded-lg p-3 flex gap-2 cursor-pointer transition-colors`}>
                                        <div className={`mt-0.5 h-3.5 w-3.5 rounded-full border ${store.tier === t ? 'border-[4px] border-blue-600' : 'border-zinc-300'} bg-white shrink-0`}></div>
                                        <div>
                                            <p className={`text-[11.5px] font-bold ${store.tier === t ? 'text-[#024efc]' : 'text-zinc-900'}`}>{t}</p>
                                            <p className={`text-[9.5px] mt-0.5 ${store.tier === t ? 'text-blue-600/80' : 'text-zinc-500'}`}>
                                                {t === 'Starter' ? 'Entry-level plans' : t === 'Professional' ? 'Mid-tier plans' : t === 'Enterprise' ? 'Advanced plans' : 'Tailored solutions'}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Target Audience */}
                        <div>
                            <label className="text-[11px] font-bold text-zinc-900 block mb-1">
                                Target Audience <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-6">
                                {['Small Teams', 'Growing Businesses', 'Large Enterprises', 'Custom Requirements'].map((aud) => (
                                    <label key={aud} onClick={() => store.toggleTargetAudience(aud)} className="flex items-center gap-2 cursor-pointer group">
                                        <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors shadow-sm ${store.targetAudience.includes(aud) ? 'border-blue-600 bg-blue-600' : 'border-zinc-300 bg-white group-hover:border-zinc-400'}`}>
                                            {store.targetAudience.includes(aud) && <Check size={10} className="text-white" strokeWidth={3} />}
                                        </div>
                                        <span className={`text-[11.5px] font-medium ${store.targetAudience.includes(aud) ? 'text-zinc-900' : 'text-zinc-700'}`}>{aud}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Plan Badge & Display Order */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] font-bold text-zinc-900 block mb-[3px]">Plan Badge</label>
                                <div className="relative">
                                    <select value={store.planBadge} onChange={(e) => store.update({ planBadge: e.target.value })} className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500 text-zinc-800 appearance-none bg-white">
                                        <option value="Most Popular">Most Popular</option>
                                        <option value="Best Value">Best Value</option>
                                        <option value="Recommended">Recommended</option>
                                    </select>
                                    <ChevronRight size={14} className="absolute right-3 top-2.5 text-zinc-400 pointer-events-none rotate-90" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-zinc-900 block mb-[3px]">
                                    Display Order <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={store.displayOrder}
                                    onChange={(e) => store.update({ displayOrder: Number(e.target.value) })}
                                    className="w-full border border-zinc-200 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500 text-zinc-800"
                                />
                                <p className="text-[9.5px] text-zinc-500 mt-1">Lower numbers appear first</p>
                            </div>
                        </div>

                        {/* Plan Status */}
                        <div className="mt-0">
                            <label className="text-[11px] font-bold text-zinc-900 block mb-1">Plan Status</label>
                            <div className="flex items-center gap-3">
                                <button onClick={() => store.update({ isActive: !store.isActive })} className={`relative inline-flex h-[20px] w-[36px] items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${store.isActive ? 'bg-emerald-500' : 'bg-zinc-300'}`}>
                                    <span className={`${store.isActive ? 'translate-x-[18px]' : 'translate-x-[2px]'} inline-block h-[14px] w-[14px] transform rounded-full bg-white transition-transform shadow-sm`} />
                                </button>
                                <span className={`text-[11.5px] font-bold ${store.isActive ? 'text-emerald-600' : 'text-zinc-500'}`}>{store.isActive ? 'Active' : 'Inactive'}</span>
                                <span className="text-[10px] text-zinc-500 ml-1">Inactive plans will be hidden from selection</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-1 mt-0.5">
                        <button onClick={() => router.push('/super-admin/subscriptions/subscription-plan')} className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-5 py-1.5 text-[12px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                            Cancel
                        </button>
                        <button onClick={() => router.push('/super-admin/subscriptions/features-limits')} className="flex items-center gap-1.5 rounded-lg bg-[#020b22] px-5 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-zinc-800 transition-colors">
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
                                    {store.planBadge || 'Most Popular'}
                                </span>
                            </div>

                            <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mb-4">
                                <Rocket size={20} />
                            </div>

                            <h2 className="text-[18px] font-bold text-[#024efc] mb-1">{store.name || 'Plan Name'}</h2>
                            <p className="text-[10.5px] text-zinc-500 mb-4">{store.description ? store.description.slice(0, 50) + (store.description.length > 50 ? '...' : '') : 'Ideal for growing organizations'}</p>

                            <div className="mb-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[20px] font-bold text-zinc-900">₹</span>
                                    <span className="text-[32px] font-bold text-[#020b22] leading-none">{store.pricePerUserMonthlyINR || 0}</span>
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

