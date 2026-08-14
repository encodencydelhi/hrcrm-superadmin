'use client';
import React from 'react';
import {
    Home, ChevronRight, Check, Building2, Hash, Shield, Users, Layers, Calendar,
    DollarSign, UserCircle, CalendarDays, ExternalLink, FileText, Video, HelpCircle,
    Phone, ArrowRight, ArrowLeft, Rocket, BarChart2, Headset, Info
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// ─── Static data ────────────────────────────────────────────────────────────
const BREADCRUMB = ['Home', 'Companies', 'TechVision Pvt. Ltd.', 'Onboarding', 'Go Live'];

const STEPS = [
    { num: 1, label: 'Company Created', status: 'Completed' },
    { num: 2, label: 'Invite Admin Users', status: 'Completed' },
    { num: 3, label: 'Import Employees', status: 'Completed' },
    { num: 4, label: 'Configure Modules', status: 'Completed' },
    { num: 5, label: 'Run Payroll Setup', status: 'Completed' },
    { num: 6, label: 'Go Live', status: 'In Progress' },
];

const READINESS_ITEMS = [
    { label: 'Company Information', desc: 'Basic company information and configuration', status: 'Completed' },
    { label: 'Admin Users', desc: 'Primary and additional admin users invited', status: '3 Admins' },
    { label: 'Employee Import', desc: 'Employees imported successfully', status: '100 Employees' },
    { label: 'Module Configuration', desc: '10 modules enabled and configured', status: '10 / 12 Enabled' },
    { label: 'Payroll Setup', desc: 'Payroll configuration and compliance completed', status: 'All Set' },
    { label: 'Data Validation', desc: 'System validated all data and settings', status: 'No Issues Found' },
];

const SUMMARY_ITEMS = [
    { icon: Building2, label: 'Company', value: 'TechVision Pvt. Ltd.' },
    { icon: Hash, label: 'Company Code', value: 'TECHVISION_001' },
    { icon: Shield, label: 'Plan', value: 'Professional' },
    { icon: Users, label: 'Employees', value: '100' },
    { icon: Layers, label: 'Modules Enabled', value: '10 of 12' },
    { icon: UserCircle, label: 'Admin Users', value: '3' },
    { icon: DollarSign, label: 'Payroll Frequency', value: 'Monthly' },
    { icon: CalendarDays, label: 'Pay Day', value: '5th of Every Month' },
    { icon: Calendar, label: 'Go Live Date', value: '21 May 2025' },
];

const NEXT_STEPS = [
    { icon: Users, title: 'Employees will receive login credentials', desc: 'Invitations will be sent via email.' },
    { icon: Rocket, title: 'Go live and start using Crewcam HRMS', desc: 'Your company will be fully operational.' },
    { icon: BarChart2, title: 'Track, manage and grow your business', desc: 'Get insights and reports to make better decisions.' },
    { icon: Headset, title: "We're here to support you", desc: 'Our team is always here to help you succeed.' },
];

// ─── Components ─────────────────────────────────────────────────────────────
function PageHeading() {
    return (
        <section className="space-y-3 mb-3">
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

            <div>
                <h1 className="text-2xl font-bold text-zinc-900 leading-tight">Go Live</h1>
                <p className="text-[13px] text-zinc-500 mt-0.5">Review everything one last time and go live with Crewcam HRMS.</p>
            </div>
        </section>
    );
}

function ProgressBar() {
    return (
        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4 mb-3 flex items-center justify-between overflow-x-auto gap-4">
            {STEPS.map((step, idx) => (
                <React.Fragment key={step.num}>
                    <div className="flex items-center gap-2 shrink-0">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-[13px] font-bold shrink-0 ${step.status === 'Completed' ? 'bg-emerald-500 text-white' : step.status === 'In Progress' ? 'bg-[#0B1B3D] text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                            {step.status === 'Completed' ? <Check size={16} /> : step.num}
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-[12px] font-bold ${step.status === 'Completed' || step.status === 'In Progress' ? 'text-zinc-900' : 'text-zinc-400'}`}>{step.label}</span>
                            <span className="text-[10px] text-zinc-400">{step.status}</span>
                        </div>
                    </div>
                    {idx < STEPS.length - 1 && (
                        <div className="flex-1 min-w-[20px] h-[1px] bg-zinc-200"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

export default function GoLivePage({ companyId }: { companyId: string }) {
    const router = useRouter();
    const onGoLiveNow = () => {
        alert(`Company is Live Now`);
        router.push(`/super-admin/companies`);
    };
    return (
        <div className="space-y-3 pb-3">
            <PageHeading />
            <ProgressBar />

            <div className="grid grid-cols-1 xl:grid-cols-[2.6fr_1fr] gap-3 items-start">

                {/* Left Column */}
                <div className="space-y-3 min-w-0">

                    {/* Top row of left column */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

                        {/* Go Live Readiness */}
                        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4 flex flex-col h-full">
                            <div className="mb-4">
                                <h2 className="text-[14px] font-bold text-zinc-900">Go Live Readiness</h2>
                                <p className="text-[12px] text-zinc-500 mt-0.5">We've checked all required items. Your company is ready to go live.</p>
                            </div>

                            <div className="flex-1 space-y-4">
                                {READINESS_ITEMS.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between pb-3 border-b border-zinc-100 last:border-0 last:pb-0">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 bg-emerald-500 rounded-full p-0.5 shrink-0">
                                                <Check size={12} className="text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-[12px] font-bold text-zinc-900">{item.label}</h3>
                                                <p className="text-[11px] text-zinc-500 mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-[11px] font-bold text-emerald-600">{item.status}</span>
                                            <button className="rounded border border-zinc-200 px-2 py-1 text-[10px] font-bold text-zinc-700 hover:bg-zinc-50 transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 flex items-start gap-3">
                                <div className="text-xl">🎉</div>
                                <div>
                                    <h4 className="text-[12.5px] font-bold text-emerald-800">Great! Everything looks good.</h4>
                                    <p className="text-[11.5px] text-emerald-600 mt-0.5">You are all set to go live with Crewcam HRMS.</p>
                                </div>
                            </div>
                        </div>

                        {/* Go Live Summary */}
                        <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4 flex flex-col h-full">
                            <div className="mb-4">
                                <h2 className="text-[14px] font-bold text-zinc-900">Go Live Summary</h2>
                                <p className="text-[12px] text-zinc-500 mt-0.5">Here's a quick summary of your setup.</p>
                            </div>

                            <div className="flex-1 space-y-3 mb-4">
                                {SUMMARY_ITEMS.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-1">
                                        <div className="flex items-center gap-2">
                                            <item.icon size={14} className="text-zinc-400" />
                                            <span className="text-[11.5px] text-zinc-600">{item.label}</span>
                                        </div>
                                        <span className="text-[11.5px] font-bold text-zinc-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-amber-50/50 border border-amber-100/60 rounded-lg p-3 mt-auto">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Info size={14} className="text-amber-600" />
                                    <h4 className="text-[12px] font-bold text-amber-800">Important Notes</h4>
                                </div>
                                <ul className="space-y-1.5">
                                    <li className="flex items-start gap-1.5 text-[11px] text-amber-700/80">
                                        <Check size={12} className="mt-0.5 shrink-0" />
                                        <span>Once you go live, employees will be able to access the system.</span>
                                    </li>
                                    <li className="flex items-start gap-1.5 text-[11px] text-amber-700/80">
                                        <Check size={12} className="mt-0.5 shrink-0" />
                                        <span>You can still make changes to settings after going live.</span>
                                    </li>
                                    <li className="flex items-start gap-1.5 text-[11px] text-amber-700/80">
                                        <Check size={12} className="mt-0.5 shrink-0" />
                                        <span>We recommend communicating with your employees before going live.</span>
                                    </li>
                                    <li className="flex items-start gap-1.5 text-[11px] text-amber-700/80">
                                        <Check size={12} className="mt-0.5 shrink-0" />
                                        <span>Our support team will be available to help you at every step.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* What happens next? */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <h2 className="text-[14px] font-bold text-zinc-900 mb-4">What happens next?</h2>
                        <div className="flex items-center flex-wrap md:flex-nowrap gap-2 md:gap-0">
                            {NEXT_STEPS.map((step, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="flex flex-col items-center text-center flex-1 min-w-[150px]">
                                        <div className="w-10 h-10 rounded-lg border border-zinc-200 bg-white flex items-center justify-center mb-3 text-indigo-600 shadow-sm">
                                            <step.icon size={18} />
                                        </div>
                                        <h3 className="text-[12px] font-bold text-zinc-900 mb-1 leading-tight px-2">{step.title}</h3>
                                        <p className="text-[10.5px] text-zinc-500 leading-snug px-2">{step.desc}</p>
                                    </div>
                                    {idx < NEXT_STEPS.length - 1 && (
                                        <div className="hidden md:flex shrink-0 px-2 text-zinc-300">
                                            <ArrowRight size={16} />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-1">
                        <button onClick={() => router.push(`/super-admin/run-payroll-setup?companyId=${companyId}`)} className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                            <ArrowLeft size={14} /> Back to Previous Step
                        </button>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-[12.5px] font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors">
                                <CalendarDays size={14} /> Schedule Go Live Later
                            </button>
                            <button onClick={onGoLiveNow} className="flex items-center gap-1.5 rounded-md bg-[#0B1B3D] px-6 py-2.5 text-[12.5px] font-bold text-white shadow-sm hover:bg-[#0B1B3D]/90 transition-colors">
                                <Rocket size={14} /> Go Live Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">

                    {/* Onboarding Progress */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <h2 className="text-[14px] font-bold text-zinc-900 mb-4">Onboarding Progress</h2>
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                                {/* SVG Circle Progress */}
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-zinc-100"
                                        strokeWidth="4"
                                        stroke="currentColor"
                                        fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className="text-emerald-500"
                                        strokeWidth="4"
                                        strokeDasharray="100, 100"
                                        stroke="currentColor"
                                        fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <span className="absolute text-[13px] font-bold text-zinc-900">100%</span>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Step 6 of 6</p>
                                <h3 className="text-[14px] font-bold text-zinc-900 mb-0.5">Go Live</h3>
                                <p className="text-[11px] text-zinc-500 leading-tight">You're all set! Review and go live.</p>
                            </div>
                        </div>
                    </div>

                    {/* Onboarding Steps Checklist */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <h2 className="text-[14px] font-bold text-zinc-900 mb-4">Onboarding Steps</h2>
                        <div className="space-y-4">
                            {STEPS.map((step, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.status === 'Completed' ? 'bg-emerald-500 text-white' : step.status === 'In Progress' ? 'bg-[#0B1B3D] text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                                            {step.status === 'Completed' ? <Check size={12} /> : <span className="text-[10px] font-bold">{step.num}</span>}
                                        </div>
                                        <span className={`text-[12px] font-bold ${step.status === 'Completed' || step.status === 'In Progress' ? 'text-zinc-900' : 'text-zinc-500'}`}>{step.label}</span>
                                    </div>
                                    <span className={`text-[11px] font-medium ${step.status === 'Completed' ? 'text-emerald-600' : step.status === 'In Progress' ? 'text-[#0B1B3D]' : 'text-zinc-400'}`}>
                                        {step.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Support & Resources */}
                    <div className="rounded-sm border border-zinc-200/80 bg-white shadow-sm p-4">
                        <h2 className="text-[14px] font-bold text-zinc-900 mb-4">Support & Resources</h2>
                        <div className="space-y-3">
                            <a href="#" className="flex items-center justify-between text-[12px] text-zinc-600 hover:text-indigo-600 transition-colors group">
                                <div className="flex items-center gap-2">
                                    <FileText size={14} className="text-zinc-400 group-hover:text-indigo-600" />
                                    <span>Implementation Guide</span>
                                </div>
                                <ExternalLink size={14} className="text-zinc-400 group-hover:text-indigo-600" />
                            </a>
                            <a href="#" className="flex items-center justify-between text-[12px] text-zinc-600 hover:text-indigo-600 transition-colors group">
                                <div className="flex items-center gap-2">
                                    <Video size={14} className="text-zinc-400 group-hover:text-indigo-600" />
                                    <span>Video Tutorials</span>
                                </div>
                                <ExternalLink size={14} className="text-zinc-400 group-hover:text-indigo-600" />
                            </a>
                            <a href="#" className="flex items-center justify-between text-[12px] text-zinc-600 hover:text-indigo-600 transition-colors group">
                                <div className="flex items-center gap-2">
                                    <HelpCircle size={14} className="text-zinc-400 group-hover:text-indigo-600" />
                                    <span>Help Center</span>
                                </div>
                                <ExternalLink size={14} className="text-zinc-400 group-hover:text-indigo-600" />
                            </a>
                            <a href="#" className="flex items-center justify-between text-[12px] text-zinc-600 hover:text-indigo-600 transition-colors group">
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-zinc-400 group-hover:text-indigo-600" />
                                    <span>Contact Support</span>
                                </div>
                                <ExternalLink size={14} className="text-zinc-400 group-hover:text-indigo-600" />
                            </a>
                        </div>
                    </div>

                    {/* Need Help? */}
                    <div className="rounded-sm bg-[#0B1B3D] text-white p-4 flex gap-3 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full pointer-events-none"></div>
                        <div className="absolute right-12 bottom-0 w-16 h-16 bg-white/5 rounded-full pointer-events-none"></div>
                        <Headset size={24} className="text-orange-400 shrink-0 relative z-10" />
                        <div className="relative z-10">
                            <h3 className="text-[14px] font-bold mb-1">Need Help?</h3>
                            <p className="text-[11.5px] text-zinc-300 leading-relaxed mb-3">Our implementation team is here to help you go live successfully.</p>
                            <button className="flex items-center gap-2 rounded border border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/20 px-3 py-1.5 text-[11px] font-bold text-orange-400 transition-colors">
                                <Phone size={12} /> Contact Support
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
