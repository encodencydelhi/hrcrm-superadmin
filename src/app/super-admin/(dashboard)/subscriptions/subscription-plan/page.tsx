"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ChevronRight, Check, Rocket, HelpCircle, Info,
    Navigation, Crown, Settings2, Plus, ArrowRight,
    Headset, Loader2
} from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { useSubscriptionPlanStore } from '@/store/subscriptionPlanStore';

const PLANS = [
    {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small teams getting started',
        price: '89',
        icon: <Navigation size={20} />,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50',
        borderColor: 'border-zinc-200',
        buttonText: 'Select Plan',
        buttonClass: 'border-emerald-200 text-emerald-600 hover:bg-emerald-50',
        bgColor: 'bg-green-50/20',
        features: [
            'Up to 50 Employees',
            'Core HR & Employee Profile',
            'Leave Management',
            'Attendance (Basic)',
            'Mobile App Access',
            'Email Support'
        ]
    },
    {
        id: 'professional',
        name: 'Professional',
        badge: 'Most Popular',
        description: 'Ideal for growing organizations',
        price: '150',
        icon: <Rocket size={20} />,
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-50',
        borderColor: 'border-blue-200 shadow-sm',
        buttonText: 'Select Plan',
        buttonClass: 'bg-blue-50/50 border-blue-200 text-blue-600 font-bold',
        bgColor: 'bg-blue-50/20',
        features: [
            'Up to 200 Employees',
            'All Starter Features',
            'Payroll Management',
            'Advanced Attendance',
            'Performance Management',
            'Reports & Analytics',
            'Priority Support'
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'Advanced features for large organizations',
        price: '250',
        icon: <Crown size={20} />,
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-50',
        borderColor: 'border-zinc-200',
        buttonText: 'Select Plan',
        buttonClass: 'border-purple-200 text-purple-600 hover:bg-purple-50',
        bgColor: 'bg-purple-50/20',
        features: [
            'Unlimited Employees',
            'All Professional Features',
            'Advanced HR Analytics',
            'Recruitment & Onboarding',
            'Asset Management',
            'Workflow Automation',
            'API Access',
            'Dedicated Support'
        ]
    },
    {
        id: 'custom',
        name: 'Custom Pricing',
        subtitle: 'Custom',
        description: 'Tailored solution for your unique requirements',
        price: null,
        icon: <Settings2 size={20} />,
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-50',
        borderColor: 'border-zinc-200',
        buttonText: 'Contact Sales',
        buttonClass: 'border-amber-200 text-amber-600 hover:bg-amber-50',
        bgColor: 'bg-amber-50/20',
        features: [
            'All Enterprise Features',
            'Custom Modules',
            'Custom Integrations',
            'Dedicated Account Manager',
            'SLA & Priority Support',
            'On-premise / Private Cloud'
        ]
    }
];

const ADDONS = [
    { id: 'ai', name: 'AI & Predictive Analytics', price: '₹ 2.0 / Employee / Month', checked: true },
    { id: 'ats', name: 'Advanced Recruitment', price: '₹ 1.5 / Employee / Month', checked: false },
    { id: 'lms', name: 'Learning Management', price: '₹ 1.5 / Employee / Month', checked: false },
    { id: 'expense', name: 'Expense Management', price: '₹ 1.0 / Employee / Month', checked: false },
    { id: 'helpdesk', name: 'Helpdesk & Tickets', price: '₹ 1.0 / Employee / Month', checked: false },
];

const COMPARE_FEATURES = [
    { name: 'Employee Limit', starter: 'Up to 50', pro: 'Up to 200', ent: 'Unlimited', custom: 'Unlimited' },
    { name: 'Core HR & Employee Profile', starter: true, pro: true, ent: true, custom: true },
    { name: 'Leave Management', starter: true, pro: true, ent: true, custom: true },
    { name: 'Attendance', starter: 'Basic', pro: 'Advanced', ent: 'Advanced + Analytics', custom: 'Advanced + Analytics' },
    { name: 'Payroll Management', starter: false, pro: true, ent: true, custom: true },
    { name: 'Performance Management', starter: false, pro: true, ent: true, custom: true },
    { name: 'Recruitment & Onboarding', starter: false, pro: false, ent: true, custom: true },
    { name: 'API Access', starter: false, pro: false, ent: true, custom: true },
    { name: 'Support', starter: 'Email', pro: 'Priority', ent: 'Dedicated', custom: 'Dedicated + SLA' },
    { name: 'Mobile App Access', starter: true, pro: true, ent: true, custom: true },
];

export default function SubscriptionPlansPage() {
    const router = useRouter();
    const store = useSubscriptionPlanStore();
    const [addons, setAddons] = useState(ADDONS);
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchPackages();
    }, []);

    const handleEditPlan = (pkg: any) => {
        store.update({
            id: pkg._id,
            name: pkg.name || '',
            description: pkg.description || '',
            planCode: pkg.planCode || '',
            tier: pkg.tier || 'Starter',
            targetAudience: pkg.targetAudience || [],
            planBadge: pkg.planBadge || '',
            displayOrder: pkg.displayOrder || 1,
            isActive: pkg.isActive ?? true,
            maxUsers: pkg.maxUsers || 100,
            maxCompanies: pkg.maxCompanies || 1,
            maxBranches: pkg.maxBranches || 1,
            maxDepartments: pkg.maxDepartments || 5,
            maxDesignations: pkg.maxDesignations || 10,
            features: pkg.features || [],
            addOnModules: pkg.addOnModules || [],
            priceINR: pkg.priceINR || 0,
            priceUSD: pkg.priceUSD || 0,
            pricePerUserMonthlyINR: pkg.pricePerUserMonthlyINR || 0,
            pricePerUserMonthlyUSD: pkg.pricePerUserMonthlyUSD || 0,
            pricePerUserYearlyINR: pkg.pricePerUserYearlyINR || 0,
            pricePerUserYearlyUSD: pkg.pricePerUserYearlyUSD || 0,
            setupFeeINR: pkg.setupFeeINR || 0,
            setupFeeUSD: pkg.setupFeeUSD || 0,
            freeAiCredits: pkg.freeAiCredits || 0,
            aiCreditTopUpPriceINR: pkg.aiCreditTopUpPriceINR || 0,
            aiCreditTopUpPriceUSD: pkg.aiCreditTopUpPriceUSD || 0,
        });
        router.push('/super-admin/subscriptions/plan-details');
    };

    const handleCreateNewPlan = () => {
        store.reset();
        router.push('/super-admin/subscriptions/plan-details');
    };

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const response = await api.get('/super-admin/packages');
            // Depending on the backend wrapper, it could be response.data or response.data.data
            const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
            setPackages(data);
        } catch (error) {
            console.error('Error fetching packages:', error);
            toast.error('Failed to load subscription plans');
        } finally {
            setLoading(false);
        }
    };

    const toggleAddon = (id: string) => {
        setAddons(addons.map(a => a.id === id ? { ...a, checked: !a.checked } : a));
    };

    const getCardStyle = (pkg: any) => {
        const name = (pkg.name || '').toLowerCase();
        const tier = (pkg.tier || '').toLowerCase();
        
        if (name.includes('start') || tier === 'basic' || tier === 'starter') {
            return {
                icon: <Navigation size={20} />,
                iconColor: 'text-emerald-600',
                iconBg: 'bg-emerald-50',
                borderColor: 'border-zinc-200',
                buttonClass: 'border-emerald-200 text-emerald-600 hover:bg-emerald-50',
                bgColor: 'bg-green-50/20',
                checkColor: 'text-emerald-500'
            };
        }
        if (name.includes('pro') || tier === 'professional') {
            return {
                icon: <Rocket size={20} />,
                iconColor: 'text-blue-600',
                iconBg: 'bg-blue-50',
                borderColor: 'border-blue-200 shadow-sm',
                buttonClass: 'bg-blue-50/50 border-blue-200 text-blue-600 font-bold',
                bgColor: 'bg-blue-50/20',
                checkColor: 'text-blue-500'
            };
        }
        if (name.includes('enterprise') || tier === 'enterprise') {
            return {
                icon: <Crown size={20} />,
                iconColor: 'text-purple-600',
                iconBg: 'bg-purple-50',
                borderColor: 'border-zinc-200',
                buttonClass: 'border-purple-200 text-purple-600 hover:bg-purple-50',
                bgColor: 'bg-purple-50/20',
                checkColor: 'text-purple-500'
            };
        }
        return {
            // default / custom
            icon: <Settings2 size={20} />,
            iconColor: 'text-amber-600',
            iconBg: 'bg-amber-50',
            borderColor: 'border-zinc-200',
            buttonClass: 'border-amber-200 text-amber-600 hover:bg-amber-50',
            bgColor: 'bg-amber-50/10',
            checkColor: 'text-amber-500'
        };
    };

    return (
        <div className="w-full max-w-[1600px] mx-auto pb-4 space-y-1.5 font-sans text-zinc-900 min-h-screen bg-zinc-50/50">
            {/* Header */}
            <div className="flex items-start justify-between pb-2 mt-1">
                <div>
                    <div className="flex items-center text-[10px] text-zinc-500 font-medium mb-1">
                        <Link href="/super-admin" className="hover:text-indigo-700">Home</Link>
                        <ChevronRight size={12} className="mx-1" />
                        <Link href="#" className="hover:text-indigo-700">Subscriptions</Link>
                        <ChevronRight size={12} className="mx-1" />
                        <span className="text-zinc-800">Subscription Plans</span>
                    </div>
                    <h1 className="text-[18px] font-bold text-[#020b22]">Subscription Plans</h1>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Manage and configure subscription plans for your organization</p>
                </div>
                <button
                    onClick={handleCreateNewPlan}
                    className="flex items-center gap-1.5 rounded-md bg-[#020b22] px-4 py-2 text-[11.5px] font-bold text-white shadow-sm hover:bg-zinc-800 transition-colors"
                >
                    <Plus size={14} /> Create New Plan
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-1.5 mt-1.5 items-start">
                {/* Left Section - Plans & Compare */}
                <div className="xl:col-span-3 flex flex-col gap-1.5">

                    {/* Plan Cards Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center p-12 bg-white rounded-xl border border-zinc-200">
                            <Loader2 className="animate-spin text-blue-600" size={32} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
                            {packages.length > 0 ? [...packages].sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0)).map((pkg: any) => {
                                // Add dynamic styling based on planBadge or just simple rotating styles
                                const isPopular = pkg.planBadge === 'Most Popular';
                                const badge = pkg.planBadge || '';
                                const price = pkg.pricePerUserMonthlyINR || null;
                                const style = getCardStyle(pkg);
                                
                                return (
                                    <div key={pkg._id} className={`${style.bgColor} rounded-xl border ${style.borderColor} px-4 py-3 flex flex-col relative`}>
                                        {badge && (
                                            <div className="absolute -top-2.5 right-4">
                                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold shadow-sm ${isPopular ? 'bg-[#020b22] text-white' : 'bg-zinc-800 text-white'}`}>
                                                    {badge}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-start gap-3 mb-4">
                                            <div className={`h-10 w-10 rounded-full bg-white ${style.iconColor} flex items-center justify-center shrink-0 border border-zinc-100`}>
                                                {style.icon}
                                            </div>
                                            <div className="pt-0.5">
                                                <h3 className={`text-[15px] font-bold ${style.iconColor}`}>
                                                    {pkg.name}
                                                </h3>
                                                <p className="text-[9.5px] text-zinc-500 mt-0.5 leading-tight pr-2">{pkg.description}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            {price ? (
                                                <>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-[16px] font-bold text-zinc-900">₹</span>
                                                        <span className="text-[28px] font-bold text-[#020b22] leading-none">{price}</span>
                                                    </div>
                                                    <p className="text-[9.5px] text-zinc-500 mt-1">Per Employee / Month</p>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex items-baseline h-[34px] items-center">
                                                        <span className="text-[18px] font-bold text-[#020b22] leading-none">Custom Pricing</span>
                                                    </div>
                                                    <p className="text-[9.5px] text-zinc-500 mt-1">Let's build for you</p>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-2 mb-5">
                                            <div className="flex items-start gap-1.5">
                                                <Check size={12} className={`${style.checkColor} shrink-0 mt-0.5`} strokeWidth={3} />
                                                <span className="text-[10px] font-medium text-zinc-700 leading-tight">Up to {pkg.maxUsers || 'Unlimited'} Employees</span>
                                            </div>
                                            {pkg.features?.slice(0, 6).map((feature: string, idx: number) => (
                                                <div key={idx} className="flex items-start gap-1.5">
                                                    <Check size={12} className={`${style.checkColor} shrink-0 mt-0.5`} strokeWidth={3} />
                                                    <span className="text-[10px] font-medium text-zinc-700 leading-tight">{feature}</span>
                                                </div>
                                            ))}
                                            {pkg.features?.length > 6 && (
                                                <div className="flex items-start gap-1.5">
                                                    <span className="text-[10px] font-bold text-blue-600 leading-tight cursor-pointer">+ {pkg.features.length - 6} more features</span>
                                                </div>
                                            )}
                                        </div>

                                        <button onClick={() => handleEditPlan(pkg)} className={`w-full py-2 rounded-md border text-[11px] transition-colors font-bold ${style.buttonClass}`}>
                                            Edit Plan
                                        </button>
                                    </div>
                                );
                            }) : (
                                <div className="col-span-4 p-8 text-center text-zinc-500 text-sm">
                                    No subscription plans created yet.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Compare Plans Table */}
                    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-zinc-100 relative">
                            <h3 className="text-[14px] font-bold text-zinc-900">Compare Plans</h3>

                            <div className="absolute top-3 left-[45%] xl:left-[49%]">
                                <span className="bg-[#020b22] text-white px-2 py-0.5 rounded text-[9px] font-bold shadow-sm">
                                    Most Popular
                                </span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="border-b border-zinc-100">
                                        <th className="px-5 py-[6.5px] text-[11px] font-bold text-zinc-900 w-1/4">Features</th>
                                        <th className="px-2 py-[6.5px] text-[11px] font-bold text-emerald-600 text-center w-[18%]">Starter</th>
                                        <th className="px-2 py-[6.5px] text-[11px] font-bold text-blue-600 text-center w-[18%]">Professional</th>
                                        <th className="px-2 py-[6.5px] text-[11px] font-bold text-purple-600 text-center w-[18%]">Enterprise</th>
                                        <th className="px-2 py-[6.5px] text-[11px] font-bold text-amber-600 text-center w-[18%]">Custom</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {COMPARE_FEATURES.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                                            <td className="px-5 py-[6.5px] text-[10.5px] font-medium text-zinc-700">{row.name}</td>

                                            {[row.starter, row.pro, row.ent, row.custom].map((val, i) => (
                                                <td key={i} className="px-2 py-[6.5px] text-[10px] text-zinc-600 text-center">
                                                    {typeof val === 'boolean' ? (
                                                        val ? <Check size={14} className="text-emerald-500 mx-auto" strokeWidth={2.5} /> : <span className="text-zinc-300">-</span>
                                                    ) : (
                                                        val
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-5 py-3 bg-zinc-50/50 border-t border-zinc-100">
                            <p className="text-[9.5px] text-zinc-500">All plans include secure cloud hosting, automatic backups, and 99.9% uptime SLA.</p>
                        </div>
                    </div>

                </div>

                {/* Right Section - Sidebar */}
                <div className="xl:col-span-1 flex flex-col gap-1.5">

                    {/* Subscription Summary */}
                    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4">
                        <h3 className="text-[13px] font-bold text-zinc-900 mb-4">Subscription Summary</h3>

                        <div className="mb-4">
                            <p className="text-[10px] text-zinc-500 mb-1">Selected Plan</p>
                            <div className="flex items-center justify-between">
                                <h4 className="text-[15px] font-bold text-blue-600">Professional</h4>
                                <button className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Change Plan</button>
                            </div>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-[14px] font-bold text-zinc-900">₹</span>
                                <span className="text-[16px] font-bold text-zinc-900 leading-none">150</span>
                            </div>
                            <p className="text-[9px] text-zinc-500">Per Employee / Month</p>
                        </div>

                        <div className="space-y-3 border-t border-b border-zinc-100 py-4 mb-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10.5px] font-bold text-zinc-800">Employees (Estimated)</span>
                                <span className="text-[10.5px] font-bold text-zinc-900">100</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10.5px] font-medium text-zinc-600">Plan Amount</span>
                                <span className="text-[10.5px] font-medium text-zinc-800">₹ 15,000 / Month</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10.5px] font-medium text-zinc-600">Add-on Modules</span>
                                <span className="text-[10.5px] font-medium text-zinc-800">₹ 1,500 / Month</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10.5px] font-medium text-zinc-600">GST (18%)</span>
                                <span className="text-[10.5px] font-medium text-zinc-800">₹ 2,970 / Month</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[11.5px] font-bold text-zinc-900">Total (Estimated)</span>
                            <span className="text-[14px] font-bold text-blue-600">₹ 19,470 <span className="text-[10px] text-blue-600/80 font-medium">/ Month</span></span>
                        </div>

                        <div className="flex items-start gap-1.5 bg-zinc-50 rounded-md p-2">
                            <Info size={12} className="text-zinc-400 shrink-0 mt-0.5" />
                            <p className="text-[9px] text-zinc-500 leading-tight">
                                Final amount may vary based on actual employee count and billing cycle.
                            </p>
                        </div>
                    </div>

                    {/* Add-on Modules Sidebar */}
                    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4">
                        <h3 className="text-[13px] font-bold text-zinc-900">Add-on Modules</h3>
                        <p className="text-[9.5px] text-zinc-500 mb-3 mt-0.5">Enhance your plan with powerful add-ons</p>

                        <div className="space-y-2.5">
                            {addons.map((addon) => (
                                <div key={addon.id} className="flex items-start gap-2 group cursor-pointer" onClick={() => toggleAddon(addon.id)}>
                                    <div className={`mt-0.5 h-3.5 w-3.5 rounded flex items-center justify-center shrink-0 border transition-colors ${addon.checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-zinc-300 group-hover:border-zinc-400'}`}>
                                        <Check size={10} className={`text-white transition-opacity ${addon.checked ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10.5px] font-medium text-zinc-800">{addon.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9.5px] text-zinc-500">{addon.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Need Help Card */}
                    <div className="bg-[#020b22] rounded-xl border border-zinc-800 shadow-sm p-5 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 text-white/5">
                            <Headset size={100} />
                        </div>
                        <div className="flex items-start gap-3 relative z-10">
                            <div className="h-9 w-9 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                                <Headset size={18} />
                            </div>
                            <div>
                                <h4 className="text-[14px] font-bold text-white mb-1">Need Help Choosing?</h4>
                                <p className="text-[10.5px] text-zinc-400 leading-relaxed mb-4 pr-4">
                                    Our experts are here to help you choose the perfect plan.
                                </p>
                                <button className="flex items-center gap-1.5 px-4 py-2 border border-amber-500/50 rounded-lg text-[11px] font-bold text-amber-500 hover:bg-amber-500/10 transition-colors w-max">
                                    Schedule a Demo <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
