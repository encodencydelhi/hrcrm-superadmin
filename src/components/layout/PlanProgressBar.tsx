'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Step {
    id: number;
    title: string;
    path: string;
}

const STEPS: Step[] = [
    { id: 1, title: 'Plan Details', path: '/super-admin/subscriptions/plan-details' },
    { id: 2, title: 'Features & Limits', path: '/super-admin/subscriptions/features-limits' },
    { id: 3, title: 'Add-on Modules', path: '/super-admin/subscriptions/add-on-modules' },
    { id: 4, title: 'Billing & Pricing', path: '/super-admin/subscriptions/billing-pricing' },
    { id: 5, title: 'Review & Create', path: '/super-admin/subscriptions/review-create' },
];

export function PlanProgressBar({ current }: { current: number }) {
    const router = useRouter();

    return (
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm mt-2">
            <div className="flex items-center justify-between gap-2 overflow-x-auto p-4">
                {STEPS.map((step, index) => {
                    const isCompleted = step.id < current;
                    const isCurrent = step.id === current;

                    return (
                        <React.Fragment key={step.id}>
                            <div
                                onClick={() => (isCompleted || isCurrent) ? router.push(step.path) : undefined}
                                className={`flex items-center gap-2 shrink-0 group ${isCompleted || isCurrent ? 'cursor-pointer' : 'cursor-default opacity-80'}`}
                            >
                                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-bold transition-colors ${isCurrent
                                    ? 'bg-[#16234A] text-white'
                                    : isCompleted
                                        ? 'bg-emerald-500 text-white group-hover:bg-emerald-600'
                                        : 'border-2 border-zinc-200 text-zinc-400 group-hover:border-zinc-300'
                                    }`}>
                                    {isCompleted ? <Check size={15} /> : step.id}
                                </span>
                                <p className={`hidden sm:block text-[12.5px] font-semibold whitespace-nowrap transition-colors ${isCurrent ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600'
                                    }`}>
                                    {step.title}
                                </p>
                            </div>
                            {index < STEPS.length - 1 && <span className="h-px flex-1 min-w-[16px] border-t-2 border-dotted border-zinc-200" />}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
