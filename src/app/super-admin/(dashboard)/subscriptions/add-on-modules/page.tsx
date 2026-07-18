"use client";

import React, { useState } from 'react';
import { PlanProgressBar } from '@/components/layout/PlanProgressBar';
import Link from 'next/link';
import {
    ChevronRight, Check, ArrowLeft, ArrowRight, Download, Upload,
    Cpu, Users, BookOpen, Wallet, HeadphonesIcon, Clock, Link as LinkIcon, ShieldCheck,
    Info, Rocket, HelpCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSubscriptionPlanStore } from '@/store/subscriptionPlanStore';

// ─── Static Data ────────────────────────────────────────────────────────────
const ADD_ON_MODULES = [
    {
        id: 'ai-analytics',
        title: 'AI & Predictive Analytics',
        badge: 'Popular',
        badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
        icon: <Cpu size={14} />,
        description: 'AI insights, predictive analytics and smart recommendations',
        pricing: '₹ 20 / Employee / Month',
        defaultChecked: true,
    },
    {
        id: 'ats',
        title: 'Advanced Recruitment (ATS)',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        icon: <Users size={14} />,
        description: 'Advanced applicant tracking and hiring automation',
        pricing: '₹ 15 / Employee / Month',
        defaultChecked: true,
    },
    {
        id: 'lms',
        title: 'Learning Management System (LMS)',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        icon: <BookOpen size={14} />,
        description: 'E-learning, training courses and certifications',
        pricing: '₹ 15 / Employee / Month',
        defaultChecked: false,
    },
    {
        id: 'expense',
        title: 'Expense Management',
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-600',
        icon: <Wallet size={14} />,
        description: 'Track, manage and approve employee expenses',
        pricing: '₹ 10 / Employee / Month',
        defaultChecked: false,
    },
    {
        id: 'helpdesk',
        title: 'Helpdesk & Tickets',
        iconBg: 'bg-teal-50',
        iconColor: 'text-teal-600',
        icon: <HeadphonesIcon size={14} />,
        description: 'Internal helpdesk with ticketing and SLA management',
        pricing: '₹ 10 / Employee / Month',
        defaultChecked: false,
    },
    {
        id: 'projects',
        title: 'Project & Task Management',
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-600',
        icon: <Clock size={14} />,
        description: 'Manage projects, tasks and team collaboration',
        pricing: '₹ 10 / Employee / Month',
        defaultChecked: false,
    },
    {
        id: 'integrations',
        title: 'Advanced Integrations',
        iconBg: 'bg-indigo-50',
        iconColor: 'text-indigo-600',
        icon: <LinkIcon size={14} />,
        description: 'Premium third-party integrations and webhooks',
        pricing: '₹ 20 / Company / Month',
        defaultChecked: false,
    },
    {
        id: 'account-manager',
        title: 'Dedicated Account Manager',
        iconBg: 'bg-amber-50',
        iconColor: 'text-amber-600',
        icon: <ShieldCheck size={14} />,
        description: 'Personalized onboarding and ongoing support',
        pricing: '₹ 5,000 / Month',
        defaultChecked: false,
    }
];

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
export default function AddOnModulesPage() {
    const store = useSubscriptionPlanStore();
    const router = useRouter();
    const toggleModule = (id: string) => {
        store.toggleAddOnModule(id);
    };

    return (
        <div className="w-full max-w-[1600px] mx-auto pb-4 space-y-1.5 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">
            <PageHeading />
            <PlanProgressBar current={3} />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-1.5 mt-3 items-start">

                {/* Left Section - Modules List */}
                <div className="xl:col-span-3 flex flex-col gap-2.5">
                    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm flex flex-col h-full">
                        <div className="px-3 py-[8.7px] border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                            <div>
                                <h3 className="text-[13px] font-bold text-zinc-900">Add-on Modules (Optional)</h3>
                                <p className="text-[10.5px] text-zinc-500 mt-0.5">Enhance your plan with powerful add-on modules. These can be enabled or disabled for your subscribers.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-zinc-200 rounded-md text-[10px] font-bold text-zinc-700 bg-white hover:bg-zinc-50 transition-colors shadow-sm">
                                    <Download size={12} className="text-blue-600" /> Expand All
                                </button>
                                <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-zinc-200 rounded-md text-[10px] font-bold text-zinc-700 bg-white hover:bg-zinc-50 transition-colors shadow-sm">
                                    <Upload size={12} className="text-blue-600" /> Collapse All
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-100">
                                        <th className="px-3 py-2 text-[10.5px] font-medium text-zinc-500 w-10"></th>
                                        <th className="px-3 py-2 text-[10.5px] font-medium text-zinc-500"></th>
                                        <th className="px-3 py-2 text-[10.5px] font-medium text-zinc-500 text-right w-48">Pricing</th>
                                        <th className="px-3 py-2 text-[10.5px] font-medium text-zinc-500 text-center w-28">Add Module</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {ADD_ON_MODULES.map((mod) => (
                                        <tr key={mod.id} className="hover:bg-zinc-50/50 transition-colors group">
                                            <td className="px-3 py-[8.7px] align-middle">
                                                <button className="h-6 w-6 rounded flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors">
                                                    <ChevronRight size={14} />
                                                </button>
                                            </td>
                                            <td className="px-3 py-[8.7px] align-middle">
                                                <div className="flex items-start gap-3">
                                                    <div className={`mt-0.5 h-8 w-8 rounded-lg ${mod.iconBg} ${mod.iconColor} flex items-center justify-center shrink-0`}>
                                                        {mod.icon}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-[11.5px] font-bold text-zinc-900">{mod.title}</p>
                                                            {mod.badge && (
                                                                <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold border ${mod.badgeColor}`}>
                                                                    {mod.badge}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] text-zinc-500 mt-0.5">{mod.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-[8.7px] align-middle text-right">
                                                <p className="text-[10.5px] font-medium text-zinc-600">{mod.pricing}</p>
                                            </td>
                                            <td className="px-3 py-[8.7px] align-middle text-center">
                                                <label className="relative flex items-center justify-center cursor-pointer p-1">
                                                    <input
                                                        type="checkbox"
                                                        className="peer sr-only"
                                                        checked={store.addOnModules.includes(mod.id)}
                                                        onChange={() => toggleModule(mod.id)}
                                                    />
                                                    <div className="h-4 w-4 rounded border border-zinc-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-colors">
                                                        <Check size={10} className="text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                                                    </div>
                                                </label>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Info Alert */}
                        <div className="m-3 mt-1 rounded-md bg-blue-50/50 border border-blue-100 p-2.5 flex items-start gap-2 shadow-sm">
                            <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
                            <p className="text-[10px] text-zinc-600 font-medium">
                                Add-on modules are billed in addition to the base plan. Pricing may vary based on employee count and module type.
                            </p>
                        </div>

                    </div>
                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-1.5 ">
                        <button onClick={() => router.push('/super-admin/subscriptions/features-limits')} className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-5 py-1.5 text-[12px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                            <ArrowLeft size={14} /> Back
                        </button>
                        <button onClick={() => router.push('/super-admin/subscriptions/billing-pricing')} className="flex items-center gap-1.5 rounded-lg bg-[#020b22] px-5 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-zinc-800 transition-colors">
                            Next: Billing & Pricing <ArrowRight size={14} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Right Section - Preview & Help */}
                <div className="xl:col-span-1 flex flex-col gap-1.5">

                    {/* Plan Preview */}
                    <div>
                        <h3 className="text-[13px] font-bold text-zinc-900 mb-1">Plan Preview</h3>
                        <p className="text-[10.5px] text-zinc-500 mb-2">See how this plan will appear to users</p>

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

